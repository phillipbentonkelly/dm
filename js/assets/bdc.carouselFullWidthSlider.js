// *
// *  Slider
// *
if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
	'use strict';

    var module = {};
    var _engine = {};
  	var slideInterval = {};
    var carouselNav = { 'prev': {}, 'next': {} };
    var usingDFP = true;

    $(function(){
    	module.init();
    	
    	$(window).load(function(){
			sizeGallery();
		});

		$(window).resize(function () {
			sizeGallery();
		});
    });

	_engine.moveCarousel = function(e){
		var thisObj = !this.autoSlide? $(this) : carouselNav.next;
		var direction = thisObj.attr('direction');
		var detachedObj = {};
		var targetSlide, hideDuration, showDuration, appendMethod; // Set vars that modify the direction of the slide

		if(thisObj.attr('direction') === 'prev'){
			targetSlide = (module.$slide.length-1); hideDuration = 0; showDuration = 500; appendMethod = 'prependTo';
		}else {
			targetSlide = 0; hideDuration = 500; showDuration = 0; appendMethod = 'appendTo';
		}

		module.$slide.eq( targetSlide ).hide(hideDuration).promise().done(function(){
			this.detach().promise().done(function(){
				detachedObj = this;

				detachedObj[appendMethod]( module.$carousel ).show(showDuration).promise().done(function(){
					module.$slide = $('#carousel-wrap figure');
					module.$slide.removeClass('active');
					module.$slide.eq( _engine.current ).addClass('active');

					// From Philippe
					module.$slide.eq( _engine.current ).trigger('trackIfAd');
				});
			});
		});
	};

    _engine.autoSlide = function() {
    	if(WURFL.is_mobile !== true){
    		slideInterval = setInterval( function(){
				_engine.moveCarousel();
			}, 16000);
    	}
	};

    module.init = function(){
    	module.$body = $('body');
    	module.$wrapper = $('#carousel-wrap');
    	module.$carousel = $('#carousel');
    	module.$carouselWrapper = $('.carousel_wrapper');
    	module.$carouselWrapperImg = $('#carousel-wrap figure.slide a img[srcset]');
    	module.$slide = $('#carousel-wrap figure');
    	module.$adSlots = $('.ad-slot');
    	module.$adSlots__dfpContainers = {};
    	module.$adSlots__dfpIframes = {};
		module.$nextSlide = $('.js-slider-next');
		module.$previousSlide = $('.js-slider-previous');
    	_engine.current = module.$slide.length > 2? 1 : 0;
		_engine.autoSlide(); // Start the auto slide 

		module.eventHandlers();
    };
	// ------------------------------------------------------------
	//  * Event Handlers
	// ------------------------------------------------------------
	module.eventHandlers = function(){
		carouselNav.prev = $('#carousel-wrap .prev').on('click', _engine.moveCarousel );
        carouselNav.next = $('#carousel-wrap .next').on('click', _engine.moveCarousel );

		module.$slide.on('mouseenter', function(){
			clearInterval(slideInterval);
		}).on('mouseleave', function(){
			_engine.autoSlide();
		});
	};

    /* Resize Gallery */
	function sizeGallery(){
		var carouselNav_UI = '#carousel-wrap .prev, #carousel-wrap .next';
		var bodyWidth = module.$body.width();
		var actualWidth = module.$carouselWrapperImg.width();
		var w = (bodyWidth - actualWidth - 6)/2;
		var slideMarginRight = module.$slide.css('margin-right')? parseInt(module.$slide.css('margin-right')) : 0;
			module.$mLayout_slide = $('#carousel figure.slide');
			module.$mLayout_img = $('#carousel figure.slide a img');

    	module.$adSlots__dfpContainers = $('#carousel div[id*="google_ads_iframe_"]');
    	module.$adSlots__dfpIframes = $('#carousel div[id*="google_ads_iframe_"] iframe');

		if(WURFL.is_mobile === true && bodyWidth < 768){
			if(module.$wrapper.hasClass('useMobileLayout') === false){
				module.$wrapper.addClass('useMobileLayout');

				_engine.current = 0; // Set the active item to be the first one, index 0.
				module.$slide.removeClass('active'); // Remove the active class
				module.$slide.eq( _engine.current ).addClass('active'); // Add the active class to the first item

				//From Philippe
				module.$slide.eq( _engine.current ).trigger('trackIfAd');
			}
			module.$mLayout_slide.width( bodyWidth );
			module.$mLayout_slide.width( module.$mLayout_slide.width() - (module.$mLayout_slide.width() - module.$mLayout_img.width()) );
				module.$mLayout_img.css('width', '100%');

			module.$carouselWrapper.css('overflow-x', 'auto');
		}

		console.log("module.$mLayout_slide.width: " + module.$mLayout_slide.width());
			
		var carouselWidth = (module.$slide.width() * module.$mLayout_slide.length) + (slideMarginRight * module.$mLayout_slide.length);
		module.$carousel.width( carouselWidth );
		
		module.$carouselWrapper.height(module.$carouselWrapperImg.height());
		module.$carousel.height(module.$carouselWrapperImg.height());
		
		module.$carouselWrapper.width(bodyWidth); // Change the width of the wrapper element to match the existing with available.
		$(carouselNav_UI).css('width',w); // Change the width of the nav arrows and their area.
		
		if(bodyWidth > 767){
			module.$carousel.css('left', -(module.$carouselWrapperImg.width() - (bodyWidth - actualWidth - 6)/2)); // Update the width of the node
		}
		
		// Updated the dimensions of the DFP ad containers
		module.$adSlots.width(module.$carouselWrapperImg.width()).height(module.$carouselWrapperImg.height());
		module.$adSlots__dfpContainers.width(module.$carouselWrapperImg.width()).height(module.$carouselWrapperImg.height());
		module.$adSlots__dfpIframes.width(module.$carouselWrapperImg.width()).height(module.$carouselWrapperImg.height());
			module.$adSlots__dfpIframes.attr('width', module.$carouselWrapperImg.width()).attr('height', module.$carouselWrapperImg.height());
	}
})(window, jQuery);