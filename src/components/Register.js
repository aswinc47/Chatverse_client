import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { userRegister } from "../store/actions/authAction";
import { useAlert } from "react-alert";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authTypes";


function Register() {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const {loading,authenticate,error,successMessage,userDetails} = useSelector(state => state.auth)

  const [state,setState] = useState({
    username:'',
    email:'',
    password:'',
    confirmpassword:'',
    image:''
  })

  const [loadImage,SetLoadImage] = useState('')
 
  const HandleInput = (e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const HandleImage = (e)=>{
    if(e.target.files.length !== 0){
      setState({
        ...state,
        [e.target.name]: e.target.files[0]
      })
    }
    const reader = new FileReader
    reader.onload = ()=>{
      SetLoadImage(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])  
  }

  const register = (e)=>{
    e.preventDefault()
    const {username,email,password,confirmpassword,image} = state
    console.log(state);
    const formData = new FormData()
    formData.append('username',username)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('confirmpassword',confirmpassword)
    formData.append('image',image)



    dispatch(userRegister(formData))

  }

  useEffect(()=>{
    if(successMessage){
      alert.success(successMessage)
      dispatch({type:SUCCESS_MESSAGE_CLEAR})
    }
    if(authenticate){
      navigate('/')
    }
    if(error){
      error.map(err => alert.error(err))
      dispatch({type:ERROR_CLEAR})
    }
  },[successMessage,error])




  return (
    <div>
      <div className="row login">
        <div className="col-md-5 logincol regcol">
          <div className="loginmain">
            <h2 className="mb-4">Chatverse</h2>
            <h4 className="mb-4">Create a new account</h4>
            <form className="inputarea" onSubmit={register}>
              <div className="inputfield">
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="standard"
                  fullWidth
                  autoComplete="off"
                  type="text"
                  onChange={HandleInput}
                  value={state.username}
                />
              </div>
              <div className="inputfield">
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  autoComplete="off"
                  type="email"
                  onChange={HandleInput}
                  value={state.email}
                />
              </div>
              <div className="inputfield">
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  autoComplete="off"
                  type="password"
                  onChange={HandleInput}
                  value={state.password}
                />
              </div>
              <div className="inputfield">
                <TextField
                  id="confirmpassword"
                  name="confirmpassword"
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                  autoComplete="off"
                  type="password"
                  onChange={HandleInput}
                  value={state.confirmpassword}
                />
              </div>
  
              <div className="inputfilefield">
                <div className="registeravatardiv">
                  {loadImage?<img src={loadImage}/>:''}
                </div>
                <div className="btn btn-outline-primary btn-rounded uploadbtn">
                  <label className="form-label  text-primary hover-text-white m-1" for="customFile1">Select image</label>
                  <input name="image" onChange={HandleImage} type="file" class="form-control d-none" id="customFile1" />
                </div>
              </div>
              <div className="registerlink my-4">
                <Link to={"/login"}>
                  <a>Already registered</a>
                </Link>
              </div>
              <button type='submit' className="btn btn-primary loginbtn">Register</button>
            </form>
          </div>
        </div>
        <div className="col-md-7 homeimgdiv">
          <img src="/assets/homeimg.png" className="homeimg"></img>
        </div>
      </div>
    </div>
  );
}

export default Register;