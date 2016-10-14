import { Component, OnInit } from '@angular/core';

import {ModelUserService} from './../shared/service/model-user.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private user_service : ModelUserService) { }

  user_id = 'By9wCZOaxNdgyE6dNzPS0qoJ7zB2';
  user;
  full_name : string;

  ngOnInit() {

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

  start_user_subscription(){

  }

  user_test(){
    this.user_service.add_user('By9wCZOaxNdgyE6dNzPS0qoJ7zB2');
  }

  user_test2(){
    this.user_service.add_user('IJNA2mUYEWQD5vaMf7Q1CAHYHVv1');
  }

}
