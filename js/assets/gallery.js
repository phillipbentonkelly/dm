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

    		this.eventHandlers();
    	},
    	eventHandlers: function(){
    		var thisRef = this;

    		$(window).load(function(){
				thisRef.updateSlideDim();
			});

			$(window).resize(function () {
				thisRef.updateSlideDim();
			});

			console.log("HEy");

			$('.gallery-widget__main-wrapper__nav-arrows').on('click', this.advanceGallery);
    	},
    	advanceGallery: function(e){
    		var thisRef = this;
    		var thisObj = $(this);

    		console.log("Move: " + thisObj.attr('title'));
    	},
    	updateSlideDim: function(){
    		var w = galleryWidget.$topNode.width();

    		galleryWidget.$slides.width(w);

    		console.log(w);
    	}
    };
})(window, jQuery);

$(function(){
	galleryWidgetObj = GalleryWidget();
	galleryWidgetObj.init();
});