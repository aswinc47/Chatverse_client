import React from 'react'

function Friend({friend}) {
  return (
    <div className='friend'>
        <div className='activefriendsingle leftavatar' style={{backgroundImage:`url('/images/${friend.friendDetails.image}')`}}>
            {/* <img src={`/images/${friend.image}`}></img> */}
        </div>
        <div className='leftfriendnamemsg'>
          <h6 className='friendname'>{friend.friendDetails.username}</h6>
          {
            friend.msgDetails?
              friend.msgDetails.senderId === friend.friendDetails._id ? <div className='newmessagediv'><h6 className='newMessage'>
              {friend.msgDetails.message.image ? 'New Image' : friend.msgDetails.message.text }
            </h6></div> : <div className='newmessagediv'><h6 className='newMessage'>
              {friend.msgDetails.message.image ? 'New Image' : `You : ${friend.msgDetails.message.text}` }
            </h6></div>  : ''
          }
        </div>
    </div>
  )
}

export default Friend
// 6521