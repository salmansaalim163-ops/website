const filterButtons = document.querySelectorAll(".filter-button");
const foodCards = document.querySelectorAll(".food-card");
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
const cartMessage = document.querySelector(".cart-message");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");

let itemCount = 0;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    foodCards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    cartCount.textContent = String(itemCount);
    cartButton.setAttribute("aria-label", `Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`);
    const foodName = button.closest(".food-card").querySelector("h3").textContent;
    cartMessage.textContent = `${foodName} added to your cart.`;
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const name = contactForm.elements.name.value.trim();
  formMessage.textContent = `Thanks, ${name}! Your message is ready. We'll be in touch soon.`;
  contactForm.reset();
});
