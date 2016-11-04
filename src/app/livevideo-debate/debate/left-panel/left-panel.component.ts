import { Component, OnInit,Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'
import {TEAM_PROPOSITION, TEAM_GOV, TEAM_OG} from './../../../interface/team';
import { AngularFire } from 'angularfire2';


interface Preparation_Document {
  intro: any,
  argument: any
}

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit, OnDestroy {


  @Input() event_id;
  @Input() deb_style;
  @Input() current_own_team;

  current_prep_team : string = null;
  audience_team : string = null;
  default_team : string;

  prep_doc_subscription = null;
  intro_doc = {};
  arg_obj = {};

  constructor(private af: AngularFire,
              private change_ref: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngOnChanges(){
    
    switch(this.deb_style){
      case STYLE_NA:
        this.default_team = TEAM_GOV;
      break;
      case STYLE_ASIAN:
        this.default_team = TEAM_PROPOSITION;
      break;
      case STYLE_BP:
        this.default_team = TEAM_OG;
      break;
    }

    const prep_team = this.audience_team || this.current_own_team[0] || this.default_team;

    if(this.current_prep_team != prep_team){

      if(this.prep_doc_subscription){
        this.prep_doc_subscription.unsubscribe();
      }
      const reference = "/event_related/livevideo-debate-prepdoc/" + this.event_id + "/" + prep_team;
      const prep_doc_item = this.af.database.object(reference, { preserveSnapshot: true });
      this.prep_doc_subscription
        = prep_doc_item.subscribe((snapshot)=>{

          const prep_doc :Preparation_Document = snapshot.val() || {};
          console.log("preparation document subscription in preparation layout:", prep_doc);
          this.intro_doc = Object.assign({}, prep_doc.intro);
          this.arg_obj = Object.assign({}, prep_doc.argument);
          this.arg_obj["0"] = this.arg_obj["0"] || {};
          this.arg_obj["1"] = this.arg_obj["1"] || {};


          this.change_ref.detectChanges()

      })
      this.current_prep_team = prep_team;
    }

  }

  ngOnDestroy(){
    if(this.prep_doc_subscription){
      this.prep_doc_subscription.unsubscribe();
    }
    
    
  }
  
  

}
