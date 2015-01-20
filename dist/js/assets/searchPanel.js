
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

		// store refs to DOM elements to save memory

		// level in order of appearance...
		this.lvls = {
			$one: $('.page-search__row--level-one'),
			$two: $('.page-search__row--level-two'),
			$three: $('.page-search__row--level-three'),
			$lower: $('.lower-level') // refers to bottom 2 levels, relevent for mobile
		};

		this.filters = {
			$main: $('.page-search__dropdown--main'),
			$sub: $('.page-search__dropdown--filter, .page-search__dropdown--filter-hometype, .page-search__dropdown--filter-dom'),
			$format: $('.page-search__dropdown--filter'), 
			$other: $('.page-search__dropdown--filter-hometype, .page-search__dropdown--filter-dom'),
			$tags: $('.page-search__input--tokenize')
		};

		this.btns = {
			$lvl1t: $('.page-nav__search-responsive-icon > a'),
			$lvl2t: $('.page-search__button--level-two-toggle'),
			$lvl3t: $('.page-search__button--level-three-toggle'),
			$close: $('.page-search__button--close'),
			$save: $('.page-search__button--save'), 
			$search: $('.page-search__buttons--submit')
		};

		this.modals = {
			$svSearch: $('.save-search-modal')
		};

		this.init();	
	}

	dm.searchPanel.prototype = {

		allOpen: false,

		saved: false,

		init: function(){

			// to make things neat create objects as variables...
			var mainParams = {
				placeholder: "Search for real estate listings or articles. ex: 3 bedroom for sale in Brookline under 1,000,000"
			};

			var fmtParams = {
				formatSelection: this.formatSelection
			};

			var tagParams = {
            	delimeter: ',',
            	persist: true,
            	create: function(input){
            		return {
            			value: input,
            			text: input
            		}
            	}
            };


			if(this.device === 'mobile') this.lvls.$one.hide();
				
			this.lvls.$two.hide();
			this.lvls.$three.hide();

            this.filters.$main.selectize(mainParams);
            this.filters.$tags.selectize(tagParams);
			this.filters.$format.select2(fmtParams);
			this.filters.$other.select2();
            this.eventHandlers();

		},

		eventHandlers: function(){

			var self = this;

			switch(self.device){

				case 'desktop':

					var panelOpen = 'select2-panel-open';

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var arrow = $(this).children('span');
						if(self.allOpen){
							arrow.toggle();
							self.lvls.$three.hide();
							self.lvls.$two.hide();
							self.btns.$lvl3t.removeClass(panelOpen);
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
						self.btns.$lvl3t.toggleClass(panelOpen);
						self.allOpen = (self.allOpen == true) ? false : true;
					});

					self.btns.$close.on('click', function(e){
						e.preventDefault();
						self.lvls.$three.hide();
						self.btns.$lvl3t.removeClass(panelOpen);
						self.allOpen = false;
					});

					self.btns.$save.on('click', function(e){
						e.preventDefault();
						var status = $(this).children('span');
						var modal = self.modals.$svSearch;
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


		// appends the placeholder to the selected value
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
