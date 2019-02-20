const INITIAL_STATE = {
    user: null,
}

const GET_USER = "GET_USER";

export default function reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case GET_USER:
            return {...state, user: action.payload}
        default:
            return state;
    }
}

export function getUser(user){
    return{
        type: GET_USER,
        payload: user
    }
}