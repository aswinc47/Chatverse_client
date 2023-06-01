import { Badge } from '@mui/material'
import React from 'react'

function ActiveFriends({onlineusers,setActiveuser}) {
  return (
    <div className='activefriends my-3'>
    {
        onlineusers && onlineusers.length > 0 ? onlineusers.map(user=>(
            <Badge className='badge' color="success" variant='dot' anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} overlap='circular'>       
                <div onClick={()=>setActiveuser({
                  _id:user.userDetails.id,
                  email:user.userDetails.email,
                  image:user.userDetails.image,
                  username:user.userDetails.username
                })} className='activefriendsingle' style={{backgroundImage:`url('/images/${user.userDetails.image}')`}}>   
                </div>
            </Badge>
        )) : 'No one online'
    }
    </div>
  )
}

export default ActiveFriends