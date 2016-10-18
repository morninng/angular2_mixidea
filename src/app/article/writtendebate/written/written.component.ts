import { Component, OnInit, Input,OnChanges,ChangeDetectionStrategy } from '@angular/core';

import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import {CATEGORY_SUBSEQUENT, CATEGORY_MAIN} from './../../../interface/opinion'
import {UPDATE_MAIN_OPINION_Written, UPDATE_SUBSEQUENT_OPINION_Written} from './../../../interface/opinion'


@Component({
  selector: 'app-written',
  templateUrl: './written.component.html',
  styleUrls: ['./written.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrittenComponent implements OnInit, OnChanges {

  @Input() event_id : string;
  @Input() content_arr: string[];
  @Input() argument_id : string;
  @Input() opinion_id : string;
  @Input() comment_sentence_written;
  @Input() category : string;
  @Input() own_team : string;

  content_arr_with_num

  constructor(private route: ActivatedRoute,
              private router: Router) {} 

  ngOnChanges(){

    console.log("written component onchange, with opinion id", this.opinion_id);
    this.comment_sentence_written = this.comment_sentence_written || [];
    this.content_arr = this.content_arr || [];
    this.content_arr_with_num = [];
    for(var i=0; i<this.content_arr.length; i++){
      var obj = this.content_arr[i] || {};
      obj["num"]=i;
      this.content_arr_with_num.push(obj);
    }
  }


  ngOnInit() {
  }

  update_written_opinion(){

    let phase;

    if(this.category == CATEGORY_MAIN){
      phase = UPDATE_MAIN_OPINION_Written;
    }else if(this.category == CATEGORY_SUBSEQUENT){
      phase = UPDATE_SUBSEQUENT_OPINION_Written;
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        phase,
        argument_id: this.argument_id,
        opinion_id: this.opinion_id,
        team_name:this.own_team
      }
    }
    this.router.navigate(['/event/eventcontext/writerecord_opinion',this.event_id], navigationExtras);

  }

}
