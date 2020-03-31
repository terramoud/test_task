'use strict';
import './index.html';
import './jquery-3.4.1.min';
import './index.scss';

function setModalWindowForEditNameProduct() { // create function for edit the name of products by mouse click on name of product
  jQuery('.card-product__link').click(function (event) {
    event.preventDefault();

    // get the position in browser window of the clicked element that contain of the product name
    let clickedElemWindowPosition = event.target.getBoundingClientRect();
    // get the position on page of the clicked element that contain of the product name
    let clickedElemPagePosition = jQuery(event.target).offset();
    // get the height of the clicked element that contain of the product name
    let clickedElemOuterHeight = jQuery(event.target).outerHeight(false);
    // it creates a var to not call every time the jQuery function, that will be searching the element '.edit-field'
    let modalWindow = jQuery('.edit-field');
    let modalWindowPosTop = 0;
    let modalWindowPosLeft = clickedElemPagePosition.left; // horizontal position of the modal window


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
setModalWindowForEditNameProduct(); // start the function for edit the name of products by mouse click on name of product
jQuery('.edit-field__close-btn').click(function () { // the close button of the modal window for editing the product name
  let currentEl = this;
  jQuery(currentEl).closest('.edit-field').css('border', '1px solid red').find('.edit-field__input-field').val('');
  jQuery(currentEl).addClass('edit-field__close-btn_clicked');
  setTimeout(() => {
    // this is styles for close modal window
    jQuery(currentEl).closest('.edit-field').removeClass('edit-field_active');
    jQuery(currentEl).closest('.edit-field').css('border', 'none');
    jQuery(currentEl).removeClass('edit-field__close-btn_clicked');
  }, 300);

});


function handleTouchendTableView() { // create the table view
  if (jQuery('.card-product').hasClass('card-product_theme_table-view')) {
    // this is cancel of the table view
    jQuery('.draggable-element').removeClass('draggable-element_theme_table-view');
    jQuery('.card-product').removeClass('card-product_theme_table-view');
    jQuery('.card-product__image').removeClass('card-product__image_theme_table-view');
    jQuery('.card-product__header').removeClass('card-product__header_theme_table-view');
    jQuery('.card-product__description').removeClass('card-product__description_theme_table-view');
    jQuery('.card-product__specifications').removeClass('card-product__specifications_theme_table-view');
  } else {
    // this is setting the table view
    jQuery('.draggable-element').addClass('draggable-element_theme_table-view');
    jQuery('.card-product').addClass('card-product_theme_table-view');
    jQuery('.card-product__image').addClass('card-product__image_theme_table-view');
    jQuery('.card-product__header').addClass('card-product__header_theme_table-view');
    jQuery('.card-product__description').addClass('card-product__description_theme_table-view');
    jQuery('.card-product__specifications').addClass('card-product__specifications_theme_table-view');
  }
}
// set the "mouseenter" event and "touchend" event for creating the table view of products
jQuery('#ghost-menu__view-tables').mouseenter(function (event) {
  this.addEventListener("touchend", handleTouchendTableView, true);
  handleTouchendTableView();
});


// open the main navigation menu by "mouseenter" event
jQuery('#ghost-menu__nav').mouseenter(function (event) {
  jQuery(this).children('.nav-menu').addClass('nav-menu_active');
});


// close the main navigation menu by "mouseleave" event
jQuery('#ghost-menu__nav').children('.nav-menu').mouseleave(function (event) {
  jQuery(this).removeClass('nav-menu_active');
  jQuery(this).find('.menu__extra').removeClass('menu__extra_theme_visible');
  jQuery(this).find('.menu__link').removeClass('menu__link_theme_grey');
  jQuery(this).find('.extra-menu').removeClass('extra-menu_theme_grey');
});



function handleEnd(e) { // open the navigation menu by "touchend" event for the gadgets with touch screen
  /**
   * if it is second touch on the element of menu, than is removing the event listener "touchend",
   * thus it setting the default behavior for link that is contains in this menu
   */
  if (jQuery(e.target).hasClass('menu__link_theme_grey')){ // if it is not first touch
    e.target.removeEventListener("touchend", handleEnd, true);
  } else {
    /**
     * if it is first touch on the element of menu, than need remove the default behavior for link,
     * because the first touch will go to the link address, but the menu will not open
     */
    e.preventDefault();
  }

  jQuery('.menu__extra').removeClass('menu__extra_theme_visible');
  jQuery('.menu__link').removeClass('menu__link_theme_grey');
  jQuery('.extra-menu').removeClass('extra-menu_theme_grey');

  jQuery(e.target).addClass('menu__link_theme_grey'); // set the grey background on the selected item of menu for level 1
  jQuery(e.target).next('.menu__extra').addClass('menu__extra_theme_visible'); // display menu level 2
  jQuery(e.target).next('.menu__extra').find('.extra-menu').addClass('extra-menu_theme_grey'); // set the grey background of menu for level 2
}

jQuery('#menu').find('.menu__link').each(function (event) { // set the event listener for all items of the first level menu for gadgets with touchscreen
  this.addEventListener("touchend", handleEnd, true);
});

// open the navigation menu level 1 by "mouseenter" event
jQuery('#menu').find('.menu__link').mouseenter(function (event) { // set the event listener for all items of the first level menu
  jQuery(event.target).addClass('menu__link_theme_grey');
  jQuery(event.target).next('.menu__extra').addClass('menu__extra_theme_visible');
  jQuery(event.target).next('.menu__extra').find('.extra-menu').addClass('extra-menu_theme_grey');
});

// close the navigation menu level 1 by "mouseleave" event
jQuery('#menu').find('.menu__item').mouseleave(function (event) {
  jQuery(this).find('.menu__extra').removeClass('menu__extra_theme_visible');
  jQuery(this).find('.menu__link').removeClass('menu__link_theme_grey');
  jQuery(this).find('.extra-menu').removeClass('extra-menu_theme_grey');
});



let lastDragTarget = false; // create var to save the last draggable element
// set the event listeners for all of the draggable element
jQuery('.draggable-element').each(function (obj) {
  this.addEventListener('dragstart', handleDragStart, false); // set the event listeners for the start dragging
  this.addEventListener('dragenter', handleDragEnter, false); // set the event listeners when the dragging element proved on the target element
  this.addEventListener('dragover', handleDragOver, false); //  set the event listeners to cancel the behavior default
  this.addEventListener('drop', handleDrop, false); // set the event listeners when the dragging element proved on the target element and it is dropped
});

function handleDragStart(e) { // set styles for the start dragging and save html code of the draggable element
  jQuery('.edit-field__close-btn').trigger('click'); // is closed the "edit window" if the window is open while dragging items
  lastDragTarget = this; //  the last draggable element === current element
  jQuery(lastDragTarget).addClass('draggable-element_state_draggable');
  e.dataTransfer.effectAllowed = 'move'; // track the move elements
  e.dataTransfer.setData('text/html', jQuery(lastDragTarget).html()); // save html code of the draggable element
}

function handleDragEnter(e) { // create dashed border on the target element before drop
  (lastDragTarget !== this) ? jQuery(this).addClass('draggable-element_theme_stopping-place') : false; // if target element !== the draggable element
}

function handleDragOver(e) { // cancel the behavior default, because the elements is not draggable by default
  e.preventDefault();
}


function handleDrop(e) { // this is implementation of draggable items
  e.stopPropagation(); // this is stopping "bubbling" the event to the parent elements for optimization browser rendering
  /**
   * when the dragging element proved on the target element, the target element is replaced the draggable element,
   * and on place the "draggable element" is set the "target element"
   */
  if (lastDragTarget != this) {
    let thisDragTarget = jQuery(this).html(); // just a variable for easier code reading
    jQuery(lastDragTarget).html(thisDragTarget); // to assign the "target element" on place the "draggable element"
    jQuery(this).html(e.dataTransfer.getData('text/html')); // get html code of the draggable element and to assign it to the "target element"
  }

  jQuery('.draggable-element')
    .removeClass('draggable-element_state_draggable')
    .removeClass('draggable-element_theme_stopping-place');
  setModalWindowForEditNameProduct();  //  after replacing the html code eventListeners is deleted, thus set new event listeners
}

