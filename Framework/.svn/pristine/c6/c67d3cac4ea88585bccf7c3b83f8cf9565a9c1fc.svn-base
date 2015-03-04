/*jshint unused:false */
/*global $:false, _:false, Swiper:false */

/*
 * Gallery module for Boston.com prototype
 * by Pete Karl (@steyblind) c/o Upstatement (@upstatement)
*/
var bcom_carousel = (function() {
	'use strict';

	// var imagesLoaded = require('imagesloaded');

	var module = {};

	module.currentSlide = 0;

	module.init = function(){
		var that = this;
		//alert('initing bcom_photos');
		// Give us feedback when the user is hovering in the Lead Tease so we
		// take action in the CSS, say for showing and hiding arrows
		$('.swiper-mod')
			.on('mouseenter', function () {
				$('.lead-tz-mod').addClass('is-hovering');
			}).on('mouseleave', function () {
				$('.lead-tz-mod').removeClass('is-hovering');
			});



		if(typeof Swiper !== 'undefined') {

			var leadSwiper = new Swiper('.swiper-mod', {
				mode:'horizontal',
				speed: 300,
				loop: true,
				calculateHeight: true,
				onSlideClick: function(){
					that.isVideoCheck(leadSwiper.clickedSlide);
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

		$('.swiper-prev').on('click', function(e) {
			e.preventDefault();
			module.currentSlide--;
		});

		$('.swiper-next').on('click', function(e) {
			e.preventDefault();
			module.currentSlide++;
		});

	};

	module.isVideoCheck = function(clickedSlide){

		var $clickedSlide = $(clickedSlide),
			dataset = $clickedSlide.context.dataset;
		if (dataset.video === 'true' && dataset.videoID != ''){
			if($('.lead-tz-mod:visible')){
				$('.lead-tz-mod').slideUp();
			}
			BCL.addPlayer(dataset.videoID);
		}
		//console.log($clickedSlide.context.dataset);
	};

	return module;
}());