import { Component, OnInit, Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sentence-transcription',
  templateUrl: './sentence-transcription.component.html',
  styleUrls: ['./sentence-transcription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentenceTranscriptionComponent implements OnInit {

  @Input() transcript 


  constructor() { }

  ngOnInit() {
  }

}
