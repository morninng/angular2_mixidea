import { Component, OnInit,Input } from '@angular/core';
import {LiveDebateFirebaseService} from './../../../service/live-debate-firebase.service';

import { UserauthService} from './../../../../core/service/userauth.service';

import {Subject} from 'rxjs';


@Component({
  selector: 'app-doc-arg-context',
  templateUrl: './doc-arg-context.component.html',
  styleUrls: ['./doc-arg-context.component.scss']
})
export class DocArgContextComponent implements OnInit {

  @Input() event_id;
  @Input() prep_team;
  @Input() arg_num;
  @Input() arg_context_doc;
  editors = [];

  text_keyup = new Subject<any>();

  arg_context_text = "";

  constructor(private livedebate_firebase: LiveDebateFirebaseService,
              private user_auth : UserauthService) { }

  ngOnInit() {

    const text_input_source = this.text_keyup.debounceTime(400);
    text_input_source.subscribe(
      ()=>{
        console.log("argument context update subscribe", this.arg_context_text);
        this.livedebate_firebase.save_prepdoc_arg_context(this.event_id, this.prep_team,this.arg_num, this.arg_context_text);
      })
  }


  ngOnChanges(){
    this.editors = this.arg_context_doc.editor || [];
    console.log("argcontext_component ng on changes  arg_num", this.arg_num);
    this.arg_context_text = this.arg_context_doc.text || ""; 
  }


  text_focused(){
    console.log("focused");
    this.livedebate_firebase.set_prepdoc_arg_context_start_edit(this.event_id, this.prep_team,this.arg_num, this.user_auth.own_user.id);
  }

  text_blured(){
    console.log("blured");
    this.livedebate_firebase.set_prepdoc_arg_context_finish_edit(this.event_id, this.prep_team,this.arg_num, this.user_auth.own_user.id );
  }

  ngOnDestroy(){
    console.log("doc arg context is destroyed",  this.arg_num);
  }

}
