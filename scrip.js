"use strict";

// SELECTORS
const navBar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav__links");
const aboutSec = document.querySelector("#about");
const btnReadMore = document.querySelector(".read__more");
const header = document.querySelector("header");
const home = document.querySelector(".home");

// IMPLEMENTING SMOOTH NAVIGATION SCROLLING
navBar.addEventListener("click", function (e) {
  e.preventDefault();
  navLinks.forEach((link) => link.classList.remove("active"));

  const clicked = e.target.closest(".nav__links");
  console.log(clicked);
  //   GUARD CLAUSE
  if (!clicked) return;

  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  clicked.classList.add("active");
});

// SCROLLING INTO VIEW FOR ABOUT SECTION
btnReadMore.addEventListener("click", function (e) {
  e.preventDefault();
  aboutSec.scrollIntoView({ behavior: "smooth" });
});

// IMPLEMENTING OPACITY ANIMATIONS FOR NAV LINKS

// header.addEventListener("mouseover", function (e) {
//   console.log(e.target);
//   if (e.target.classList.contains("nav__links")) {
//     const link = e.target;
//     const siblings = link.closest("header").querySelectorAll(".nav__links");
//     const logo = link.closest("header").querySelector(".logo");
//     const icons = link.closest("header").querySelectorAll(".fa");

//     siblings.forEach((el) => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     icons.forEach((i) => {
//       i.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// header.addEventListener("mouseout", function (e) {
//   console.log(e.target);
//   if (e.target.classList.contains("nav__links")) {
//     const link = e.target;
//     const siblings = link.closest("header").querySelectorAll(".nav__links");
//     const icons = link.closest("header").querySelectorAll(".fa");
//     const logo = link.closest("header").querySelector(".logo");

//     siblings.forEach((el) => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     icons.forEach((i) => {
//       i.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

// MAKING THE CODE DRY BY PASSING AN ARGUMENT INTO THE CALL BACK FUNCTION
const handleHover = function (e) {
  if (e.target.classList.contains("nav__links")) {
    const link = e.target;
    const siblings = link.closest("header").querySelectorAll(".nav__links");
    const icons = link.closest("header").querySelectorAll(".fa");
    const logo = link.closest("header").querySelector(".logo");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 1;
    });
    icons.forEach((i) => {
      i.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

header.addEventListener("mouseover", handleHover.bind(0.5));
header.addEventListener("mouseout", handleHover.bind(1));

// IMPLEMENTING STICKY NAVIGATION ON SCROLL
const headerCords = header.getBoundingClientRect().height;

const headerFunc = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

const headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerCords}px`,
};

const headerObserver = new IntersectionObserver(headerFunc, headerOptions);

headerObserver.observe(home);

// REVEALING ELEMENTS ON SCROLL

const secFunc = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const secOptions = {
  root: null,
  threshold: 0.15,
};

const secObserver = new IntersectionObserver(secFunc, secOptions);

const allSections = document.querySelectorAll("section");
allSections.forEach(function (section) {
  section.classList.add("section--hidden");
  secObserver.observe(section);
});
