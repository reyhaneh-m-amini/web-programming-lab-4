const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");

const taskManager = new TaskManager();

function renderTasks() {
    taskList.innerHTML = "";

    taskManager.tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        const title = document.createElement("span");
        title.textContent = task.title;

        
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle";

        toggleBtn.addEventListener("click", () => {
            taskManager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            taskManager.removeTask(task.id);
            renderTasks();
        });

        taskDiv.appendChild(title);
        taskDiv.appendChild(toggleBtn);
        taskDiv.appendChild(deleteBtn);
        taskList.appendChild(taskDiv);

    });
}

loadTasksBtn.addEventListener("click", async () => {
    statusMessage.textContent = "Loading tasks...";

    try {
        const rawTasks = await fetchTasks();

        const jsonTasks = JSON.stringify(rawTasks);
        const parsedTasks = JSON.parse(jsonTasks);

        taskManager.setTasks(
            parsedTasks.map(item => new Task(item.id, item.title, item.completed))
        );


        renderTasks();
        statusMessage.textContent = "";
    } catch (error) {
        statusMessage.textContent = "Failed to load tasks.";
    }
});
