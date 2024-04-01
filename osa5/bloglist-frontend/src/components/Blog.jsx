import "../index.css";
import PropTypes from "prop-types";

const Blog = ({ blog, toggleBlog, handleLike, handleDelete, user }) => {
    const showDelete = {
        display: blog.user.username === user.username ? "" : "none",
    };

    if (blog.isVisible) {
        return (
            <div className="blogStyle">
                <p>
                    {blog.title} {blog.author}{" "}
                    <button onClick={toggleBlog}>hide</button>{" "}
                </p>
                <p>{blog.url}</p>
                <p>
                    likes {blog.likes}{" "}
                    <button onClick={handleLike}>like</button>
                </p>
                <p>{blog.user.name}</p>
                <button style={showDelete} onClick={handleDelete}>
                    delete
                </button>
            </div>
        );
    }

    return (
        <div className="blogStyle">
            <p>
                {blog.title} {blog.author}{" "}
                <button onClick={toggleBlog}>view</button>
            </p>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    toggleBlog: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default Blog;
