import '../index.css'

const Notification=({message, style})=>{
    if (message===null){return null}

    return(
        <div className={message?style:''}>
            {message}
        </div>
    )
}

export default Notification
