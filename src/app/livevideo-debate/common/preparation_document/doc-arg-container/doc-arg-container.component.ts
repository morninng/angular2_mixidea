import { Component, OnInit,Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-doc-arg-container',
  templateUrl: './doc-arg-container.component.html',
  styleUrls: ['./doc-arg-container.component.scss']
})
export class DocArgContainerComponent implements OnInit {

  @Input() event_id;
  @Input() prep_team;
  @Input() arg;
  @Input() arg_num;
  argument_number : number = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.argument_number = Number(this.arg_num) + 1;

  }

}
