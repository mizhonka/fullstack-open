import '../index.css'

const Notification=({message, style})=>{
    return(
        <div className={message ? style : ''}>
            {message}
        </div>
    )
}

export default Notification
