const Login = ({handleLogin, username, handleUsername, password, handlePassword}) => (
    <div>
        <form onSubmit={handleLogin}>
            <div>username: <input type="text" value={username} onChange={handleUsername}/></div>
            <div>password: <input type="password" value={password} onChange={handlePassword}/></div>
            <div><button type="submit">login</button></div>
        </form>
    </div>
  )

  export default Login
