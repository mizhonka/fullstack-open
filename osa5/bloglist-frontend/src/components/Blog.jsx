import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { like, remove, comment } from '../reducers/blogReducer'
import { handleComment } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useParams().id
    const blogs = useSelector((state) => state['blogs'])
    const curComment = useSelector((state) => state['comment'])
    const blog = blogs.find((b) => b.id === id)

    const handleLike = () => {
        dispatch(like(id))
    }

    const handleDelete = () => {
        if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            try {
                dispatch(remove(id))
                dispatch(
                    setNotification(['deleted successfully', 'success'], 3000),
                )
                navigate('/')
            } catch {
                dispatch(setNotification(['failed to delete', 'error'], 3000))
            }
        }
    }

    const typeComment = (event) => {
        dispatch(handleComment(event.target.value))
    }

    const postComment = (event) => {
        event.preventDefault()
        dispatch(comment(id, curComment))
        dispatch(handleComment(''))
    }

    if (!blog) {
        return null
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <p>
                {blog.likes} likes <button onClick={handleLike}>like</button>
            </p>
            <p>added by {blog.author}</p>
            <button onClick={handleDelete}>delete</button>
            <h2>comments</h2>
            <form onSubmit={postComment}>
                <input type="text" value={curComment} onChange={typeComment} />
                <button type="submit">add comment</button>
            </form>
            <ul>
                {blog.comments.map((c) => (
                    <li key={c}>{c}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog
