const Add = ({handleCreate, title, handleTitle, author, handleAuthor, url, handleUrl}) => (
    <div>
        <form onSubmit={handleCreate}>
            <div>title: <input type="text" value={title} onChange={handleTitle}/></div>
            <div>author: <input type="text" value={author} onChange={handleAuthor}/></div>
            <div>url: <input type="text" value={url} onChange={handleUrl}/></div>
            <div><button type="submit">create</button></div>
        </form>
    </div>
  )

export default Add
