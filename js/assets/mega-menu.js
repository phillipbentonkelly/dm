// *
// *  Mega Menu
// *

var PageNav = {};

(function( win, $, undefined ) {
	'use strict';

	var pageNav = {
		menuObj: {}
	};

	var pageSearch = {};

	PageNav = function (){
	if( ! (this instanceof PageNav ))
	    return new PageNav();
	};

	PageNav.prototype = {
		init: function(){

			pageSearch = $('.page-search');
			pageNav.$body = $('body');
			pageNav.$pageNav = $('.page-nav');
			pageNav.$responsiveIcon = $('.page-nav__mega-menu-responsive-icon');
			pageNav.$resSearchIcon = $('.page-nav__search-responsive-icon');

			pageNav.$megaMenus = $('.mega-menu');
			pageNav.$dropDownIcons = $('.page-nav__nav-item__responsive-drop-down-icon');
			
			pageNav.menuObj.$logo = $('.page-nav__logo');
			pageNav.menuObj.$mainNavLinks = $('.page-nav__main-nav-links');

			pageNav.menuObj.$searchSubmit = $('.page-nav__search-submit');

			pageNav.menuObj.$findAHome = $('li#find-home-menu');
			pageNav.menuObj.$neighborhoods = $('li#neighborhoods-menu');
			pageNav.menuObj.$myAccount = $('li#myAccount');

			this.initEventHandlers();
		}, 
		initEventHandlers: function(){
			var thisRef = this;

			pageNav.$responsiveIcon.on('click', thisRef.toggleMobileMenu);
			pageNav.$resSearchIcon.on('click', thisRef.hideMobileMenu);

			pageNav.menuObj.$findAHome.children('a').on('touchstart click', thisRef.toggleMobileMegaMenu);
			pageNav.menuObj.$neighborhoods.children('a').on('touchstart click', thisRef.toggleMobileMegaMenu);
			pageNav.menuObj.$myAccount.children('a').on('touchstart click', thisRef.toggleMobileMegaMenu);

			pageNav.menuObj.$searchSubmit.on('click', function(){
				location.href = 'serp.html';
			});
		},
		toggleMobileMenu: function(e){
			e.preventDefault();
			pageNav.menuObj.$mainNavLinks.slideToggle('fast');
		},
		hideMobileMenu: function(e){
			pageNav.menuObj.$mainNavLinks.hide('fast');
		},	
		toggleMobileMegaMenu: function(e){
			e.preventDefault();
			e.stopPropagation();

			var thisRef = this;
			var thisObj = $(this).parent();

			console.log(thisObj.parent());

			if(pageNav.$body.width() < 768){
				//$(this).trigger('focus');
				var thisToggle = $(this).children('span');
				var megaMenu = $(thisObj.find('.mega-menu'));
				var visibleOthers = $('.mega-menu').not(megaMenu).has(':visible');
				visibleOthers.hide(0, function(){
					$(this).parent().children('a').children('span').removeClass('minus');
					$(this).find('.mega-menu__container').hide();
				});
				megaMenu.toggle(0, function(){
					$(this).find('.mega-menu__container').toggle(0, function(){
						thisToggle.toggleClass('minus');
					});

				});
				
			}
		},
		updateLogoDim: function(){
			var thisRef = this;
			var iconObj1 = pageNav.$responsiveIcon;
			var iconObj2 = pageNav.$resSearchIcon;
			var stage = pageNav.$pageNav;
			var logoW = stage.width() - (iconObj2.width()+parseInt(iconObj2.css('border-left-width')) + iconObj1.width()+parseInt(iconObj1.css('border-right-width')));

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
