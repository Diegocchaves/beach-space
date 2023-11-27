import React, { useState } from 'react'
import DeleteUser from './DeleteUser'

function Account() {
    const [view, setView] = useState(null)

    const handleDeleteUserClick = () => {
        if (view === 'delete-user')
            setView(null)
        else
            setView('delete-user')
    }

    return (
        <div>
            <button className="profile-input-button" onClick={handleDeleteUserClick}>Delete user</button>
            {view === 'delete-user' && <DeleteUser />}
        </div>
    )
}

export default Account