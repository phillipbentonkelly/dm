/*jshint unused:false */
/*global $:false, _:false, Swiper:false */

/*
 * Gallery module for Boston.com prototype
 * by Pete Karl (@steyblind) c/o Upstatement (@upstatement)
*/
var bcom_photos = (function() {
	'use strict';

	// var imagesLoaded = require('imagesloaded');

	var module = {};

	module.currentSlide = 0;

	module.init = function() {
		//alert('initing bcom_photos');
		// Give us feedback when the user is hovering in the Lead Tease so we
		// take action in the CSS, say for showing and hiding arrows
		$('.swiper-mod, .gallery-img-mod')
			.on('mouseenter', function () {
				$('.lead-tz-mod, .gallery-img-mod, .gallery-tools-img').addClass('is-hovering');
			}).on('mouseleave', function () {
				$('.lead-tz-mod, .gallery-img-mod, .gallery-tools-img').removeClass('is-hovering');
			});

		// Show / Hide Quick Gallery Captions
		$('.js-show-caption').on('click', function(e){
			e.preventDefault();
			if($('body').hasClass('caption-active')) {
				$('body').removeClass('caption-active');
				$(this).text('Show caption');
				$('.gallery-caption').slideUp(200);
			} else {
				$('body').addClass('caption-active');
				$(this).text('Hide caption');
				$('.gallery-caption').slideDown(200);
			}
		});

		// Resize the lead tease, please ...
		// resizeLeadTease();
		// resizeFeatTease();

		// and run it on resize, too
		// $(window).resize(function(){
		// 	resizeLeadTease();
		// 	if ($(window).width() < 960) {
		// 		resizeFeatTease();
		// 	}
		// });

		if(typeof Swiper !== 'undefined') {

			var leadSwiper = new Swiper('.swiper-mod', {
				mode:'horizontal',
				speed: 300,
				loop: true,
				calculateHeight: true,
				onSlideClick: function(e){
					console.log(e);
					e.preventDefault();
				}
			});

			var leadTimeout = 0;

			$('.swiper-prev').click(function(){ leadSwiper.swipePrev(); });
			$('.swiper-next').click(function(){ leadSwiper.swipeNext(); });

			// Advance slide based on the navigation 
			$('.lead-nav-item')
				.on('mouseenter', function() {
					// Find the index of the item we're on ...
					var index = $('.lead-nav-item').index(this);
					// ... change the slide to match the index				 
					leadTimeout = setTimeout(function(){
						leadSwiper.swipeTo(index);
				}, 300);
			})
				.on('mouseleave', function() {
					clearTimeout(leadTimeout);
			});
		}

		// pair up keypresses with class assignment for design/testing purposes
		var keyObj = {
			49: function() {
				$('.gallery-type').addClass('image-focused-gallery').removeClass('split-focused-gallery').removeClass('text-focused-gallery');
			},
			50: function() {
				$('.gallery-type').removeClass('image-focused-gallery').addClass('split-focused-gallery').removeClass('text-focused-gallery');
			},
			51: function() {
				$('.gallery-type').removeClass('image-focused-gallery').removeClass('split-focused-gallery').addClass('text-focused-gallery');
			},
			52: function() {
				$('.gallery-type').removeClass('click-gallery').addClass('scrolling-gallery');
				redrawSlides();
			},
			53: function() {
				$('.gallery-type').addClass('click-gallery').removeClass('scrolling-gallery');
				redrawSlides();
			},
			37: function(e) {
				module.currentSlide--;
				redrawSlides();
			},
			39: function(e) {
				module.currentSlide++;
				redrawSlides();
			}
		};

		$(document).on('keydown', function(e) {
			if ($.inArray(e.which + '', Object.keys(keyObj)) >= 0) {
				keyObj[e.which]();
			}
		});

		$('.prev-top-btn, .prev-bottom-btn, .swiper-prev').on('click', function(e) {
			e.preventDefault();
			module.currentSlide--;
			redrawSlides();
		});

		$('.next-top-btn, .next-bottom-btn, .swiper-next').on('click', function(e) {
			e.preventDefault();
			module.currentSlide++;
			redrawSlides();
		});

		// if we have a gallery of content on the page, let's show the first item
		if($('.gallery-wrapper').length) {
			redrawSlides();
		}

		// Several sloppy if statements that automatically turn 
		// click gallery into scrolling gallery if window is under 600px - nh
		if($(window).width() < 600) {
			if($('.gallery-type').hasClass('click-gallery')){
				$('.gallery-type').removeClass('click-gallery').addClass('scrolling-gallery scrolling-gallery-fix');
				redrawSlides();
			}
		}

		$(window).resize(function(){
			if($(window).width() < 600) {
				if($('.gallery-type').hasClass('click-gallery')){
					$('.gallery-type').removeClass('click-gallery').addClass('scrolling-gallery scrolling-gallery-fix');
					redrawSlides();
				}
			} else if($('.gallery-type').hasClass('scrolling-gallery-fix')) {
				$('.gallery-type').addClass('click-gallery').removeClass('scrolling-gallery scrolling-gallery-fix');
				redrawSlides();
			}
		});

	};

function redrawSlides() {

		if($('.gallery-type').hasClass('click-gallery')) {
			if(module.currentSlide < 0) {
				module.currentSlide = 0;
				// console.log('we are at the first slide');
			}

			// hide all slides
				$('.gallery-slide').hide();
			
			// show slides with index of module.currentSlide
			$('.gallery-slides').each(function() {

				var slides = $(this).find('.gallery-slide');

				if(module.currentSlide > (slides.length - 1)) {
					module.currentSlide = slides.length - 1;
				}

				// Added this - nh + tb
				if(module.currentSlide === 0) {
					$('.gallery-type').addClass('first-slide');
				} else {
					$('.gallery-type').removeClass('first-slide');
				}

				var numSlides = $('.gallery-slides:first .gallery-slide').length;

				if($('.gallery-type').hasClass('num-descend')) {
					$('.slide-num').text( numSlides - module.currentSlide);
				} else if($('.gallery-type').hasClass('num-ascend')) {
					$('.slide-num').text(module.currentSlide);
				}

				$('.current-page').text(module.currentSlide+1);
				$('.total-pages').text(numSlides);

				slides.eq(module.currentSlide).show();
				limitSlideSize(slides.eq(module.currentSlide));
			});
		} else if($('.gallery-type').hasClass('scrolling-gallery')) {
			$('.gallery-slide').show();
		}
	}

	function limitSlideSize(slide) {

		var $slide = $(slide);
		var $img = $slide.find('.gallery-img');

		var windowHeight = $(window).height();
		var	imgMaxHeight = (windowHeight * 0.8);
		var	quickMaxHeight = (windowHeight * 0.6);

		console.log($.contains('.qg-gallery-slides', '.gallery-img'));
		
		if($img.height() > imgMaxHeight) {
			if ($.contains('.quick-gallery-slides', $img))  {
				var fixedWidth = quickMaxHeight * ( $img.width() / $img.height() );
				$img.css('width', fixedWidth + 'px');
			} else {
				var fixedWidth = imgMaxHeight * ( $img.width() / $img.height() );
				$img.css('width', fixedWidth + 'px');
			}
		}
	}

	 // Make sure that lead teases are all the same height
	// function resizeLeadTease(){
	// 	imagesLoaded( '.lead-carousel-mod', function() {
	// 	   $('.lead-tz-mod').equalize({
	// 			equalize: 'outerHeight',
	// 			children: '.lead-carousel-item'
	// 		});
	// 	});
	// }

	// function resizeFeatTease(){
	// 	imagesLoaded( '.feat-tz-mod', function() {
	// 		$('.feat-tz-mod').equalize({
	// 			equalize: 'outerHeight',
	// 			children: '.feat-tz'
	// 		});
	// 	});
	// }

	return module;
}());