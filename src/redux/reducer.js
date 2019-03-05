const INITIAL_STATE = {
    user: null,
    chart: [],
    doctors: [],
    state: "",
    city: "",
    specialty: "",
    skip: 0,
}

const GET_USER = "GET_USER";
const GET_CHART = "GET_CHART";
const GET_DOCTOR = "GET_DOCTOR";
const GET_SKIP = "GET_SKIP";

export default function reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case GET_USER:
            return {...state, user: action.payload}
        case GET_CHART:
            return {...state, chart: action.payload}
        case GET_DOCTOR:
            return {...state, doctors: action.payload}
        case GET_SKIP:
            return {...state, skip: action.payload}
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

export function getChart(chart){
    return{
        type: GET_CHART,
        payload: chart
    }
}

export function getDoctors(doctors){
    return{
        type: GET_DOCTOR,
        payload: doctors
    }
}
export function getSkip(skip){
    return{
        type: GET_SKIP,
        payload: skip
    }
}