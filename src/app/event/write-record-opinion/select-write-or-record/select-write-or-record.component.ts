import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { UserauthService} from './../../../shared/service/userauth.service';

@Component({
  selector: 'app-select-write-or-record',
  templateUrl: './select-write-or-record.component.html',
  styleUrls: ['./select-write-or-record.component.scss']
})
export class SelectWriteOrRecordComponent implements OnInit {

  @Output() onSelectRecording = new EventEmitter();
  @Output() onSelectWriting = new EventEmitter();

  constructor(private user_auth : UserauthService) { }

  ngOnInit() {
  }

  select_recording(){

    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to start recording argument");
      this.user_auth.open_login_modal();
      return;
    }
    this.onSelectRecording.emit();
  }

  select_writing(){
    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to start writing argument");
      this.user_auth.open_login_modal();
      return;
    }
    this.onSelectWriting.emit();

  }

}
