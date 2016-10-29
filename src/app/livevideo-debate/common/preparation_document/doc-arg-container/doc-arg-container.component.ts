import { Component, OnInit,Input, OnChanges,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-doc-arg-container',
  templateUrl: './doc-arg-container.component.html',
  styleUrls: ['./doc-arg-container.component.scss']
})
export class DocArgContainerComponent implements OnInit,OnDestroy {

  @Input() event_id;
  @Input() prep_team;
  @Input() arg;
  @Input() arg_num;
  argument_number : number = 0;
  signpost_doc = {};
  arg_context_doc = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.argument_number = Number(this.arg_num) + 1;
    const argument = this.arg|| {}
    this.signpost_doc = argument.signpost || {};
    this.arg_context_doc = argument.main_context || {};

  }

  ngOnDestroy(){
    console.log("doc arg container is destroyed");
  }
}
