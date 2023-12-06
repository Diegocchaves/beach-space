import DeleteUser from './DeleteUser'

function Account() {


    return (
        <div className='account-delete-buttom-container'>
            <h1>Delete user</h1>
            {<DeleteUser />}
        </div>
    )
}

export default Account