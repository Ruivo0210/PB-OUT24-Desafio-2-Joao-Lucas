// Anchor Tag Smooth Animation

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Announcement-bar Hide Animation

// Desktop-nav

document.getElementById("close-announcement").addEventListener("click", function () {
    let bar = document.getElementById("announcement-bar");
    document.getElementById("desktop-nav").classList.add("navbar-top");
    bar.style.height = bar.scrollHeight - "px";
    setTimeout(() => {
      bar.classList.add("hidden");
    }, 10);
  });

// Mobile-nav
  
document.getElementById("close-announcement").addEventListener("click", function () {
    let bar = document.getElementById("announcement-bar");
    document.getElementById("mobile-nav").classList.add("navbar-top");
    bar.style.height = bar.scrollHeight - "px";
    setTimeout(() => {
      bar.classList.add("hidden");
    }, 10);
  });

// Open and close nav container

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
// Testimonials Carousel Animation

const testimonials = document.querySelector(".testimonials");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".leftright svg");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach(btn =>{
    btn.addEventListener("click",() =>{
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!testimonials.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
testimonials.addEventListener("mouseenter", () => clearTimeout(timeoutId));
testimonials.addEventListener("mouseleave", autoPlay);