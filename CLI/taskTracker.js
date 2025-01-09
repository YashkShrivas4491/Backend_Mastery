const fs = require("fs");
const path = require("path");

// Path to the JSON file storing tasks
const tasksFilePath = path.join(__dirname, "tasks.json");

// Helper function to load tasks from the JSON file
function loadTasks() {
  if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(tasksFilePath, JSON.stringify([])); // Initialize with empty array if file doesn't exist
  }
  const data = fs.readFileSync(tasksFilePath, "utf8");
  return JSON.parse(data);
}

// Helper function to save tasks to the JSON file
function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Function to add a new task
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1, // Auto-increment ID
    description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Function to update a task description by ID
function updateTask(id, newDescription) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === parseInt(id));
  if (!task) {
    return console.log("Task not found.");
  }

  task.description = newDescription;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task ${id} updated successfully.`);
}

// Function to delete a task by ID
function deleteTask(id) {
  let tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex === -1) {
    return console.log("Task not found.");
  }

  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  console.log(`Task ${id} deleted successfully.`);
}

// Function to mark a task as in-progress or done by ID
function markTask(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((task) => task.id === parseInt(id));
  if (!task) {
    return console.log("Task not found.");
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task ${id} marked as ${status}.`);
}

// Function to list tasks by status or all tasks
function listTasks(status = null) {
  const tasks = loadTasks();
  const filteredTasks = status
    ? tasks.filter((task) => task.status === status)
    : tasks;

  if (filteredTasks.length === 0) {
    return console.log(`No tasks${status ? ` with status '${status}'` : ""}.`);
  }

  console.log("Tasks:");
  filteredTasks.forEach((task) =>
    console.log(`ID: ${task.id} | ${task.description} | ${task.status}`)
  );
}

// Command-line argument parsing and function execution
const args = process.argv.slice(2);

switch (args[0]) {
  case "add":
    addTask(args[1]);
    break;
  case "update":
    updateTask(args[1], args[2]);
    break;
  case "delete":
    deleteTask(args[1]);
    break;
  case "mark-in-progress":
    markTask(args[1], "in-progress");
    break;
  case "mark-done":
    markTask(args[1], "done");
    break;
  case "list":
    listTasks(args[1]);
    break;
  default:
    console.log(
      "Command not recognized. Use add, update, delete, mark-in-progress, mark-done, or list."
    );
}
