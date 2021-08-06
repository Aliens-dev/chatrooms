import {ROOMS_PAGE_API} from "../urls/AppBaseUrl";
import {GET_MESSAGES, GET_ROOMS, START_MESSAGES_LOADING, STOP_MESSAGES_LOADING} from "./index";


export const STOP_MESSAGES_LOADING_ACTION = () => {
    return {
        type: STOP_MESSAGES_LOADING,
    }
}
export const START_MESSAGES_LOADING_ACTION = () => {
    return {
        type: START_MESSAGES_LOADING,
    }
}

export const GET_MESSAGES_ACTION = (roomId) => async (dispatch,getState) => {
    try {
        let res = await axios({
            url:ROOMS_PAGE_API+roomId+'/messages',
            method:'GET',
            headers : {
                authorization : 'bearer '+ getState().auth.user.token,
            }
        })
        dispatch({
            type: GET_MESSAGES,
            payload:res.data.data
        })
        dispatch(STOP_MESSAGES_LOADING_ACTION())
        // handle Success
    }catch(e){
        dispatch(STOP_MESSAGES_LOADING_ACTION())
        // handle this
    }
}
