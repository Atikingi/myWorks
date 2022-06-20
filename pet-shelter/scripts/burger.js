const burgerButton = document.querySelector('.header-top__burger-button');
const burgerMenu = document.querySelector('.header-top__burger-menu');
const logo = document.querySelector('.header-top__logo');
const backgroundInactive = document.querySelector('.inactive__background');

burgerButton.onclick = function () {
  toggleBurgerMenu()
  };

  burgerMenu.addEventListener('click', () => {
    toggleBurgerMenu()
  })

  function toggleBurgerMenu() {
    burgerButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    logo.classList.toggle('disable');
    backgroundInactive.classList.toggle('active');
    document.body.classList.toggle('burger__scroll__stop');
  } 