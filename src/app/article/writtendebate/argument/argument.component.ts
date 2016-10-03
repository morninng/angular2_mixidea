import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-argument',
  templateUrl: './argument.component.html',
  styleUrls: ['./argument.component.scss']
})
export class ArgumentComponent implements OnInit {

  @Input() event_id: string;
  @Input() argument_id: string;
  @Input() own_team: string;
  @Input() partial_opinion;
  @Input() partial_arg_status;
  argument_team

  constructor(private route: ActivatedRoute,
               private router: Router){}

  ngOnInit() {
    console.log("argument id", this.argument_id);
    console.log("own_team", this.own_team);
    this.argument_team = this.partial_arg_status.main.team_name;
  }

  add_new_argument(){
    console.log("add new argument");
    
    let type = "";
    if(this.own_team == this.argument_team){
      type= "refute_back";
    }else{
      type= "refute";
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
                    argument_id: this.argument_id,
                    team_name:this.own_team,
                    type
                  }
    }
    this.router.navigate(['/writerecord_opinion',this.event_id], navigationExtras);


  }

}
