document
  .getElementById("close-announcement")
  .addEventListener("click", function () {
    let bar = document.getElementById("announcement-bar");
    document.getElementById("desktop-nav").classList.add("navbar-top");
    document.getElementById("mobile-nav").classList.add("navbar-top");

    bar.style.height = bar.scrollHeight - "px";
    setTimeout(() => {
      bar.classList.add("hidden");
    }, 10);
  });
