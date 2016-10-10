import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { UserauthService} from './../../shared/userauth.service';



@Injectable()
export class ArticleFirebaseService {


  constructor(private af: AngularFire, private user_auth : UserauthService) { }


  put_sentence_comment(type,event_id,arg_id,opinion_id,sentence_num,text ){
    
    const comment_item = this.af.database.list('/event_related/written_debate/' + event_id + "/comment/"
                         + type + "/" + arg_id + "/" + opinion_id + "/" + sentence_num);
    comment_item.push({comment_content:text, user_id: this.user_auth.own_user_id})
  }

  publish_opinion(event_id, argument_id, category, subsequent_id){

    let reference;

    if(category == "main"){
      reference = '/event_related/written_debate/' + event_id + 
                      "/arg_status/" + argument_id + 
                      "/main/status";
    }else if (category == "subsequent"){
      reference = '/event_related/written_debate/' + event_id + 
                      "/arg_status/" + argument_id + 
                      "/subsequent/" + subsequent_id + "/status";
    }else{
      return;
    }
    const status_item = this.af.database.object(reference);
    status_item.set("public");
  }
  

}
