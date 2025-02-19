document.addEventListener("DOMContentLoaded", function () {
    const scripts = [
        "src/js/smoothScroll.js",
        "src/js/announcementBar.js",
        "src/js/mobileNav.js",
        "src/js/carousel.js",
        "src/js/emailValidation.js"
    ];

    scripts.forEach(script => {
        const scriptTag = document.createElement("script");
        scriptTag.src = script;
        document.body.appendChild(scriptTag);
    });
});