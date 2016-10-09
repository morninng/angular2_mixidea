import { Component, OnInit,Input, OnChanges} from '@angular/core';
import {EventFirebaseService} from './../../event-service/event-firebase.service'

@Component({
  selector: 'app-arg-signpost',
  templateUrl: './arg-signpost.component.html',
  styleUrls: ['./arg-signpost.component.scss']
})
export class ArgSignpostComponent implements OnInit, OnChanges {

  @Input() type:string
  @Input() event_id:string
  @Input() arg_id:string
  @Input() opinion_id:string

  input_signpost = false;
  show_signpost = false;


  constructor(private event_firebase :EventFirebaseService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.type == "main"){
      this.input_signpost = true;
      this.show_signpost = false;
    }else{
      this.show_signpost = true;
      this.input_signpost = false;
    }
  }

  signpost_update(signpost){
    this.event_firebase.signpost_update(this.event_id, this.arg_id, this.opinion_id, signpost);
 
  }


}
