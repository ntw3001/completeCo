import { useState } from 'react'
import './App.css'

function App() {

  const [counter, setCounter] = useState(15)

  const addValue = () => {
    setCounter(counter + 1)
    console.log("counter plus, counter now", counter+1)
  }

  const removeValue = () => {
    setCounter(counter - 1)
    console.log("counter minus, counter now", counter-1)
  }

  return (
    <>
     <h1>React Course with Mick</h1>
     <h2>Counter value: {counter}</h2>
     <button onClick={addValue}>add value</button>
     <button onClick={removeValue}>remove value</button>
     <p>fooooter</p>
    </>
  )
}

export default App
