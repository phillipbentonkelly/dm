// *
// *  Mega Menu
// *

(function( win, $, undefined ) {
  'use strict';

  
})(window, jQuery);

$(document).ready(function () {
  $('.page-nav__mega-menu-responsive-icon').on('click', toggleMobileMenu);
});

function toggleMobileMenu(){
  $('.page-nav__main-nav-links').toggle();
}