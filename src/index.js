const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const { target } = entry;

    if (entry.isIntersecting) {
      target.classList.add("screen-in");
    } else {
      // target.classList.remove("screen-in");
    }
  });
});

const fadeInAnimationitems = document.querySelectorAll(
  ".screen-animation, .section-title, .project-corp-title"
);
fadeInAnimationitems.forEach((item) => {
  io.observe(item);
});
