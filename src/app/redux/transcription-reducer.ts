
import { ActionReducer, Action } from '@ngrx/store';


export const ADD_SENTENCE = 'ADD_SENTENCE';
export const UPDATE_SENTENCE = 'UPDATE_SENTENCE';
export const RESET_SENTENCE = 'RESET_SENTENCE';
export const UPDATE_TIME = 'UPDATE_TIME';
export const EDIT_ITEM_STATUS = 'EDIT_ITEM_STATUS';
export const PLAY_AUDIO = 'PLAY_AUDIO';

export const TranscriptionReducer: ActionReducer<any> = (state = [], action: Action) => {

    switch (action.type) {
        case ADD_SENTENCE:
            return [ ...state, action.payload ];

        case UPDATE_SENTENCE:
            return state.map((transcript)=>{
                if(transcript.id == action.payload.id){
                    return Object.assign({}, transcript, {sentence: action.payload.sentence, edit: false});
                }else{
                    return Object.assign({}, transcript);
                }
            })

        case UPDATE_TIME:
           return state.map((transcript)=>{
                if(transcript.id == action.payload.id){
                    return Object.assign({}, transcript, {sentence: action.payload.new_time, edit: false});
                }else{
                    return Object.assign({}, transcript);
                }
            })     

        case EDIT_ITEM_STATUS:
           return state.map((transcript)=>{
                if(transcript.id == action.payload.id){
                    return Object.assign({}, transcript, {edit: true});
                }else{
                    return Object.assign({}, transcript);
                }
            })

        case PLAY_AUDIO:
            let already_found = false;
            return state.map((each_state)=>{
                each_state.playing = false;
               if(!already_found && action.payload.current_time <each_state.end_time){
                    each_state.playing = true;
                    already_found = true;
                }
                return each_state
            })

        case RESET_SENTENCE:
            state = []
            return state;

        default:
            return state;
    }
}

