import { useState, useEffect } from 'react'
import loginService from './services/login'
import Login from './components/Login'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [user, setUser]=useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleUsername=event=>setUsername(event.target.value)
  const handlePassword=event=>setPassword(event.target.value)

  const handleLogin=async event=>{
        event.preventDefault()

        try{
            const user=await loginService.login({username, password})
            setUser(user)
            blogService.setToken(user.token)
            blogService.getAll().then(blogs =>
                setBlogs( blogs )
              )
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log('wrong credentials')
        }
    }

  if(user===null){
    return (
        <div>
            <h2>login to application:</h2>
            <Login handleLogin={handleLogin} username={username} handleUsername={handleUsername} password={password} handlePassword={handlePassword}/>
        </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
