import {ADD_SENTENCE,
        UPDATE_SENTENCE,
        RESET_SENTENCE,
        UPDATE_TIME,
        EDIT_ITEM_STATUS,
        PLAY_AUDIO } from "./transcription-reducer";


const generate_id = function(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}


export const ActionCreator = {


    transcription_addsentence : function(sentence, end_time){
        const action_obj = {
        type:ADD_SENTENCE,
        payload: {
            id: generate_id(),
            sentence,
            end_time
        }
        }
        return action_obj;
    },
    transcription_update_sentence: function(id,sentence){
        const action_obj = {
            type:UPDATE_SENTENCE,
            payload: {
                id,
                sentence
            }
        }
        return action_obj;
    },
    
    transcription_update_time: function(id,end_time){
        const action_obj = {
            type:UPDATE_SENTENCE,
            payload: {
                id,
                end_time
            }
        }
        return action_obj;
    },

    transcription_editstatus: function(id){
        const action_obj = {
            type:EDIT_ITEM_STATUS,
            payload: {
                id
            }
        }
        return action_obj;
    },

    transcription_play : function(current_time){

        const action_obj = {
            type:PLAY_AUDIO,
            payload: {
                current_time
            }
        }
        return action_obj;
    }

}