import { useState } from 'react'
import PropTypes from 'prop-types'

const Add = ({ createBlog }) => {
  const [title, setTitle]=useState('')
  const [author, setAuthor]=useState('')
  const [url, setUrl]=useState('')

  const handleTitle=event => setTitle(event.target.value)
  const handleAuthor=event => setAuthor(event.target.value)
  const handleUrl=event => setUrl(event.target.value)

  const addBlog=(event) => {
    event.preventDefault()

    const newBlog={
      title: title,
      author: author,
      url: url,
      isVisible: false
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <form onSubmit={addBlog}>
        <div>title: <input type="text" value={title} onChange={handleTitle}/></div>
        <div>author: <input type="text" value={author} onChange={handleAuthor}/></div>
        <div>url: <input type="text" value={url} onChange={handleUrl}/></div>
        <div><button type="submit">create</button></div>
      </form>
    </div>
  )
}

Add.propTypes={
  createBlog: PropTypes.func.isRequired
}

export default Add
