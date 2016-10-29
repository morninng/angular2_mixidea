import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import {LiveDebateFirebaseService} from './../../../service/live-debate-firebase.service';

import { UserauthService} from './../../../../core/service/userauth.service';

import {Subject} from 'rxjs';


@Component({
  selector: 'app-doc-arg-signpost',
  templateUrl: './doc-arg-signpost.component.html',
  styleUrls: ['./doc-arg-signpost.component.scss']
})
export class DocArgSignpostComponent implements OnInit, OnDestroy {

  @Input() event_id;
  @Input() prep_team;
  @Input() arg_num;
  @Input() signpost_doc;
  editors = [];

  text_keyup = new Subject<any>();

  signpost_text = "";

  constructor(private livedebate_firebase: LiveDebateFirebaseService,
              private user_auth : UserauthService) { }

  ngOnInit() {

    const text_input_source = this.text_keyup.debounceTime(400);
    text_input_source.subscribe(
      ()=>{
        console.log("signpost update subscribe", this.signpost_text);
        this.livedebate_firebase.save_prepdoc_arg_signpost(this.event_id, this.prep_team,this.arg_num, this.signpost_text);
      })

  }

  ngOnChanges(){
    this.editors = this.signpost_doc.editor || [];
    console.log("signpost_component ng on changes  arg_num", this.arg_num);
    this.signpost_text = this.signpost_doc.text || ""; 
  }


  text_focused(){
    console.log("focused");
    this.livedebate_firebase.set_prepdoc_arg_signpost_start_edit(this.event_id, this.prep_team,this.arg_num, this.user_auth.own_user.id);
  }

  text_blured(){
    console.log("blured");
    this.livedebate_firebase.set_prepdoc_arg_signpost_finish_edit(this.event_id, this.prep_team,this.arg_num, this.user_auth.own_user.id );
  }

  ngOnDestroy(){
    console.log("doc arg sign post is destroyed",  this.arg_num);
  }

}
