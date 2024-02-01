import { createModalObserver, updateModalDisplay } from "./modal";

const modalContainer = document.querySelector("#modal");
const modalObserver = createModalObserver();

export const showToast = (text: string) => {
  const { container, contents, closeButton } = createToastElements();
  if (contents instanceof HTMLElement) {
    contents.innerText = text;
  }

  container.appendChild(contents);
  container.appendChild(closeButton);

  modalContainer.appendChild(container);

  modalObserver.subscribe(updateModalDisplay);
  modalObserver.toggleModal(true);
  setTimeout(() => {
    const modalOepnState = modalObserver.getModalState();
    if (modalOepnState) {
      modalObserver.toggleModal(false);
      modalContainer.removeChild(container);
    }
  }, 300000);
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
