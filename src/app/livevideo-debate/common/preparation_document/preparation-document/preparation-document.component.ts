import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preparation-document',
  templateUrl: './preparation-document.component.html',
  styleUrls: ['./preparation-document.component.scss']
})
export class PreparationDocumentComponent implements OnInit, Input {


  @Input() event_id;
  @Input() prep_team;

  constructor() { }

  ngOnInit() {
  }

}
