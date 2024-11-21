window.addEventListener('scroll', () => {
  const headerMenu = document.querySelector('.header__menu');
  const isSticky = window.scrollY > headerMenu.offsetTop;

  headerMenu.classList.toggle('sticky', isSticky);
});