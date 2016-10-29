import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-preparation-document',
  templateUrl: './preparation-document.component.html',
  styleUrls: ['./preparation-document.component.scss']
})
export class PreparationDocumentComponent implements OnInit, Input, OnChanges {


  @Input() event_id;
  @Input() prep_team;
  @Input() intro_doc;
  @Input() arg_arr;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    for(var i=0; i< this.arg_arr.length; i++){
      this.arg_arr["num"]=i;
    }
  }
    
  

}
