const testimonials = document.querySelector(".testimonials");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".leftright svg");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildren = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Infinite loop effect
carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildren
  .slice(0, cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

// Navigation arrows
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

// Drag function
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

// Auto Play
const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

// Infinite scroll
const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!testimonials.matches(":hover")) autoPlay();
};

// Events
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
testimonials.addEventListener("mouseenter", () => clearTimeout(timeoutId));
testimonials.addEventListener("mouseleave", autoPlay);