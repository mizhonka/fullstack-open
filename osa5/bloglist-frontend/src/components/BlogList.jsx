import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const blogs = useSelector((state) => state['blogs'])

    return (
        <>
            {blogs.map((blog) => (
                <p key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </p>
            ))}
        </>
    )
}

export default BlogList
