import {GET_MESSAGES, START_MESSAGES_LOADING, STOP_MESSAGES_LOADING} from "../actions";


const initState = {
    messages: [],
    loading: true,
};


export const MessagesReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_MESSAGES: return {...state, messages: action.payload}
        case STOP_MESSAGES_LOADING: return {...state, loading:false}
        case START_MESSAGES_LOADING: return {...state, loading:true}
        default: return state;
    }
}


