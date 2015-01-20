
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
			$three: $('.page-search__row--level-three')
		};

		this.inputs = {
			$main: $('.page-search__dropdown--main'),
			$allFilters: $('.page-search__dropdown--filter, .page-search__dropdown--filter-hometype, .page-search__dropdown--filter-dom'),
			$filters1: $('.page-search__dropdown--filter'),
			$filters2: $('.page-search__dropdown--filter-hometype, .page-search__dropdown--filter-dom'),
			$filterRange: $('.page-search__dropdown--filter-range'), 
			$tokenize: $('.page-search__input--tokenize')
		};

		this.btns = {
			$lvl1t: $('.page-nav__search-responsive-icon > a'),
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

            this.inputs.$main.selectize(mainInputParams);
            this.inputs.$tokenize.selectize(tokenizeParams);


			this.inputs.$allFilters.select2();

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
							self.lvls.$three.hide();
							self.lvls.$two.hide();
							self.btns.$lvl3t.removeClass('select2-panel-open');
							self.allOpen = false;
						}else{
							arrow.toggle();
							self.lvls.$two.toggle();
							self.allOpen = false;
						}
					
					});

					self.btns.$lvl3t.on('click', function(e){
						e.preventDefault();
						self.lvls.$three.toggle();
						self.btns.$lvl3t.toggleClass('select2-panel-open');
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
						if(!self.saved){
							status.toggle();
							self.saved = false;
						}
					});

				break;


				case 'mobile':

					// for mobile, merge levels 2 and 3
					var lvl2 = $.merge(self.lvls.$two, self.lvls.$three);

					var lvl2state = self.btns.$lvl2t.children('span');
					//var all = $.merge(self.lvls.$one, lvl2);

					self.btns.$lvl1t.on('click', function(e){
						console.log('hello world');
						e.preventDefault();
						var span = $(this).children('span');
						if(self.allOpen){
							self.lvls.$one.hide();
							lvl2.hide();
							lvl2state.toggle();
							self.allOpen = false;
						}else{
							self.lvls.$one.toggle();
							self.allOpen = false;
						}
						span.toggle();
					});

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var sign = $(this).children('span');
						sign.toggle();
						lvl2.toggle();
						self.allOpen = true;
					});

				break;
					
			}

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
