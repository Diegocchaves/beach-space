import DeleteUser from './DeleteUser'

function Account() {


    return (
        <div className='account-delete-container'>
            <h1 className='account-delete'>Delete user</h1>
            {<DeleteUser />}
        </div>
    )
}

export default Account