import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject} from 'rxjs';

import { UserauthService} from './../../core/service/userauth.service';
import {ModelUserService} from './../../core/service/model-user.service';
import {LiveDebateFirebaseService} from './live-debate-firebase.service';

declare var navigator:any;
declare var Peer:any;


@Injectable()
export class SkywayService {

  own_peer : any;
  sfu_room : any;
  local_stream : any;

  audio_available : boolean;
  video_available: boolean;
  video_active : boolean;
  audio_active : boolean;

  local_video_stream_subject : BehaviorSubject<any>;



  constructor(private user_auth : UserauthService,
              private user_model : ModelUserService,
              private livedebate_firebase: LiveDebateFirebaseService) {

    this.local_video_stream_subject = new BehaviorSubject(null);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    const user_id = this.user_auth.own_user.id;

    this.own_peer = new Peer(user_id, {
      key: '63899577-16cc-4fdb-9a4d-ad3ace362cde',
      debug:3
    });

    this.own_peer.on('open', ()=>{
      console.log("connection is established with peer id: " , this.own_peer.id);
      const constraints = { audio:true,
                          video: {
                            width:{ideal:320},
                            height:{ideal: 180}
                          }};
      const room_join = false;
      this.get_usermedia(constraints, room_join);

    })

    this.own_peer.on('error', ()=>{
      alert("peer error");
    })

    const constraints = { audio:true,
                        video: {
                          width:{ideal:320},
                          height:{ideal: 180}
                        }};
    const room_join = false;
    this.get_usermedia(constraints, room_join);
  }


  get_usermedia(constraints : any, room_join = false, 
                type? :string, event_id?: string, team_name? : string){

    const promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then((video_stream)=>{
      console.log("accessing video and audio has been approved");
      this.local_stream= video_stream;
      this.local_video_stream_subject.next(video_stream);
      this.video_available = true;
      this.audio_available = true;


      const streamURL = URL.createObjectURL(video_stream);
      this.add_stream_on_roomuser(this.user_auth.own_user.id, streamURL);

      if(this.sfu_room){
        this.sfu_room.replaceStream(this.local_stream)
      }
      if(room_join){
        this.join_room_execute(type, event_id, team_name);
      }

    }).catch(()=>{
      this.get_usermedia_audio(room_join, type, event_id, team_name);
    })
  }

  get_usermedia_audio(room_join = false, type? :string, event_id?: string, team_name? : string){
    const constraints = { audio:true,
                          video: false};
    const promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then((audio_stream)=>{
      console.log("accessing audio has been approved");
      this.local_stream= audio_stream;
      this.video_available = false;
      this.audio_available = true;
      if(this.sfu_room){
        this.sfu_room.replaceStream(this.local_stream)
      }
      if(room_join){
        this.join_room_execute(type, event_id, team_name);
      }
    }).catch(()=>{
      alert("you cannot use both aido and video, so you can just watch but cannot speak anything");
      this.video_available = false;
      this.audio_available = false;
      if(room_join){
        this.join_room_execute(type, event_id, team_name);
      }
    })
  }

  switch_localstream_small(){

      const constraints = { audio:true,
                          video: {
                            width:{ideal:100},
                            height:{ideal: 100},
                            frameRate: { ideal: 2}
                          }};
    const room_join = false;
    this.get_usermedia(constraints, room_join);
 
  }
  


  middle_process = false;

  join_room(type :string, event_id: string, team_name : string){
    
    this.join_room_execute(type, event_id,  team_name );

  }

  join_room_execute(type :string, event_id: string, team_name : string){


    this.close_room();

    let room_name = ''
    if(type=='main'){
      room_name = 'mixidea_' + event_id + '_main';
    }else if( type === 'preparation'){
      room_name = 'mixidea_' + event_id + '_' + team_name;
    }else{
      return;
    }

    this.set_user_env(event_id);


   this.sfu_room = this.own_peer.joinRoom(room_name, {mode: 'sfu', stream: this.local_stream })


    this.sfu_room.on('open', ()=>{
      console.log("---you have enter the room now---");
      this.middle_process = false;
      this.set_peer_users();
    });

    this.sfu_room.on('close', ()=>{
      alert("room is closed");
    });

    this.sfu_room.on('error', ()=>{
      console.log(" error has happening");
      this.middle_process = false;
    });

    this.sfu_room.on('stream', (stream)=>{
        const streamURL = URL.createObjectURL(stream);
        const peerId = stream.peerId;
        this.add_stream_on_roomuser(peerId, streamURL);


        console.log("---stream is detected----");
        console.log("peer id" , peerId);
        console.log("url", streamURL);
    })

    this.sfu_room.on('removeStream', (stream)=>{
        const peerId = stream.peerId;
        this.remove_stream_from_roomuser(peerId);

        console.log("---stream is removed----");
        console.log("peer id" , peerId);
    })

    this.sfu_room.on('peerJoin', (peerId)=>{
      this.user_model.add_user(peerId);
      console.log("----user entered the video call ---: ", peerId);
      this.set_peer_users();
    });

    this.sfu_room.on('peerLeave', (peerId)=>{
      console.log("----user leave the video call ----", peerId);
      this.set_peer_users();
    });
  }


  close_room(){
    if(this.sfu_room){
      this.sfu_room.close();
      this.sfu_room = null;
    }
  }


  room_data = {
    room_users:[],
    video_data:{}
  };
  room_data_subject = new BehaviorSubject(this.room_data);


  private set_peer_users(){

      this.own_peer.listAllPeers((list)=>{
        console.log("all user list is", list );
        const room_user_obj = {};
        room_user_obj["room_users"]=list;
        this.room_data = Object.assign({}, this.room_data, room_user_obj);
        this.room_data_subject.next(this.room_data);
      })
  }

  private add_stream_on_roomuser(peerId, stream){

    const updated_video_obj = Object.assign({}, this.room_data.video_data)
    updated_video_obj[peerId] = stream;
    const updated_video_parent = {video_data: updated_video_obj};
    this.room_data = Object.assign({}, this.room_data,updated_video_parent);
    console.log("<<<<<<<room data>>>>>>>>");
    console.log(this.room_data);
    this.room_data_subject.next(this.room_data);
  }

  private remove_stream_from_roomuser(peerId){
    const updated_video_obj = Object.assign({}, this.room_data.video_data);
    if(updated_video_obj[peerId]){
      delete updated_video_obj[peerId];
    }
    const updated_video_parent = {video_data: updated_video_obj};
    this.room_data = Object.assign({}, this.room_data,updated_video_parent);
    console.log("<<<<<<<room data>>>>>>>>");
    console.log(this.room_data);
    this.room_data_subject.next(this.room_data);
  }

  private set_user_env(event_id){

    if(!this.audio_available){
      this.livedebate_firebase.set_user_audio_unavailable(event_id, this.user_auth.own_user_id);
    }
    if(!this.video_available){
     this.livedebate_firebase.set_user_video_unavailable(event_id, this.user_auth.own_user_id);
    }
  }

  mute(){
    // これは何度もよばれるが、現状の値と比較し、変更の必要があったときのみ、apiを叩く
    this.sfu_room.mute({"video":false,"audio":false})
  
  }

  unmute(){
    this.sfu_room.unmute({"video":true,"audio":true})
  }



}
