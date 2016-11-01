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

  change_game_status(event_id : string, status : string){
    console.log(status);
    const item_ref = this.af.database.object('/event_related/livevideo-debate/' + event_id + "/game_status/");
    const promise = item_ref.set(status);
    promise.then(()=>{console.log("success to change status")})
          .catch((err)=>{alert("fail to change status")});
  }

  save_motion(event_id, in_motion){

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

  save_firebase_data(reference, data){
    console.log("reference", reference);
    console.log("data", data);
    const item_ref = this.af.database.object(reference);
    const promise = item_ref.set(data);
    promise.then(()=>{
      console.log("success to save")})
    .catch((err)=>{
      console.log("fail to save")
    });
          
  }

  remove_firebase_data(reference){

    const item_ref = this.af.database.object(reference);
    const promise = item_ref.remove();
    promise.then(()=>{
      console.log("success to remove")})
    .catch((err)=>{
      console.log("fail to remove"
)
    });
          
  }
  set_prepdoc_intro_start_edit(event_id : string, team : string, user_id : string){
    const reference = "/event_related/livevideo-debate-prepdoc/" + event_id + "/" + team + "/intro/editor/" + user_id;
    this.save_firebase_data(reference, true);
  }

  set_prepdoc_intro_finish_edit(event_id : string, team : string, user_id : string){
    const reference = "/event_related/livevideo-debate-prepdoc/" + event_id + "/" + team + "/intro/editor/" + user_id;
    this.remove_firebase_data(reference);
  }
  
  set_prepdoc_arg_signpost_start_edit(event_id : string, team : string, arg_num:number, user_id : string){
    const reference = "/event_related/livevideo-debate-prepdoc/" + event_id + "/" + team + "/argument/" + String(arg_num) +"/signpost/editor/" + user_id;
    this.save_firebase_data(reference, true);
  }

  set_prepdoc_arg_signpost_finish_edit(event_id : string, team : string, arg_num:number, user_id : string){
    const reference = "/event_related/livevideo-debate-prepdoc/" + event_id + "/" + team + "/argument/" + String(arg_num) +"/signpost/editor/" + user_id;
    this.remove_firebase_data(reference);
  }


  set_prepdoc_arg_context_start_edit(event_id : string, team : string, arg_num:number,  user_id : string){
    const reference = "/event_related/livevideo-debate-prepdoc/" + event_id + "/" + team + "/argument/" + String(arg_num) +"/main_context/editor/" + user_id;
    this.save_firebase_data(reference, true);
  }

  set_prepdoc_arg_context_finish_edit(event_id : string, team : string, arg_num:number,  user_id : string){
    const reference = "/event_related/livevideo-debate-prepdoc/" + event_id + "/" + team + "/argument/" + String(arg_num) +"/main_context/editor/" + user_id;
    this.remove_firebase_data(reference);
  }


  save_prepdoc_introduction(event_id : string, team : string, context : string){
    const reference = "/event_related/livevideo-debate-prepdoc/" + event_id + "/" + team + "/intro/context/";
    this.save_firebase_data(reference, context);
  }
  
  save_prepdoc_arg_signpost(event_id : string, team : string, arg_num:number, context:string){
    const reference = "/event_related/livevideo-debate-prepdoc/" + event_id + "/" + team + "/argument/" + String(arg_num) +"/signpost/text/";
    this.save_firebase_data(reference, context);
  }

  save_prepdoc_arg_context(event_id : string, team : string, arg_num:number, context:string){
    const reference = "/event_related/livevideo-debate-prepdoc/" + event_id + "/" + team + "/argument/" + String(arg_num) + "/main_context/text";
    this.save_firebase_data(reference, context);
  }

  set_prep_duration(event_id : string, duration: number){
    const reference = '/event_related/livevideo-debate/' + event_id + '/prep_duration';
    this.save_firebase_data(reference, duration);
  }

  set_debate_speaker(event_id : string,speaker_obj : any){
    const reference = '/event_related/livevideo-debate/' + event_id + '/speech_status/main_speaker';
    this.save_firebase_data(reference, speaker_obj);
  }

  remove_speech_status(event_id : string){
    const reference = '/event_related/livevideo-debate/' + event_id + '/speech_status/';
    this.remove_firebase_data(reference);
  }

  set_poi_candidate(event_id : string, own_user_id : string){
    const reference = '/event_related/livevideo-debate/' + event_id + '/speech_status/poi_candidate/' + own_user_id;
    this.save_firebase_data(reference, true);

  }

  cancel_poi_candidate(event_id : string, own_user_id : string){
    const reference = '/event_related/livevideo-debate/' + event_id + '/speech_status/poi_candidate/' + own_user_id;
    this.remove_firebase_data(reference);
  }

  remove_all_poi_candidates(event_id : string){
    const reference = '/event_related/livevideo-debate/' + event_id + '/speech_status/poi_candidate/';
    this.remove_firebase_data(reference);
  }


  set_prep_start_time(event_id : string){
    const current_time = new Date();
    const current_time_value = current_time.getTime()
    const reference = '/event_related/livevideo-debate/' + event_id + '/prep_start_time';
    this.save_firebase_data(reference, current_time_value);
  }


  send_chat(event_id, chat_status, user_id ,inpput_text){

    const obj = {user_id: user_id, message: inpput_text};
    const reference = '/event_related/event_chat/' +  event_id + '/' + chat_status;
    const chat_items = this.af.database.list(reference);
    chat_items.push(obj);

  }


}
