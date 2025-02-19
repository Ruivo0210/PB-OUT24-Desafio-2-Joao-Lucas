const menuIcon = document.querySelector(".menu-icon");
const mobileMenuContainer = document.querySelector(".mobile-nav-container");
const transparentbkg = document.querySelector(".transparentbkg");

menuIcon.addEventListener("click", () => {
  mobileMenuContainer.classList.toggle("active");
  transparentbkg.classList.toggle("active");
});

transparentbkg.addEventListener("click", () => {
  mobileMenuContainer.classList.toggle("active");
  transparentbkg.classList.toggle("active");
});
