import { Component, OnInit,Input } from '@angular/core';

import { UserauthService} from './../../../../core/service/userauth.service';

@Component({
  selector: 'app-chat-each-message',
  templateUrl: './chat-each-message.component.html',
  styleUrls: ['./chat-each-message.component.scss']
})
export class ChatEachMessageComponent implements OnInit {

  @Input() chat_item;
  chat_type="other";

  constructor(private user_auth : UserauthService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.chat_item && this.chat_item.user_id == this.user_auth.own_user.id){
      this.chat_type="own";
    }
    
  }



}
