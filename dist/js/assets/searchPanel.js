
if (typeof dm === 'undefined') { dm = {}; }

dm.searchPanel = {};

(function($, window, document, undefined){

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

			// to make things neat create objects to store params...

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

					var pOpen = 'select2-panel-open';

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						if(self.allOpen){
							self.lvls.$three.hide();
							self.lvls.$two.hide();
							self.allOpen = false;
							state.toggle();
							self.btns.$lvl3t.removeClass(pOpen);
						}else{
							self.lvls.$two.toggle();
							self.allOpen = false;
							state.toggle();
						}
					
					});

					self.btns.$lvl3t.on('click', function(e){
						e.preventDefault();
						self.lvls.$three.toggle();
						self.allOpen = (self.allOpen == true) ? false : true;
						self.btns.$lvl3t.toggleClass(pOpen);
					});

					self.btns.$close.on('click', function(e){
						e.preventDefault();
						self.lvls.$three.hide();
						self.allOpen = false;
						self.btns.$lvl3t.removeClass(pOpen);
					});

					self.btns.$save.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						var modal = self.modals.$svSearch;
						if(!self.saved){
							modal.modal();
							modal.find('button').on('click',function(e){
								self.saved = true;
								state.toggle();
							});
						}

					});

				break;


				case 'mobile':

					// keep track of level 2 button when user closes all
					var $lvl2State = self.btns.$lvl2t.getObservable();

					self.btns.$lvl1t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						if(self.allOpen){
							self.lvls.$one.hide();
							self.lvls.$lower.hide();
							self.allOpen = false;
							$lvl2State.toggle();
						}else{
							self.lvls.$one.toggle();
							self.allOpen = false;
						}
						state.toggle();
					});

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						self.lvls.$lower.toggle();
						self.allOpen = (self.allOpen == true) ? false : true;
						state.toggle();
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

	// shameful knockout plagiarism
	$.fn.getObservable = function(){
		return $(this).children('span');
	}


})(jQuery, window, document, undefined);


$(document).ready(function(){
	if($('.page-search').length){
		$('.page-search').searchPanel();
	}
});
