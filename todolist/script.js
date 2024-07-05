document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            deleteTask(e.target.parentElement);
        } else if (e.target.classList.contains('edit')) {
            editTask(e.target.parentElement);
        } else if (e.target.classList.contains('complete')) {
            toggleComplete(e.target.parentElement);
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('complete');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        saveTasks();
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks();
    }

    function editTask(taskItem) {
        const newTask = prompt('Edit your task', taskItem.firstChild.textContent);
        if (newTask !== null) {
            taskItem.firstChild.textContent = newTask;
            saveTasks();
        }
    }

    function toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.text;
                if (task.completed) {
                    li.classList.add('completed');
                }
                const completeBtn = document.createElement('button');
                completeBtn.textContent = 'Complete';
                completeBtn.classList.add('complete');
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.classList.add('edit');
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete');
                li.appendChild(completeBtn);
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }
    }
});
