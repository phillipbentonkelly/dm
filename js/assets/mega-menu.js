// *
// *  Mega Menu
// *

var PageNav = {};

(function( win, $, undefined ) {
	'use strict';

	var pageNav = {
		menuObj: {}
	};

	PageNav = function (){
	if( ! (this instanceof PageNav ))
	    return new PageNav();
	};

	PageNav.prototype = {
		init: function(){
			pageNav.$body = $('body');
			pageNav.$pageNav = $('.page-nav');
			pageNav.$responsiveIcon = $('.page-nav__mega-menu-responsive-icon');
			pageNav.$resSearchIcon = $('.page-nav__search-responsive-icon');
			pageNav.menuObj.$findAHome = $('#find-home-menu');
			pageNav.menuObj.$neighborhoods = $('#neighborhoods-menu');
			pageNav.menuObj.$logo = $('.page-nav__logo');
			pageNav.menuObj.$mainNavLinks = $('.page-nav__main-nav-links');
			pageNav.menuObj.$logo = $('.page-nav__logo');

			this.initEventHandlers();
		}, 
		initEventHandlers: function(){
			var thisRef = this;

			pageNav.$responsiveIcon.on('click', thisRef.toggleMobileMenu);
			pageNav.menuObj.$findAHome.on('click', thisRef.toggleMobileMegaMenu);
			pageNav.menuObj.$neighborhoods.on('click', thisRef.toggleMobileMegaMenu);
		},
		toggleMobileMenu: function(e){
			e.preventDefault();
			pageNav.menuObj.$mainNavLinks.toggle();
		},
		toggleMobileMegaMenu: function(e){
			var thisRef = this;
			var thisObj = $(this);

			if(pageNav.$body.width() < 768){
				$(thisObj.find('.mega-menu')).toggle();
				$(thisObj.find('.mega-menu__container')).toggle();
			}
		},
		updateLogoDim: function(){
			var thisRef = this;
			var iconObj1 = pageNav.$responsiveIcon;
			var iconObj2 = pageNav.$resSearchIcon;
			var stage = pageNav.$pageNav;
			var logoW = stage.width() - (iconObj2.width()+parseInt(iconObj2.css('border-left-width')) + iconObj1.width()+parseInt(iconObj1.css('border-right-width')));

			pageNav.menuObj.$logo.width(logoW);
		}
	};
})(window, jQuery);


$(function(){
    pageNavObj = PageNav();
    pageNavObj.init();

    $(window).load(function(){
        pageNavObj.updateLogoDim();
    });
    $(window).resize(function () {
        pageNavObj.updateLogoDim();
    });
});
