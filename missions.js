// VARIABLES

const navItems = document.querySelectorAll(".nav__list-item");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");
const activeMissions = document.getElementById("activeMissions");
const completedMissions = document.getElementById("completedMissions");

// EVENT LISTENERS

// FUNCTIONS

[activeButton, completedButton].forEach((button) => {
  button.addEventListener("click", (e) => {
    const isActive = e.target === activeButton;

    activeMissions.classList.toggle("hidden", !isActive);
    completedMissions.classList.toggle("hidden", isActive);

    activeButton.classList.toggle("btn--active", isActive);
    completedButton.classList.toggle("btn--active", !isActive);
  });
});
