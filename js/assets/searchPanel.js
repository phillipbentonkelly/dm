/**********************
	SEARCH PANEL
***********************/

if (typeof dm === 'undefined') { dm = {}; }

/* environmental variables */
dm.env = {
	device : (screen.width <= 480) ? 'mobile' : 'desktop',
	local : document.URL.indexOf('localhost') != -1 || document.URL.indexOf('127.0.0.1') != -1 ? true : false
};

dm.searchPanel = {};

(function($, window, document, undefined){


	dm.searchPanel = function(el){

		this.el = el;
		
		// statefulness...
		this.expanded = this.getExpanded();

		// store refs to DOM elements to save memory
		this.lvls = {
			$one: $('.page-search__row--level-one'),
			$two: $('.page-search__row--level-two'),
			$three: $('.page-search__row--level-three'),
			$lower: $('.page-search__form > .lower-level'),
			$all: $('.page-search__row, .page-search__form > .lower-level')
		};

		this.filters = {
			$main: $('.page-search__dropdown--main'),
			$fmt: $('.page-search__dropdown--filter-fmt'),
			$hometype: $('.page-search__dropdown--filter-hometype'),
			$dom: $('.page-search__dropdown--filter-dom'),
			$other: $('.page-search__dropdown--filter-hometype, .page-search__dropdown--filter-dom'),
			$tags: $('.page-search__input--tokenize')
		};

		// boilerplate obj for form vals
		this._form = {
			$el: $('.page-search__form')
		};

		this.btns = {
			$mobileOpen: $('.page-nav__search-responsive-icon > a'), // relevant for mobile only
			$lvl2t: $('.page-search__button--level-two-toggle'),
			$lvl3t: $('.page-search__button--level-three-toggle'),
			$close: $('.page-search__button--close'),
			$submit: $('.page-search__buttons--submit')
		};

		this.megamenuSearch = {
			$input: $('.mega-menu__search-input'),
			$submit: $('.mega-menu__search-submit')
		};

		this.modals = {
			$svSearch: $('.save-search-modal')
		};

		this.init();

	}

	dm.searchPanel.prototype = {

		allOpen: false,

		pOpen: 'select2-panel-open',

		searchPgUrl: dm.env.local ? 'frameset.php?page-type=serp' : 'serp.html',

		init: function(){

			// to make things neat create objects to store params...
			var mainParams = {
				placeholder: "Search for real estate listings or articles. ex: 3 bedroom for sale in Brookline under 1,000,000"
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

            var fmtParams = {
				formatSelection: this.fmtSelected,
				shouldInputFocus: function(){ return false; }
			};

			var otherParams = {
				shouldInputFocus: function(){ return false; }
			};

            this.filters.$main.selectize(mainParams);
            this.filters.$tags.selectize(tagParams);
			this.filters.$fmt.select2(fmtParams);
			this.filters.$other.select2(otherParams);

			if(dm.env.device === 'mobile')
				this.setMobilePanelState();
			else
				this.setPanelState();
			

            this.eventHandlers();

		},

		setPanelState: function(){

			var self = this;
				
			switch(self.expanded){
				case '3':
					//hide nothing...
					// level 3 toggle arrow up
					self.btns.$lvl3t.addClass(this.pOpen);
					// point level 2 toggle arrow up
					self.btns.$lvl2t.getObservable().toggle();
					self.allOpen = true;	
				break;
				case '2':
					// hide level 3
					self.lvls.$three.hide();
					self.btns.$lvl2t.getObservable().toggle();	
				break;
				default:
					// show only level one, don't fiddle w/ btns
					self.lvls.$three.hide();
					self.lvls.$two.hide();
				break;
			}

			return true;

		},


		setMobilePanelState: function(){

			var self = this;

			switch(self.expanded){
				case '2':
					// keep buttons in an open state
					self.btns.$lvl2t.getObservable().toggle();
					self.btns.$lvl1t.getObservable().toggle();
					self.allOpen = true;
				break;
				case '1':
					self.btns.$lvl1t.toggleClass('close-search'); 
					self.lvls.$lower.hide();
				break;
				default:
					// hide both
					self.lvls.$lower.hide();
					// hide the form instead of the first level
					self._form.$el.hide();
					// self.lvls.$one.hide();
				break;
			}

			return true;

		},

		eventHandlers: function(){

			var self = this;

			switch(dm.env.device){

				case 'desktop':

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();

						if(self.allOpen){
							self.lvls.$three.slideToggle('fast', function(){
								self.lvls.$two.slideToggle('fast', function(){
									state.toggle();
									self.btns.$lvl3t.removeClass(self.pOpen);
									self.allOpen = false;
								});
							});
							
						}else{
							self.lvls.$two.slideToggle('fast');
							self.allOpen = false;
							state.toggle();
						}				
					});

					self.btns.$lvl3t.on('click', function(e){
						e.preventDefault();
						self.lvls.$three.slideToggle('fast', function(){
							self.btns.$lvl3t.toggleClass(self.pOpen);
							self.allOpen = (self.allOpen == true) ? false : true;
						});
					});

					self.btns.$close.on('click', function(e){
						e.preventDefault();
						self.lvls.$three.slideToggle('fast', function(){
							self.btns.$lvl3t.removeClass(self.pOpen);
							self.allOpen = false;
						});
					});

				break;


				case 'mobile':

					// keep track of level#2 state when user closes all
					var $lvl2State = self.btns.$lvl2t.getObservable();

					
					self.btns.$mobileOpen.on('click', function(e){
						e.preventDefault();
						self._form.$el.toggle();
						if(self.allOpen){
							self.lvls.$lower.slideToggle('fast', function(){
								$lvl2State.toggle();
							});
						}
						self.expanded = self.getExpanded();
						$(this).toggleClass('close-search');
						self.allOpen = false;
					});

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						var lwrLvls = $.merge(self.lvls.$two, self.lvls.$three);
						self.lvls.$lower.slideToggle('fast');
						self.expanded = self.getExpanded();
						state.toggle();
						self.allOpen = (self.allOpen == true) ? false : true;
					});

				break;
					
			} // end switch

			self._form.$el.on('submit', function(e){
				e.preventDefault();
				self.expanded = self.checkExpanded();
				// validation, ajax, rest, etc.
				var q = self.filters.$main.val();

				var sep = dm.env.local ? '&' : '?';
				var lvls = "expanded=" + self.expanded;

				location.href = self.searchPgUrl + sep + lvls + '&q=' + encodeURIComponent(q);
			});

			self.megamenuSearch.$submit.on('click', function(e){
				e.preventDefault();
				self.expanded = self.checkExpanded();

				var q = self.megamenuSearch.$input.val();

				var sep = dm.env.local ? '&' : '?';
				var lvls = "expanded=1";

				location.href = self.searchPgUrl + sep + lvls + '&q=' + encodeURIComponent(q);
			});


		},

		// appends the placeholder to the selected value
		fmtSelected: function(s, el, q){
			var dd = $(el).closest('section').children('select')[0];
			var ph = $(dd).attr('data-placeholder');
			var fmt = s.text + ' ' + ph;
			return fmt;
		},


		getExpanded: function(){
			var def = dm.env.device == 'mobile' ? 0 : 1;
			var paramExpanded = $.getParamVal('expanded');
			return paramExpanded || def;
		},


		isSaved: function(){
			var paramSaved = $.getParamVal('saved');
			return paramSaved || false;
		},


		checkExpanded: function(){
			var rows = $('.page-search__row').length;
			var rowsHidden =  $('.page-search__row:hidden').length;
			return (rows - rowsHidden);
		},

		checkIfSaved: function(){
			var state = $('.page-search__button--save').getObservable().filter(':visible');
			var saved = state.attr('class') === 'saved' ? true : false
			return saved;
		}

	};


	$.fn.searchPanel = function(){
		return this.each(function(){
			new dm.searchPanel(this);
		});
	};

	// watch the span elements
	$.fn.getObservable = function(){
		return $(this).children('span'); 
	}

	$.extend({
		getParamVal : function(param){
			var paramVal = null;
			var urlParams = location.search.split('&');
			for(i in urlParams){
				if(urlParams[i].indexOf(param) != -1 ){
					paramVal = urlParams[i].split('=')[1];
				}
			}
			return paramVal;
		}
	});


})(jQuery, window, document, undefined);


$(document).ready(function(){
	if($('.page-search').length){
		$('.page-search').searchPanel();
	}
});