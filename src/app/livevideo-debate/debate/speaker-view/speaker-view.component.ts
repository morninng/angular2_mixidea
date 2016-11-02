import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';


import {DEBATE_STATUS_WAITING, 
      DEBATE_STATUS_SPEECH_MAIN_SPEAKER, 
      DEBATE_STATUS_SPEECH_POI} from './../../interface-livedebate/status'


@Component({
  selector: 'app-speaker-view',
  templateUrl: './speaker-view.component.html',
  styleUrls: ['./speaker-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakerViewComponent implements OnInit {

  @Input() event_id;
  @Input() debate_status;
  @Input() main_speaker_id;
  @Input() poi_speaker_id;
  @Input() poi_candidates_id_arr;
  @Input() video_data;


  main_speaker_team_side="left";

  DEBATE_STATUS_WAITING = DEBATE_STATUS_WAITING;
  DEBATE_STATUS_SPEECH_MAIN_SPEAKER = DEBATE_STATUS_SPEECH_MAIN_SPEAKER;
  DEBATE_STATUS_SPEECH_POI = DEBATE_STATUS_SPEECH_POI;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){


  }




}
