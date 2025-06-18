// Display today's date in the Journal section
const journalDate = document.getElementById("journal-date");
const today = new Date();
const formattedDate = today.toDateString(); // Example: "Wed Jun 18 2025"
journalDate.textContent = formattedDate;

//save entries
const journalInput = document.getElementById("journal-entry");
const moodSelect = document.getElementById("mood");
const saveBtn = document.getElementById("save-entry");
const feedback = document.getElementById("save-feedback");

const journalKey = `journal-${formattedDate}`; // Unique key for each day

// Load saved journal if exists
const saved = localStorage.getItem(journalKey);
if (saved) {
  const savedEntry = JSON.parse(saved);
  journalInput.value = savedEntry.text;
  moodSelect.value = savedEntry.mood;
}

// Save on button click
saveBtn.addEventListener("click", () => {
  const entry = journalInput.value.trim();
  const mood = moodSelect.value;

  if (!entry) return alert("Please write something in your journal!");

  const journalData = {
    text: entry,
    mood: mood,
    date: formattedDate
  };

  localStorage.setItem(journalKey, JSON.stringify(journalData));

  // Show feedback
  feedback.classList.remove("hidden");
  feedback.textContent = "✔️ Entry Saved!";
  setTimeout(() => feedback.classList.add("hidden"), 2000);
});
