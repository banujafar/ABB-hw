const menuIcon = document.querySelector("#menu-icon");
const menuDisabled = document.querySelector(".drop-menu");
const shotsTitle = document.querySelector(".shots__title");
menuIcon.addEventListener("click", () => {
  const menuIcon = document.querySelector("#menu-icon");
  menuIcon.classList.toggle("fa-times");
  const dropMenu = document.querySelector(".drop-menu");
  dropMenu.classList.toggle("enabled");
});

window.onresize = () => {
  if (window.innerWidth >= 768) {
    shotsTitle.textContent = "- LATEST INSTAGRAM SHOT";
  } else {
    shotsTitle.textContent = "- LAST INSTAGRAM SHOT";
  }
};
