import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss']
})
export class TranscriptionComponent implements OnInit {

  @Input() transcription_arr : string[];


  constructor() { }

  ngOnInit() {
  }

  



}
