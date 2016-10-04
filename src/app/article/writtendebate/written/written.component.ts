import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-written',
  templateUrl: './written.component.html',
  styleUrls: ['./written.component.scss']
})
export class WrittenComponent implements OnInit {

  @Input() event_id : string;
  @Input() content_arr: string[];
  @Input() argument_id : string;
  @Input() opinion_id : string;


  constructor() { }

  ngOnInit() {
    if(this.content_arr){
      this.content_arr.forEach(
        function(current, index, array){
          var obj = array[index];
          obj["num"]=index;
          array[index]=obj;
        }
      )
    }
    console.log(this.content_arr);
  }



}
