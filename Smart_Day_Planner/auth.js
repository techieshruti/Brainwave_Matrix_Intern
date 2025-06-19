document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split("/").pop();
  const protectedPages = ["index.html", "planner.html", "profile.html", "journal.html"];
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const mainContent = document.getElementById("main-content");
  const userEmailDisplay = document.getElementById("userEmail-display");

  // 🔐 Protect Pages
  if (protectedPages.includes(currentPage)) {
    if (!isLoggedIn) {
      window.location.href = "login.html";
    } else if (mainContent) {
      mainContent.style.display = "block";
    }
  }

  // Redirect from login.html if already logged in
  if (currentPage === "login.html" && isLoggedIn) {
    window.location.href = "index.html";
  }

  // ✨ Show userEmail in navbar
  const userEmail = localStorage.getItem("blissboarduserEmail");
  if (userEmailDisplay && userEmail) {
    userEmailDisplay.textContent = `👋 Welcome, ${userEmail}`;
  }

  // 🔄 Toggle Login/Signup (only if auth form exists)
  const authBox = document.getElementById("auth-box");
  const heading = document.getElementById("auth-heading");
  const form = document.getElementById("auth-form");
  const toggleLink = document.getElementById("toggle-link");
  const submitBtn = document.getElementById("auth-submit");

  let isLogin = true;

  if (toggleLink && authBox && heading && submitBtn && form) {
    toggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      isLogin = !isLogin;
      if (isLogin) {
        heading.textContent = "Login to BlissBoard 🌿";
        submitBtn.textContent = "Login";
        toggleLink.textContent = "Sign Up";
        authBox.classList.remove("signup-mode");
      } else {
        heading.textContent = "Sign up for BlissBoard 🌿";
        submitBtn.textContent = "Sign Up";
        toggleLink.textContent = "Login";
        authBox.classList.add("signup-mode");
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById("auth-userEmail").value.trim();
      const pass = document.getElementById("auth-password").value.trim();

      if (!name || !pass) return alert("Please fill out all fields.");

      if (isLogin) {
        const storedName = localStorage.getItem("blissboarduserEmail");
        const storedPass = localStorage.getItem("blissboardPassword");

        if (name === storedName && pass === storedPass) {
          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "index.html";
        } else {
          alert("Incorrect name or password.");
        }
      } else {
        localStorage.setItem("blissboarduserEmail", name);
        localStorage.setItem("blissboardPassword", pass);
        localStorage.setItem("isLoggedIn", "true");
        alert("Signup successful!");
        window.location.href = "index.html";
      }
    });
  }
});
