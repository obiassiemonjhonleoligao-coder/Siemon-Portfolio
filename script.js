document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link, .logo, [data-target]');
    const pages = document.querySelectorAll('.page-section, .hero-screen');
    const viewTaskAppBtn = document.querySelector('.view-task-app');
    const viewWeatherAppBtn = document.querySelector('.view-weather-app');
    const backToProjectsBtns = document.querySelectorAll('.back-to-projects');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Function to switch visible pages smoothly
    function showPage(targetId) {
        pages.forEach(page => {
            if (page.id === targetId) {
                page.classList.add('active-page');
            } else {
                page.classList.remove('active-page');
            }
        });

        // Update active highlights on navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });

        // Close mobile drawer menu if open
        if (navMenu) {
            navMenu.classList.remove('active');
        }

        window.scrollTo(0, 0);
    }

    // Attach click listeners to all navigation and data-target items
    navLinks.forEach(item => {
        item.addEventListener('click', (e) => {
            const target = item.getAttribute('data-target');
            if (target) {
                e.preventDefault();
                showPage(target);
            }
        });
    });

    // "View Project" for Task Manager App -> opens task manager screen
    if (viewTaskAppBtn) {
        viewTaskAppBtn.addEventListener('click', () => {
            showPage('task-manager-app');
        });
    }

    // "View Project" for Weather Dashboard -> opens weather screen
    if (viewWeatherAppBtn) {
        viewWeatherAppBtn.addEventListener('click', () => {
            showPage('weather-app');
        });
    }

    // "Back to Projects" buttons
    backToProjectsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('projects');
        });
    });

    // Mobile navigation toggle button
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- Task Manager Logic ---
    const taskInput = document.getElementById('task-input');
    const reminderInput = document.getElementById('reminder-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = [
        { text: 'Finish portfolio CSS styling', reminder: 'Today, 8:00 PM', completed: false },
        { text: 'Study Computer Engineering modules', reminder: 'Tomorrow, 10:00 AM', completed: true }
    ];

    function renderTasks() {
        if (!taskList) return;
        taskList.innerHTML = '';
        if (tasks.length === 0) {
            taskList.innerHTML = `<li style="text-align: center; color: var(--text-muted); padding: 1rem;">No tasks yet. Add one above!</li>`;
            return;
        }

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="task-info">
                    <span class="task-title">${task.text}</span>
                    <span class="task-reminder">Reminder: ${task.reminder || 'None'}</span>
                </div>
                <div class="task-actions">
                    <button class="task-btn complete-btn" onclick="window.toggleTask(${index})">${task.completed ? 'Undo' : 'Done'}</button>
                    <button class="task-btn delete-btn" onclick="window.deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const text = taskInput.value.trim();
            const reminder = reminderInput.value.trim();
            if (text) {
                tasks.push({ text, reminder: reminder || 'No reminder set', completed: false });
                taskInput.value = '';
                reminderInput.value = '';
                renderTasks();
            } else {
                alert('Please enter a task name.');
            }
        });
    }

    renderTasks();

    // --- Weather Dashboard Logic ---
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherCity = document.getElementById('weather-city');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherCondition = document.getElementById('weather-condition');
    const weatherDetails = document.getElementById('weather-details');

    const mockWeatherData = {
        "manila": { temp: "31°C", condition: "Partly Cloudy", humidity: "70%", wind: "12 km/h" },
        "tokyo": { temp: "18°C", condition: "Sunny", humidity: "45%", wind: "8 km/h" },
        "new york": { temp: "22°C", condition: "Clear Sky", humidity: "50%", wind: "15 km/h" },
        "london": { temp: "14°C", condition: "Light Rain", humidity: "85%", wind: "20 km/h" },
        "paris": { temp: "17°C", condition: "Breezy", humidity: "60%", wind: "14 km/h" }
    };

    if (getWeatherBtn) {
        getWeatherBtn.addEventListener('click', () => {
            const cityName = cityInput.value.trim().toLowerCase();
            if (!cityName) {
                alert('Please enter a city name.');
                return;
            }

            if (mockWeatherData[cityName]) {
                const data = mockWeatherData[cityName];
                weatherCity.textContent = cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1);
                weatherTemp.textContent = data.temp;
                weatherCondition.textContent = data.condition;
                weatherDetails.textContent = `Humidity: ${data.humidity} | Wind: ${data.wind}`;
            } else {
                const randomTemp = Math.floor(Math.random() * 20) + 10;
                const conditions = ["Sunny", "Rainy", "Cloudy", "Clear Sky", "Thunderstorm"];
                const randomCond = conditions[Math.floor(Math.random() * conditions.length)];
                weatherCity.textContent = cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1);
                weatherTemp.textContent = `${randomTemp}°C`;
                weatherCondition.textContent = randomCond;
                weatherDetails.textContent = `Humidity: ${Math.floor(Math.random() * 40) + 40}% | Wind: ${Math.floor(Math.random() * 15) + 5} km/h`;
            }
            cityInput.value = '';
        });
    }
});