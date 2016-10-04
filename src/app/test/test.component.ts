import { Component, OnInit } from '@angular/core';

import {ModelUserService} from './../shared/model-user.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private user_service : ModelUserService) { }

  ngOnInit() {
  }

  start_user_subscription(){
    const user_observable =
      this.user_service.user_model_observable.subscribe(
        (user_list)=>{
          console.log("subscribed data");
          console.log(user_list);
        }
      );
  }

  user_test(){
    this.user_service.add_user('By9wCZOaxNdgyE6dNzPS0qoJ7zB2');
  }

  user_test2(){
    this.user_service.add_user('IJNA2mUYEWQD5vaMf7Q1CAHYHVv1');
  }

}
