import { Component, OnInit,Input } from '@angular/core';
import {UploadToFirebaseService} from './../service/upload-to-firebase.service'

@Component({
  selector: 'app-write-opinion',
  templateUrl: './write-opinion.component.html',
  styleUrls: ['./write-opinion.component.scss']
})
export class WriteOpinionComponent implements OnInit {


  @Input() event_id: string;
  @Input() team_name: string;
  @Input() opinion_id: string;
  @Input() arg_id: string;

  constructor(private upload_firebase :UploadToFirebaseService) { }

  ngOnInit() {
  }


  upload_opinion(text){

    const section_arr = text.split("\n\n");
    const upload_opinion = section_arr.map((value)=>{return {content:value}});
    console.log(upload_opinion)

    this.upload_firebase.upload_opinion_content(this.event_id,this.arg_id, this.opinion_id, upload_opinion);

   this.upload_firebase.set_opinion_status(this.event_id, this.arg_id, this.opinion_id,"main", "checking",this.team_name);


  }

}
