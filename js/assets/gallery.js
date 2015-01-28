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
    		galleryWidget.$nav = $('.gallery-widget__main-wrapper__nav-arrows');
    		galleryWidget.$slides = $('.gallery-widget .slide');
    		galleryWidget.$slidesImg = $('.gallery-widget .slide img');
    		galleryWidget.$scrollingWrapper = $('.gallery-widget__main-wrapper__scrolling-wrapper');
    		galleryWidget.$scroller = $('.gallery-widget__main-wrapper__scrolling-wrapper__scroller');
    		galleryWidget.$IMGs = $('.gallery-widget__main-wrapper__scrolling-wrapper .slide img');
    		galleryWidget.$label__current = $('.gallery-widget__details__info-nav__counter__current');
    		galleryWidget.$label__total = $('.gallery-widget__details__info-nav__counter__total');
			galleryWidget.$showCaption = $('.gallery-widget__details__info-nav__show-caption');
			galleryWidget.$caption = $('.gallery-widget__details__caption');
    		//galleryWidget.nav = { 'prev': {}, 'next': {} };
    		galleryWidget.slideInterval = {};

    		_data._current = 1;
    		_data._total = galleryWidget.$slidesImg.length;

    		if(_data._total > 0){
    			galleryWidget.$label__total.html(_data._total);
    			this.eventHandlers();
    		}else{
    			console.log("Sorry, but the gallery has no content to display.");
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
			galleryWidget.$showCaption.on('click', this.toggleCaptions);
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

			if(thisObj.attr('data-direction') === 'next'){
				if(_data._current < _data._total){
					galleryWidget.$scroller.animate({left: -(_data._current*_data.width)}, 500).promise().done(function(){
						galleryWidget.$caption.html(galleryWidget.$slides.eq((_data._current)).find('.hidden-caption').html());
						
						_data._current += 1;
						galleryWidget.$label__current.html(_data._current);
						galleryWidget.$nav.removeClass('disable');

						if(_data._current === _data._total){
							galleryWidget.$nav.eq(1).addClass('disable');
						}
					});
				}else{
					thisObj.addClass('disable');
				}
			}else {
				if(_data._current > 1){
					galleryWidget.$scroller.animate({left: (parseInt(galleryWidget.$scroller.css('left')) + _data.width)}, 500).promise().done(function(){
						_data._current -= 1;
						
						galleryWidget.$caption.html(galleryWidget.$slides.eq((_data._current-1)).find('.hidden-caption').html());
						galleryWidget.$label__current.html(_data._current);
						galleryWidget.$nav.removeClass('disable');
						if(_data._current === 1){
							galleryWidget.$nav.eq(0).addClass('disable');
						}
					});
				}else{
					thisObj.addClass('disable');
				}
			}

    		console.log("Move: " + thisObj.attr('title'));
    	},
    	updateSlideDim: function(){
    		_data.width = galleryWidget.$topNode.width();
    		var scrollingWrapperW = _data.width * galleryWidget.$slides.length;

    		galleryWidget.$IMGs.hide();
    		galleryWidget.$slides.width(_data.width);
    		galleryWidget.$scrollingWrapper.width(_data.width);
    		galleryWidget.$scroller.width( (_data.width * galleryWidget.$slides.length) );
    		galleryWidget.$IMGs.show();

    		setTimeout(function(){
    			galleryWidget.$scrollingWrapper.animate({
    				height: galleryWidget.$scroller.height()
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

$(function(){
	galleryWidgetObj = GalleryWidget();
	galleryWidgetObj.init();
});