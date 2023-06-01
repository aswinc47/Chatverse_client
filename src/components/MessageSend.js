import { IconButton, TextField } from '@mui/material'
import React from 'react'
import { FaAddressBook, FaFileImage,FaHeart, FaPlusCircle, FaRegSmile, FaServer, FaTelegramPlane } from 'react-icons/fa'

function MessageSend({InputHandle,newMessage,sendMessage,emoji,imageSend}) {

    const emojies = ['😂','😄','😃','😉',
    '😍','😙','😜','😳','😁','😔','😒',
    '😭','😱','😠','😖','😋','❤️️','💔','🤩',
    '🥺️','🤨','🥰️','🥵️','🥶️','😐'
]

  return (
    <div className='messagesenddiv'>
    <input type='checkbox' id='emoji' ></input>
        <div>
            <IconButton className='sendicon'><label htmlFor='pic'><FaFileImage/></label></IconButton>      
            <input type='file' id='pic' className='hidden' onChange={imageSend} />
        </div>
        <div className='messagesendinput'>
            <input className='messageinput' placeholder='Aa' onChange={InputHandle} value={newMessage}>
            </input>
            <label htmlFor='emoji' className='emojiicon'>
                <FaRegSmile/>
            </label>
        </div>
        <div className='emojisection'>
            <div className='emoji'>
                {
                    emojies.map(e => <span onClick={()=>{emoji(e)}}>{e}</span>)
                }
            </div>
        </div>

        <div>
            <IconButton className='sendicon' onClick={sendMessage}>{newMessage?<FaTelegramPlane/>:<FaHeart/>}</IconButton>
        </div>
    </div>
    
  )
}

export default MessageSend