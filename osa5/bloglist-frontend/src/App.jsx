import { useState, useEffect, useRef } from 'react'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import loginService from './services/login'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Add from './components/Add'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'

const App = () => {
    const dispatch = useDispatch()
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const updateBlogs=()=>{dispatch(initializeBlogs())}

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        updateBlogs()
    }, [])

    const handleUsername = (event) => setUsername(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)

    const logOut = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
            dispatch(
                setNotification(['logged in successfully', 'success'], 3000),
            )
        } catch (exception) {
            dispatch(
                setNotification(['wrong username or password', 'error'], 3000),
            )
        }
    }

    const createBlogRef = useRef()

    const createBlog = async (blogObject) => {
        try {
            const blog = await blogService.create(blogObject)
            createBlogRef.current.toggleVisibility()
            updateBlogs()
            dispatch(
                setNotification(
                    [
                        `${blogObject.title} by ${blogObject.author} added`,
                        'success',
                    ],
                    3000,
                ),
            )
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification(['failed to add blog', 'error'], 3000))
        }
    }

    const handleLike = async (id) => {
        const likedBlog = blogs.filter((blog) => blog.id === id)[0]
        const newBlog = {
            user: likedBlog.user,
            title: likedBlog.title,
            author: likedBlog.author,
            url: likedBlog.url,
            likes: likedBlog.likes + 1,
            isVisible: false,
        }
        const response = await blogService.update(newBlog, id)
    }

    const handleDelete = async (id) => {
        const toBeDeleted = blogs.filter((blog) => blog.id === id)[0]
        if (
            window.confirm(
                `Remove ${toBeDeleted.title} by ${toBeDeleted.author}?`,
            )
        ) {
            try {
                const response = await blogService.deleteBlog(id)
                dispatch(
                    setNotification(['deleted successfully', 'success'], 3000),
                )
            } catch {
                dispatch(setNotification(['failed to delete', 'error'], 3000))
            }
        }
    }

    const toggleBlog = (id) => {
        setBlogs(
            blogs.map((blog) =>
                blog.id === id ? { ...blog, isVisible: !blog.isVisible } : blog,
            ),
        )
    }

    if (user === null) {
        return (
            <div>
                <h1>bloglist</h1>
                <Toggable buttonLabel="login">
                    <Notification style={'error'} />
                    <h2>login to application:</h2>
                    <Login
                        handleLogin={handleLogin}
                        username={username}
                        handleUsername={handleUsername}
                        password={password}
                        handlePassword={handlePassword}
                    />
                </Toggable>
            </div>
        )
    }

    return (
        <div>
            <Notification />
            <h1>bloglist</h1>
            <div>
                {user.name} logged in <button onClick={logOut}>logout</button>
            </div>
            <Toggable buttonLabel="new blog" ref={createBlogRef}>
                <h2>create new</h2>
                <Add createBlog={createBlog} />
            </Toggable>
            <BlogList user={user}/>
        </div>
    )
}

export default App
