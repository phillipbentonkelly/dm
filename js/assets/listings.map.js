var listingMap = {};
var listingMapObj = {};

(function( win, $, undefined ) {
    'use strict';

    var listingmap = {};
    var _engine = {};

    listingMap = function(){
    	if( ! (this instanceof listingMap))
    		return new listingMap();
    }

    listingMap.prototype = {
    	init: function(){
    		listingmap.$links = $('.listings-map__navigation a');
    	},
    	eventHandlers: function(e){

    	}
    }

})(window, jQuery);

$(function(){

});