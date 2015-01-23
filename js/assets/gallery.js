var GalleryWidget = {};
var galleryWidgetObj = {};

(function( win, $, undefined ) {
    'use strict';

    var galleryWidget = {};
    var _data = {};

    GalleryWidget = function(){
    	if( ! (this instanceof GalleryWidget))
    		return new GalleryWidget();
    };

    GalleryWidget.prototype = {
    	init: function(){
    		galleryWidget.$topNode = $('.gallery-widget');
    		galleryWidget.$slides = $('.gallery-widget .slide');
    	},
    	eventHandlers: function(){
    		$(window).load(function(){
				updateSlideDim();
			});

			$(window).resize(function () {
				updateSlideDim();
			});
    	},
    	updateSlideDim: function(){
    		console.log(galleryWidget.$topNode.width());
    	}
    };
})(window, jQuery);