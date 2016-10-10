import { Component, OnInit, Input,ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sentence-transcription',
  templateUrl: './sentence-transcription.component.html',
  styleUrls: ['./sentence-transcription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentenceTranscriptionComponent implements OnInit,OnChanges {

  @Input() transcript 
  @Input() audio_play_time
  under_playing = false;

  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(){

    console.log("sentence transcription audio time update", this.audio_play_time);
    if(this.transcript.start_time < this.audio_play_time && this.audio_play_time < this.transcript.end_time){
      this.under_playing = true;
    }else{
      this.under_playing = false;
    }

  }

}
