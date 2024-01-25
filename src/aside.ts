import { IMG_BASE_URL } from "./constants";

interface AsideMenuItem {
  imgSrc?: string;
  linkUrl?: string;
  text: string;
}

const asideModalContainer = document.querySelector("#aside");

const ASIDE_MENU: AsideMenuItem[] = [
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
  },
];

const createAsideItem = ({
  imgSrc = "",
  linkUrl = "",
  text,
}: AsideMenuItem) => {
  const asideItemContainer = document.createElement("button");
  asideItemContainer.classList.add("aside-item");

  if (imgSrc) {
    const asideItemImg = document.createElement("img");
    asideItemImg.setAttribute("src", imgSrc);

    asideItemContainer.appendChild(asideItemImg);
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
  asideContainer.classList.add("invisible");

  ASIDE_MENU.forEach((asideItem) =>
    asideContainer.appendChild(createAsideItem(asideItem))
  );

  asideModalContainer?.appendChild(asideDimmed);
  asideModalContainer?.appendChild(asideContainer);

  // return asideContainer;
};
