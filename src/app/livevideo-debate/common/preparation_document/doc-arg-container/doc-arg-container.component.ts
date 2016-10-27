import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-doc-arg-container',
  templateUrl: './doc-arg-container.component.html',
  styleUrls: ['./doc-arg-container.component.scss']
})
export class DocArgContainerComponent implements OnInit {

  @Input() event_id;
  @Input() prep_team;

  constructor() { }

  ngOnInit() {
  }

}
