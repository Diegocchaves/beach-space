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

  return <div className="Container">

    <div className='Profile__buttons'>
      <button className="Input" onClick={handleChangeNameClick}>Change Name</button>
      {view === 'change-name' && <ChangeName />}

      <button className="Input" onClick={handleChangePasswordClick}>Change Password</button>
      {view === 'change-password' && <ChangePassword />}

      <button className="Input" onClick={handleDeleteUserClick}>Delete user</button>
      {view === 'delete-user' && <DeleteUser />}
    </div>
  </div>
}

export default Profile



