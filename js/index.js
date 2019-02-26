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

  $('body').on('click', '.mobile-menu__list li a', () => {
    $('.mobile-menu').fadeToggle()
  });

  $('#select-car-1-header').on('change', () => {
    if ($('#select-car-1-calc').find(":selected").val() !== '0') {
      $('#select-car-2-header').fadeIn()
    } else {
      $('#select-car-2-header').fadeOut()
    }
  });

  $('#checkbox-1-header').on('change', () => {
    if (document.getElementById('checkbox-1-header').checked) {
      $('#select-car-3-header').fadeIn()
    } else {
      $('#select-car-3-header').fadeOut()
    }
  });

  $('#checkbox-2-header').on('change', () => {
    if (document.getElementById('checkbox-2-header').checked) {
      $('#textarea-header').fadeIn()
    } else {
      $('#textarea-header').fadeOut()
    }
  });


  $('#select-car-1-calc').on('change', () => {
    console.log($('#select-car-1-calc').find(":selected").val())
    if ($('#select-car-1-calc').find(":selected").val() !== '0') {
      $('#select-car-2-calc').fadeIn()
    } else {
      console.log('a')
      $('#select-car-2-calc').fadeOut()
    }
  });

  $('#checkbox-1-calc').on('change', () => {
    if (document.getElementById('checkbox-1-calc').checked) {
      $('#select-car-3-calc').fadeIn()
    } else {
      $('#select-car-3-calc').fadeOut()
    }
  });

  $('#checkbox-2-calc').on('change', () => {
    if (document.getElementById('checkbox-2-calc').checked) {
      $('#textarea-calc').fadeIn()
    } else {
      $('#textarea-calc').fadeOut()
    }
  });

  $('.header-input__phone').inputmask("+7 999 999 99 99");
});

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});


function mobileOnlySliders () {
  $('.slick-prices').slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    initialSlide: 1,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      }
    }]
  });
  $('.slick-fb').slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    initialSlide: 0,
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    }]
  });
}

$(window).resize(function (e) {
  if (window.innerWidth < 992) {
    if (!$('.slick-prices').hasClass('slick-initialized')) {
      mobileOnlySliders();
    }

  } else {
    if ($('.slick-prices').hasClass('slick-initialized')) {
      $('.slick-prices').slick('unslick');
    }
  }
});
