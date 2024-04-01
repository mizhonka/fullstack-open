import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'
import { like, toggle, remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = ({ user }) => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state['blogs'])

    const toggleBlog = (id, visibility) => {
        dispatch(toggle(id, visibility))
    }

    const handeLike = (id) => {
        dispatch(like(id))
    }

    const handleDelete = (id) => {
        const toBeDeleted = blogs.filter((blog) => blog.id === id)[0]
        if (
            window.confirm(
                `Remove ${toBeDeleted.title} by ${toBeDeleted.author}?`,
            )
        ) {
            try {
                dispatch(remove(id))
                dispatch(
                    setNotification(['deleted successfully', 'success'], 3000),
                )
            } catch {
                dispatch(setNotification(['failed to delete', 'error'], 3000))
            }
        }
    }

    return (
        <>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    handleDelete={() => handleDelete(blog.id)}
                    handleLike={() => handeLike(blog.id)}
                    toggleBlog={toggleBlog}
                />
            ))}
        </>
    )
}

export default BlogList
