const form = document.querySelector(".newsletter form");
const emailInput = document.querySelector(".email-container input");

// Creating feedback message
const message = document.createElement("span");
message.classList.add("message");
emailInput.parentNode.appendChild(message);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  if (!validateEmail(email)) {
    showMessage("Enter a valid email address.", "error");
    return;
  }

  showMessage("Email registered successfully.", "success");
});

// Hide placeholder
function showMessage(text, type) {
  message.textContent = text;
  message.classList.add(type);
  message.classList.remove(type === "error" ? "success" : "error");
  message.style.display = "block"; // Show message
  emailInput.classList.add(type);
  emailInput.classList.add("hide-placeholder");

  setTimeout(() => {
    message.style.display = "none"; // Hide message after 3s
    emailInput.classList.remove("hide-placeholder", "error", "success");
  }, 3000);

  emailInput.value = ""; // Clear
}

// Click remove message
message.addEventListener("click", function () {
  emailInput.focus();
  message.style.display = "none";
  emailInput.classList.remove("hide-placeholder", "error", "success");
});

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
