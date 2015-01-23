

if (typeof dm === 'undefined') { dm = {}; }

dm.searchPanel = {};

(function($, window, document, undefined){

	dm.searchPanel = function(el){

		this.el = el;

		this.device = (screen.width <= 480) ? 'mobile' : 'desktop';
		
		// statefulness...
		this.expanded = this.getExpanded();
		this.isSaved = this.isSaved();

		// store refs to DOM elements to save memory
		this.lvls = {
			$one: $('.page-search__row--level-one'),
			$two: $('.page-search__row--level-two'),
			$three: $('.page-search__row--level-three'),
			$lower: $('.lower-level') // refers to bottom 2 levels, relevent for mobile
		};

		this.filters = {
			$main: $('.page-search__dropdown--main'),
			$fmt: $('.page-search__dropdown--filter'),
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
			$lvl1t: $('.page-nav__search-responsive-icon').children('a'), // relevant for mobile only
			$lvl2t: $('.page-search__button--level-two-toggle'),
			$lvl3t: $('.page-search__button--level-three-toggle'),
			$close: $('.page-search__button--close'),
			$save: $('.page-search__button--save'), 
			$submit: $('.page-search__buttons--submit')
		};


		this.modals = {
			$svSearch: $('.save-search-modal')
		};

		this.init();	
	}


	dm.searchPanel.prototype = {

		allOpen: false,

		pOpen: 'select2-panel-open',

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

            this.filters.$main.selectize(mainParams);
            this.filters.$tags.selectize(tagParams);
			this.filters.$fmt.select2(fmtParams);
			this.filters.$other.select2();


			this.setPanelState();

            this.eventHandlers();

		},

		setPanelState: function(){

			var self = this;


			if( self.device === 'desktop' ){
				switch(self.expanded){
					case '3':
						console.log('hello world');
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

			}

			if( self.device === 'mobile' ){
				switch(self.expanded){
					case '2':
						// keep buttons in an open state
						self.btns.$lvl2t.getObservable().toggle();
						self.btns.$lvl1t.getObservable().toggle();
						self.allOpen = true;
					break;
					case '1':
						self.btns.$lvl1t.getObservable().toggle(); 
						self.lvls.$lower.hide();
					break;
					default:
						// hide both
						self.lvls.$lower.hide();
						self.lvls.$one.hide();
					break;
				}

			}
		},

		eventHandlers: function(){

			var self = this;

			switch(self.device){

				case 'desktop':

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						if(self.allOpen){
							self.lvls.$three.hide();
							self.lvls.$two.hide();
							self.allOpen = false;
							state.toggle();
							self.btns.$lvl3t.removeClass(self.pOpen);
						}else{
							self.lvls.$two.toggle();
							self.allOpen = false;
							state.toggle();
						}				
					});

					self.btns.$lvl3t.on('click', function(e){
						e.preventDefault();
						self.lvls.$three.toggle();
						self.btns.$lvl3t.toggleClass(self.pOpen);
						self.allOpen = (self.allOpen == true) ? false : true;
					});

					self.btns.$close.on('click', function(e){
						e.preventDefault();
						self.lvls.$three.hide();
						self.btns.$lvl3t.removeClass(self.pOpen);
						self.allOpen = false;
					});

					self.btns.$save.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						var modal = self.modals.$svSearch;
						if(!self.saved){
							$(modal).modal();
							$(modal).find('button').on('click',function(e){
								self.saved = true;
								state.toggle();
							});
						}
					});

				break;


				case 'mobile':

					// keep track of level#2 state when user closes all
					var $lvl2State = self.btns.$lvl2t.getObservable();

					self.btns.$lvl1t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						if(self.allOpen){
							self.lvls.$one.hide();
							self.lvls.$lower.hide();
							self.expanded = self.getExpanded();
							$lvl2State.toggle();
						}else{
							self.lvls.$one.toggle();
							self.expanded = self.getExpanded();
						}
						state.toggle();
					});

					self.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						self.lvls.$lower.toggle();
						self.expanded = self.getExpanded();
						state.toggle();
						self.allOpen = true;
					});

				break;
					
			} // end switch

			// form submit boilerplate
			self._form.$el.on('submit', function(e){
				e.preventDefault();
				self.expanded = self.checkExpanded();
				self.isSaved = self.checkIfSaved();
				// validation, ajax, rest, etc.

				// serp url
				var serp = "frameset.php?page-type=serp";
				var lvls = "&expanded=" + self.expanded;
				var saved = "&saved=" + self.saved;

				location.href = serp + lvls + saved;
			});


		},


		// appends the placeholder to the selected value
		formatSelect: function(s, el, q){
			var dd = $(el).closest('section').children('select')[0];
			var ph = $(dd).attr('data-placeholder');
			var fmt = s.text + ' ' + ph
			return fmt;
		},


		getExpanded: function(){
			var def = self.device == 'mobile' ? 0 : 1;
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
			console.log(state);
		}

	};	


	$.fn.searchPanel = function(){
		return this.each(function(){
			new dm.searchPanel(this);
		});
	}

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
