import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class SharedFirebaseService {

  constructor(private af: AngularFire) { }


  join_writtendebate_event_team = function(own_user_id, event_id, in_team){

    const participate_item = this.af.database.object("/event_related/event/" + event_id + "/participnts/" + own_user_id);
    const team_item = this.af.database.object("/event_related/written_debate/" + event_id + "/team/" + in_team + "/" + own_user_id );
    
    const promise = participate_item.set(true);
    promise.then(()=>{
      return team_item.set(true);
    }).then(()=>{
      alert("you have joined");
    }).catch((err)=>{
      alert("failed to join event")
    })
  }

}
