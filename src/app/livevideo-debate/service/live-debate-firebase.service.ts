import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';


@Injectable()
export class LiveDebateFirebaseService {



  constructor(private af: AngularFire) { }

  join_team(event_id,team, user_id){
    const item_ref = this.af.database.object('/event_related/livevideo-debate/' + event_id + "/participants/team/" +  team + "/" + user_id);
    const promise = item_ref.set(true);
    promise.then(()=>{console.log("success")})
          .catch((err)=>{alert("fail to join please try again")});

  }

  leave_team(event_id,team, user_id){
    const item_ref = this.af.database.object('/event_related/livevideo-debate/' + event_id + "/participants/team/" +  team + "/" + user_id);
    const promise = item_ref.remove();
    promise.then(()=>{console.log("success")})
          .catch((err)=>{alert("fail to join please try again")}); 
  }

  move_team(event_id : string,remove_teams :[string] ,join_team : string, user_id : string){
    
    for(var i=0; i< remove_teams.length; i++){
      this.leave_team(event_id, remove_teams[i], user_id);
    }
    this.join_team(event_id, join_team, user_id);

  }

  save_motion = function(event_id, in_motion){

    const event_motion_item = this.af.database.object("/event_related/event/" + event_id + "/motion/");
    const game_motion_item = this.af.database.object("/event_related/livevideo-debate/" + event_id + "/motion/" );

    const promise = game_motion_item.set(in_motion);
    promise.then(()=>{
      return event_motion_item.set(in_motion);
    }).then(()=>{
      console.log("motion has been updated");
    }).catch(()=>{
      alert("saving the motion has been failed");
    })

  }






}
