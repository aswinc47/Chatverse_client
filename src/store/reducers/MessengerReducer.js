import { GET_FRIENDS_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS,SOCKET_MESSAGE_SUCCESS } from "../types/messengerType"

const messengerState = {
    friends:[],
    messages:[],
    latestMessage:''
}
export const messengerReducer = (state=messengerState,action)=>{
    switch(action.type){
        case GET_FRIENDS_SUCCESS:
        return{
            ...state,
            friends: action.payload.friends
        }
        case MESSAGE_GET_SUCCESS:
            return{
                ...state,
                messages: action.payload.message
            }
        case MESSAGE_SEND_SUCCESS:
            return{
                ...state,
                messages: [...state.messages,action.payload.message]
            }
        case SOCKET_MESSAGE_SUCCESS:
            return{
                ...state,
                messages: [...state.messages,action.payload.message]
            }
        default:
            return state
    }
}