document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('li');
    newTask.className = 'task';
    newTask.innerHTML = `
        <span>${taskText}</span>
        <button class="delete" onclick="deleteTask(this)">x</button>
    `;
    newTask.addEventListener('click', () => {
        newTask.classList.toggle('completed');
    });
    taskList.appendChild(newTask);
    taskInput.value = '';
    saveTasks();
}

function deleteTask(element) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(element.parentElement);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList .task').forEach(task => {
        tasks.push({
            text: task.querySelector('span').innerText,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.className = 'task';
        if (task.completed) {
            newTask.classList.add('completed');
        }
        newTask.innerHTML = `
            <span>${task.text}</span>
            <button class="delete" onclick="deleteTask(this)">x</button>
        `;
        newTask.addEventListener('click', () => {
            newTask.classList.toggle('completed');
            saveTasks();
        });
        document.getElementById('taskList').appendChild(newTask);
    });
}

// Load tasks on page load
window.onload = loadTasks;
