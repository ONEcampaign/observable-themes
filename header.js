let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

  document.body.classList.toggle("hide-header", scrollingDown);
  lastScrollY = currentScrollY;
});