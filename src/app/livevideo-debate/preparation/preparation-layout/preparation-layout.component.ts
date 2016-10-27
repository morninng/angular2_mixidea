import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preparation-layout',
  templateUrl: './preparation-layout.component.html',
  styleUrls: ['./preparation-layout.component.scss']
})
export class PreparationLayoutComponent implements OnInit, Input {

  @Input() event_id;
  
  constructor() { }

  ngOnInit() {
  }

}
