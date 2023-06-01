import axios from 'axios'
import { GET_FRIENDS_FAILED, GET_FRIENDS_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from '../types/messengerType'

const getToken = ()=>{
    const token = localStorage.getItem('auth-token')
    return token
}

export const getFriends = ()=> async(dispatch)=>{
    try {
        const response = await axios.get('http://localhost:5000/getfriends',{
            headers:{token:getToken()}
        }
    )
        dispatch({
            type: GET_FRIENDS_SUCCESS,
            payload:{
                friends:response.data.friends
            }
        })
    } catch (error) {
        dispatch({
            type:GET_FRIENDS_FAILED,
            payload:{
                error:error.response.data.error.message
            }
        })
    }
}

export const messageSend = (data) => async (dispatch)=>{
    try {
        const response = await axios.post('http://localhost:5000/sendmessage',data,{
            headers:{token:getToken()}
        }
    )
    dispatch({
        type:MESSAGE_SEND_SUCCESS,
        payload:{
            message:response.data.message
        }
    })
    } catch (error) {
        console.log(error.response)
    }
}

export const getMessage = (id) => {
    return async(dispatch)=>{
        try {
            const response = await axios.get(`http://localhost:5000/getmessages/${id}`,{
                headers:{token:getToken()}
            })
            dispatch({
                type:MESSAGE_GET_SUCCESS,
                payload:{
                    message:response.data.message
                }
            })
        } catch (error) {
            console.log(error.response)
        }
    }
}

export const sendImage = (data) => async(dispatch)=>{
        try {
            console.log(data)
            const response = await axios.post('http://localhost:5000/sendimage',data,{
                headers:{token:getToken()}
            })

            dispatch({
                type:MESSAGE_SEND_SUCCESS,
                payload:{
                    message:response.data.message
                }
            })

        } catch (error) {
            console.log(error.response.data)
        }
    }