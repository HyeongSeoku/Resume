type Observer = (value: boolean) => void;

interface ModalObserver {
  subscribe: (observer: Observer) => void;
  unsubscribe: (observer: Observer) => void;
  toggleModal: (isOpen?: boolean) => void;
  getModalState: () => boolean;
}

const modalContainer = document.querySelector("#modal");
const modalToggleButton = document.querySelector(".modal-toggle-button");

export const createModalObserver = (): ModalObserver => {
  let observers: Observer[] = [];
  let isOpen = false;

  return {
    subscribe: (observer: Observer) => {
      observers.push(observer);
    },
    unsubscribe: (observer: Observer) => {
      observers = observers.filter((obs) => obs !== observer);
    },
    toggleModal: (curIsOpen?: boolean) => {
      isOpen = curIsOpen !== null ? curIsOpen : !isOpen;
      console.log("isopen", isOpen);
      observers.forEach((observer) => observer(isOpen));
    },
    getModalState: () => {
      return isOpen;
    },
  };
};

const handleToggleClick = (e: Event, observer: ModalObserver) => {
  if (
    e.target instanceof HTMLElement &&
    (e.target.classList.contains("modal-contents") ||
      e.target.closest(".modal-contents"))
  ) {
    return;
  }

  observer.toggleModal();
};

export const updateModalDisplay = (isOpen: boolean) => {
  if (modalContainer) {
    if (isOpen) {
      modalContainer.classList.add("visible");
      modalContainer.classList.remove("invisible");
    } else {
      modalContainer.classList.remove("visible");
      modalContainer.classList.add("invisible");
    }
  }
};

export const createModal = (target?: HTMLElement) => {
  const modalContents = document.createElement("div");
  const modalDimmed = document.createElement("div");

  console.log("TEST ETSTSE");

  modalDimmed.classList.add("modal-dimmed");

  modalContents.classList.add("modal-contents");
  target && modalContents.appendChild(target);

  modalContainer?.appendChild(modalDimmed);
  modalContainer?.appendChild(modalContents);

  const modalObserver = createModalObserver();
  modalObserver.subscribe(updateModalDisplay);

  modalContainer?.addEventListener("click", (e) =>
    handleToggleClick(e, modalObserver)
  );

  modalToggleButton?.addEventListener("click", (e) =>
    handleToggleClick(e, modalObserver)
  );
};
