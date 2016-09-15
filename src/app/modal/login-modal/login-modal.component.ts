import { Component, OnInit , ViewChild} from '@angular/core';

import { ModalDirective } from './../../../../node_modules/ng2-bootstrap/components/modal/modal.component';
import { UserauthService} from './../../shared/userauth.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(private user_auth : UserauthService) { }

  @ViewChild(ModalDirective) login_modal:ModalDirective;

  ngOnInit() {

    this.user_auth.open_login_modal$.subscribe(
      (value : boolean)=>{
        if(value){
          this.show_login_modal();
        }else{
          this.hide_login_modal();
        }
      }
    )
  }



  show_login_modal(){
    console.log("login button is clicked");
    this.login_modal.show()
  }

  login_fb(){
    console.log("facebook login is called");
    this.user_auth.login();
  }

  hide_login_modal(){
    this.login_modal.hide();
  }

}
