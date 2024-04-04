import { useSelector } from "react-redux"

const UserList=()=>{
    const allUsers=useSelector((state)=>state['users'])

    return (
        <>
            <h1>Users</h1>
            <div className='row'>
                <div className="column">
                    <b>name</b>
                    {allUsers.map(u=>(
                        <p key={u.id}>{u.name}</p>
                    ))}
                </div>
                <div className="column">
                    <b>blogs created</b>
                    {allUsers.map(u=>(
                        <p key={u.id}>{u.blogs.length}</p>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserList
