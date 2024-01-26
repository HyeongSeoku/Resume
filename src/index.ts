import { createAside, createAsideObserver, upadeAsideDisplay } from "./aside";
import "./index.scss";
import { printPDF } from "./utils";

document.addEventListener("DOMContentLoaded", function () {
  createAside();

  const pdfButton = document.querySelector(".pdf-button");
  pdfButton?.addEventListener("click", printPDF);
});

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
