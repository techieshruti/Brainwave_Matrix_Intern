// Display today's date
const dateDisplay = document.getElementById("date-display");
const today = new Date();
dateDisplay.textContent = today.toDateString();

// Task Elements (for general task list if used)
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Add task (for general task list)
if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    // Complete on click
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.classList.add("task-btn");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
    taskInput.value = "";
  });
}

// Reusable function to add delete button to label-based tasks
function addDeleteButton(label, checkbox, taskKey) {
  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑";
  delBtn.className = "task-btn";
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    localStorage.removeItem(taskKey);
    label.remove();
    renderCalendar();
  });
  label.appendChild(delBtn);
}

// Handle Checkbox Storage (static checkboxes)
function initializeCheckboxes() {
  const checkboxes = document.querySelectorAll(".task");

  checkboxes.forEach(box => {
    const label = box.parentElement;
    const taskText = label.textContent.replace("🗑", "").trim();
    const key = box.dataset.category + "-" + taskText;
    const saved = localStorage.getItem(key);
    if (saved === "true") box.checked = true;

    box.addEventListener("change", () => {
      localStorage.setItem(key, box.checked);
      renderCalendar();
    });

    // Add delete button only if not already present
    if (!label.querySelector(".task-btn")) {
      addDeleteButton(label, box, key);
    }
  });
}
initializeCheckboxes();

// Simple Calendar Render (last 7 days)
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  calendar.innerHTML = "";
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dayBox = document.createElement("div");
    dayBox.classList.add("calendar-day");
    dayBox.textContent = date.toDateString().slice(0, 10);

    const checkboxes = document.querySelectorAll(".task");
    let anyCompleted = false;

    checkboxes.forEach(box => {
      const key = box.dataset.category + "-" + box.parentElement.textContent.replace("🗑", "").trim();
      if (localStorage.getItem(key) === "true") {
        anyCompleted = true;
      }
    });

    if (anyCompleted) {
      dayBox.classList.add("completed");
    }

    calendar.appendChild(dayBox);
  }
}
renderCalendar();

// 🔹 Custom Task Entry by Category
document.querySelectorAll(".add-custom").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const input = card.querySelector(".custom-input");
    const category = button.dataset.category;
    const taskText = input.value.trim();

    if (!taskText) return;

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task";
    checkbox.dataset.category = category;

    const taskKey = `${category}-${taskText}`;

    if (localStorage.getItem(taskKey) === "true") {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", () => {
      localStorage.setItem(taskKey, checkbox.checked);
      renderCalendar();
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(taskText));
    addDeleteButton(label, checkbox, taskKey); // Add delete button

    const customDiv = card.querySelector(".custom-task");
    card.insertBefore(label, customDiv);

    localStorage.setItem(taskKey, false);
    input.value = "";
    renderCalendar();
  });
});
