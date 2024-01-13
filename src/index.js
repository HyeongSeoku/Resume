const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const { target } = entry;

    //FIXME: this syntax 수정 필요
    if (entry.isIntersecting) {
      target.classList.add("screen-in");
    } else {
      target.classList.remove("screen-in");
    }
  });
});

const items = document.querySelectorAll(
  ".screen-animation, .section-title, .project-corp-title"
);
items.forEach((item) => {
  io.observe(item);
});

// 특정 요소만 옵저버를 해제.
// io.unobserve(targetElement);

// 옵저버 전체를 해제.
// io.disconnect();
