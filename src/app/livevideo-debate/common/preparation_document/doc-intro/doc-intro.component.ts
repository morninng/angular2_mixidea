import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {LiveDebateFirebaseService} from './../../../service/live-debate-firebase.service';


import { UserauthService} from './../../../../core/service/userauth.service';

@Component({
  selector: 'app-doc-intro',
  templateUrl: './doc-intro.component.html',
  styleUrls: ['./doc-intro.component.scss']
})
export class DocIntroComponent implements OnInit, OnDestroy {

  @Input() event_id;
  @Input() team_name;

  constructor(private livedebate_firebase: LiveDebateFirebaseService,
              private user_auth : UserauthService) { }

  ngOnInit() {
  }

  text_focused(){
    console.log("focused");
    this.livedebate_firebase.set_prepdoc_intro_start_edit(this.event_id, this.team_name, this.user_auth.own_user.id);
  }

  text_blured(){
    console.log("blured");
    this.livedebate_firebase.set_prepdoc_intro_finish_edit(this.event_id, this.team_name, this.user_auth.own_user.id );

  }

  ngOnDestroy(){

  }

}
