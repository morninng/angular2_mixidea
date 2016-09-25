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
    this.encode_to_mp3.encode_done$.subscribe(
      (mp3_uint_arr)=>{
        console.log("aaa");
        const storage = firebase.storage();
        const storage_ref = storage.ref();
        var file_name = generate_random_string();
        const audio_storage_ref = storage_ref.child("audio/written_debate/" + event_id + file_name + ".mp3");
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

  upload_file_without_encoding(){

  }

  upload_transcription(){


  }

}


