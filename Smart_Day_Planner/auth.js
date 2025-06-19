// auth.js

// Redirect if user is not logged in
const allowedPages = ['index.html', 'planner.html', 'profile.html', 'journal.html'];

const currentPage = window.location.pathname.split("/").pop();
const isLoggedIn = localStorage.getItem('isLoggedIn');

// Redirect logic
if (allowedPages.includes(currentPage) && !isLoggedIn) {
  window.location.href = "login.html";
}

// Protect against navigating to login.html if already logged in
if (currentPage === 'login.html' && isLoggedIn) {
  window.location.href = "index.html";
}
