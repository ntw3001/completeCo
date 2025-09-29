function simulateAsyncTask() {
  console.log("Task started")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log("Task finished"))
    }, 2000)
  })
}
simulateAsyncTask()

function simulateMultipleTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(console.log("Task 1 finished")
        )
    }, 1000)
        setTimeout(() => {
        resolve(console.log("Task 2 finished")
        )
    }, 2000)
        setTimeout(() => {
        resolve(console.log("Task 3 finished")
        )
    }, 3000)
})
}
simulateMultipleTasks()

function fetchDataWithCallback(callback) {
  setTimeout(() => {
    const data = "Fetched data"
    callback(data)
  }, 2000)
}
fetchDataWithCallback(console.log)
