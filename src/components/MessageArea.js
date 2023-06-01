import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

function MessageArea({messages,activeuser,scrollRef,typing}) {
    const {userDetails} = useSelector(state => state.auth)

  return (
    <div className='messageareadiv'>
    {
        messages && messages.length > 0 ? messages.map(message=>(
            message.senderId === userDetails.id ? 
                <div ref={scrollRef} className='mymessage'>
                    <div className='mymessagetext'>
                    <p>{message.message.text === '' ? <img src={`/images/${message.message.image}`}/>
                    :message.message.text}</p>
                    </div>
                    <div className='mymessagetime'>
                        <p>{moment(message.createdAt).startOf('mini').fromNow()}</p>
                    </div>
                </div>
                :<div ref={scrollRef} className='friendmsgdiv'>
                    <div className='friendmsgimg'
                     style={{backgroundImage:`url('/images/${activeuser.image}')`}}>
                            {/* <img src={`/images/${activeuser.image}`}></img> */}
                    </div>
                    <div className='fnd-message'>
                        <div className='mymessagetext friendmsg'>
                            <p>{message.message.text === '' ? <img src={`/images/${message.message.image}`}/>
                            :message.message.text}</p>
                        </div>
                        <div className='mymessagetime'>
                            <p>{moment(message.createdAt).startOf('mini').fromNow()}</p>
                        </div>
                    </div>
                </div>
        )):''
    }
    {
        typing && typing.senderId === activeuser._id && typing.message ?
        <div className='typingmessage'>
            <div className='friendmsgimg'
                            style={{backgroundImage:`url('/images/${activeuser.image}')`}}>
                                    {/* <img src={`/images/${activeuser.image}`}></img> */}
            </div>
            <p>{activeuser.username} is typing ....</p>
        </div>:''
    }

    </div>
  )
}

export default MessageArea