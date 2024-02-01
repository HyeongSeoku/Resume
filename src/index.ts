import { createAside } from "./aside";
import "./index.scss";
import { createModal } from "./modal";
import { showToast } from "./toast";
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
  // createModal();

  const pdfButton = document.querySelector(".pdf-button");
  pdfButton?.addEventListener("click", printPDF);
});

// fadeInAnimation
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const { target } = entry;

    if (entry.isIntersecting) {
      target.classList.remove("invisible");
      target.classList.add("screen-in");
    }
  });
});

const fadeInAnimationitems = document.querySelectorAll(".screen-animation");
fadeInAnimationitems.forEach((item) => {
  item.classList.add("invisible");
  io.observe(item);
});

// 클립보드
const contactTextList = document.querySelectorAll(".contact-list-item-text");

const copyTextToClipBoard = (element: HTMLElement) => {
  const textToCopy = element.innerText;
  navigator.clipboard
    .writeText(textToCopy)
    .then(function () {
      // TOOD: 클립보드 토스트 메세지 show 메소드
      showToast("클립보드에 복사되었습니다 : textToCopy");
    })
    .catch(function (err) {
      console.error("클립보드 복사 실패:", err);
    });
};

contactTextList.forEach((ele) => {
  if (ele instanceof HTMLElement) {
    ele.addEventListener("click", () => {
      copyTextToClipBoard(ele);
    });
  }
});
