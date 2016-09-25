import {ADD_SENTENCE,
        UPDATE_SENTENCE,
        RESET_SENTENCE,
        UPDATE_TIME,
        EDIT_ITEM_STATUS,
        PLAY_AUDIO } from "./transcription-reducer";

import {generate_id} from './../util_func';


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