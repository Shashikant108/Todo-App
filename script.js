// Select elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display tasks
function displayTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.text}
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Add new task
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText });
        taskInput.value = '';
        updateLocalStorage();
        displayTasks();
    }
});

// Edit task
function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        updateLocalStorage();
        displayTasks();
    }
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    displayTasks();
}

// Search tasks
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(query));
    displayTasks(filteredTasks);
});

// Update LocalStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial display
displayTasks();
