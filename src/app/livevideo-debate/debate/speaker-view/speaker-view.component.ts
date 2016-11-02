import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-speaker-view',
  templateUrl: './speaker-view.component.html',
  styleUrls: ['./speaker-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakerViewComponent implements OnInit {

  @Input() event_id;
  @Input() debate_status;
  @Input() main_speaker;
  @Input() poi_speaker;
  @Input() poi_candidates;
  @Input() video_data;

  constructor() { }

  ngOnInit() {
  }

}
