const carObj = require('./models.json');
const examplePhotos = require('./examples.js').default;

let priceSwiper;
let feedbackSwiper;

function fillBrandsSelects() {
  carObj.forEach((e) => {
    $('#select-car-1-header').append(`<option value="${e.name}">${e.name}</option>`);
    $('#select-car-1-contact').append(`<option value="${e.name}">${e.name}</option>`);
    $('#select-car-1-calc').append(`<option value="${e.name}">${e.name}</option>`);
  });
}

function fillModelSelect(selector, val) {
  $(selector).html('<option value="none">Выберите модель</option>');
  const brand = carObj.find(item => (item.name === val));
  brand.types.forEach((e) => {
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

function mobileOnlySliders() {
  priceSwiper = new Swiper('.prices-swiper', {
    initialSlide: 1,
  });
  feedbackSwiper = new Swiper('.feedback-swiper', {});
}

function fillCarTabs() {
  Object.keys(economPrices).forEach((e, index) => {
    $(`.car-main:eq(0) .car-text-${index + 1} h4`).html(`от ${economPrices[e]} ₽`);
  });

  Object.keys(standartPrices).forEach((e, index) => {
    $(`.car-main:eq(1) .car-text-${index + 1} h4`).html(`от ${standartPrices[e]} ₽`);
  });

  Object.keys(premiumPrices).forEach((e, index) => {
    $(`.car-main:eq(2) .car-text-${index + 1} h4`).html(`от ${premiumPrices[e]} ₽`);
  });
}

function fillPackPrices() {
  $('.prices-card__wrapper:eq(0) .prices-card__price').html(`От ${economPackPrice} руб`);
  $('.prices-card__wrapper:eq(1) .prices-card__price').html(`От ${standartPackPrice} руб`);
  $('.prices-card__wrapper:eq(2) .prices-card__price').html(`От ${premiumPackPrice} руб`);
}

function validateForm(container) {
  let result = true;
  $(`.${container} .header-form .header-input`).removeClass('validation-fail');
  $(`.${container} .header-form .input-checkbox .checkmark`).removeClass('validation-fail');
  $(`.${container} .header-form .header-button`).attr('disabled', 'true');

  const nameValue = $(`.${container} .header-form .input-name input`).val();
  if (!nameValue || nameValue.length <= 0) {
    $(`.${container} .header-form .input-name`).addClass('validation-fail');
    result = false;
  }

  const phoneValue = $(`.${container} .header-form .input-phone input`).val();
  if (!phoneValue || phoneValue.indexOf('_') > -1) {
    $(`.${container} .header-form .input-phone`).addClass('validation-fail');
    result = false;
  }

  const checkbox = $(`.${container} .header-form .input-checkbox input`).is(':checked');
  if (!checkbox) {
    $(`.${container} .header-form .input-checkbox .checkmark`).addClass('validation-fail');
    result = false;
  }

  return result;
}

function sendForm (container, data) {
  $.ajax({
    type: 'post',
    url: '/order',
    data: data,
  })
    .done(function (response) {
      $(`.${container} .header-form .header-button`).removeAttr('disabled');

      $.when($(`.${container} .header-form.form-main`).fadeOut())
        .then(function () {
          $(`.${container} .header-form.form-success`).fadeIn();
        });
    })
    .fail(function (error) {
      $(`.${container} .header-form .header-button`).removeAttr('disabled');

      $.when($(`.${container} .header-form.form-main`).fadeOut())
        .then(function () {
          $(`.${container} .header-form.form-fail`).fadeIn();
        });
    });

}

$(document).ready(function () {
  fillBrandsSelects();

  fillCarTabs();

  fillPackPrices();

  $('.form').on('submit', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const container = $(this).children('.header-button').attr('id').split('-')[2];
    const validation = validateForm(container);

    if (!validation) {
      $(`.${container} .header-form .header-button`).removeAttr('disabled');
      return;
    }

    sendForm(container, $(this).serialize());
  });

  $('.form-modal').on('submit', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const container = $(this).children('.header-button').attr('id').split('-')[2];

    const validation = validateForm(container);

    if (!validation) {
      $(`.${container} .header-form .header-button`).removeAttr('disabled');
      return;
    }

    sendForm(container, $(this).serialize());
  });

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
    $('.modal-form .hidden-inputs').html('');
    $('.form-calc input').each(function () {
      if ($(this).is(':checked')) {
        $('.modal-form .hidden-inputs').append(`<input type="hidden" name="${$(this).attr('name')}" value="true">`);
      }
    });
    $('.form-calc select').each(function () {
      $('.modal-form .hidden-inputs').append(`<input type="hidden" name="${$(this).attr('name')}" value="${$(this).val()}">`);
    });
    $('.modal-form').fadeIn();
  });

  $('.calc-back').on('click', function () {
    $('.calc-inner-1').css('display', 'block');
    $('.calc-inner-2').css('display', 'none');
    $('.calc-back').css('display', 'none');
  });

  $('.prices-card__button button').on('click', function () {
    $('.modal-form .hidden-inputs').html('');
    $('.modal-form .hidden-inputs').append(`<input type="hidden" name="services" value="${$(this).attr('data-price')}">`);
    $('.modal-form').fadeIn();
  });

  $('.open-modal').on('click', function () {
    $('.modal-text').fadeIn();
  });

  $('.modal-overlay').on('click', function () {
    const that = $(this);
    $.when($(this).parent('.header-form__wrapper').parent('.modal').fadeOut())
      .then(function () {
        $(that).siblings('.form-alt').hide();
        $(that).siblings('.form-main').show();
      });
  });

  $('.form-alt__button').on('click', function () {
    const that = $(this);
    $.when($(this).parent('.form-alt').fadeOut())
      .then(function () {
        $(that).parent('.form-alt').siblings('.form-alt').hide();
        $(that).parent('.form-alt').siblings('.form-main').show();
      });
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

  $('.gallery-link').on('click', function () {
    initPSWP($(this).data('id') - 1);
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
      fillModelSelect('#select-car-2-header select', $('#select-car-1-header').find('option:selected').val());
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
      fillModelSelect('#select-car-2-contact select', $('#select-car-1-contact').find('option:selected').val());
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
      fillModelSelect('#select-car-2-calc select', $('#select-car-1-calc').find('option:selected').val());
    } else {
      $('#select-car-2-calc').fadeOut();
    }
  });

  $('.header-input__phone').inputmask('+7 999 999 99 99');

  if (window.innerWidth < 992) {
    mobileOnlySliders();
  }

  $('.video-js').map((elem, i) => (videojs(i)));
});

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top,
  }, 500);
});

$(window).resize(function () {
  if (window.innerWidth < 992) {
    if (!$('.prices-swiper').hasClass('swiper-container-initialized')) {
      mobileOnlySliders();
    }
  } else if ($('.prices-swiper').hasClass('swiper-container-initialized')) {
    priceSwiper.destroy(true, true);
    feedbackSwiper.destroy(true, true);
  }
});
