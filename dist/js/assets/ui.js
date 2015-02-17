// *
// *  Mega Menu
// *

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
			uiMods.$pageSearch = $('.page-search');
		},
		updateSearchOffset: function(){
			uiMods.$pageSearch.offset({ top: (uiMods.$pageNav.offset().top + uiMods.$pageNav.height()), left: 0 });
		},
		mobileEventHandlers: function(){
			// mouseup events trigger the click events for the other visible panel
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

		}
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