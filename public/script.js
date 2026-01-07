// 04-javaScript - Nikola Baci

const toggle = document.querySelector("#toggleButton");
const toggleLabel = document.querySelector("#toggleLabel");
const savedMode = localStorage.getItem("mode");

if (savedMode === "dark") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
  toggleLabel.innerText = "Dark Mode";
} else {
  document.body.classList.remove("dark-mode");
  toggle.checked = false;
  toggleLabel.innerText = "Light Mode";
}

// APPLY AND SAVE ACROSS ALL PAGES
toggle.addEventListener("change", toggleChanged);

function toggleChanged() {
  if (toggle.checked) {
    document.body.classList.add("dark-mode");
    toggleLabel.innerText = "Dark Mode";
    localStorage.setItem("mode", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    toggleLabel.innerText = "Light Mode";
    localStorage.setItem("mode", "light");
  }
}
