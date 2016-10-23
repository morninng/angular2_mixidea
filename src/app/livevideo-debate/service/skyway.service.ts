import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

declare var navigator:any;
declare var Peer:any;


@Injectable()
export class SkywayService {


  own_peer : any;
  sfu_room : any;
  local_stream : any;
  id_video_src_mapping = {};
  room_users = {};

  audio_available : boolean;
  video_available: boolean;
  video_active : boolean;
  audio_active : boolean;


  localstream_subject : BehaviorSubject<any>;


  constructor() { 
    this.localstream_subject = new BehaviorSubject(null);

  }

  
  get_usermedia(){
    const constraints = { audio:true,
                          video: {
                            width:{ideal:80},
                            height:{ideal: 45},
                            frameRate: {ideal:2}
                         }};
    const promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then((stream)=>{
      console.log("accessing user media has been approved");
      this.local_stream= stream;
      this.localstream_subject.next(stream);
    });
    promise.catch(()=>{
      alert("you cannot join the game if you do not allow the media");
    })
  }


  join_room(type :string, event_id: string, team_name : string){

    this.close_room();

    this.own_peer = new Peer({
      key: '63899577-16cc-4fdb-9a4d-ad3ace362cde',
      debug:3
    });


    let room_name = ''
    if(type=='main'){
      room_name = 'mixidea_' + event_id + '_main';
    }else if( type === 'preparation'){
      room_name = 'mixidea_' + event_id + '_' + team_name;
    }else{
      return;
    }
    this.sfu_room = this.own_peer.joinRoom(room_name, {mode: 'sfu', stream: this.local_stream })

    this.sfu_room.on('stream', (stream)=>{
        const streamURL = URL.createObjectURL(stream);
        const peerId = stream.peerId;
        this.id_video_src_mapping[peerId] = streamURL;
    })

    this.sfu_room.on('peerJoin', (peerId)=>{
      this.room_users[peerId] = true;
    });

    this.sfu_room.on('peerLeave', (peerId)=>{
      this.room_users[peerId] = false;
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
