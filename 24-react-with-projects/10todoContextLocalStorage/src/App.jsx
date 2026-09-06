import { useState } from 'react'
import { TodoProvider } from './contexts'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [ {id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === todo.id)))
  }

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteToDo, toggleComplete }}>
      <h1 className='text-3xl font-bold underline'>
        How do you do
      </h1>
    </TodoProvider>
  )
}

export default App
