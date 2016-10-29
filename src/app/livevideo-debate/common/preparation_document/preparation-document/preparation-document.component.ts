import { Component, OnInit, Input, OnChanges,OnDestroy } from '@angular/core';
import {LiveDebateFirebaseService} from './../../../service/live-debate-firebase.service';

@Component({
  selector: 'app-preparation-document',
  templateUrl: './preparation-document.component.html',
  styleUrls: ['./preparation-document.component.scss']
})
export class PreparationDocumentComponent implements OnInit, Input, OnChanges,OnDestroy {


  @Input() event_id;
  @Input() prep_team;
  @Input() intro_doc;
  @Input() arg_obj;

  number_of_argument : number;
  num_arr = [];

  constructor(private livedebate_firebase: LiveDebateFirebaseService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.number_of_argument = 0;
    this.num_arr.length=0;
    console.log("ng on change :praparation document " );
    for(var key in this.arg_obj){
      this.num_arr.push(this.number_of_argument);
      this.number_of_argument++;
    }
  }

  add_new_argument(){
    console.log("");
    this.livedebate_firebase.save_prepdoc_arg_context(this.event_id, this.prep_team,this.number_of_argument, " " );

  }
  
  ngOnDestroy(){
    console.log("preparation document is destroyed ");

  }

}
