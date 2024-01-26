const modalContainer = document.querySelector("#modal");
let modalOpenState = false;

export const createModal = (target: HTMLElement) => {
  const modalContents = document.createElement("div");
  const modalDimmed = document.createElement("div");

  modalDimmed.classList.add("modal-dimmed");

  modalContents.classList.add("modal-contents");
  modalContents.appendChild(target);

  modalContainer?.appendChild(modalDimmed);
  modalContainer?.appendChild(modalContents);
  console.log("modalCOntainer", modalContainer);
};

const modalHandler = (isShow: boolean) => {
  if (isShow) {
    modalContainer?.classList.add("visible");
    modalContainer?.classList.remove("invisible");
  } else {
    modalContainer?.classList.add("invisible");
    modalContainer?.classList.remove("visible");
  }
};

const handleModalShow = (e: MouseEvent, isShow?: boolean) => {
  const { target } = e;

  if (target instanceof HTMLElement) {
    if (target.classList.contains("dimmed")) {
      modalOpenState = false;
    }
  }
  return;
};
