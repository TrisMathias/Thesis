const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

// Toggle sidebar open/close
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// Open sidebar when clicking search (example behavior from tutorial)
searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

// Dark / Light mode toggle
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
    // persist
    localStorage.setItem("theme", "dark");
  } else {
    modeText.innerText = "Dark mode";
    localStorage.setItem("theme", "light");
  }
});

// Load theme from localStorage
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});
