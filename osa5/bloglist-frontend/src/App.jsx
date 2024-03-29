import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import Login from './components/Login'
import Blog from './components/Blog'
import Add from './components/Add'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [user, setUser]=useState(null)

  const [successMessage, setSuccessMessage]=useState('')
  const [errorMessage, setErrorMessage]=useState('')

  const updateBlogs=async () => {
    const initialBlogs=await blogService.getAll()
    initialBlogs.sort((a, b) => a.likes - b.likes)
    setBlogs(initialBlogs)
  }

  useEffect(() => {
    updateBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      updateBlogs()
    }
  },[])

  const handleUsername=event => setUsername(event.target.value)
  const handlePassword=event => setPassword(event.target.value)

  const logOut=() => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleLogin=async event => {
    event.preventDefault()

    try{
      const user=await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      updateBlogs()
      setUsername('')
      setPassword('')
      setSuccessMessage('logged in successfully')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  const createBlogRef=useRef()

  const createBlog=async (blogObject) => {
    try{
      const blog=await blogService.create(blogObject)
      updateBlogs()
      createBlogRef.current.toggleVisibility()
      setSuccessMessage(`${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (exception){
      console.log(exception)
      setErrorMessage('failed to add blog')
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  const handleLike=async (id) => {
    const likedBlog=blogs.filter(blog => blog.id===id)[0]
    const newBlog={
      user: likedBlog.user,
      title: likedBlog.title,
      author: likedBlog.author,
      url: likedBlog.url,
      likes: likedBlog.likes+1,
      isVisible: false
    }
    const response=await blogService.update(newBlog, id)
    updateBlogs()
  }

  const handleDelete=async id => {
    const toBeDeleted=blogs.filter(blog => blog.id===id)[0]
    if(window.confirm(`Remove ${toBeDeleted.title} by ${toBeDeleted.author}?`)){
      try{
        const response=await blogService.deleteBlog(id)
        updateBlogs()
        setSuccessMessage('deleted successfully')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
      catch{
        setErrorMessage('failed to delete')
        setTimeout(() => setErrorMessage(''), 3000)
      }
    }
  }

  const toggleBlog=id => {
    setBlogs(blogs.map(blog =>
      blog.id===id
        ? { ...blog, isVisible: !blog.isVisible }
        : blog
    ))
  }

  if(user===null){
    return (
      <div>
        <h1>bloglist</h1>
        <Toggable buttonLabel='login'>
          <Notification message={errorMessage} style={'error'}/>
          <h2>login to application:</h2>
          <Login handleLogin={handleLogin} username={username} handleUsername={handleUsername} password={password} handlePassword={handlePassword}/>
        </Toggable>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} style={'error'}/>
      <Notification message={successMessage} style={'success'}/>
      <h1>bloglist</h1>
      <div>{user.name} logged in <button onClick={logOut}>logout</button></div>
      <Toggable buttonLabel='new blog' ref={createBlogRef}>
        <h2>create new</h2>
        <Add createBlog={createBlog}/>
      </Toggable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} toggleBlog={() => toggleBlog(blog.id)} handleLike={() => handleLike(blog.id)}
          user={user} handleDelete={() => handleDelete(blog.id)}/>
      )}
    </div>
  )
}

export default App
