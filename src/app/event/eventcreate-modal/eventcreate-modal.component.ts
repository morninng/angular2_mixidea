import { Component, OnInit , ViewChild, Input} from '@angular/core';
import { UserauthService} from './../../shared/service/userauth.service';

import { ModalDirective } from './../../../../node_modules/ng2-bootstrap/components/modal/modal.component';
import {DatepickerModule} from './../../../../node_modules/ng2-bootstrap/components/datepicker';
import {TimepickerModule} from './../../../../node_modules/ng2-bootstrap/components/timepicker';
import {Event, ONLINE_DEBATE_LIVEVIDEO, ONLINE_DEBATE_WRITTEN, ONLINE_TOURNAMENT_LIVEVIDEO, ONLINE_TOURNAMENT_WRITTEN} from './../event'
import {FormsModule} from '@angular/forms';
import {AngularFire} from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventcreate-modal',
  templateUrl: './eventcreate-modal.component.html',
  styleUrls: ['./eventcreate-modal.component.scss']
})
export class EventcreateModalComponent implements OnInit {

  submitted = false;
  event_obj = new Event();

  constructor(private af: AngularFire, private router: Router, private user_auth : UserauthService) { }

  @ViewChild(ModalDirective) event_create_modal:ModalDirective;

  ngOnInit() {
  }


  open_modal(){
    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to create a game");
      this.user_auth.open_login_modal();
    }else{
      console.log("open modal");
      this.event_create_modal.show();
    }
  }

  onSubmit(){
    this.submitted = true;
    this.event_obj.compute_date_time()
  }

  close_modal(){
    this.event_create_modal.hide();
  }

  fix_data(){
    this.submitted = false;
  }

  save_data(){

    let event_save_data = null;

    switch(this.event_obj.type){
     case ONLINE_DEBATE_LIVEVIDEO :
      //will be implemented
     break;
     case  ONLINE_DEBATE_WRITTEN :
      event_save_data = {
        type: this.event_obj.type,
        title: this.event_obj.title,
        date_time_start: this.event_obj.event_date_time_start,
        date_time_finish: this.event_obj.event_date_time_finish,
        duration: this.event_obj.duration,
        created_by: this.user_auth.own_user_id
      };
     break;
     case  ONLINE_TOURNAMENT_LIVEVIDEO :
      //will be implemented
     break;
     case ONLINE_TOURNAMENT_WRITTEN :
      //will be implemented
     break;
     default:
      return;
    }


    const event_items = this.af.database.list('/event_related/event');
    const promise = event_items.push(event_save_data);
    promise
      .then(()=>{
          alert("saving data success");
          this.event_create_modal.hide();
          // goto event page;
          this.router.navigate(['/articlelist']);
        })
      .catch((err)=>{
        console.log("error to save data to firebase", err)
        alert("fail to save data ");
      })
  }

  finsh_event_creation(){    
  }


}
