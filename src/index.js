'use strict';
require('./index.html');
require('./jquery-3.4.1.min');
require('./index.scss');



jQuery('#ghost-menu__nav').mouseenter(function (event) {
  jQuery(this).children('.nav-menu').addClass('nav-menu_active');
});

jQuery('#ghost-menu__nav').children('.nav-menu').mouseleave(function (event) {
  jQuery(this).removeClass('nav-menu_active');

  jQuery(this).find('.menu__extra').removeClass('menu__extra_theme_visible');
  jQuery(this).find('.menu__link').removeClass('menu__link_theme_grey');
  jQuery(this).find('.extra-menu').removeClass('extra-menu_theme_grey');
});

jQuery('#menu').find('.menu__link').each(function (event) {
  this.addEventListener("touchend", handleEnd, true);
});

function handleEnd(e) {

  if (jQuery(e.target).hasClass('menu__link_theme_grey')){
    e.target.removeEventListener("touchend", handleEnd, true);
    console.log(e.target);
  } else {
    e.preventDefault();
  }

  jQuery('.menu__extra').removeClass('menu__extra_theme_visible');
  jQuery('.menu__link').removeClass('menu__link_theme_grey');
  jQuery('.extra-menu').removeClass('extra-menu_theme_grey');

  jQuery(e.target).addClass('menu__link_theme_grey');
  jQuery(e.target).next('.menu__extra').addClass('menu__extra_theme_visible');
  jQuery(e.target).next('.menu__extra').find('.extra-menu').addClass('extra-menu_theme_grey');

}

jQuery('#menu').find('.menu__link').mouseenter(function (event) {
  jQuery(event.target).addClass('menu__link_theme_grey');
  jQuery(event.target).next('.menu__extra').addClass('menu__extra_theme_visible');
  jQuery(event.target).next('.menu__extra').find('.extra-menu').addClass('extra-menu_theme_grey');
});

jQuery('#menu').find('.menu__item').mouseleave(function (event) {
  jQuery(this).find('.menu__extra').removeClass('menu__extra_theme_visible');
  jQuery(this).find('.menu__link').removeClass('menu__link_theme_grey');
  jQuery(this).find('.extra-menu').removeClass('extra-menu_theme_grey');
});

