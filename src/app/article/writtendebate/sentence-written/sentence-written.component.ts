import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sentence-written',
  templateUrl: './sentence-written.component.html',
  styleUrls: ['./sentence-written.component.scss']
})
export class SentenceWrittenComponent implements OnInit {

  @Input() content;

  constructor() { }

  ngOnInit() {
  }

}
