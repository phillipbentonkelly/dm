var bcom_infinity = (function() {
	//prvisouScroll is set to 0 as the page loads, there is no scroll data - this help us determine is the user is scolling up
	var scrollNode = (document.documentElement || document.body.parentNode || document.body);
	var previousScroll = 0;
	var scrollGet = false;

	var wheight = $(window).outerHeight();

	var module = {};

	module.scrollListen = function() {
		$(window).on('scroll', _.throttle(function() {

			if($('.quick-tz').length !== 0) {

				var wtop = (window.pageYOffset || scrollNode.scrollTop) + $('.main-nav').height() + 20;

				if(wtop > $('.quick-tz:first').offset().top) {
					$('body').addClass('filter-sub-active');
				} else {
					$('body').removeClass('filter-sub-active');
				}
			}

			_.each($('.story-tools-mod'), module.fixToContainer);

			// content infinity scroll
			//module.scrollCheck($('.stream-items'), 50);

		}, 20));
	};

	module.fixToContainer = function(el, index) {
		var $this = $(el);
		var $parent = $this.parent();
		var parentTop = $parent.offset().top;
		var parentBottom = parentTop + $parent.height() - $this.outerHeight();
		var wtop = (window.pageYOffset || scrollNode.scrollTop) + $('.main-nav').height() + 50;

		if(wtop <= parentBottom && wtop >= parentTop) {
			if($(window).width() < 900) {
				$this.css('margin-top', 0);
			} else {
				$this.css('margin-top', wtop - parentTop);
			}
		} else if(wtop < parentTop) {
			$this.css('margin-top', 0);
		}
	};

	module.scrollCheck = function(el, index) {
		// this entire function is not used - it IS called (but commented out in scrollListen)
		
		var wtop = window.pageYOffset || scrollNode.scrollTop || document.documentElement.scrollTop;
		
		var infinityOffset = 500; // when we're this close, fire the loader
		var $el = $(el);
		console.log($el);
		if(wtop + wheight + infinityOffset > $el.outerHeight() + $el.offset().top) {
			console.log('you should be loading more now');
		}
	};

	//wrap all of the things we sholud be listening for in one function
	module.listen = function(){
		module.scrollListen(); // commenting out per jesse's advice to prevent  Uncaught ReferenceError: scrollNode is not defined bcom.infinity.js:23 ~ian 
	};

	return module;

}());