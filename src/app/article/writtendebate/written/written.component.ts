import { Component, OnInit, Input,OnChanges,ChangeDetectionStrategy } from '@angular/core';

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

  content_arr_with_num

  constructor() {} 

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



}
