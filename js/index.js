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

  $('.car .material-menu__list li').on('click', function () {
    if ($(this).hasClass('active')) return

    $('.car .material-menu__list li').removeClass('active')
    $(this).addClass('active')

    $('.car-tabs .car-main').removeClass('active')
    $('.car-tabs .car-main:nth-child(' + ($(this).index() + 1) + ')').addClass('active')

  });

  $('.material .material-menu__list li').on('click', function () {
    if ($(this).hasClass('active')) return

    $('.material .material-menu__list li').removeClass('active')
    $(this).addClass('active')

    $('.material-tabs .row').removeClass('active')
    $('.material-tabs .row:nth-child(' + ($(this).index() + 1) + ')').addClass('active')
    
    $('.material-card__mobile:not([class*="mobile-hide"])').addClass('mobile-hide')
    
    $('.material .example-link').show()

  });
  $('.calc-button').on('click', function () {
    $('.calc-inner-1').css('display', 'none') 
    $('.calc-inner-2').css('display', 'block') 
    $('.calc-back').css('display', 'flex') 
  });
  
  $('.calc-back').on('click', function () {
    $('.calc-inner-1').css('display', 'block') 
    $('.calc-inner-2').css('display', 'none') 
    $('.calc-back').css('display', 'none') 
  });
  
  var activeExampleTab = 1

  $('.examples .examples-arrow__left').on('click', function () {
    if (activeExampleTab <= 1) return

    activeExampleTab--

    $('.examples .example').removeClass('active')
    $('.examples .example:nth-child(' + (activeExampleTab + 1) + ')').addClass('active')
  });

  $('.examples .examples-arrow__right').on('click', function () {
    if (activeExampleTab >= $('.example').length) return

    activeExampleTab++

    $('.examples .example').removeClass('active')
    $('.examples .example:nth-child(' + (activeExampleTab + 1) + ')').addClass('active')
  });

  $('.examples .example-link').on('click', function () {
    if ($(this).html() == 'Показать все')
      $(this).html("Скрыть")
    else
      $(this).html("Посмотреть фото")
    $('.example-gallery').fadeToggle()
  });
  
  $('.material .example-link').on('click', function () {
    $(this).hide()  
    
    $('.material-card__mobile').removeClass('mobile-hide')
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


function mobileOnlySliders() {
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
