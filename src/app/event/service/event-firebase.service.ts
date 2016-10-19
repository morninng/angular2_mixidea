import { Injectable, Inject } from '@angular/core';
import {EncodeToMp3Service} from './encode-to-mp3.service'
import { BehaviorSubject } from 'rxjs';
import {generate_random_string} from './../../util_func';
import {AngularFire} from 'angularfire2';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { UserauthService} from './../../core/service/userauth.service';

import {CATEGORY_MAIN, CATEGORY_SUBSEQUENT} from './../../interface/opinion';

import {CREATE_MAIN_OPINION, 
        ADD_SUBSEQUENT_OPINION, 
        UPDATE_MAIN_OPINION_Written, 
        UPDATE_MAIN_OPINION_AudioTranscript,
        UPDATE_SUBSEQUENT_OPINION_Written,
        UPDATE_SUBSEQUENT_OPINION_AudioTranscript} from './../../interface/opinion'

//declare var firebase: any;

@Injectable()
export class EventFirebaseService {

  under_file_upload_subject = new BehaviorSubject(false);
  storage_ref : any;

  constructor(private encode_to_mp3: EncodeToMp3Service,
              private af: AngularFire,
              private user_auth : UserauthService,
              public store: Store<any> ) {
    
    var config = {
      apiKey: "AIzaSyBp_ZDqoPygbPs7jMclrBSJ3a99t1Yvr1k",
      authDomain: "mixidea-91a20.firebaseapp.com",
      databaseURL: "https://mixidea-91a20.firebaseio.com",
      storageBucket: "mixidea-91a20.appspot.com",
      messagingSenderId: "46563705700"
    };
    firebase.initializeApp(config);
    this.storage_ref = firebase.storage().ref();
    console.log("firebase storage is initialized");

  }

  upload_file_after_encoding(event_id, arg_id, opinion_id, team_name,  phase){

    var file_name = generate_random_string();

    this.encode_to_mp3.encode_done$.take(1).subscribe(
      (mp3_uint_arr)=>{
        console.log("encode_to_mps callback is called");
        const audio_storage_ref = this.storage_ref.child("audio/written_debate/" + event_id + "/" + file_name + ".mp3");
        this.under_file_upload_subject.next(true);

        audio_storage_ref.put(mp3_uint_arr).then((snapshot)=>{
          this.under_file_upload_subject.next(false);
          return audio_storage_ref.getDownloadURL();
        }).then((firebase_url)=>{
          console.log("uploading file is finished");
          console.log(firebase_url)
          const reference = "event_related/written_debate/" + event_id + "/opinion/" + arg_id + "/" +  opinion_id + "/audio_url";
          const audio_db_item = this.af.database.object(reference);
          const promise = audio_db_item.set(firebase_url)
          return promise;
        }).then(()=>{
          console.log("setting firebase url in the database has been finished")
          //after the file upload and url setting is done, remained information is set.
          this.retrieve_upload_transcription(event_id, arg_id, opinion_id);

          switch(phase){
            case CREATE_MAIN_OPINION:
              this.set_arg_status(event_id, arg_id, opinion_id, CATEGORY_MAIN, "checking", team_name);
              this.set_user_info(event_id, arg_id, opinion_id);
              this.set_signpost(event_id, arg_id, opinion_id);
            break;

            case UPDATE_MAIN_OPINION_AudioTranscript:
              this.set_signpost(event_id, arg_id, opinion_id);
            break;

            case ADD_SUBSEQUENT_OPINION:
              this.set_arg_status(event_id, arg_id, opinion_id, CATEGORY_SUBSEQUENT, "checking", team_name);
              this.set_user_info(event_id, arg_id, opinion_id);
            break;

            case UPDATE_SUBSEQUENT_OPINION_AudioTranscript:
            break;
          }

        })
      }
    )
  }


  retrieve_upload_transcription(event_id,arg_id,opinion_id){
      const transcript_sentence_arr = this.store.select('transcript');
      transcript_sentence_arr.take(1).subscribe((state:any[])=>{
        console.log(state);
        const upload_transcript_arr = state.map(
              (transcript)=>{ 
                return {content:transcript.sentence, end_time:transcript.end_time} 
              }
            );
        this.upload_transcription(event_id,arg_id,opinion_id, upload_transcript_arr)
      })
  }

  upload_transcription(event_id, arg_id, opinion_id,transcript_arr){
    
    const reference = "event_related/written_debate/" + event_id +  "/opinion/" + arg_id + "/" + opinion_id + "/transcript";
    const transcript_db_item = this.af.database.object(reference);
    const promise = transcript_db_item.set(transcript_arr);
    promise.then(()=>{
      console.log("uploading transcription has been succeeded")
    })
  }


  set_user_info(event_id, arg_id, opinion_id){

    const user_id = this.user_auth.own_user_id;

    const reference = "event_related/written_debate/" + event_id + "/opinion/" + arg_id + "/" + opinion_id;
    const basicinfo_db_item = this.af.database.object(reference);
    const promise = basicinfo_db_item.update({writer:user_id});
    promise.then(()=>{
      console.log("setting basic info has been succeeded");
    })
  }

  upload_opinion_content(event_id, arg_id, opinion_id, phase, team_name, opinion_content_arr){

    const reference = "event_related/written_debate/" + event_id + "/opinion/"  + arg_id + "/" + opinion_id + "/content_arr";
    const opinion_db_item = this.af.database.object(reference);
    const promise = opinion_db_item.set(opinion_content_arr);
    promise.then(()=>{

      switch(phase){
        case CREATE_MAIN_OPINION:
          this.set_arg_status(event_id, arg_id, opinion_id, CATEGORY_MAIN, "checking", team_name);
          this.set_user_info(event_id, arg_id, opinion_id);
          this.set_signpost(event_id, arg_id, opinion_id);
        break;
        case UPDATE_MAIN_OPINION_Written:
          this.set_signpost(event_id, arg_id, opinion_id);
        break;

        case ADD_SUBSEQUENT_OPINION:
          this.set_arg_status(event_id, arg_id, opinion_id, CATEGORY_SUBSEQUENT, "checking", team_name);
          this.set_user_info(event_id, arg_id, opinion_id);

        break;
        case UPDATE_SUBSEQUENT_OPINION_Written:
        break;
      }


    })
  }


  set_arg_status(event_id, arg_id, opinion_id,category, status,team_name){
    if(category==CATEGORY_MAIN){
      const arg_status_main_reference = "event_related/written_debate/" + event_id + "/arg_status/" + arg_id + "/" + CATEGORY_MAIN ;
      const main_obj = {opinion_id, status, team_name};
      const arg_status_main_db_item = this.af.database.object(arg_status_main_reference);
      arg_status_main_db_item.set(main_obj);
    }else if (category==CATEGORY_SUBSEQUENT){
      const arg_status_subsequent_reference = "event_related/written_debate/" + event_id + "/arg_status/" + arg_id + "/" + CATEGORY_SUBSEQUENT;
      const subsequent_obj = {opinion_id, status, team_name };
      const arg_status_subsequent_db_item = this.af.database.list(arg_status_subsequent_reference);
      arg_status_subsequent_db_item.push(subsequent_obj);
    }
  }

  signpost_stock = {};

  signpost_update(event_id,arg_id,opinion_id,signpost){
    console.log(event_id,arg_id,signpost);
    this.signpost_stock[event_id] = this.signpost_stock[event_id] || {};
    this.signpost_stock[event_id][arg_id] = this.signpost_stock[event_id][arg_id] || {};
    this.signpost_stock[event_id][arg_id][opinion_id] = signpost;
  }

  set_signpost(event_id,arg_id, opinion_id){
    if(this.signpost_stock[event_id] && 
      this.signpost_stock[event_id][arg_id] && 
      this.signpost_stock[event_id][arg_id][opinion_id]){
      const signpost = this.signpost_stock[event_id][arg_id][opinion_id];
      console.log(signpost);

      const reference = "event_related/written_debate/" + event_id 
                         + "/opinion/" + arg_id
                         + "/" + opinion_id
                        + "/sign_post";
      const signpost_item = this.af.database.object(reference);
      const promise = signpost_item.set(signpost);
      promise.then(()=>{
        this.signpost_stock[event_id][arg_id][opinion_id] = null;
      })
    }
  }


}


