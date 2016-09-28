import { Component, OnInit,Input } from '@angular/core';
import {UploadToFirebaseService} from './../service/upload-to-firebase.service'

@Component({
  selector: 'app-write-argument',
  templateUrl: './write-argument.component.html',
  styleUrls: ['./write-argument.component.scss']
})
export class WriteOpinionComponent implements OnInit {


  @Input() event_id: string;
  @Input() team_name: string;
  @Input() arg_each_content_id: string;

  constructor(private upload_firebase :UploadToFirebaseService) { }

  ngOnInit() {
  }


  upload_opinion(text){

    const section_arr = text.split("\n\n");
    const upload_arg_each_content = section_arr.map((value)=>{return {content:value}});
    console.log(upload_arg_each_content)

    this.upload_firebase.upload_opinion(this.event_id, this.arg_each_content_id, upload_arg_each_content);

   this.upload_firebase.set_opinion_status(this.event_id, "dummy_arg_id", this.arg_each_content_id,"arg", "checking",this.team_name);


  }

}
