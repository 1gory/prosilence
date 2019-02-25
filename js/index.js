$(document).ready(function () {
  //  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  //    anchor.addEventListener('click', function (e) {
  //      e.preventDefault();
  //
  //      document.querySelector(this.getAttribute('href')).scrollIntoView({
  //        behavior: 'smooth'
  //      });
  //    });
  //  });



  $('body').on('click', '.button-up', () => {
    window.scrollTo(0, 0)
  });

  $('body').on('click', '.mobile-nav__button', () => {
    $('.mobile-menu').fadeToggle()
  });
  $('body').on('click', '.mobile-menu__button', () => {
    $('.mobile-menu').fadeToggle()
  });
  
  $('body').on('click', '.mobile-menu__list li a', () => {
    $('.mobile-menu').fadeToggle()
  });

});

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});
