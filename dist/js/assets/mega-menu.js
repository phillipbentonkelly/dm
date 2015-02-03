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
			pageNav.$responsiveIcon = $('.page-nav__mega-menu-responsive-icon');
			pageNav.menuObj.$findAHome = $('#find-home-menu');
			pageNav.menuObj.$neighborhoods = $('#neighborhoods-menu');
			pageNav.menuObj.$logo = $('.page-nav__logo');
			pageNav.menuObj.$mainNavLinks = $('.page-nav__main-nav-links');

			this.initEventHandlers();
		}, 
		initEventHandlers: function(){
			var thisRef = this;

			pageNav.$responsiveIcon.on('click', thisRef.toggleMobileMenu);
			pageNav.menuObj.$findAHome.on('click', thisRef.toggleMobileMegaMenu);
			pageNav.menuObj.$neighborhoods.on('click', thisRef.toggleMobileMegaMenu);
		},
		toggleMobileMenu: function(e){
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

		}
	};
})(window, jQuery);


/*-------------------------------------*/
/*
$(document).ready(function () {
	$('.page-nav__mega-menu-responsive-icon').on('click', toggleMobileMenu);
	$('#find-home-menu').on('click', toggleMobileMegaMenu);
	$('#neighborhoods-menu').on('click', toggleMobileMegaMenu);

	logoObj = $('.page-nav__logo');

	$(window).load(updateLogoDim);
	$(window).resize(updateLogoDim);
});

function updateLogoDim(){
	console.log("updateLogoDim...");
	logoObj.width();
}

function toggleMobileMenu(){
  $('.page-nav__main-nav-links').toggle();
}

function toggleMobileMegaMenu(e) {
	var thisRef = this;
	var thisObj = $(this);

	if($('body').width() < 768){
		$(thisObj.find('.mega-menu')).toggle();
		$(thisObj.find('.mega-menu__container')).toggle();
	}
}
*/
/*-------------------------------------*/


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
