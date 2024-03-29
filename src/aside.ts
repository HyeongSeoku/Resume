import { IMG_BASE_URL } from "./constants";

type Observer = (value: boolean) => void;
interface AsideObserver {
  subscribe: (observer: Observer) => void;
  unsubscribe: (observer: Observer) => void;
  toggleAside: () => void;
  getAsideState: () => boolean;
}

interface AsideMenuItem {
  imgSrc?: string;
  linkUrl?: string;
  text: string;
  className?: string | string[];
}

const asideModalContainer = document.querySelector("#aside");
// FIXME: querySelectAll로 바꿔야할지 체크
const asideToggleButton = document.querySelector(".aside-toggle-button");

const ASIDE_MENU: AsideMenuItem[] = [
  {
    imgSrc: `${IMG_BASE_URL}/email_icon.png`,
    linkUrl: "mailto:gudtjr3437@gmail.com",
    text: "이메일 보내기",
  },
  {
    imgSrc: `${IMG_BASE_URL}/linkedin_icon.png`,
    linkUrl:
      "https://www.linkedin.com/in/%ED%98%95%EC%84%9D-%EA%B9%80-901539232/",
    text: "링크드인",
  },
  {
    imgSrc: `${IMG_BASE_URL}/github_logo.png`,
    linkUrl: "https://github.com/HyeongSeoku",
    text: "Github",
  },
  {
    imgSrc: `${IMG_BASE_URL}/sms_icon.webp`,
    linkUrl: "sms:01091433664?body=안녕하세요%20이력서%20보고%20연락드립니다.",
    text: "문자 보내기",
  },
  {
    imgSrc: `${IMG_BASE_URL}/velog_icon.jpeg`,
    linkUrl: "https://velog.io/@seoku/posts",
    text: "블로그",
  },
  {
    imgSrc: `${IMG_BASE_URL}/pdf_icon.png`,
    text: "PDF 다운로드",
    className: "pdf-button",
  },
];

export const createAsideObserver = (): AsideObserver => {
  let observers: Observer[] = [];
  let isOpen = false;

  return {
    subscribe: (observer: Observer) => {
      observers.push(observer);
    },
    unsubscribe: (observer: Observer) => {
      observers = observers.filter((obs) => obs !== observer);
    },
    toggleAside: () => {
      isOpen = !isOpen;
      observers.forEach((observer) => observer(isOpen));
    },
    getAsideState: () => {
      return isOpen;
    },
  };
};

const handleToggleClick = (e: Event, observer: AsideObserver) => {
  if (
    e.target instanceof HTMLElement &&
    (e.target.classList.contains("aside-contents") ||
      e.target.closest(".aside-contents"))
  ) {
    return;
  }

  observer.toggleAside();
};

export const updatedAsideDisplay = (isOpen: boolean) => {
  if (asideModalContainer) {
    if (isOpen) {
      asideModalContainer.classList.add("visible");
      asideModalContainer.classList.remove("invisible");
    } else {
      asideModalContainer.classList.remove("visible");
      asideModalContainer.classList.add("invisible");
    }
  }

  if (asideToggleButton) {
    if (isOpen) {
      asideToggleButton.classList.remove("visible");
      asideToggleButton.classList.add("invisible");
    } else {
      asideToggleButton.classList.add("visible");
      asideToggleButton.classList.remove("invisible");
    }
  }
};

const createAsideItem = ({
  imgSrc = "",
  linkUrl = "",
  text,
  className = "",
}: AsideMenuItem) => {
  const asideItemContainer = document.createElement("button");
  asideItemContainer.classList.add("aside-item");

  if (imgSrc) {
    const asideItemImg = document.createElement("img");
    asideItemImg.setAttribute("src", imgSrc);

    asideItemContainer.appendChild(asideItemImg);
  }

  if (className) {
    if (typeof className === "string") {
      asideItemContainer.classList.add(className);
    } else {
      asideItemContainer.classList.add(...className);
    }
  }

  const mainElement = document.createElement(linkUrl ? "a" : "div");
  if (linkUrl) mainElement.setAttribute("href", linkUrl);
  const mainText = document.createTextNode(text);
  mainElement.appendChild(mainText);

  asideItemContainer.appendChild(mainElement);

  return asideItemContainer;
};

export const createAside = () => {
  const asideContainer = document.createElement("aside");
  const asideDimmed = document.createElement("div");

  asideDimmed.classList.add("aside-dimmed");

  asideContainer.classList.add("aside-contents");

  ASIDE_MENU.forEach((asideItem) =>
    asideContainer.appendChild(createAsideItem(asideItem))
  );

  asideModalContainer?.appendChild(asideDimmed);
  asideModalContainer?.appendChild(asideContainer);

  asideModalContainer?.classList.add("invisible");

  const asideObserver = createAsideObserver();
  asideObserver.subscribe(updatedAsideDisplay);

  asideModalContainer?.addEventListener("click", (e) =>
    handleToggleClick(e, asideObserver)
  );

  asideToggleButton?.addEventListener("click", (e) =>
    handleToggleClick(e, asideObserver)
  );
};
