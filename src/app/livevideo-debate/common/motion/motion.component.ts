import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

@Component({
  selector: 'app-motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.scss']
})
export class MotionComponent implements OnInit, OnChanges {

  @Input() motion;
  @Input() event_id;

  uner_editing = false;
  current_motion;
  input_motion = "";

  constructor(private livedebate_firebase: LiveDebateFirebaseService,) { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log("motion in onchanges", this.motion);
    if(this.input_motion != this.motion){
      this.uner_editing = false;
    }
    this.input_motion = this.motion;
  }

  save_motion(){
    this.livedebate_firebase.save_motion(this.event_id, this.input_motion);
    this.uner_editing = false;
  }

  edit_start(){
    this.uner_editing = true;

  }
}
