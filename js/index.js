const carObj = [
  {
    name: 'Toyota',
    types: [
      '1-1',
      '1-2',
      '1-3',
      '1-4',
    ],
  },
  {
    name: 'Волга',
    types: [
      '2-1',
      '2-2',
      '2-3',
      '2-4',
    ],
  },
];

const examplePhotos = [
  [
    {
      src: './img/hero.jpg',
      w: 800,
      h: 600,
    },
    {
      src: './img/bg-fb.png',
      w: 800,
      h: 600,
    },
  ],
  [
    {
      src: './img/hero.jpg',
      w: 800,
      h: 600,
    },
    {
      src: './img/bg-fb.png',
      w: 800,
      h: 600,
    },
  ],
  [
    {
      src: './img/hero.jpg',
      w: 800,
      h: 600,
    },
    {
      src: './img/bg-fb.png',
      w: 800,
      h: 600,
    },
  ],
];

function fillFirstSelects() {
  carObj.forEach((e, index) => {
    $('#select-car-1-header').append(`<option value="${index}">${e.name}</option>`);
    $('#select-car-1-contact').append(`<option value="${index}">${e.name}</option>`);
    $('#select-car-1-calc').append(`<option value="${index}">${e.name}</option>`);
  });
}

function fillSecondSelect(selector, index) {
  $(selector).html('<option value="none">Выберите модель</option>');
  carObj[index].types.forEach((e) => {
    $(selector).append(`<option value="${e}">${e}</option>`);
  });
}

function initPSWP(index) {
  const pswpElement = document.querySelectorAll('.pswp')[0];

  const items = examplePhotos[index];
  const options = {
    index: 0,
  };

  const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
}

$(document).ready(function () {
  fillFirstSelects();

  $('body').on('click', '.button-up', () => {
    window.scrollTo(0, 0);
  });

  $('body').on('click', '.mobile-nav__button', () => {
    $('.mobile-menu').fadeToggle();
  });
  $('body').on('click', '.mobile-menu__button', () => {
    $('.mobile-menu').fadeToggle();
  });

  $('body').on('click', '.mobile-menu__list li a', () => {
    $('.mobile-menu').fadeToggle();
  });

  $('.car .material-menu__list li').on('click', function () {
    if ($(this).hasClass('active')) return;

    $('.car .material-menu__list li').removeClass('active');
    $(this).addClass('active');

    const that = $(this);
    $.when($('.car-tabs .car-main').fadeOut(200))
      .then(function () {
        $(`.car-tabs .car-main:nth-child(${that.index() + 1})`).fadeIn(200);
      });
  });

  $('.material .material-menu__list li').on('click', function () {
    if ($(this).hasClass('active')) return;

    $('.material .material-menu__list li').removeClass('active');
    $(this).addClass('active');

    $('.material-tabs').css('height', `${$('.material-tabs').height()}px`);

    const that = $(this);
    $.when($('.material-tabs .material-tab__wrapper').fadeOut(200))
      .then(function () {
        $(`.material-tabs .material-tab__wrapper:nth-child(${that.index() + 1})`).fadeIn(200);
        $('.material-card__mobile:not([class*="mobile-hide"])').addClass('mobile-hide');
        $('.material-tabs').css('height', 'auto');
        $('.material .example-link').show();
      });
  });

  $('.calc-button').on('click', function () {
    $('.calc-inner-1').css('display', 'none');
    $('.calc-inner-2').css('display', 'block');
    $('.calc-back').css('display', 'flex');
  });

  $('.calc-back').on('click', function () {
    $('.calc-inner-1').css('display', 'block');
    $('.calc-inner-2').css('display', 'none');
    $('.calc-back').css('display', 'none');
  });

  let activeExampleTab = 1;

  $('.examples .examples-arrow__left').on('click', function () {
    if (activeExampleTab <= 1) return;

    activeExampleTab -= 1;

    $.when($('.examples .example-wrapper').fadeOut(200))
      .then(function () {
        $(`.examples .example-wrapper:nth-child(${activeExampleTab + 1})`).fadeIn(200);
      });
  });

  $('.examples .examples-arrow__right').on('click', function () {
    if (activeExampleTab >= $('.example').length) return;

    activeExampleTab += 1;

    $.when($('.examples .example-wrapper').fadeOut(200))
      .then(function () {
        $(`.examples .example-wrapper:nth-child(${activeExampleTab + 1})`).fadeIn(200);
      });
  });

  $('.examples .example-link').on('click', function () {
    initPSWP($(this).attr('id').split('-')[1]);
  });

  $('.material .example-link').on('click', function () {
    if ($(this).html() === 'Показать все') {
      $(this).html('Скрыть');
      $('.material-card__mobile').removeClass('mobile-hide');
    } else {
      $(this).html('Показать все');
      $('.material-card__mobile').addClass('mobile-hide');
    }
  });

  $('#select-car-1-header').on('change', () => {
    if ($('#select-car-1-header').find('option:selected').val() !== 'none') {
      fillSecondSelect('#select-car-2-header select', $('#select-car-1-header').find('option:selected').val());
      $('#select-car-2-header').fadeIn();
    } else {
      $('#select-car-2-header').fadeOut();
    }
  });

  $('#checkbox-1-header').on('change', () => {
    if (document.getElementById('checkbox-1-header').checked) {
      $('#select-car-3-header').fadeIn();
    } else {
      $('#select-car-3-header').fadeOut();
    }
  });

  $('#checkbox-2-header').on('change', () => {
    if (document.getElementById('checkbox-2-header').checked) {
      $('#textarea-header').fadeIn();
    } else {
      $('#textarea-header').fadeOut();
    }
  });

  $('#select-car-1-contact').on('change', () => {
    if ($('#select-car-1-contact').find(':selected').val() !== 'none') {
      $('#select-car-2-contact').fadeIn();
      fillSecondSelect('#select-car-2-contact select', $('#select-car-1-contact').find('option:selected').val());
    } else {
      $('#select-car-2-contact').fadeOut();
    }
  });

  $('#checkbox-1-contact').on('change', () => {
    if (document.getElementById('checkbox-1-contact').checked) {
      $('#select-car-3-contact').fadeIn();
    } else {
      $('#select-car-3-contact').fadeOut();
    }
  });

  $('#checkbox-2-contact').on('change', () => {
    if (document.getElementById('checkbox-2-contact').checked) {
      $('#textarea-contact').fadeIn();
    } else {
      $('#textarea-contact').fadeOut();
    }
  });

  $('#select-car-1-calc').on('change', () => {
    if ($('#select-car-1-calc').find(':selected').val() !== 'none') {
      $('#select-car-2-calc').fadeIn();
      fillSecondSelect('#select-car-2-calc select', $('#select-car-1-calc').find('option:selected').val());
    } else {
      $('#select-car-2-calc').fadeOut();
    }
  });

  $('.header-input__phone').inputmask('+7 999 999 99 99');
});

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top,
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
      },
    }],
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
        dots: false,
      },
    }],
  });
}

$(window).resize(function () {
  if (window.innerWidth < 992) {
    if (!$('.slick-prices').hasClass('slick-initialized')) {
      mobileOnlySliders();
    }
  } else if ($('.slick-prices').hasClass('slick-initialized')) {
    $('.slick-prices').slick('unslick');
  }
});