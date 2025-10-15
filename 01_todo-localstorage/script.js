document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input")
  const addTaskButton = document.getElementById("add-task-btn")
  const todoList = document.getElementById("todo-list")

  // Either retrieve the JSON that was stringified and stored in the saveTasks function, or create a new empty array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []

  tasks.forEach(task => renderTask(task))

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim()
    if(taskText === "") return
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    }
    tasks.push(newTask)
    todoInput.value = ""
    console.log(tasks)
    renderTask(newTask)
    saveTasks()
  })

  function renderTask(task) {
    const li = document.createElement("li")
    li.setAttribute("data-id", task.id)
    if(task.completed) {
      li.classList.add("completed")
    }
    li.innerHTML = `
      <span>${task.text}</span>
      <button id="delete-btn">Delete</button>
    `
    li.addEventListener("click", (e) => {
      if(e.target.tagName === "BUTTON") return // Ignore clicks on the delete button
      task.completed = !task.completed
      li.classList.toggle("completed")
      saveTasks()
    })

    li.querySelector("#delete-btn").addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id)
      li.remove()
      saveTasks()
    })

    todoList.appendChild(li)
  }

  // Stringify the task list and save to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

})
