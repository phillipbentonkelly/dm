// *
// *  Mega Menu
// *
if (typeof dm === 'undefined') { dm = {}; }

var UIMods = {};

(function( win, $, undefined ) {
	'use strict';

	var uiMods = {};

	UIMods = function (){
	if( ! (this instanceof UIMods ))
	    return new UIMods();
	};

	UIMods.prototype = {
		init: function(){

			uiMods.$pageNav = $('.page-nav');
			uiMods.$megaMenu = $('.page-nav__main-nav-links');
			uiMods.$pageSearch = $('.page-search');

			uiMods.$pageSearch.$form = $('.page-search__form');

			// toggle buttons
			uiMods.$megaMenu.$icon = $('.page-nav__mega-menu-responsive-icon');
			uiMods.$pageSearch.$icon= $('.page-nav__search-responsive-icon > a');

			if(dm.env.device === 'mobile'){
				this.mobileEventHandlers();
			}

		},
		updateSearchOffset: function(){
			uiMods.$pageSearch.offset({ top: (uiMods.$pageNav.offset().top + uiMods.$pageNav.height()), left: 0 });
		},
		mobileEventHandlers: function(){

			uiMods.$megaMenu.$icon.on('mouseup', function(){
				if(uiMods.$pageSearch.$form.is(':visible')){
					uiMods.$pageSearch.$icon.trigger('click');
				}	
			});

			uiMods.$pageSearch.$icon.on('mouseup', function(){
				if(uiMods.$megaMenu.is(':visible')){
					uiMods.$megaMenu.$icon.trigger('click');
				}
			});

		},




	};
})(window, jQuery);


$(function(){
    uiModsObj = UIMods();
    uiModsObj.init();

    $(window).load(function(){
        uiModsObj.updateSearchOffset();
    });
    $(window).resize(function () {
        uiModsObj.updateSearchOffset();
    });
});