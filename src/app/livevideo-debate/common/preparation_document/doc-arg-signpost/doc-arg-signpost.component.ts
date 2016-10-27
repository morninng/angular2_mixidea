import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-doc-arg-signpost',
  templateUrl: './doc-arg-signpost.component.html',
  styleUrls: ['./doc-arg-signpost.component.scss']
})
export class DocArgSignpostComponent implements OnInit {
  @Input() event_id;
  constructor() { }

  ngOnInit() {
  }

}
