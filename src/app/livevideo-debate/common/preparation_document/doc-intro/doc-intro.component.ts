import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {LiveDebateFirebaseService} from './../../../service/live-debate-firebase.service';


import { UserauthService} from './../../../../core/service/userauth.service';

import {Subject} from 'rxjs';


@Component({
  selector: 'app-doc-intro',
  templateUrl: './doc-intro.component.html',
  styleUrls: ['./doc-intro.component.scss']
})
export class DocIntroComponent implements OnInit, OnDestroy {

  @Input() event_id;
  @Input() prep_team;
  @Input() intro_doc;
  editors = [];

  text_keyup = new Subject<any>();
  intro_text = "";

  constructor(private livedebate_firebase: LiveDebateFirebaseService,
              private user_auth : UserauthService) { }

  ngOnInit() {

    const text_input_source = this.text_keyup.debounceTime(400);
    text_input_source.subscribe(
      ()=>{
        console.log(this.intro_text);
        this.livedebate_firebase.save_prepdoc_introduction(this.event_id, this.prep_team,this.intro_text);
      })

  }

  ngOnChanges(){
    this.editors = this.intro_doc.editor || [];
    console.log("editor", this.editors);
    this.intro_text = this.intro_doc.context || "";

  }





  text_focused(){
    console.log("focused");
    this.livedebate_firebase.set_prepdoc_intro_start_edit(this.event_id, this.prep_team, this.user_auth.own_user.id);
  }

  text_blured(){
    console.log("blured");
    this.livedebate_firebase.set_prepdoc_intro_finish_edit(this.event_id, this.prep_team, this.user_auth.own_user.id );

  }

  ngOnDestroy(){

  }

}
