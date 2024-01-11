const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const $target = entry.target;

    if (entry.isIntersecting) {
      $target.classList.add("screen-in");
    }
    // else {
    //     $target.classList.remove("screen-in");
    //   }
  });
});

// FIXME: querySelectorAll props 수정 필요함 -> classname 하나 주고 해당 클래스 네임으로 처리 예정
// const $items = document.querySelectorAll("div");
// $items.forEach((item) => {
//   io.observe(item);
// });

const $items = document.querySelectorAll(".screen-animation");
$items.forEach((item) => {
  io.observe(item);
});

// 특정 요소만 옵저버를 해제.
// io.unobserve(targetElement);

// 옵저버 전체를 해제.
// io.disconnect();
