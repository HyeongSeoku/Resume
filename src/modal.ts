const toggleModal = (isShow: boolean) => {};

const modalHandler = (target: HTMLElement, isShow: boolean) => {
  const modalContainer = document.querySelector("#modal");
  if (isShow) {
    modalContainer?.classList.add("visible");
    modalContainer?.classList.remove("invisible");
  } else {
    modalContainer?.classList.add("invisible");
    modalContainer?.classList.remove("visible");
  }
  const modalContents = document.createElement("div");
  modalContents.classList.add("modal-contents");

  modalContents.appendChild(target);

  modalContainer?.appendChild(modalContents);
};
