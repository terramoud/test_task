'use strict';
require('./index.html');
require('./jquery-3.4.1.min');
require('./index.scss');

console.log(jQuery('#menu'));


function ghostMenuNav() {

}

jQuery('#ghost-menu__nav').mouseenter(function (event) {
  jQuery(this).children('.nav-menu').addClass('nav-menu_active');
});

jQuery('#ghost-menu__nav').children('.nav-menu').mouseleave(function (event) {
  jQuery(this).removeClass('nav-menu_active');
});

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

