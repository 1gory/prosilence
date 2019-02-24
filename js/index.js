

$(document).ready(function () {

  $('body').on('click', '.button-up', () => {
    window.scrollTo(0, 0)
  });
  
  $('body').on('click', '.mobile-nav__button', () => {
    $('.mobile-menu').fadeToggle()  
  });
  $('body').on('click', '.mobile-menu__button', () => {
    $('.mobile-menu').fadeToggle()  
  });

});

