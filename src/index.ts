import { createAside, createAsideObserver, upadeAsideDisplay } from "./aside";
import "./index.scss";
import { printPDF } from "./utils";

let asideShow = false;

window.onload = () => {
  createAside();
};

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

const burgermenuToggle = () => {
  asideShow = !asideShow;
  console.log("asideShow", asideShow);

  if (asideShow) {
    burgerMenuButton?.classList.remove("visible");
    burgerMenuButton?.classList.add("invisible");

    asideContainer?.classList.remove("invisible");
    asideContainer?.classList.add("visible");
  } else {
    asideContainer?.classList.add("invisible");
    asideContainer?.classList.remove("visible");

    burgerMenuButton?.classList.add("visible");
    burgerMenuButton?.classList.remove("invisible");
  }
};

const burgerMenuButton = document.querySelector(".burger-menu-button");
burgerMenuButton?.addEventListener("click", burgermenuToggle);

const asideContainer = document.querySelector(".aside-container");
asideContainer?.addEventListener("click", (e) => console.log(e.target));
