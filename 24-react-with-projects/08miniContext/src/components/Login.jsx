import React from 'react'

function Login() {
  const [username, setUsername] = iseState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    // prevent refresh
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type = 'text'
        onChange = {(e) => setUsername(e.target.value)}
        placeholder = 'Username'
      />
      {''}
      <input
        type = 'password'
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
        placeholder = 'Password'
      />
      <button onClick = {handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default Login
