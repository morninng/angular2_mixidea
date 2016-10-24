import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject} from 'rxjs';

declare var navigator:any;
declare var Peer:any;


@Injectable()
export class SkywayService {

  own_peer : any;
  sfu_room : any;
  local_stream : any;
  id_video_map_obs : Observable<any>;
  private id_video_map_subject : Subject<any>;
  room_users = {};

  audio_available : boolean;
  video_available: boolean;
  video_active : boolean;
  audio_active : boolean;


  local_video_stream_subject : BehaviorSubject<any>;


  constructor() { 
    this.local_video_stream_subject = new BehaviorSubject(null);

    this.id_video_map_subject = new Subject();
    this.id_video_map_obs = this.id_video_map_subject.scan((acc :any, curr)=>{
      const new_mapping = Object.assign({}, acc);
      new_mapping[curr.peerId] = curr.streamURL;
      return new_mapping;
    }, {})

  }

  
  get_usermedia(){
    const constraints = { audio:true,
                          video: {
                            width:{ideal:80},
                            height:{ideal: 45},
                            frameRate: {ideal:2}
                         }};
    const promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then((video_stream)=>{
      console.log("accessing video and audio has been approved");
      this.local_stream= video_stream;
      this.local_video_stream_subject.next(video_stream);
      this.video_available = true;
      this.audio_available = true;
    }).catch(()=>{
      this.get_usermedia_audio()
    })
  }

  get_usermedia_audio(){
    const constraints = { audio:true,
                          video: false};
    const promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then((audio_stream)=>{
      console.log("accessing audio has been approved");
      this.local_stream= audio_stream;
      this.video_available = false;
      this.audio_available = true;
    }).catch(()=>{
      alert("you cannot use both aido and video, so you can just watch but cannot speak anything");
      this.video_available = false;
      this.audio_available = false;
    })
  }


  middle_process = false;

  join_room(type :string, event_id: string, user_id:string, team_name : string){

    console.log("---join room is called with the user_id---", user_id);

    if(!this.own_peer ){
      this.middle_process = true;
      this.own_peer = new Peer(user_id, {
        key: '63899577-16cc-4fdb-9a4d-ad3ace362cde',
        debug:3
      });

      this.own_peer.on('open', ()=>{
        console.log("connection is established with peer id: " , user_id)
        this.join_room_execute(type , event_id,  team_name);
      })

      this.own_peer.on('error', ()=>{
        alert("peer error");
      })
    }else{
      if(!this.middle_process){
        this.join_room_execute(type , event_id,  team_name);
      } 
    }
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

   this.sfu_room = this.own_peer.joinRoom(room_name, {mode: 'sfu', stream: this.local_stream })


    this.sfu_room.on('open', ()=>{
      console.log(" you have enter the room now");
      this.middle_process = false;
    });

    this.sfu_room.on('error', ()=>{
      console.log(" error has happening");
      this.middle_process = false;
    });

    this.sfu_room.on('stream', (stream)=>{
        const streamURL = URL.createObjectURL(stream);
        const peerId = stream.peerId;
        //this.id_video_src_mapping[peerId] = streamURL;
        this.id_video_map_subject.next({peerId, streamURL})
        console.log("---stream is detected----");
        console.log("peer id" , peerId);
        console.log("url", streamURL);
    })

    this.sfu_room.on('peerJoin', (peerId)=>{
      this.room_users[peerId] = true;
      console.log("----user entered the video call ---: ", peerId);
    });

    this.sfu_room.on('peerLeave', (peerId)=>{
      this.room_users[peerId] = false;
      console.log("----user leave the video call ----", peerId);
    });
  }


  close_room(){
    if(this.sfu_room){
      this.sfu_room.close();
      this.sfu_room = null;
    }
  }

  mute(){
    // これは何度もよばれるが、現状の値と比較し、変更の必要があったときのみ、apiを叩く
    this.sfu_room.mute({"video":false,"audio":false})
  
  }

  unmute(){
    this.sfu_room.unmute({"video":true,"audio":true})
  }

  get_media_src(user_id){

  }


}
