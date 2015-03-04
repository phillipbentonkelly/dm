var listingMap = {};
var listingMapObj = {};

(function( win, $, undefined ) {
    'use strict';

    var listingmap = {};
    var _data = {};

    listingMap = function(){
    	if( ! (this instanceof listingMap))
    		return new listingMap();
    };

    listingMap.prototype = {
    	init: function(){
    		listingmap.$links = $('.listings-map__navigation a');
    		_data.currentNav = 'show-me';

    		this.eventHandlers();
    	},
    	eventHandlers: function(e){
    		listingmap.$links.on('click', function(){
    			var thisObj = $(this);
    			var newNav = thisObj.attr('data-map-item');

    			if(_data.currentNav !== 'show-me' || _data.currentNav !== newNav){
    				listingmap.$links.removeClass('selected');

    				thisObj.addClass('selected');
    			}
    		});
    	}
    };
})(window, jQuery);

$(function(){
	listingMapObj = listingMap();
	listingMapObj.init();
});