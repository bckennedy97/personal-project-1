import Axios from "axios";

const INITIAL_STATE = {
    user: null,
    doctors: [],
    favorites: null,
    state: "ny",
    city: "new-york-city",
    specialty: "",
    skip: 0,
}

const GET_USER = "GET_USER";
const GET_DOCTOR = "GET_DOCTOR";
const ADD_FAVORITE = "ADD_FAVORITE";
const GET_FAVORITES = "GET_FAVORITES";
const LOGOUT_USER = "LOGOUT_USER";

export default function reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case GET_USER:
            return {...state, user: action.payload}
        case GET_DOCTOR:
            return {...state, doctors: action.payload}
        case ADD_FAVORITE:
            const favoritesCopy = state.favorites.slice();
            favoritesCopy.push(action.payload);
            return {...state, favorites: favoritesCopy} 
        case GET_FAVORITES:
            return {...state, favorites: action.payload} 
        case LOGOUT_USER:
            return {user: null}
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

export function getDoctors(doctors){
    return{
        type: GET_DOCTOR,
        payload: doctors
    }
}
export function addFavorite(favorites){
    return{
        type: ADD_FAVORITE,
        payload: favorites
    }
}
export function getFavorites(favorites){
    return{
        type: GET_FAVORITES,
        payload: favorites
    }
}
export function logout(user){
    return{
        type: LOGOUT_USER,
        payload: Axios.post("/api/logout")
    }
}