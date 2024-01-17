import { printPDF } from "./utils";

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const { target } = entry;

    if (entry.isIntersecting) {
      target.classList.remove("invisible");
      target.classList.add("screen-in");
    } else {
      // target.classList.remove("screen-in");
    }
  });
});

const fadeInAnimationitems = document.querySelectorAll(".screen-animation");
fadeInAnimationitems.forEach((item) => {
  item.classList.add("invisible");
  io.observe(item);
});

const pdfButton = document.querySelector(".pdf-button");
pdfButton?.addEventListener("click", printPDF);
