let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    
    input.value = '';
    showTasks();
}

function deleteTask(id) {
    if (confirm('Delete this task?')) {
        tasks = tasks.filter(task => task.id != id);
        showTasks();
    }
}

function toggleTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }
    showTasks();
}

function showTasks() {
    const taskList = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<p>No tasks yet! Add one above.</p>';
        return;
    }
    
    let html = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        html += `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <span onclick="toggleTask(${task.id})" style="cursor:pointer">
                    ${task.completed ? '✅' : '⭕'}
                </span>
                <span class="task-text">${task.text}</span>
                <button onclick="deleteTask(${task.id})">🗑️</button>
            </li>
        `;
    }
    
    taskList.innerHTML = html;
}

window.onload = function() {
    document.getElementById('addBtn').onclick = addTask;
    
    document.getElementById('taskInput').onkeypress = function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    };
    
    showTasks();
};
