import { useState } from 'react'
import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'
import { useParams } from 'react-router-dom'


function Profile() {
  const [view, setView] = useState(null)
  const { name } = useParams()


  //change image of the profile here

  const handleChangeNameClick = () => {
    if (view === 'change-name')
      setView(null)
    else
      setView('change-name')
  }

  const handleChangePasswordClick = () => {
    if (view === 'change-password')
      setView(null)
    else
      setView('change-password')
  }

  return <div className="profile-container">
    {/* Photo of the profile */}
    <div className='image-container' >
      <div className='image-wrapper'>
        <img src="dc.jpg" alt="photo" />
      </div>
      <div className='first-name'>
        <h1>{name}</h1>
      </div>
    </div>

    {/* change name buttom */}
    <div className='profile-wrapper-button'>
      <div className='Profile__buttons'>
        <button className="Input" onClick={handleChangeNameClick}>Change Name</button>
        {view === 'change-name' && <ChangeName />}
      </div>
      {/* change password buttom */}
      <div className='Profile__buttons'>
        <button className="Input" onClick={handleChangePasswordClick}>Change Password</button>
        {view === 'change-password' && <ChangePassword />}
      </div>

    </div>
  </div >
}

export default Profile



