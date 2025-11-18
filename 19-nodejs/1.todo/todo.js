import * as fs from 'fs'
const filePath = './tasks.json';

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
}

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({task});
  saveTasks(tasks);
  console.log(`Added task: "${task}"`);
}

const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach ((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
}

const command = process.argv[2];
const argument = process.argv[3];

if(command === 'add') {
  addTask(argument);
} else if(command === 'list') {
  listTasks();
} else if(command === 'remove') {
  removeTask(argument);
} else {
  console.log('Unknown command. Use "add", "list", or "remove".');
}
