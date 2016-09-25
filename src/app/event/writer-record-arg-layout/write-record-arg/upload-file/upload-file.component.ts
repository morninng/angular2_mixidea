import { Component, OnInit,NgZone,ElementRef, Input } from '@angular/core';
import {RecordWavService} from './../service/record-wav.service';
import {EncodeToMp3Service} from './../service/encode-to-mp3.service'
import {UploadToFirebaseService} from './../service/upload-to-firebase.service'

import {generate_id} from './../../../../util_func';

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


  upload_file(){

    const arg_each_content_id = generate_id();

    if(this.audio_blob){
      this.show_upload_button = false;
      this.under_encoding = true;
      this.encode_to_mp3.encode_wav_to_mp3(this.audio_blob);
      this.upload_firebase.upload_file_after_encoding(this.event_id,arg_each_content_id, this.team_name);
    }
  }



}
