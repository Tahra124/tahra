const header = document.querySelector(".site-header");
const menuButton = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const mobileLinks = Array.from(document.querySelectorAll(".mobile-nav a"));
const navLinks = Array.from(document.querySelectorAll(".desktop-nav a"));
const sections = Array.from(document.querySelectorAll("[data-section]"));
const revealElements = Array.from(document.querySelectorAll(".reveal"));
const photo = document.getElementById("profile-photo");
const photoFallback = document.getElementById("photo-fallback");
const year = document.getElementById("year");

function updateHeader() {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
}

function closeMenu() {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  mobileNav.classList.remove("open");
  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  if (!menuButton || !mobileNav) return;
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mobileNav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
}

function showPhotoFallback() {
  if (photo) photo.hidden = true;
  if (photoFallback) photoFallback.hidden = false;
}

function showPhoto() {
  if (photo) photo.hidden = false;
  if (photoFallback) photoFallback.hidden = true;
}

if (photo) {
  photo.addEventListener("error", showPhotoFallback);
  photo.addEventListener("load", showPhoto);

  if (photo.complete) {
    if (photo.naturalWidth > 0) {
      showPhoto();
    } else {
      showPhotoFallback();
    }
  }
}

if (menuButton) {
  menuButton.addEventListener("click", toggleMenu);
}

mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", isCurrent);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((section) => navigationObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

if (year) {
  year.textContent = new Date().getFullYear();
}
