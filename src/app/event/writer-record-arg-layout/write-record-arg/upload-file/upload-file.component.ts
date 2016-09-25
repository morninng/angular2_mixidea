import { Component, OnInit,NgZone,ElementRef, Input } from '@angular/core';
import {RecordWavService} from './../service/record-wav.service';
import {EncodeToMp3Service} from './../service/encode-to-mp3.service'
import {UploadToFirebaseService} from './../service/upload-to-firebase.service'


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  audio_blob;
  under_encoding = false;
  under_uploading = false;
  show_upload_button = false;
  
  @Input() event_id: string;
  @Input() team_name: string;

  constructor(private record_wav: RecordWavService,
              private encode_to_mp3: EncodeToMp3Service,
               private _ngZone: NgZone,
               private el: ElementRef,
               private upload_firebase :UploadToFirebaseService
               ) {}

  ngOnInit() {
    console.log("upload file component", this.event_id);

    this.record_wav.audio_source$.subscribe(
      (audio_blob)=>{
        this.audio_blob = audio_blob;
        this.show_upload_button = true;
      }
    )

    this.encode_to_mp3.under_encoding_subject.subscribe(
      (value)=>{
        this._ngZone.run(()=>{
          this.under_encoding = value;
        });
      }
    );
      
    this.upload_firebase.under_file_upload_subject.subscribe(
      (value)=>{
        this._ngZone.run(()=>{
          this.under_uploading = value;
        });
      }
    )

  }

/*
/////temporal implementation before the Angularfire2 storage is developed.////////////////////////////////////
*/
/*
    var config = {
      apiKey: "AIzaSyBp_ZDqoPygbPs7jMclrBSJ3a99t1Yvr1k",
      authDomain: "mixidea-91a20.firebaseapp.com",
      databaseURL: "https://mixidea-91a20.firebaseio.com",
      storageBucket: "mixidea-91a20.appspot.com"
    };
    firebase.initializeApp(config);
*/
////////////temporal implementation//////////////////////////////////////////////////////

/*
    this.encode_to_mp3.under_encoding_subject.subscribe(
      (mp3_uint_arr)=>{
        /*
        console.log("aaa");
        const storage = firebase.storage();
        const storage_ref = storage.ref();
        const audio_ref = storage_ref.child("audio/aaa.mp3");
        */
/*
        this._ngZone.run(()=>{
          this.under_encoding = false;
          this.under_uploading = true;
        });

      });
      */
/*
        audio_ref.put(mp3_uint_arr).then((snapshot)=>{
          console.log("upload finished");
          this._ngZone.run(()=>{
            this.under_uploading = false;
          });
          return audio_ref.getDownloadURL();
        }).then((firebase_url)=>{
          console.log(firebase_url);
          alert("uploading file is finished" + firebase_url);

        })

      }
    )

*/

  upload_file(){
    if(this.audio_blob){
      this.show_upload_button = false;
      this.under_encoding = true;
      this.encode_to_mp3.encode_wav_to_mp3(this.audio_blob);
      this.upload_firebase.upload_file_after_encoding(this.event_id, this.team_name);
    }
  }



}
