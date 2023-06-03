import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import ActiveFriends from './ActiveFriends';
import Friend from './Friend';
import RightSide from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, getMessage, messageSend, sendImage } from '../store/actions/MessengerAction';
import { BiLogOut } from "react-icons/bi";
import { userLogout } from '../store/actions/authAction';
import NoActiveuser from './NoActiveuser';
import {io} from 'socket.io-client'
import toast,{Toaster} from 'react-hot-toast';
import useSound from 'use-sound'
import notificationSound from '../audios/receive.mp3'
import sendSound from '../audios/sent.mp3'
import {SOCKET_MESSAGE_SUCCESS} from '../store/types/messengerType'

function Messenger() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const scrollRef = useRef()
    const socket = useRef()

    const [playSend] = useSound(sendSound)
    const [playNotification] = useSound(notificationSound)

    const {friends,messages} = useSelector(state => state.messenger)
    const {userDetails,authenticate} = useSelector(state=>state.auth)
    const [activeuser,setActiveuser] = useState('')
    const [newMessage,setNewMessage] = useState('')
    const [onlineusers,setOnlineusers] = useState([])
    const [socketmessage, setSocketmessage] = useState('')
    const [typing,setTyping] = useState('')

    // socket
    useEffect(()=>{
        socket.current = io('ws://localhost:8000')
        socket.current.on('getMessage',(data)=>{
            setSocketmessage(data)
        })
        socket.current.on('typing',(data)=>{
            setTyping(data)
        })
    },[])


    useEffect(()=>{
        socket.current.emit('addUser',userDetails.id, userDetails)
    },[])

    useEffect(()=>{
        socket.current.on('getUser',(users)=>{
            const filteredOnlineUsers = users.filter(user => user.userId !== userDetails.id)
            setOnlineusers(filteredOnlineUsers)
        })
    },[])
    useEffect(()=>{
        if(socketmessage && activeuser){
            if(socketmessage.senderId === activeuser._id && socketmessage.receiverId === userDetails.id){
                dispatch({
                    type:SOCKET_MESSAGE_SUCCESS,
                    payload:{
                        message:socketmessage
                    }
                })
            }
        }
    },[socketmessage])

    useEffect(()=>{
        if(socketmessage && socketmessage.senderId !== activeuser._id && socketmessage.receiverId === userDetails.id){
            playNotification()
            if(socketmessage.message.text){
                toast.success(`${socketmessage.senderName} : ${socketmessage.message.text}`)
            }else{
                toast.success(`${socketmessage.senderName} send you an image.`)
            }
        }
    },[socketmessage])




    const InputHandle = (e)=>{
        setNewMessage(e.target.value)
        socket.current.emit('usertyping',{
            senderId:userDetails.id,
            receiverId:activeuser._id,
            message:e.target.value
        })
    }


    
    const sendMessage = (e)=>{
        e.preventDefault()
        playSend()
        const data = {
            sender:userDetails.username,
            receiverId:activeuser._id,
            message:newMessage?newMessage:'❤️️'
        }
        dispatch(messageSend(data))
        setNewMessage('')
        socket.current.emit('sendMessage',{
            senderId:userDetails.id,
            senderName:userDetails.username,
            receiverId:activeuser._id,
            message:{
                text:newMessage?newMessage:'❤️️',
                image:''
            },
            time: new Date()
        })
        socket.current.emit('usertyping',{
            senderId:userDetails.id,
            receiverId:activeuser._id,
            message:e.target.value
        })
    }



    const goBack = ()=>{
        setActiveuser('')
    }

    const setEmoji = (emoji)=>{
        setNewMessage(`${newMessage}`+ emoji)
        socket.current.emit('usertyping',{
            senderId:userDetails.id,
            receiverId:activeuser._id,
            message:emoji
        })
    }

    const imageSend = (e)=>{

        if(e.target.files.length !== 0){
            console.log(e.target.files[0].name)
            const imagename = e.target.files[0].name
            const newImagename = Date.now() + imagename;

            socket.current.emit('sendMessage',{
                senderId:userDetails.id,
                senderName:userDetails.username,
                receiverId:activeuser._id,
                message:{
                    text:'',
                    image:newImagename
                },
                time: new Date()
            })

            const form = new FormData()

            form.append('sender',userDetails.username)
            form.append('recieverId',activeuser._id)
            form.append('imageName',newImagename)
            form.append('image',e.target.files[0])
            dispatch(sendImage(form))
        }
    }
    const logOut = ()=>{
        dispatch(userLogout())
    }

    useEffect(()=>{
        if(!authenticate){
            navigate('/login')
        }
    })


    useEffect(()=>{
        dispatch(getFriends())
    },[])

    // useEffect(()=>{
    //     if(friends && friends.length>1){
    //         setActiveuser(friends[0])
    //     }
    // },[friends])

    useEffect(()=>{
        dispatch(getMessage(activeuser._id))
    },[activeuser?._id])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])

  return (
    <div className='messenger'>
        <Toaster
            position = 'top-right'
            containerClassName='notification'
            toastOptions={{
                // Define default options
                className: 'notify',
                duration: 5000,

                // Default options for specific types
                success: {
                duration: 5000,
                theme: {
                    primary: 'green',
                    secondary: 'black',
                },
                },
            }}
        />

        <div className='row'>
            <div className={activeuser?'smhidden leftside col-md-3':'col-md-3 leftside'}>
                <div className='leftsidetop'>
                    <div className='brand text-center'>
                        <div className='profile'>
                            <div className='profilepicandname'>
                                <div className='profilepicture' style={{backgroundImage:`url('/images/${userDetails.image}')`}}>
                                </div>
                                <div className='profilename'><h3>{userDetails.username}</h3></div>
                            </div>
                            <div className='logoutkey'><BiLogOut className='logoutkey' onClick={logOut}/></div>   
                        </div>
                    </div>
    
                    {/* <div className='searchdiv'>
                    <TextField
                        label="Search friends"
                        id="outlined-start-adornment"
                        variant='filled'
                        sx={{ width: '90%' }}
                        InputProps={{
                        startAdornment: <InputAdornment position="start"><HiSearch/></InputAdornment>,
                        }}
                    />
                    </div> */}

                    <ActiveFriends
                    onlineusers={onlineusers}
                    setActiveuser={setActiveuser}
                    />
                </div>

                <div className='friends'>

                {friends && friends.length>0 ? friends.map(friend=>(
                    <div onClick={()=> setActiveuser(friend)}
                     className={friend._id === activeuser._id ? 'hover-friends friend-active' : 'hover-friends'}>
                        <Friend friend={friend} />
                    </div>
                )): <h6 className='text-center mt-3'>No friends</h6>}

                </div>
                
            </div>     

            {activeuser?
                <RightSide 
            activeuser={activeuser}
            goBack={goBack}
            newMessage={newMessage}
            InputHandle={InputHandle}
            sendMessage={sendMessage}
            messages={messages}
            scrollRef={scrollRef}
            emoji={setEmoji}
            imageSend = {imageSend}
            onlineusers = {onlineusers}
            typing = {typing}
            />:<NoActiveuser/>}
        </div>
    </div>
  )
}

export default Messenger