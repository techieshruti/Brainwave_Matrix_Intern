# 🌿 BlissBoard – Your Mindful Digital Companion

BlissBoard is a beautifully designed, web-based productivity dashboard that helps users plan, reflect, and stay focused. Whether you're organizing your day, tracking habits, or journaling thoughts — BlissBoard gives you a centered digital space to manage it all.

---

## 🔗 Live Demo

👉 [Click to View Live](https://your-github-username.github.io/BlissBoard/)  
*(Replace with your actual GitHub Pages link)*

---

## ✨ Features

- 🔒 **Login/Signup Authentication** using `localStorage`
- 🏠 **Dashboard Home Page** with a welcome message and daily quote
- 🗓️ **Smart Day Planner** with tasks organized by category
- 📓 **Journal Writing** with mood reflections and thoughts
- 📈 **Habit Tracker** and goal-setting features
- 👤 **Profile Section** to personalize user experience
- 🌈 Responsive and clean UI with animations, blobs, and themed styles

---

## 🚀 Tech Stack

- **HTML5**
- **CSS3** (Flexbox, Responsive Design, Custom Animations)
- **JavaScript (ES6+)** – DOM Manipulation, LocalStorage
- **Font Awesome** – Icons
- **GitHub Pages** – For deployment

---

## 📁 Folder Structure

```
BlissBoard/
│
├── index.html
├── login.html
├── planner.html
├── journal.html
├── profile.html
├── style.css
├── auth.js
├── app.js
└── assets/
└── images, icons, mockups
```
---

## 🧠 How It Works

1. **User signs up or logs in**
2. Data stored in `localStorage`
3. Access to all app pages is restricted without login
4. After login, user's name appears in the navbar
5. Logout clears session and returns to login

---

## 🔐 Authentication Flow

- Username & Password stored securely in `localStorage`
- All protected pages check for login before loading content
- Logout function clears session keys

---

## 🙋‍♀️ Author

**Shruti (techieshruti)**  
[GitHub Profile](https://github.com/techieshruti)

---

## 🧑‍💻 Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/BlissBoard.git
   cd BlissBoard
