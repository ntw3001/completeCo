import { useState } from 'react'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import UserContextProvider from './context/UserContextProvider.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserContextProvider>
        <h1>React Looka Me</h1>
        <Login />
        <Profile />
      </UserContextProvider>
    </>
  )
}

export default App
