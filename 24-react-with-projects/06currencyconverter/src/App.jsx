import { useState } from 'react'
import './App.css'
import InputBox from './assets/components/inputBox.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{backgroundImage: `url("https://images.unsplash.com/photo-1631631480669-535cc43f2327?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`}}>
        <InputBox />

      </div>
    </>
  )
}

export default App
