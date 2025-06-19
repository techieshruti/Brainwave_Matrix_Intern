const quoteText = document.getElementById("quote-text");
const getQuoteBtn = document.getElementById("get-quote");

async function fetchQuote() {
  try {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent("https://www.affirmations.dev/")}&_=${Date.now()}`;
    const response = await fetch(url);
    const data = await response.json();
    const affirmationData = JSON.parse(data.contents);
    quoteText.textContent = `"${affirmationData.affirmation}"`;
  } catch (error) {
    console.error("ERROR:", error);
    quoteText.textContent = "Oops! Couldn't fetch a quote. Try again later.";
  }
}

getQuoteBtn.addEventListener("click", fetchQuote);
window.addEventListener("DOMContentLoaded", fetchQuote);

//username display

  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("blissboardUserEmail");
    localStorage.removeItem("blissboardPassword");
    window.location.href = "login.html";
  }


