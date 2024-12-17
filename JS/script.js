const addButton = document.getElementById('addtask');  // Select the button for adding a task
const taskInput = document.getElementById('newtask');  // Select the input field for the new task
const taskList = document.getElementById('tasklist');  // Select the list where tasks will be displayed

// Load tasks from local storage when the page is loaded
loadTasks();

// Add an event listener to the add button, which triggers the addTask function when clicked
addButton.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const task = taskInput.value.trim(); 
    if (task) { 
        createTaskElement(task); 
        taskInput.value = ''; 
        saveTasks(); 
    } else {
        alert('Please enter a task'); 
    }
}

// Function to create a new task element and add it to the task list
function createTaskElement(task) {
    const taskElement = document.createElement('li'); //create list item for task
    taskElement.className = 'task-item';
    taskElement.textContent = task; 

    const deleteButton = document.createElement('button'); // Create a delete button
    deleteButton.textContent = 'Delete'; 
    deleteButton.className = 'btn btn-danger btn-sm delete-button'; 

    const editButton = document.createElement('button'); // Create an edit button
    editButton.textContent = 'Edit'; 
    editButton.className = 'btn btn-warning btn-sm edit-button'; 

    // Append the edit and delete buttons to the task element
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);
    taskList.appendChild(taskElement);

    // Add an event listener to the delete button
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskElement); 
        saveTasks(); 
    });

    // Add an event listener to the edit button
    editButton.addEventListener('click', function() {
        const updatedTask = prompt('Edit task', taskElement.firstChild.textContent);
        if (updatedTask) { 
            taskElement.firstChild.textContent = updatedTask; // Update the task text
            saveTasks(); // Call the function to save the updated task list
        }
    });
}

// Function to save the current tasks in local storage
function saveTasks() {
    const tasks = []; // Initialize an empty array to hold task strings
    const taskItems = document.querySelectorAll('#tasklist li'); // Select all task list items

    // Iterate over each task item and push its text content to the tasks array
    taskItems.forEach(item => {
        tasks.push(item.firstChild.textContent.trim()); // Add trimmed task text to the array
    });
    // Save the tasks array as a JSON string in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Use 'tasks' for clarity
}

// Function to load tasks from local storage and display them
function loadTasks() {
    const allTasks = localStorage.getItem('tasks'); 
    const tasks = allTasks ? JSON.parse(allTasks) : []; // Parse the JSON string into an array or use an empty array

    // Iterate over each task and create its corresponding element in the task list
    tasks.forEach(task => {
        createTaskElement(task); 
    });
}
