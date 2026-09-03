import { createContext, useContext } from 'react'


export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: 'todo measenge',
      completed: false
    }
  ],
  addTodo:(todo) => {},
  updateTodo: (id, todo) => {},
  deletetodo: (id) => {},
  toggleComplete: (id) => {}
})
