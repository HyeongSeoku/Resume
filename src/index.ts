import { createAside } from "./aside";
import "./index.scss";
import { printPDF } from "./utils";

const createPdfElement = () => {
  const mainContainer = document.querySelector("#main-container");

  const pdfContainer = document.createElement("div");
  pdfContainer.classList.add("main-container", "pdf-container");
  pdfContainer.innerHTML = mainContainer.innerHTML;

  const animationEles = pdfContainer.querySelectorAll(".screen-animation");
  const inivislbeEles = pdfContainer.querySelectorAll(".invisible");

  animationEles.forEach((element) => {
    element.classList.remove("screen-animation");
  });

  inivislbeEles.forEach((element) => {
    element.classList.remove("invisible");
  });

  document.body.appendChild(pdfContainer);
};

document.addEventListener("DOMContentLoaded", function () {
  createAside();
  createPdfElement();

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
