import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {LiveDebateFirebaseService} from './../../../service/live-debate-firebase.service';

@Component({
  selector: 'app-preparation-document',
  templateUrl: './preparation-document.component.html',
  styleUrls: ['./preparation-document.component.scss']
})
export class PreparationDocumentComponent implements OnInit, Input, OnChanges {


  @Input() event_id;
  @Input() prep_team;
  @Input() intro_doc;
  @Input() arg_obj;

  number_of_argument : number;

  constructor(private livedebate_firebase: LiveDebateFirebaseService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.number_of_argument = 0;
    for(var key in this.arg_obj){
      this.arg_obj[key]["num"]=this.number_of_argument;
       this.number_of_argument++;
    }
  }

  add_new_argument(){
    console.log("");
    this.livedebate_firebase.save_prepdoc_arg_context(this.event_id, this.prep_team,this.number_of_argument, " " );

  }
  

}
