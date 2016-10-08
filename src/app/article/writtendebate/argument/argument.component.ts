import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-argument',
  templateUrl: './argument.component.html',
  styleUrls: ['./argument.component.scss']
})
export class ArgumentComponent implements OnInit, OnChanges {

  @Input() event_id: string;
  @Input() argument_id: string;
  @Input() own_team: string;
  @Input() partial_opinion;
  @Input() partial_arg_status;
  @Input() argument_team
  @Input() partial_comment_sentence_written


  /*data generated for the use of child component*/
  main_status : any;
  subsequent_status : any;
  comment_sentence_written

  constructor(private route: ActivatedRoute,
               private router: Router){}
 
  ngOnChanges(){
    console.log("argument component is initialized", this.argument_id);
    console.log("own_team", this.own_team);

    this.main_status = Object.assign({}, this.partial_arg_status.main)
    this.subsequent_status = Object.assign({}, this.partial_arg_status.subsequent)

    this.argument_team = this.main_status.team_name;
    this.comment_sentence_written = Object.assign({}, this.partial_comment_sentence_written); 
  }


  ngOnInit() {
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
