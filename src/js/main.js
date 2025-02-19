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

// Email Validation

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".newsletter form");
    const emailInput = document.querySelector(".email-container input");

    // Criando dinamicamente a mensagem de feedback (erro/sucesso)
    const message = document.createElement("span");
    message.classList.add("message");
    emailInput.parentNode.appendChild(message);

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário

        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            message.textContent = "Enter a valid email address.";
            message.classList.add("error");
            message.classList.remove("success");
            message.style.display = "block"; // Exibe a mensagem de erro
            emailInput.classList.add("invalid");
            emailInput.classList.remove("success");
            emailInput.classList.add("hide-placeholder");

            setTimeout(() => {
                message.style.display = "none"; // Oculta sucesso após 3s
                emailInput.classList.remove("hide-placeholder");
            }, 3000);

            emailInput.value = ""; // Limpa o campo após cadastro
            return;
        }

        // Caso o e-mail seja válido:
        message.textContent = "Email registered successfully.";
        message.classList.add("success");
        message.classList.remove("error");
        message.style.display = "block"; // Exibe mensagem de sucesso
        emailInput.classList.add("success");
        emailInput.classList.remove("invalid");
        emailInput.classList.add("hide-placeholder");

        setTimeout(() => {
            message.style.display = "none"; // Oculta sucesso após 3s
            emailInput.classList.remove("hide-placeholder");
        }, 3000);

        emailInput.value = ""; // Limpa o campo após cadastro
    });

    // Clicar na mensagem foca no input e remove a mensagem
    message.addEventListener("click", function () {
        emailInput.focus();
        message.style.display = "none";
        emailInput.classList.remove("hide-placeholder", "invalid", "success");
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
