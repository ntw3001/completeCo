import { useState } from 'react'
import './App.css'

function App() {

  const [color, setColor] = useState("olive")

  // function changeColor(color) {
  //   setColor(color)
  // }

  return (
    <>
    <div className="w-full h-screen duration-200" style={{backgroundColor: color}}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 rounded 2xl">
          <button className="outline-none px-4 py-1 rounded-full text-black shadow-lg" onClick={() => setColor("red")}>red</button>
          <button className="outline-none px-4 py-1 rounded-full text-black shadow-lg" onClick={() => setColor("blue")}>blue</button>
          <button className="outline-none px-4 py-1 rounded-full text-black shadow-lg" onClick={() => setColor("yellow")}>yellow</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
