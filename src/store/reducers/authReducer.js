import jwtDecode from "jwt-decode"
import { ERROR_CLEAR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR } from "../types/authTypes"

const authState = {
    loading:true,
    authenticate:false,
    error:'',
    successMessage:'',
    userDetails:''
}

const tokenDecode = (token)=>{
    const tokenDecoded = jwtDecode(token)
    const expTime = new Date(tokenDecoded.exp*1000);
    if(new Date() > expTime){
        return null
    }
    return tokenDecoded
}

const getToken = localStorage.getItem('auth-token')
if(getToken){
    const getDetails = tokenDecode(getToken)
    if(getDetails){
        authState.loading = false
        authState.authenticate = true
        authState.userDetails = getDetails
    }
}


export const authReducer = (state = authState , action)=>{
    switch (action.type){
        case REGISTER_FAIL:
            console.log(action.type);
            return {
                ...state,
                error : action.payload.error,
                authenticate : false,
                userDetails : '',
                loading : true
            }
        case LOGIN_FAIL:
            console.log(action.type);
            return {
                ...state,
                error : action.payload.error,
                authenticate : false,
                userDetails : '',
                loading : true
            }
            
        case REGISTER_SUCCESS:
            const userDetails = tokenDecode(action.payload.token)
            return{
                ...state,
                error : '',
                successMessage: action.payload.message,
                authenticate : true,
                userDetails : userDetails,
                loading:false
            }
        case LOGIN_SUCCESS:
            const loginDetails = tokenDecode(action.payload.token)
            return{
                ...state,
                error : '',
                successMessage: action.payload.message,
                authenticate : true,
                userDetails : loginDetails,
                loading:false
            }

        case ERROR_CLEAR:
            return{
                ...state,
                error : ''
            }
        case SUCCESS_MESSAGE_CLEAR:
            return{
                ...state,
                successMessage:''
            }

        case LOGOUT_SUCCESS:
            return{
                ...state,
                successMessage: 'Logout successful',
                authenticate : false,
                userDetails : '',
            }

        default:
            return state
    }
}