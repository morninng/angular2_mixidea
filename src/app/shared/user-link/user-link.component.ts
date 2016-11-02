import { Component, OnInit, Input,ChangeDetectorRef, OnDestroy } from '@angular/core';
import {ModelUserService} from './../../core/service/model-user.service';


@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
  styleUrls: ['./user-link.component.scss']
})
export class UserLinkComponent implements OnInit,OnDestroy {

  @Input() user_id : string;
  @Input() type : string;
  user = null;
  user_subscription;

  constructor(private user_model : ModelUserService, private change_ref: ChangeDetectorRef) { }


  ngOnInit() {

    this.user_model.add_user(this.user_id);

    this.user_subscription =
      this.user_model.user_model_observable.subscribe(
        (user_model)=>{
          if(!this.user &&　user_model[this.user_id] && user_model[this.user_id].pict_src){
            this.user = {};
            this.user.full_name = user_model[this.user_id].full_name;
            this.user.pict_src = user_model[this.user_id].pict_src;
            this.user.short_name = user_model[this.user_id].short_name;
            this.change_ref.detectChanges()
          }
        }
      ); 
  }

  ngOnDestroy(){
    this.user_subscription.unsubscribe();
  }


}
