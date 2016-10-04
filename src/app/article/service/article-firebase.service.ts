import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {COMMENT_TYPE_SENTENCE_WRITTEN} from './../service/comment.service'
import { UserauthService} from './../../shared/userauth.service';



@Injectable()
export class ArticleFirebaseService {


  constructor(private af: AngularFire, private user_auth : UserauthService) { }


  put_sentence_comment(type,event_id,arg_id,opinion_id,sentence_num,text ){
    
    const comment_item = this.af.database.list('/event_related/written_debate/' + event_id + "/comment/"
                         + type + "/" + arg_id + "/" + opinion_id + "/" + sentence_num);
    comment_item.push({comment_content:text, user_id: this.user_auth.own_user_id})
  }

}
