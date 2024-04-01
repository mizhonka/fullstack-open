import { useSelector } from "react-redux"
import Blog from '../components/Blog'

const BlogList=({user})=>{
    const blogs=useSelector(state=>state['blogs'])

    return(
        <>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                />
            ))}
        </>
    )
}

export default BlogList
