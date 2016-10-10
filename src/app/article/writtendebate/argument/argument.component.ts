import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-argument',
  templateUrl: './argument.component.html',
  styleUrls: ['./argument.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArgumentComponent implements OnInit, OnChanges {

  @Input() event_id: string;
  @Input() argument_id: string;
  @Input() own_team: string;
  @Input() partial_opinion;
  @Input() partial_arg_status;
  @Input() argument_team
  @Input() partial_comment_sentence_written
  @Input() partial_comment_sentence_transcription


  /*data generated for the use of child component*/
  main_status : any;
  subsequent_status : any;
  comment_sentence_written;
  comment_sentence_transcript;
  is_arg_prop : boolean;
  is_arg_opp : boolean;

  constructor(private route: ActivatedRoute,
               private router: Router){
                 console.log("argument component constructor is called");
               }
 
  ngOnChanges(){
    console.log("argument component on change argumen id = ", this.argument_id);
    console.log("own_team", this.own_team);

    this.main_status = this.partial_arg_status.main || {};
    this.subsequent_status = this.partial_arg_status.subsequent || {};
    this.comment_sentence_written = this.partial_comment_sentence_written || {}
    this.comment_sentence_transcript = this.partial_comment_sentence_transcription || {}
    this.argument_team = this.main_status.team_name;

    this.is_arg_prop = this.argument_team=='proposition';
    this.is_arg_opp = this.argument_team=='opposition';
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
