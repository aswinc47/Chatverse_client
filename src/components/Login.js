import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/actions/authAction";
import { useAlert } from "react-alert";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authTypes";

function Login() {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const {loading,authenticate,error,successMessage,userDetails} = useSelector(state => state.auth)

  const [state, setState] = useState({
    email:'',
    password:''
  })


  const HandleInput = (e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
    console.log(state)
  }
  const login = (e)=>{
    e.preventDefault()
    dispatch(userLogin(state))
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
        <div className="col-md-7 homeimgdiv">
          <img src="/assets/homeimg.png" className="homeimg"></img>
        </div>
        <div className="col-md-5 logincol">
          <div className="loginmain">
            <h2 className="mb-4">Chatverse</h2>
            <h4 className="mb-4">Login to your account</h4>
            <form className="inputarea" onSubmit={login}>
              <div className="inputfield">
                <TextField
                  id="email"
                  name="email"
                  label="Email address"
                  variant="standard"
                  fullWidth
                  autoComplete="off"
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
              <div className="registerlink my-3">
                <Link to={"/register"}>
                  <a>Create an account</a>
                </Link>
              </div>
                <button className="btn loginbtn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;