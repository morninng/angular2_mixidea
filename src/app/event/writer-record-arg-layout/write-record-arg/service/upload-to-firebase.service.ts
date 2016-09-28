import { Injectable } from '@angular/core';
import {EncodeToMp3Service} from './../service/encode-to-mp3.service'
import { BehaviorSubject } from 'rxjs';
import {generate_random_string} from './../../../../util_func';
import {AngularFire} from 'angularfire2';

declare var firebase: any;

@Injectable()
export class UploadToFirebaseService {

  under_file_upload_subject = new BehaviorSubject(false);

  constructor(private encode_to_mp3: EncodeToMp3Service, private af: AngularFire) {
    /////temporal implementation before the Angularfire2 storage is developed.////////////////////////////////////
    var config = {
      apiKey: "AIzaSyBp_ZDqoPygbPs7jMclrBSJ3a99t1Yvr1k",
      authDomain: "mixidea-91a20.firebaseapp.com",
      databaseURL: "https://mixidea-91a20.firebaseio.com",
      storageBucket: "mixidea-91a20.appspot.com"
    };
    firebase.initializeApp(config);
    ////////////temporal implementation//////////////////////////////////////////////////////
  }

  upload_file_after_encoding(event_id, arg_each_content_id, team_name){
    const storage = firebase.storage();
    const storage_ref = storage.ref();
    var file_name = generate_random_string();

    this.encode_to_mp3.encode_done$.take(1).subscribe(
      (mp3_uint_arr)=>{
        console.log("encode_to_mps callback is called");
        const audio_storage_ref = storage_ref.child("audio/written_debate/" + event_id + "/" + file_name + ".mp3");
        this.under_file_upload_subject.next(true);

        audio_storage_ref.put(mp3_uint_arr).then((snapshot)=>{
          this.under_file_upload_subject.next(false);
          return audio_storage_ref.getDownloadURL();
        }).then((firebase_url)=>{
          console.log("uploading file is finished");
          console.log(firebase_url)
          const reference = "event_related/written_debate/" + event_id +
              "/arg_each_content/" + arg_each_content_id;
          const audio_db_item = this.af.database.object(reference);
          const promise = audio_db_item.update({audio_url:firebase_url})
          return promise;
        }).then(()=>{
          console.log("setting firebase url in the database has been finished")
        })
      }
    )
  }

  upload_file_without_encoding(event_id, arg_each_content_id,audio_blob){

    const storage = firebase.storage();
    const storage_ref = storage.ref();
    var file_name = generate_random_string();
    const audio_storage_ref = storage_ref.child("audio/written_debate/" + event_id+ "/" + file_name + ".wav");
    this.under_file_upload_subject.next(true);
    
    audio_storage_ref.put(audio_blob).then((snapshot)=>{
      this.under_file_upload_subject.next(false);
      return audio_storage_ref.getDownloadURL();
    }).then((firebase_url)=>{
      console.log("uploading file is finished");
      console.log(firebase_url)
      const reference = "event_related/written_debate/" + event_id +
          "/arg_each_content/" + arg_each_content_id;

      const audio_db_item = this.af.database.object(reference);
      const promise = audio_db_item.update({audio_url:firebase_url})
      return promise;
    }).then(()=>{
      console.log("setting firebase url in the database has been finished")
    })

  }


  upload_transcription(event_id, arg_each_content_id,transcript_arr){
    
    const reference = "event_related/written_debate/" + event_id +
              "/arg_each_content/" + arg_each_content_id;
    const transcript_db_item = this.af.database.object(reference);
    const promise = transcript_db_item.update({transcript:transcript_arr});
    promise.then(()=>{
      console.log("uploading transcription has been succeeded")
    })
  }


  set_basic_info(event_id, arg_each_content_id,user_id, type){

    const reference = "event_related/written_debate/" + event_id +
              "/arg_each_content/" + arg_each_content_id;
    const basicinfo_db_item = this.af.database.object(reference);
    const promise = basicinfo_db_item.update({writer:user_id, type: type});
    promise.then(()=>{
      console.log("setting basic info has been succeeded");
    })
  }
  upload_opinion(event_id, arg_each_content_id, arg_each_content){

    const reference = "event_related/written_debate/" + event_id +
              "/arg_each_content/" + arg_each_content_id;
    const arg_each_content_db_item = this.af.database.object(reference);
    const promise = arg_each_content_db_item.update({content: arg_each_content});
    promise.then(()=>{
      console.log("uploading opinion succeeded")
    })

  }



  set_opinion_status(event_id, arg_id, arg_each_content_id,type, status = "checking",team_name){

    if(type=="arg"){

      const arg_status_main_reference = "event_related/written_debate/" + event_id + "/arg_status/";
      const main_obj = {arg_each_content_id, status, team_name};
      const arg_status_main_db_item = this.af.database.list(arg_status_main_reference);
      arg_status_main_db_item.push({main:main_obj});

    }else if (type=="refute" || type=="refute_back"){

      const arg_status_subsequent_reference = "event_related/written_debate/" + event_id + "/arg_status/"
                                             + arg_id + "/subsequent/";
      const subsequent_obj = {arg_each_content_id, status, team_name };
      const arg_status_subsequent_db_item = this.af.database.list(arg_status_subsequent_reference);
      arg_status_subsequent_db_item.push(subsequent_obj);

    }

  }

  approve_opinion_status(event_id, arg_id, arg_each_content_id,type = "published", status,team_name){


  }




}


