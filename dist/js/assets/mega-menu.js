// *
// *  Mega Menu
// *

(function( win, $, undefined ) {
  'use strict';

  
})(window, jQuery);

$(document).ready(function () {
  $('.page-nav__mega-menu-responsive-icon').on('click', toggleMobileMenu);

  $('#find-home-menu').on('click', toggleMobileMegaMenu);
  $('#neighborhoods-menu').on('click', toggleMobileMegaMenu);
  $('#myAccount').on('click', toggleMobileMegaMenu);
});

function toggleMobileMenu(){
  $('.page-nav__main-nav-links').toggle();
}

function toggleMobileMegaMenu(e) {
	var thisRef = this;
	var thisObj = $(this);

	if($('body').width() < 768){
		/*console.log($(thisObj.find('.page-nav__nav-lv0 .page-nav__nav-item__responsive-drop-down-icon')).attr('class'));

		if($(thisObj.find('.page-nav__nav-lv0 .page-nav__nav-item__responsive-drop-down-icon')).attr('data-content') === '+'){
			$(thisObj.find('.page-nav__nav-lv0 .page-nav__nav-item__responsive-drop-down-icon')).attr('data-content', '-');
		}else{
			$(thisObj.find('.page-nav__nav-lv0 .page-nav__nav-item__responsive-drop-down-icon')).attr('data-content', '+');
		}*/
		
		$(thisObj.find('.mega-menu')).toggle();
		$(thisObj.find('.mega-menu__container')).toggle();
	}
}
