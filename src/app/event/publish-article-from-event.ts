
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';


export class PublishArticleFromEvent {


    constructor(private af: AngularFire){}


    publish(event_id: string, type : string, title : string, participants : string[], description? : string){

        const item_obj = {title,type,description};
        let participant_obj = {}
        for(var i=0; i<participants.length; i++){
            participant_obj[participants[i]] = true;
        }

        const itemObserbable = this.af.database.object('/event_related/article/' + event_id);
        itemObserbable.set({title,type,description,participant_obj});

    }


}
