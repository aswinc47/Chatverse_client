import axios from 'axios'
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../types/authTypes';


const getToken = ()=>{
    const token = localStorage.getItem('auth-token')
    return token
}

export const userRegister = (data)=>{
    return async (dispatch) =>{
        try {
            const response = await axios.post('http://localhost:5000/register',data)
            localStorage.setItem('auth-token',response.data.token)
            dispatch({
                type: REGISTER_SUCCESS,
                payload:{
                    message:response.data.message,
                    token:response.data.token
                }
            })
        } catch (error) {
            console.log(error.response.data.error.message)
            dispatch({
                type: REGISTER_FAIL,
                payload:{
                    error:error.response.data.error.message
                }
            })
        }
    }
}

export const userLogin = (data)=>{
    return async (dispatch) =>{
        try {
            console.log(data)
            const response = await axios.post('http://localhost:5000/login',data)
            localStorage.setItem('auth-token',response.data.token)
            console.log(response.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload:{
                    message:response.data.message,
                    token:response.data.token
                }
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_FAIL,
                payload:{
                    error:error.response.data.error.message
                }
            })
        }
    }
}

export const userLogout = ()=>{ return async(dispatch) =>{
    const data = {}
        try {
            const response = axios.post('http://localhost:5000/logout',data,{
                headers:{token:getToken()}
            })
            if((await response).data.status){
                localStorage.removeItem('auth-token')
                dispatch({
                    type:LOGOUT_SUCCESS
                })
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}