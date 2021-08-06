import {
    GET_ROOMS,
    GET_ROOM_MEMBERS,
    START_ROOM_MEMBERS_LOADING,
    STOP_ROOM_MEMBERS_LOADING,
    ADD_ROOM_SUCCESS, ADD_ROOM_FAILS
} from "../actions";

const initState = {
    rooms: [],
    roomMembers: {
        roomId: null,
        members: [],
    },
    membersLoading: true,
    addRoomSuccess: false,
}

export const RoomsReducer = (state = initState, action) => {

    switch (action.type) {
        case GET_ROOMS : return {...state, rooms: action.payload};
        case GET_ROOM_MEMBERS : return {...state, roomMembers: action.payload};
        case ADD_ROOM_SUCCESS : return {...state, addRoomSuccess: true};
        case ADD_ROOM_FAILS : return {...state, addRoomSuccess: false};
        case START_ROOM_MEMBERS_LOADING : return {...state, membersLoading: true};
        case STOP_ROOM_MEMBERS_LOADING : return {...state, membersLoading: false};
        default :return state;
    }
}
