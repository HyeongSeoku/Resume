import { createModalObserver, updateModalDisplay } from "./modal";

const modalContainer = document.querySelector("#modal");
const modalObserver = createModalObserver();

let toastTimeout: ReturnType<typeof setTimeout>;

export const showToast = async (text: string) => {
  console.log("TEST SHOW");
  const { container, contents, closeButton } = createToastElements();
  if (contents instanceof HTMLElement) {
    contents.innerText = text;
  }

  contents.appendChild(closeButton);
  container.appendChild(contents);

  modalContainer.appendChild(container);
  modalContainer.classList.add("toast-modal");

  modalObserver.subscribe(updateModalDisplay);
  modalObserver.toggleModal(true);

  startToastTimer(container);

  container.addEventListener("mouseover", () => {
    clearTimeout(toastTimeout);
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
  const existToastContainer = document.querySelector("#toast");

  if (existToastContainer) {
    modalContainer.removeChild(existToastContainer);
  }
  clearTimeout(toastTimeout);
  modalContainer.classList.remove("toast-close");
  const toastContainer = document.createElement("div");
  toastContainer.setAttribute("id", "toast");

  const toastContents = document.createElement("div");
  toastContents.classList.add("toast-contents");

  const toastCloseButton = document.createElement("button");
  if (toastCloseButton instanceof HTMLElement) {
    toastCloseButton.innerText = "X";
  }
  toastCloseButton.classList.add("toast-close-btn");

  toastCloseButton.addEventListener("click", () => {
    modalContainer.removeChild(toastContainer);
    modalObserver.toggleModal(false);
  });

  console.log("TEST CREATE");

  return {
    container: toastContainer,
    contents: toastContents,
    closeButton: toastCloseButton,
  };
};
