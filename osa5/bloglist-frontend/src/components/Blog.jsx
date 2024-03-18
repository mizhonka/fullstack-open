import '../index.css'

const Blog = ({ blog, toggleBlog }) => {

    if(blog.isVisible){
        return (
            <div className='blogStyle'>
                <p>{blog.title} {blog.author} <button onClick={toggleBlog}>hide</button> </p>
                <p>{blog.url}</p>
                <p>likes {blog.likes} <button>like</button></p>
                <p>{blog.user.name}</p>
            </div>
        )
    }

    return (
        <div className='blogStyle'>
            <p>{blog.title} {blog.author} <button onClick={toggleBlog}>view</button></p>
        </div>
    )
}

export default Blog