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
    	init: function( params ){
    		_data.caption = params.captions? params.captions : false;
    		galleryWidget.$topNode = $('.gallery-widget');
    		galleryWidget.$nav = $('.gallery-widget__main-wrapper__nav-arrows');
    		galleryWidget.$slides = $('.gallery-widget .slide');
    		galleryWidget.$slidesImg = $('.gallery-widget .slide img');
    		galleryWidget.$scrollingWrapper = $('.gallery-widget__main-wrapper__scrolling-wrapper');
    		galleryWidget.$scroller = $('.gallery-widget__main-wrapper__scrolling-wrapper__scroller');
    		galleryWidget.$IMGs = $('.gallery-widget__main-wrapper__scrolling-wrapper .slide img');
    		galleryWidget.$details = $('.gallery-widget__details');
    		galleryWidget.$label__current = $('.gallery-widget__details__info-nav__counter__current');
    		galleryWidget.$label__total = $('.gallery-widget__details__info-nav__counter__total');
			galleryWidget.$showCaption = $('.gallery-widget__details__info-nav__show-caption');
			galleryWidget.$caption = $('.gallery-widget__details__caption');
			galleryWidget.$nav__arrows = $('.gallery-widget__main-wrapper__nav-arrows');
			
			if(_data.caption !== true){
				galleryWidget.$details.hide();
			}
    		galleryWidget.slideInterval = {};

    		_data._current = 1;
    		_data._total = galleryWidget.$slidesImg.length;

    		if(_data._total > 0){
    			galleryWidget.$label__total.html(_data._total);
    			if (_data._total == 1) {
    				
    				if (galleryWidget.$slides.eq(0).find('.hidden-caption').length == 0)
    					galleryWidget.$caption.parent().css("display","none");
    					
    				galleryWidget.$label__total.parent().css("display","none");
    				galleryWidget.$nav__arrows.css("display","none");
    			}
    			this.eventHandlers();
    		}else{
    			console.log("Sorry, but the gallery has no content to display.");
    			galleryWidget.$topNode.hide();
    		}
    	},
    	eventHandlers: function(){
    		var thisRef = this;

    		$(window).load(function(){
				thisRef.updateSlideDim();
			});

			$(window).resize(function () {
				thisRef.updateSlideDim();
			});

			galleryWidget.$nav.on('click', this.advanceGallery);
			if(_data.caption === true){
				galleryWidget.$showCaption.on('click', this.toggleCaptions);
			}
    	},
    	toggleCaptions: function(e){
    		galleryWidget.$caption.toggle();
    	},
    	advanceGallery: function(e){
    		var thisRef = this;
			var thisObj = !this.autoSlide? $(this) : carouselNav.next;
			var direction = thisObj.attr('title');
			var detachedObj = {};
			var targetSlide, hideDuration, showDuration, appendMethod; // Set vars that modify the direction of the slide
			var lock = false;

			if(lock === false){
				lock = true;
				if(thisObj.attr('data-direction') === 'next'){
					if(_data._current < _data._total){
						galleryWidget.$scroller.animate({left: -(_data._current*_data.width)}, 500).promise().done(function(){
							_data._current += 1;
							
							if(_data.caption === true){

								var _hiddenCaption = galleryWidget.$slides.eq((_data._current-1)).find('.hidden-caption');
								if (_hiddenCaption.length == 1) { 
									galleryWidget.$showCaption.css("display","block");
									galleryWidget.$caption.html(_hiddenCaption.html());
								} else {
									galleryWidget.$caption.html("");
									galleryWidget.$showCaption.css("display","none");
								}
								galleryWidget.$label__current.html(_data._current);
				
							}
							galleryWidget.$nav.removeClass('disable');

							if(_data._current === _data._total){
								galleryWidget.$nav.eq(1).addClass('disable');
							}

							lock = false;
						});
					}else{
						thisObj.addClass('disable');

						lock = false;
					}
				}else {
					if(_data._current > 1){
						galleryWidget.$scroller.animate({left: (parseInt(galleryWidget.$scroller.css('left')) + _data.width)}, 500).promise().done(function(){
							_data._current -= 1;
							
							if(_data.caption === true){
								var _hiddenCaption = galleryWidget.$slides.eq((_data._current-1)).find('.hidden-caption');
								if (_hiddenCaption.length == 1) { 
									galleryWidget.$showCaption.css("display","block");
									galleryWidget.$caption.html(_hiddenCaption.html());
								} else {
									galleryWidget.$caption.html("");
									galleryWidget.$showCaption.css("display","none");
								}
								galleryWidget.$label__current.html(_data._current);
							}
							galleryWidget.$nav.removeClass('disable');
							if(_data._current === 1){
								galleryWidget.$nav.eq(0).addClass('disable');
							}

							lock = false;
						});
					}else{
						thisObj.addClass('disable');

						lock = false;
					}
				}
			}
    	},
    	updateSlideDim: function(){
    		_data.width = galleryWidget.$topNode.width();
    		var scrollingWrapperW = _data.width * galleryWidget.$slides.length;

			if(_data.caption === true){
				var _hiddenCaption = galleryWidget.$slides.eq((_data._current-1)).find('.hidden-caption');
				galleryWidget.$label__current.html(_data._current);
				
				if (_hiddenCaption.length == 1) { 
					galleryWidget.$showCaption.css("display","block");
					galleryWidget.$caption.html(_hiddenCaption.html());
				} else {
					galleryWidget.$caption.html("");
					galleryWidget.$showCaption.css("display","none");
				}
			}

    		galleryWidget.$IMGs.hide();
    		galleryWidget.$slides.width(_data.width);
    		galleryWidget.$scrollingWrapper.width(_data.width);
    		galleryWidget.$scroller.width( (_data.width * galleryWidget.$slides.length) );
    		galleryWidget.$IMGs.show();

    		setTimeout(function(){
    			var shortest = $([].reduce.call(galleryWidget.$scrollingWrapper.find("img"), function(sml, cur) {
    							  return $(sml).height() < $(cur).height() ? sml : cur;
								}));
								
    			galleryWidget.$scrollingWrapper.animate({
    				height: shortest.height()
    			}, 700);
    		}, 100);
    	},
    	autoSlide: function() {
    		var thisRef = this;

	    	slideInterval = setInterval( function(){
				thisRef.advanceGallery();
			}, 10000);
		}
    };
})(window, jQuery);