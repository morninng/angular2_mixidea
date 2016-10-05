import { Component, OnInit, Input } from '@angular/core';
import {ModelUserService} from './../../shared/model-user.service';


@Component({
  selector: 'app-user-link-full-parallel',
  templateUrl: './user-link-full-parallel.component.html',
  styleUrls: ['./user-link-full-parallel.component.scss']
})
export class UserLinkFullParallelComponent implements OnInit {


  @Input() user_id : string;
  user;

  constructor(private user_service : ModelUserService) { }



  ngOnInit() {

    this.user_service.add_user('By9wCZOaxNdgyE6dNzPS0qoJ7zB2');

    const user_observable =
      this.user_service.user_model_observable.subscribe(
        (user_model)=>{
          if(user_model[this.user_id]){
            this.user = {};
            this.user.full_name = user_model[this.user_id].full_name;
            this.user.pict_src = user_model[this.user_id].pict_src;
          }
        }
      );



  }




}
