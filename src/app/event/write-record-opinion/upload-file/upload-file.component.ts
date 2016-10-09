import { Component, OnInit,NgZone,ElementRef, Input, OnDestroy } from '@angular/core';
import {RecordWavService} from './../../event-service/record-wav.service';
import {EncodeToMp3Service} from './../../event-service/encode-to-mp3.service'
import {EventFirebaseService} from './../../event-service/event-firebase.service'

import { UserauthService} from './../../../shared/userauth.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  audio_blob;
  under_encoding = false;
  under_uploading = false;
  show_upload_button = false;
  
  @Input() event_id: string;
  @Input() team_name: string;
  @Input() opinion_id: string;
  @Input() arg_id: string;
  @Input() type:string;

  constructor(private record_wav: RecordWavService,
              private encode_to_mp3: EncodeToMp3Service,
               private _ngZone: NgZone,
               private el: ElementRef,
               private event_firebase :EventFirebaseService,
               private user_auth : UserauthService
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
      
    this.event_firebase.under_file_upload_subject.subscribe(
      (value)=>{
        this._ngZone.run(()=>{
          this.under_uploading = value;
        });
      }
    )
  }


  upload_file(){

    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login before uploading the file");
      this.user_auth.open_login_modal();
      return;
    }

//uploading the file after encoding
    if(this.audio_blob){
      this.show_upload_button = false;
      this.under_encoding = true;
      this.encode_to_mp3.encode_wav_to_mp3(this.audio_blob);
      this.event_firebase.upload_file_after_encoding(this.event_id,this.arg_id,this.opinion_id, this.team_name, this.type);
    }
  }

/*
  upload_file_without_encode(){

    if(this.audio_blob){
      this.event_firebase.upload_file_without_encoding(this.event_id,this.arg_id, this.opinion_id,this.audio_blob)
    }
*/




/////////////////// only for test////////////////////
/*
  upload_transcript(){

//uploading the transcription 
    const transcript_sentence_arr = this.store.select('transcript');
    transcript_sentence_arr.take(1).subscribe((state:any[])=>{
      console.log(state);
      const upload_transcript_arr = state.map(
            (transcript)=>{ 
              return {content:transcript.sentence, end_time:transcript.end_time} 
            }
          );
      this.event_firebase.upload_transcription(this.event_id,this.opinion_id, upload_transcript_arr)
    })

//setting the basic info.
    const user_id = this.user_auth.own_user_id;
    const type = "main";  // this is the temporal value. it must be fixed;
    this.event_firebase.set_basic_info(this.event_id, this.opinion_id, user_id, type);
  }
*/

  reset_encode_upload(){
    this.encode_to_mp3.finalize();
  }

  ngOnDestroy(){
    this.encode_to_mp3.finalize();
  }



}
