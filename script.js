const photo = document.getElementById("profile-photo");
const photoFallback = document.getElementById("photo-fallback");

function showPhotoFallback() {
  if (photo) photo.hidden = true;
  if (photoFallback) photoFallback.hidden = false;
}

function showProfilePhoto() {
  if (photo) photo.hidden = false;
  if (photoFallback) photoFallback.hidden = true;
}

if (photo) {
  photo.addEventListener("error", showPhotoFallback);
  photo.addEventListener("load", showProfilePhoto);

  if (photo.complete && photo.naturalWidth === 0) {
    showPhotoFallback();
  }
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
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

  sections.forEach((section) => observer.observe(section));
}
