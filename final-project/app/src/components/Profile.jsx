import { useState } from 'react'
import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'
import DeleteUser from './DeleteUser'

function Profile() {
  const [view, setView] = useState(null)

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

  const handleDeleteUserClick = () => {
    if (view === 'delete-user')
      setView(null)
    else
      setView('delete-user')
  }

  return <div className="profile-container">

    <div className='profile-wrapper-button'>
      <div>
        <button className="profile-input-button" onClick={handleChangeNameClick}>Change Name</button>
        {view === 'change-name' && <ChangeName />}
      </div>
      <div>
        <button className="profile-input-button" onClick={handleChangePasswordClick}>Change Password</button>
        {view === 'change-password' && <ChangePassword />}
      </div>
      <div>
        <button className="profile-input-button" onClick={handleDeleteUserClick}>Delete user</button>
        {view === 'delete-user' && <DeleteUser />}
      </div>
    </div>
  </div>
}

export default Profile



