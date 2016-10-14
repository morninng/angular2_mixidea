import { Component, OnInit, Input,ChangeDetectorRef } from '@angular/core';
import {ModelUserService} from './../../shared/service/model-user.service';


@Component({
  selector: 'app-user-link-full-parallel',
  templateUrl: './user-link-full-parallel.component.html',
  styleUrls: ['./user-link-full-parallel.component.scss']
})
export class UserLinkFullParallelComponent implements OnInit {

  @Input() user_id : string;
  @Input() type : string;
  user = null;

  constructor(private user_service : ModelUserService, private change_ref: ChangeDetectorRef) { }



  ngOnInit() {

    this.user_service.add_user(this.user_id);

    const user_observable =
      this.user_service.user_model_observable.subscribe(
        (user_model)=>{
          if(!this.user &&　user_model[this.user_id] && user_model[this.user_id].pict_src){
            this.user = {};
            this.user.full_name = user_model[this.user_id].full_name;
            this.user.pict_src = user_model[this.user_id].pict_src;
            this.change_ref.detectChanges()
          }
        }
      ); 
  }




}
