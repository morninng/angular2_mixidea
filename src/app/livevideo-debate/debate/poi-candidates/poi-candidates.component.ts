import { Component, OnInit,Input, OnDestroy, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

@Component({
  selector: 'app-poi-candidates',
  templateUrl: './poi-candidates.component.html',
  styleUrls: ['./poi-candidates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoiCandidatesComponent implements OnInit, OnDestroy, OnChanges {


  @Input() event_id;
  @Input() poi_candidates_id_arr;

  constructor(private livedebate_firebase: LiveDebateFirebaseService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log("poi candidate on changes", this.poi_candidates_id_arr)
    this.poi_candidates_id_arr = this.poi_candidates_id_arr || [];

  }



  ngOnDestroy(){
    console.log("poi candidates component is destroyed");
  }


}
