// Display today's date
const dateDisplay = document.getElementById("date-display");
const today = new Date();
dateDisplay.textContent = today.toDateString();

// Task Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Add task
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


// Display Today's Date
document.getElementById("date-display").textContent = new Date().toDateString();

// Handle Checkbox Storage
const checkboxes = document.querySelectorAll(".task");

checkboxes.forEach(box => {
  const key = box.dataset.category + "-" + box.parentElement.textContent.trim();
  const saved = localStorage.getItem(key);
  if (saved === "true") box.checked = true;

  box.addEventListener("change", () => {
    localStorage.setItem(key, box.checked);
    renderCalendar(); // update calendar on change
  });
});

// Simple Calendar Render (last 7 days)
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dayBox = document.createElement("div");
    dayBox.classList.add("calendar-day");
    dayBox.textContent = date.toDateString().slice(0, 10);

    // Show ✔️ if any task was completed
    checkboxes.forEach(box => {
      const key = box.dataset.category + "-" + box.parentElement.textContent.trim();
      if (localStorage.getItem(key) === "true") {
        dayBox.classList.add("completed");
      }
    });

    calendar.appendChild(dayBox);
  }
}

renderCalendar();


// Handle Adding Custom Tasks by Category
document.querySelectorAll(".add-custom").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    const input = button.previousElementSibling;
    const taskText = input.value.trim();

    if (!taskText) return;

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task";
    checkbox.dataset.category = category;

    const taskKey = category + "-" + taskText;
    checkbox.checked = localStorage.getItem(taskKey) === "true";

    checkbox.addEventListener("change", () => {
      localStorage.setItem(taskKey, checkbox.checked);
      renderCalendar();
    });

    label.appendChild(checkbox);
    label.append(taskText);

    // Find the correct card for this category
    const card = document.querySelector(`.card.${category}`);
    const customTaskSection = card.querySelector(".custom-task");
    card.insertBefore(label, customTaskSection);

    // Save initial unchecked state
    localStorage.setItem(taskKey, false);
    input.value = "";
    renderCalendar();
  });
});
