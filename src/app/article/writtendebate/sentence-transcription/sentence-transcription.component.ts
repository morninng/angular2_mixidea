import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sentence-transcription',
  templateUrl: './sentence-transcription.component.html',
  styleUrls: ['./sentence-transcription.component.scss']
})
export class SentenceTranscriptionComponent implements OnInit {

  @Input() transcript 


  constructor() { }

  ngOnInit() {
  }

}
