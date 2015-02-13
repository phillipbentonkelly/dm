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
			pageNav.$searchForm = $('.page-search__form');
			pageNav.$responsiveIcon = $('.page-nav__mega-menu-responsive-icon');
			pageNav.$resSearchIcon = $('.page-nav__search-responsive-icon');
			pageNav.menuObj.$findAHome = $('#find-home-menu').children('a');
			pageNav.menuObj.$neighborhoods = $('#neighborhoods-menu');
			pageNav.menuObj.$logo = $('.page-nav__logo');
			pageNav.menuObj.$mainNavLinks = $('.page-nav__main-nav-links');
			pageNav.menuObj.$logo = $('.page-nav__logo');

			// hide search form on mobile at page load
			if(pageNav.$body.width() < 768){
				pageNav.$searchForm.hide();
			}

			this.initEventHandlers();
		},
		initEventHandlers: function(){
			var thisRef = this;

			pageNav.$responsiveIcon.on('click', thisRef.toggleMobileMenu);
			pageNav.menuObj.$neighborhoods.on('click', thisRef.toggleMobileMegaMenu);

		// done by Ethan DM-237
			// toggles sublinks within find-a-home menu
			pageNav.menuObj.$findAHome.on('click', function() {
				thisRef.ethanMenu($(this));
			});
			// when search button is clicked, close expanded megamenu and toggle search form
			pageNav.$resSearchIcon.on('click', thisRef.toggleSearchForm)
				// pageNav.menuObj.$mainNavLinks.slideUp('fast');
				// thisRef.toggleSearchForm;
			// when hamburger button is clicked, close page-search
			pageNav.$responsiveIcon.on('click', function() {
				pageNav.$searchForm.slideUp('fast');
			});
		// end Ethan DM-237
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
		toggleSearchForm: function() {
			pageNav.$searchForm.show();
		},
		ethanMenu: function($el){
			var $parentEl = $el.parent('.page-nav__nav-item');
			if(pageNav.$body.width() < 768){
				$parentEl.find('.mega-menu').toggle();
				$parentEl.find('.mega-menu__container').toggle();
			}
		},
		updateLogoDim: function(){
			var thisRef = this;
			var iconObj1 = pageNav.$responsiveIcon;
			var iconObj2 = pageNav.$resSearchIcon;
			var stage = pageNav.$pageNav;
			var logoW = stage.width() - (iconObj2.width()+parseInt(iconObj2.css('border-left-width')) + iconObj1.width()+parseInt(iconObj1.css('border-right-width')));

			//console.log("Logo Width: " + pageNav.menuObj.$logo.width());

			if(pageNav.$body.width() < 768){
				pageNav.menuObj.$logo.width(logoW);
			}
			if(pageNav.$body.width() > 758){
				pageNav.menuObj.$logo.width(137);
			}
		},
		updateClickBehaviour: function(){
			
		}
	};
})(window, jQuery);


$(function(){
    pageNavObj = PageNav();
    pageNavObj.init();

    $(window).load(function(){
        pageNavObj.updateLogoDim();
        pageNavObj.updateClickBehaviour();
    });
    $(window).resize(function () {
        pageNavObj.updateLogoDim();
        pageNavObj.updateClickBehaviour();
    });
});
