import { Button, IconButton } from '@mui/material'
import React from 'react'
import { FaEllipsisH, FaPhone, FaVideo,FaChevronLeft } from "react-icons/fa";
import MessageArea from './MessageArea';
import MessageSend from './MessageSend';
import InfoArea from './InfoArea';
import { Badge } from '@mui/material'

function RightSide({activeuser,InputHandle,newMessage,sendMessage,messages,scrollRef,emoji,imageSend,goBack,onlineusers,typing}) {
    
  return (
    <div className='col-md-9'>
        <div className={activeuser?'rightside':'col-md-3 smhidden rightside'}>
            <div className='row'>
                <div className='chatarea'>
                    {/* chathead start */}
                    <div className='chathead'>
                        <div className='chatheadleft'>
                            <IconButton onClick={goBack}><FaChevronLeft/></IconButton>

                            {
                                onlineusers && onlineusers.length>0 && onlineusers.some(u=>u.userId === activeuser._id) ? 
                                <Badge className='badge' color="success" variant='dot' anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} overlap='circular'>
                                    <div className='chatheadimage' style={{backgroundImage:`url('/images/${activeuser.image}')`}}>
                                        
                                    </div>
                                </Badge> :
                                <div className='chatheadimage' style={{backgroundImage:`url('/images/${activeuser.image}')`}}>
                                        
                                </div> 
                            }
                            <div className='chathead-title'>
                                <h5 className='chatheadname'>{activeuser.username}</h5>
                            </div>
                        </div>
                        <div className='chatheadright'>
                            <div className='chatheadicondiv'>
                                <IconButton>
                                    <FaVideo className='chatheadicon' />
                                </IconButton>
                            </div>
                            <div className='chatheadicondiv'>
                                <IconButton>
                                    <FaPhone className='chatheadicon' />
                                </IconButton>
                            </div>
                            <div className='chatheadicondiv'>
                                <IconButton>
                                    <FaEllipsisH className='chatheadicon' />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    {/* chathead end */}

                    <div className='messagearea'>
                        <MessageArea 
                            messages={messages}
                            activeuser={activeuser}
                            scrollRef={scrollRef}
                            typing={typing}
                        />
                    </div>

                    {/* Messagesend */}
                    <div className='messagesend'>
                        <MessageSend 
                            InputHandle={InputHandle}
                            newMessage={newMessage}
                            sendMessage={sendMessage}
                            emoji={emoji}
                            imageSend = {imageSend}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RightSide