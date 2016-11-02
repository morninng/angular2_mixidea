import { Component, OnInit, Input, OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

@Component({
  selector: 'app-poi-candidate-each',
  templateUrl: './poi-candidate-each.component.html',
  styleUrls: ['./poi-candidate-each.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoiCandidateEachComponent implements OnInit, OnDestroy {

  @Input() event_id;
  @Input() poi_candidate_user_id;

  constructor(private livedebate_firebase: LiveDebateFirebaseService) { }



  ngOnInit() {
  }


  take_poi(){
    console.log(this.poi_candidate_user_id);
    this.livedebate_firebase.remove_all_poi_candidates(this.event_id);

    const poi_speaker_obj = {
      user_id : this.poi_candidate_user_id
    }

    this.livedebate_firebase.take_poi(this.event_id, poi_speaker_obj);
  }

  ngOnDestroy(){
    console.log(" poi_candidate_user_id component destroyed with id: ", this.poi_candidate_user_id)
  }


}
