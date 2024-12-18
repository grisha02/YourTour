export const stickyHeader = () => {
  window.addEventListener('scroll', () => {
    const headerMenu = document.querySelector('.header__menu');
    const isSticky = window.scrollY > 450;
  
    headerMenu.classList.toggle('sticky', isSticky);
  });
}

export const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        const headerHeight = document.querySelector('.header__menu').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
  
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}