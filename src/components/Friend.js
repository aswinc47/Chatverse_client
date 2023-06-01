import React from 'react'

function Friend({friend}) {
  return (
    <div className='friend'>
        <div className='activefriendsingle' style={{backgroundImage:`url('/images/${friend.image}')`}}>
            {/* <img src={`/images/${friend.image}`}></img> */}
        </div>
        <div>
          <h6 className='friendname'>{friend.username}</h6>
        </div>
    </div>
  )
}

export default Friend
// 6521