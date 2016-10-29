import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-doc-arg-context',
  templateUrl: './doc-arg-context.component.html',
  styleUrls: ['./doc-arg-context.component.scss']
})
export class DocArgContextComponent implements OnInit {

  @Input() event_id;
  @Input() prep_team;
  @Input() arg_num;
  @Input() arg_context_doc;
  
  constructor() { }

  ngOnInit() {
  }

}
