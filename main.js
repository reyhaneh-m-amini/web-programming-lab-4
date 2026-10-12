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

        taskDiv.appendChild(title);
        taskList.appendChild(taskDiv);
    });
}

loadTasksBtn.addEventListener("click", async () => {
    statusMessage.textContent = "Loading tasks...";

    try {
        const tasks = await fetchTasks();

        taskManager.setTasks(
            tasks.map(item => new Task(item.id, item.title, item.completed))
        );

        renderTasks();
        statusMessage.textContent = "";
    } catch (error) {
        statusMessage.textContent = "Failed to load tasks.";
    }
});
