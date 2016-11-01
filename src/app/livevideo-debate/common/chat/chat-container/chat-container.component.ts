import { Component, OnInit, Input,OnDestroy, OnChanges } from '@angular/core';
import { AngularFire ,FirebaseListObservable} from 'angularfire2';
import {LiveDebateFirebaseService} from './../../../service/live-debate-firebase.service';

import { UserauthService} from './../../../../core/service/userauth.service';


@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private af: AngularFire, 
              private livedebate_firebase: LiveDebateFirebaseService,
              private user_auth : UserauthService) { }

  @Input() game_status;
  @Input() current_own_team;
  @Input() event_id;

  main_chat_subscription;
  main_chat_item : FirebaseListObservable<any>;
  team_chat_subscription;
  team_chat_item;
  own_team = null;
  chat_message;

  displayed_chat_status = "main";
  is_in_team = false;

  chat_inpput_text = null;

  ngOnInit() {

    this.main_chat_item = this.af.database.list('/event_related/event_chat/' + this.event_id + '/main');
    this.main_chat_subscription = this.main_chat_item.subscribe(()=>{
      console.log("new item main");
    })
  }

  ngOnChanges(){

    const updated_own_team = this.current_own_team[0];
    if(updated_own_team){
      this.is_in_team = true;
    }else{
      this.is_in_team = false; 
    }

    if(updated_own_team == this.own_team){
      return;
    }
    this.own_team = updated_own_team;
    console.log("own_team", this.own_team);

    if(this.team_chat_subscription){
      this.team_chat_subscription.unsubscribe();
    }

    this.team_chat_item = this.af.database.list('/event_related/event_chat/' + this.event_id + '/' + updated_own_team);
    this.team_chat_subscription = this.team_chat_item.subscribe(()=>{
      console.log("new item team")
    });

  }

  send_chat(){
    console.log(this.chat_inpput_text);
    if(!this.chat_inpput_text || this.chat_inpput_text==""){
      return;
    }

    if(this.displayed_chat_status == "main"){
      this.livedebate_firebase.send_chat(this.event_id , "main",
                                        this.user_auth.own_user.id , this.chat_inpput_text );
    }else if(this.displayed_chat_status == "team"){
      this.livedebate_firebase.send_chat(this.event_id , this.own_team,
                                        this.user_auth.own_user.id , this.chat_inpput_text );
    }

    this.chat_inpput_text = null;
  }

  show_team_chat(){
    console.log("switch to team chat");
    this.displayed_chat_status = "team";

  }
  show_main_chat(){
    console.log("switch to main chat");
    this.displayed_chat_status = "main";
  }


  ngOnDestroy(){
    this.main_chat_subscription.unsubscribe();
    this.team_chat_subscription.unsubscribe();
  }

}
