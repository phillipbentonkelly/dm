// // *
// // *  Mega Menu
// // *

// (function( win, $, undefined ) {
//   'use strict';

//   var menu = {};

//   menu.showMenu = function(menu) {
//     $('.mega-menu__container').hide();
//     var currentMenu = $('.' + menu.attr('id'));
//     currentMenu.show();
//   };

//   menu.hideMenu = function(menu) {
//     var currentMenu = menu === undefined ? $('.mega-menu__container') : $('.'+menu.attr('id'));
//     currentMenu.hide();
//   };

//   // ------------------------------------------------------------
//   //  * Event Handlers
//   // ------------------------------------------------------------

//   menu.eventHandlers = function() {
//     $('.js-mega-menu').hover(function() {
//       if(window.innerWidth >= 960) {
//         menu.showMenu($(this));
//       }
//     }, function() {
//       var hoveringContainer = $('body').find(".mega-menu__container:hover").length;
//       // if mouse leaves menu-item-button AND mega-menu container
//       if(!hoveringContainer) {
//         menu.hideMenu($(this));
//       }
//     });

//     $('.mega-menu__container').hover(function() {
//       $(this).css('display', 'block');
//     }, function() {
//       var hoveringNav = $('body').find(".js-mega-menu:hover").length;
//       // if mouse leaves menu-item-button AND mega-menu container
//       if(!hoveringNav) {
//         menu.hideMenu($(this));
//       }
//     });
//   };

//   // ------------------------------------------------------------
//   //  * Init
//   // ------------------------------------------------------------

//   menu.init = function() {
//     menu.eventHandlers();
//   };

//   // Kickoff
//   $(document).ready(function() {
//     if ($('.page-nav').length) { menu.init(); }
//   });

// })(window, jQuery);