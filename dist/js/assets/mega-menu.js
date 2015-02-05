// *
// *  Mega Menu
// *

if (typeof dm === 'undefined') { dm = {}; }

PageNav = {};

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
			
			pageNav.menuObj.$logo = $('.page-nav__logo');
			pageNav.menuObj.$mainNavLinks = $('.page-nav__main-nav-links');

			pageNav.menuObj.$findAHome = $('li#find-home-menu');
			pageNav.menuObj.$neighborhoods = $('li#neighborhoods-menu');
			pageNav.menuObj.$myAccount = $('li#myAccount');

			this.initEventHandlers();
		}, 
		initEventHandlers: function(){
			var thisRef = this;

			pageNav.$responsiveIcon.on('click', thisRef.toggleMobileMenu);

			pageNav.menuObj.$findAHome.on('touchstart click', thisRef.toggleMobileMegaMenu);
			pageNav.menuObj.$neighborhoods.on('touchstart click', thisRef.toggleMobileMegaMenu);
			pageNav.menuObj.$myAccount.on('touchstart click', thisRef.toggleMobileMegaMenu);
		},
		toggleMobileMenu: function(e){
			e.preventDefault();
			pageNav.menuObj.$mainNavLinks.toggle();
		},
		toggleMobileMegaMenu: function(e){
			e.stopPropagation();
			e.preventDefault();

			var thisRef = this;
			var thisObj = $(this);

			if(pageNav.$body.width() < 768){
				var megaMenu = $(thisObj.find('.mega-menu'));
				megaMenu.toggle(0, function(){
					$(this).find('.mega-menu__container').toggle();
				});
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
