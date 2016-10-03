import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sentence-written',
  templateUrl: './sentence-written.component.html',
  styleUrls: ['./sentence-written.component.scss']
})
export class SentenceWrittenComponent implements OnInit {

  show_balloon : boolean;
  @Input() content;


  constructor() { }

  ngOnInit() {
  }

  content_mouseenter(){
    this.show_balloon = true;
  }
  content_mouseleave(){
    this.show_balloon = false;
  }

  open_sentence_comment(){
    console.log("open_sentence_comment");
  }

}
