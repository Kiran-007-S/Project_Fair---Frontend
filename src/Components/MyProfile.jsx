import React from 'react'

function MyProfile() {
  return (
    <div>
        <div className='d-flex flex-column align-items-center'>
        <h3>My Profile</h3>
        <label>
            <input type="file" style={{display:"none"}}/>
            <img src="https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png" width={'100px'} height={'100px'} alt="" />
        </label>
        <div className="w-50 d-flex-column justify-content-center align-items-center">
        <input type="text" className='form-control mb-3' placeholder='User Name' />
        <input type="text" className='form-control mb-3' placeholder='Git Hub' />
        <input type="text" className='form-control mb-3' placeholder='LinkedIn' />
        </div>
        </div>
    </div>
  )
}

export default MyProfile

