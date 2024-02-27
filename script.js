const input = document.querySelector("#inp");
const btn = document.querySelector("#btn");
const taskList = document.querySelector("#task-list");

// Load tasks from local storage
document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTask(task);
    });
});

btn.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText === "") {
        alert("Please Enter a Task");
    } else {
        addTask(taskText);
        // Saving the task to local storage
        saveTask(taskText);
        input.value = "";
    }
});

// Function to add task
function addTask(taskText) {
    const newTaskItem = document.createElement("div");
    newTaskItem.classList.add("task-item");
    newTaskItem.innerHTML = `
        <span>${taskText}</span>
        <i class="fas fa-check-circle"></i>
        <i class="fas fa-trash"></i>
    `;
    taskList.appendChild(newTaskItem);

    // Add event listener to mark task as completed
    newTaskItem.querySelector(".fa-check-circle").addEventListener("click", () => {
        newTaskItem.classList.toggle("completed");
        updateLocalStorage();
    });

    // Add event listener to delete task
    newTaskItem.querySelector(".fa-trash").addEventListener("click", () => {
        newTaskItem.remove();
        updateLocalStorage();
    });
}

// Function to save task to local storage
function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to update local storage
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(task => {
        tasks.push(task.querySelector("span").textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
