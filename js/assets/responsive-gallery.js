// *
// *  Responsive Gallery
// *
if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
	'use strict';

	var info = {};
	var module = {};
	var _engine = {};
  	var slideInterval = {};
	var galleryNav = { 'prev': {}, 'next': {} };

	$(function(){
    	module.init();
    	
    	$(window).load(function(){
			
		});

		$(window).resize(function () {
			
		});
    });


    module.init = function(){
    	// Map jQuery Objects
    	module.$body = $('body');
    	module.$gallery = $('.gallery-widget');
    	module.$wrapper = $('.gallery-widget__main-wrapper');
    	module.$scrollingWrapper = $('.gallery-widget__main-wrapper__scrolling-wrapper');
    	module.$slides = $('.gallery-widget .slide');
    	module.$slideDefaultImg = $('.gallery-widget .slide img');
		module.$nextSlide = $('.js-slider-next');
		module.$previousSlide = $('.js-slider-previous');
		module.$caption = $('.gallery-widget__details__caption');
		module.$showCaption = $('.gallery-widget__details__info-nav__show-caption');

		_engine.current = module.$slides.length > 2? 1 : 0;

		console.log("module.$slides count: " + module.$slides.length);

		// Set up Event Handlers
		module.eventHandlers();

		// Configure Dimensions, etc
		_engine.confInfo();
    };

    module.eventHandlers = function() {
    	/*
    	galleryNav.prev = module.$previousSlide.on('click', _engine.advanceGallery);
    	galleryNav.next = module.$nextSlide.on('click', _engine.advanceGallery);
    	*/

    	module.$showCaption.on('click', _engine.toggleCaptions);
    };

    _engine.toggleCaptions = function(e) {
    	console.log("Show Captions");
    	module.$caption.toggle();
    };

    _engine.confInfo = function() {
    	info.totalSlides = module.$slides.length;
    	info.defaultWidth = module.$slideDefaultImg.width();
    	info.defaultHeight = module.$slideDefaultImg.height();

    	console.log(info);
    };

})(window, jQuery);
