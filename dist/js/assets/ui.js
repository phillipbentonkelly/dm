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
			console.log("uiMods.$pageNav.offset().top: " + uiMods.$pageNav.offset().top);
			console.log("uiMods.$pageNav.offset().top: " + uiMods.$pageNav.offset().top + uiMods.$pageNav.height());
			uiMods.$pageSearch.offset({ top: (uiMods.$pageNav.offset().top + uiMods.$pageNav.height()), left: 0 });
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