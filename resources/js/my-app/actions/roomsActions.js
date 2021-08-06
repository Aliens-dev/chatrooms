import axios from "axios";
import {ROOMS_PAGE_API} from "../urls/AppBaseUrl";
import {
    ADD_ROOM_FAILS,
    ADD_ROOM_SUCCESS,
    GET_ROOM_MEMBERS,
    GET_ROOMS,
    START_ROOM_MEMBERS_LOADING,
    STOP_ROOM_MEMBERS_LOADING
} from "./index";
import {SHOW_TOAST_ACTION} from "./popupsActions";
import {STOP_LOADING_ACTION} from "./authActions";
export const GET_ROOMS_ACTION = () => async (dispatch,getState) => {
    try {
        let response = await axios({
            method : 'GET',
            url : ROOMS_PAGE_API,
            headers : {
                Authorization : 'bearer ' + getState().auth.user.token,
            }
        })
        dispatch({
            type: GET_ROOMS,
            payload: response.data.data
        })
        dispatch(STOP_LOADING_ACTION())
    }catch(e) {
        dispatch(SHOW_TOAST_ACTION('Failed', 'Failed to fetch Rooms, refresh page'))
        dispatch(STOP_LOADING_ACTION())
    }

}

export const ADD_ROOM_ACTION = (formData) => async (dispatch, getState) => {
    try {
        let res = await axios({
            method:'POST',
            url : ROOMS_PAGE_API,
            data:formData,
            headers : {
                authorization : "Bearer " + getState().auth.user.token,
                "Content-Type" : 'multipart/form-data'
            }
        })
        dispatch(SHOW_TOAST_ACTION("success",`new room added is Added`))
        dispatch(ADD_ROOM_SUCCESS_ACTION())
        //props.history.push(ROOMS_PAGE)
    }catch (e) {
        dispatch(SHOW_TOAST_ACTION('Error, try again', `failed to add new room`))
        dispatch(ADD_ROOM_FAILS_ACTION())
    }
}

export const ADD_ROOM_SUCCESS_ACTION = () => {
    return {
        type: ADD_ROOM_SUCCESS,
    }
}

export const ADD_ROOM_FAILS_ACTION = () => {
    return {
        type: ADD_ROOM_FAILS,
    }
}

export const STOP_ROOM_MEMBERS_LOADING_ACTION = () => {
    return {
        type: STOP_ROOM_MEMBERS_LOADING,
    }
}

export const START_ROOM_MEMBERS_LOADING_ACTION = () => {
    return {
        type: START_ROOM_MEMBERS_LOADING,
    }
}

export const GET_ROOM_MEMBERS_ACTION = (roomId) => async (dispatch, getState) => {
    try {
        let res = await axios({
            method:"GET",
            url: ROOMS_PAGE_API + roomId + '/users',
            headers : {
                Authorization : 'bearer ' + getState().auth.user.token,
            }
        })
        dispatch({
            type: GET_ROOM_MEMBERS,
            payload: {
                roomId: roomId,
                members: res.data.data
            }
        })
        dispatch(STOP_ROOM_MEMBERS_LOADING_ACTION())
    }catch (e) {
        dispatch(STOP_ROOM_MEMBERS_LOADING_ACTION())
    }
}

export const REMOVE_ROOM_MEMBER_ACTION = (roomId, member) => async (dispatch, getState) => {
    try {
        let res = await axios({
            method: "DELETE",
            url: ROOMS_PAGE_API + roomId + '/users/' + member.id,
            headers: {
                authorization: "bearer " + getState().auth.user.token,
            }
        });
        dispatch(SHOW_TOAST_ACTION('Member successfully removed',`${member.name} is removed`))
        dispatch(GET_ROOM_MEMBERS_ACTION(roomId))
    }catch(e) {
        dispatch(SHOW_TOAST_ACTION("Error, failed to remove",`User failed to remove, try again`))
    }
}

export const REMOVE_ROOM_ACTION = (roomId) => async (dispatch, getState) => {
    try {
        axios({
            url: ROOMS_PAGE_API+ roomId,
            method : 'DELETE',
            headers : {
                authorization: "Bearer "+ getState().auth.user.token
            }
        })
        dispatch(SHOW_TOAST_ACTION("Room successfully removed",`room is removed`))
        dispatch(GET_ROOMS_ACTION())
    }catch (e) {
        dispatch(SHOW_TOAST_ACTION("Error, try again",`failed to remove room`))
    }
}
