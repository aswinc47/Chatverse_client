import React from 'react'
import { FaChevronDown } from 'react-icons/fa'

function InfoArea({activeuser}) {
  return (
    <div>
        <div className='infouser'>
            <div className='userinfoimgdiv'>
                <img src={`/images/${activeuser.image}`}></img>
            </div>
            <h3 className='userinfoname'>{activeuser.username}</h3>
            <h6 className='userinfoactive'>Active now</h6>
        </div>
        <div className='infoaccoridan'>

        {/* accordian */}
            <div className='customisechat accordian'>
                <h6 className='accordiantext'>Customise chat</h6>
                <FaChevronDown/>
            </div>
            <div className='customisechat accordian'>
                <h6 className='accordiantext'>Shared media</h6>
                <label htmlFor='sharedimg'><FaChevronDown/></label>
            </div>
            <input type='checkbox' id='sharedimg' ></input>
            <div className='sharedimg'>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
                <img src='https://www.sragenkab.go.id/assets/images/demo/user-8.jpg'></img>
            </div>
            <div className='customisechat accordian'>
                <h6 className='accordiantext'>Privacy and support</h6>
                <FaChevronDown/>
            </div>
        </div>
    </div>
)
}

export default InfoArea