'use strict';
require('./index.html');
require('./jquery-3.4.1.min');
require('./index.scss');

function setModalWindowEditField() { // create function for edit name of products by mouse click on name of product
  jQuery('.card-product__link').click(function (event) {
    event.preventDefault();

    let clickedElemWindowPosition =  event.target.getBoundingClientRect(); // get the position in browser window of the clicked element that contain of the product name
    let clickedElemPagePosition = jQuery(event.target).offset(); // get the position on page of the clicked element that contain of the product name
    let clickedElemOuterHeight = jQuery(event.target).outerHeight(false); // get the height of the clicked element that contain of the product name
    let modalWindow = jQuery('.edit-field');
    let modalWindowPosTop = 0;
    let modalWindowPosLeft = clickedElemPagePosition.left;


    if (clickedElemWindowPosition.top < modalWindow.outerHeight(true)) {
      // if window for edit of the name product will be location outer of the browser window, then it adding to the "top" position height of clicked element
      modalWindowPosTop = clickedElemPagePosition.top + clickedElemOuterHeight;
    } else {
      // if window for edit of the name product will be location inner of the browser window, then it set the "edit window" position over of the clicked element
      modalWindowPosTop = clickedElemPagePosition.top - modalWindow.outerHeight(true);
    }

    modalWindow
      .addClass('edit-field_active')
      .css({
        top: modalWindowPosTop,
        left: modalWindowPosLeft,
      })
      .find('.edit-field__input-field').val(''); // this is clearing input field of the "edit window" after it's was closed

  });
}
setModalWindowEditField(); // set event Listeners for edit name of products by mouse click on name of product


function handleTouchendTableView() {
  if (jQuery('.card-product').hasClass('card-product_theme_table-view')) {
    // this is cancel of the table view
    jQuery('.draggable-element').removeClass('draggable-element_theme_table-view');
    jQuery('.card-product').removeClass('card-product_theme_table-view');
    jQuery('.card-product__image').removeClass('card-product__image_theme_table-view');
    jQuery('.card-product__header').removeClass('card-product__header_theme_table-view');
    jQuery('.card-product__description').removeClass('card-product__description_theme_table-view');
    jQuery('.card-product__specifications').removeClass('card-product__specifications_theme_table-view');
  } else {
    // this is adding the table view
    jQuery('.draggable-element').addClass('draggable-element_theme_table-view');
    jQuery('.card-product').addClass('card-product_theme_table-view');
    jQuery('.card-product__image').addClass('card-product__image_theme_table-view');
    jQuery('.card-product__header').addClass('card-product__header_theme_table-view');
    jQuery('.card-product__description').addClass('card-product__description_theme_table-view');
    jQuery('.card-product__specifications').addClass('card-product__specifications_theme_table-view');
  }
}

jQuery('#ghost-menu__view-tables').mouseenter(function (event) {
  handleTouchendTableView();
  this.addEventListener("touchend", handleTouchendTableView, true);
});


jQuery('#ghost-menu__nav').mouseenter(function (event) {
  jQuery(this).children('.nav-menu').addClass('nav-menu_active');
});


jQuery('#ghost-menu__nav').children('.nav-menu').mouseleave(function (event) {
  jQuery(this).removeClass('nav-menu_active');
  jQuery(this).find('.menu__extra').removeClass('menu__extra_theme_visible');
  jQuery(this).find('.menu__link').removeClass('menu__link_theme_grey');
  jQuery(this).find('.extra-menu').removeClass('extra-menu_theme_grey');
});


function handleEnd(e) {

  if (jQuery(e.target).hasClass('menu__link_theme_grey')){
    e.target.removeEventListener("touchend", handleEnd, true);
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

jQuery('#menu').find('.menu__link').each(function (event) {
  this.addEventListener("touchend", handleEnd, true);
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


jQuery('.edit-field__close-btn').click(function () {
  let currentEl = this;
  jQuery(currentEl).closest('.edit-field').css('border', '1px solid red').find('.edit-field__input-field').val('');
  jQuery(currentEl).addClass('edit-field__close-btn_clicked');
  setTimeout(() => {
    jQuery(currentEl).closest('.edit-field').removeClass('edit-field_active');
    jQuery(currentEl).closest('.edit-field').css('border', 'none');
    jQuery(currentEl).removeClass('edit-field__close-btn_clicked');
  }, 300);

});


let lastDragTarget = false;
jQuery('.draggable-element').each(function (obj) {
  this.addEventListener('dragstart', handleDragStart, false);
  this.addEventListener('dragenter', handleDragEnter, false);
  this.addEventListener('dragover', handleDragOver, false);
  this.addEventListener('drop', handleDrop, false);
  this.addEventListener('dragend', handleDragEnd, false);
});

function handleDragStart(e) {
  lastDragTarget = this;
  jQuery(lastDragTarget).addClass('draggable-element_state_draggable');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', jQuery(lastDragTarget).html());
}

function handleDragEnter(e) {
  (lastDragTarget !== this) ? jQuery(this).addClass('draggable-element_theme_stopping-place') : false;
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.stopPropagation();

  if (lastDragTarget != this) {
    let thisDragTarget = jQuery(this).html();
    jQuery(lastDragTarget).html(thisDragTarget);
    jQuery(this).html(e.dataTransfer.getData('text/html'));
  }

  jQuery('.draggable-element')
    .removeClass('draggable-element_state_draggable')
    .removeClass('draggable-element_theme_stopping-place');
  setModalWindowEditField();  //  after replacing the html code eventListeners"is deleted, thus set new event Listeners

}

function handleDragEnd(e) {
  jQuery('.draggable-element')
    .removeClass('draggable-element_state_draggable')
    .removeClass('draggable-element_theme_stopping-place');
  setModalWindowEditField();  //  after replacing the html code eventListeners"is deleted, thus set new event Listeners
}
