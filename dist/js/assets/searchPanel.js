
if (typeof dm === 'undefined') { dm = {}; }

dm.searchPanel = {};
dm.selectize = {};
dm.select2 = {};

(function($, window, document, undefined){

	dm.selectize = function(el, opts){
		$.fn.selectize.apply(el, opts);
	};

	dm.select2 = function(el, opts){
		$.fn.select2.apply(el, opts);
	};

	dm.searchPanel = function(el){

		this.el = el;

		this.device = (screen.width <= 480) ? 'mobile' : 'desktop';

		this.lvls = {
			$one: $('.page-search__row--level-one'),
			$two: $('.page-search__row--level-two'),
			$three: $('.page-search__row--level-three'),
			$lower: $('.lower-level')
		};

		this.filters = {
			$main: $('.page-search__dropdown--main'),
			$sub: $('.page-search__dropdown--filter, .page-search__dropdown--filter-wide, .page-search__dropdown--filter-advanced'),
			$s2num: $('.page-search__dropdown--filter'),
			$other: $('.page-search__dropdown--filter-wide, .page-search__dropdown--filter-advanced'),
			$range: $('.page-search__dropdown--filter-range'), 
			$tokenize: $('.page-search__input--tokenize')
		};

		this.btns = {
			$lvl1t: $('.page-nav__search-responsive-icon a'),
			$lvl2t: $('.page-search__button--level-two-toggle'),
			$lvl3t: $('.page-search__button--level-three-toggle'),
			$close: $('.page-search__button--close'),
			$save: $('.page-search__button--save'), 
			$search: $('.page-search__buttons--submit')
		};

		this.init();	
	}

	dm.searchPanel.prototype = {

		allOpen: false,

		saved: false,

		init: function(){

			if(this.device === 'mobile') this.lvls.$one.hide();
				
			this.lvls.$two.hide();
			this.lvls.$three.hide();

			var mainInputParams = {
				placeholder: "Search for real estate listings or articles. ex: 3 bedroom for sale in Brookline under 1,000,000"
			};

			var tokenizeParams = {
            	delimeter: ',',
            	persist: true,
            	create: function(input){
            		return {
            			value: input,
            			text: input
            		}
            	}
            };

            this.filters.$main.selectize(mainInputParams);
            this.filters.$tokenize.selectize(tokenizeParams);


			this.filters.$s2num.select2({
				formatSelection: this.formatSelect
			});

			this.filters.$other.select2();

            this.eventHandlers();

		},

		eventHandlers: function(){

			var self = this;

			switch(self.device){

				case 'desktop':

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var arrow = $(this).children('span');
						if(self.allOpen){
							arrow.toggle();
							self.lvls.$three.slideUp(400, function(e){
								self.lvls.$two.slideUp(400);
							});
							self.btns.$lvl3t.removeClass('select2-panel-open');
							self.allOpen = false;
						}else{
							arrow.toggle();
							self.lvls.$two.slideToggle(400);
							self.allOpen = false;
						}
					
					});

					self.btns.$lvl3t.on('click', function(e){
						e.preventDefault();
						self.btns.$lvl3t.toggleClass('select2-panel-open');
						self.lvls.$three.slideToggle(400);
						self.allOpen = (self.allOpen == true) ? false : true;
					});

					self.btns.$close.on('click', function(e){
						e.preventDefault();
						self.lvls.$three.hide();
						self.btns.$lvl3t.removeClass('select2-panel-open');
						self.allOpen = false;
					});

					self.btns.$save.on('click', function(e){
						e.preventDefault();
						var status = $(this).children('span');
						var modal = $('.save-search-modal');
						if(!self.saved){
							modal.modal();
							modal.find('button').on('click',function(e){
								status.toggle();
								self.saved = true;
							});
						}

					});

				break;


				case 'mobile':

					// for mobile, merge levels 2 and 3
					var $lvl2ts = self.btns.$lvl2t.children('span');

					self.btns.$lvl1t.on('click', function(e){
						e.preventDefault();
						$(this).toggleClass('close-search');
						if(self.allOpen){
							self.lvls.$lower.slideUp(400, function(e){
								self.lvls.$one.slideUp(400);
							});
							$lvl2ts.toggle();
							self.allOpen = false;
						}else{
							self.lvls.$one.slideToggle(400);
							self.allOpen = false;
						}
					});

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var arrow = $(this).children('span');
						arrow.toggle();						
						self.lvls.$lower.slideToggle(400);
						self.allOpen = (self.allOpen == true) ? false : true;
					});

				break;
					
			}

		},


		formatSelect: function(s, el, q){
			var dd = $(el).closest('section').children('select')[0];
			var ph = $(dd).attr('data-placeholder');
			return s.text + ' ' + ph;
		},


		

	};	


	$.fn.searchPanel = function(){
		return this.each(function(){
			new dm.searchPanel(this);
		});
	}


})(jQuery, window, document, undefined);


$(document).ready(function(){
	if($('.page-search').length){
		$('.page-search').searchPanel();
	}
});
