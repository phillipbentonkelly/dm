// *
// *  Full Screen Carousel
// *

var Carousel = {};

(function( win, $, undefined ) {
	'use strict';

	var carousel = {};

	Carousel = function (){
	if( ! (this instanceof Carousel ))
	    return new Carousel();
	};

	Carousel.prototype = {
		init: function(){
			carousel.$body = $('body');
	    	carousel.$wrapper = $('#carousel-wrap');
	    	carousel.$carousel = $('#carousel');
	    	carousel.$carouselWrapper = $('.carousel_wrapper');
	    	carousel.$carouselWrapperImg = $('#carousel-wrap figure.slide a img[srcset]');
	    	carousel.$slide = $('#carousel-wrap figure');
			carousel.$nextSlide = $('.js-slider-next');
			carousel.$previousSlide = $('.js-slider-previous');

			console.log(carousel);
		},
		sizeGallery: function(){
			var carouselNav_UI = '#carousel-wrap .prev, #carousel-wrap .next';
			var bodyWidth = carousel.$body.width();
			var actualWidth = carousel.$carouselWrapperImg.width();
			var w = (bodyWidth - actualWidth - 6)/2;
			var slideMarginRight = carousel.$slide.css('margin-right')? parseInt(carousel.$slide.css('margin-right')) : 0;
				carousel.$mLayout_slide = $('#carousel figure.slide');
				carousel.$mLayout_img = $('#carousel figure.slide a img');
			
			console.log(carouselNav_UI);
			console.log(bodyWidth);
			console.log(actualWidth);
			console.log(w);
			console.log(slideMarginRight);
			console.log(slideMarginRight);
			console.log(carousel.$mLayout_slide);
			console.log(carousel.$mLayout_img);
			console.log("sizeGallery");
		}
	};
})(window, jQuery);


$(function(){
    carouselObj = Carousel();
    carouselObj.init();

    $(window).load(function(){
        carouselObj.sizeGallery();
    });
    $(window).resize(function () {
        carouselObj.sizeGallery();
    });
});