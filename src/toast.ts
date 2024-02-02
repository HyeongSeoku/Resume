import { createModalObserver, updateModalDisplay } from "./modal";

const modalContainer = document.querySelector("#modal");
const modalObserver = createModalObserver();

let toastTimeout: ReturnType<typeof setTimeout>;

export const showToast = async (text: string) => {
  const { container, contents, closeButton } = createToastElements();
  if (contents instanceof HTMLElement) {
    contents.innerText = text;
  }

  contents.appendChild(closeButton);
  container.appendChild(contents);

  modalContainer.appendChild(container);

  modalObserver.subscribe(updateModalDisplay);
  modalObserver.toggleModal(true);

  startToastTimer(container);

  console.log("toastTimeout", toastTimeout);

  container.addEventListener("mouseover", () => {
    clearTimeout(toastTimeout);
    console.log("HOVER", toastTimeout);
  });

  container.addEventListener("mouseout", () => {
    startToastTimer(container);
  });
};

const startToastTimer = (target?: Element) => {
  toastTimeout = setTimeout(() => {
    modalContainer.classList.add("toast-close");

    setTimeout(() => {
      const modalOpenState = modalObserver.getModalState();
      if (modalOpenState) {
        modalObserver.toggleModal(false);
        modalContainer.removeChild(target);
      }
      modalContainer.classList.remove("toast-close");
    }, 1000);
  }, 2500);
};

const createToastElements = () => {
  let toastContainer = document.querySelector("#toast");
  let toastContents = document.querySelector(".toast-contents");
  let toastCloseButton = document.querySelector(".toast-close-btn");

  if (!document.querySelector("#toast")) {
    toastContainer = document.createElement("div");
    toastContainer.setAttribute("id", "toast");

    toastContents = document.createElement("div");
    toastContents.classList.add("toast-contents");

    toastCloseButton = document.createElement("button");
    if (toastCloseButton instanceof HTMLElement) {
      toastCloseButton.innerText = "X";
    }
    toastCloseButton.classList.add("toast-close-btn");
  }

  toastCloseButton.addEventListener("click", () => {
    modalContainer.removeChild(toastContainer);
    modalObserver.toggleModal(false);
  });

  return {
    container: toastContainer,
    contents: toastContents,
    closeButton: toastCloseButton,
  };
};
