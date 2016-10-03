import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-written',
  templateUrl: './written.component.html',
  styleUrls: ['./written.component.scss']
})
export class WrittenComponent implements OnInit {

  @Input() content_arr: string[]


  constructor() { }

  ngOnInit() {
  }

}
