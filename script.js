// Handle user registration
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const taskForm = document.getElementById('taskForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Store user data in LocalStorage
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registration successful! You can now login.');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'tasks.html';
            } else {
                alert('Invalid login credentials');
            }
        });
    }

    if (taskForm) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            alert('Please login first');
            window.location.href = 'login.html';
        }

        const taskList = document.getElementById('taskList');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        const renderTasks = () => {
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.textContent = task;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = () => {
                    tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    renderTasks();
                };
                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        };

        renderTasks();

        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newTask = document.getElementById('newTask').value;
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            document.getElementById('newTask').value = '';
            renderTasks();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }
});