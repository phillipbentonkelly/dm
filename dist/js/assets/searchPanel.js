/**********************
	SEARCH PANEL
***********************/

if (typeof dm === 'undefined') { dm = {}; }

/* environmental variables */
dm.env = {
	device : (screen.width <= 480) ? 'mobile' : 'desktop',
	local : document.URL.indexOf(':8888') != -1 ? true : false
};

dm.searchPanel = {};

var _sp;

(function($, window, document, undefined){


	_sp, dm.searchPanel = function(el){

		_sp = this;

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

			var phStr = "Search for real estate listings or articles. ex: 3 bedroom for sale in Brookline under 1,000,000";

			var qStr = $.getQuery();

			// to make things neat create objects to store params...
			var mainParams = {
				placeholder: phStr
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

            var $mainSelect = this.filters.$main.selectize(mainParams);
            var $kwSelect = this.filters.$tags.selectize(tagParams);
			var $fmtSelect = this.filters.$fmt.select2(fmtParams);
			var $otherSelects = this.filters.$other.select2(otherParams);

			// make the url query string the default selection
			if(qStr)
				$mainSelect[0].selectize.setValue(qStr);

			if(dm.env.device === 'mobile')
				this.setMobilePanelState();
			else
				this.setPanelState();

			$(_sp.el).show();
			
            this.eventHandlers();

		},

		setPanelState: function(){
			switch(_sp.expanded){
				case '3':
					//hide nothing...
					// level 3 toggle arrow up
					_sp.btns.$lvl3t.addClass(this.pOpen);
					// point level 2 toggle arrow up
					_sp.btns.$lvl2t.getObservable().toggle();
					_sp.allOpen = true;	
				break;
				case '2':
					// hide level 3
					_sp.lvls.$three.hide();
					_sp.btns.$lvl2t.getObservable().toggle();	
				break;
				default:
					// show only level one, don't fiddle w/ btns
					_sp.lvls.$three.hide();
					_sp.lvls.$two.hide();
				break;
			}

			return true;

		},


		setMobilePanelState: function(){

			switch(_sp.expanded){
				case '2':
					// keep buttons in an open state
					_sp.btns.$lvl2t.getObservable().toggle();
					_sp.btns.$lvl1t.getObservable().toggle();
					_sp.allOpen = true;
				break;
				case '1':
					_sp.btns.$lvl1t.toggleClass('close-search'); 
					_sp.lvls.$lower.hide();
				break;
				default:
					// hide both
					_sp.lvls.$lower.hide();
					// hide the form instead of the first level
					_sp._form.$el.hide();
				break;
			}

			return true;

		},

		eventHandlers: function(){

			switch(dm.env.device){

				case 'desktop':

					_sp.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();

						if(_sp.allOpen){
							_sp.lvls.$three.slideToggle('fast', function(){
								_sp.lvls.$two.slideToggle('fast', function(){
									state.toggle();
									_sp.btns.$lvl3t.removeClass(_sp.pOpen);
									_sp.allOpen = false;
								});
							});
							
						}else{
							_sp.lvls.$two.slideToggle('fast');
							_sp.allOpen = false;
							state.toggle();
						}				
					});

					_sp.btns.$lvl3t.on('click', function(e){
						e.preventDefault();
						_sp.lvls.$three.slideToggle('fast', function(){
							_sp.btns.$lvl3t.toggleClass(_sp.pOpen);
							_sp.allOpen = (_sp.allOpen == true) ? false : true;
						});
					});

					_sp.btns.$close.on('click', function(e){
						e.preventDefault();
						_sp.lvls.$three.slideToggle('fast', function(){
							_sp.btns.$lvl3t.removeClass(_sp.pOpen);
							_sp.allOpen = false;
						});
					});

				break;


				case 'mobile':

					// keep track of level#2 state when user closes all
					var $lvl2State = _sp.btns.$lvl2t.getObservable();

					
					_sp.btns.$mobileOpen.on('click', function(e){
						e.preventDefault();
						_sp._form.$el.toggle();
						if(_sp.allOpen){
							_sp.lvls.$lower.slideToggle('fast', function(){
								$lvl2State.toggle();
							});
						}
						_sp.expanded = _sp.getExpanded();
						$(this).toggleClass('close-search');
						_sp.allOpen = false;
					});

					_sp.btns.$lvl2t.on('click', function(e){
						e.preventDefault();
						var state = $(this).getObservable();
						var lwrLvls = $.merge(_sp.lvls.$two, _sp.lvls.$three);
						_sp.lvls.$lower.slideToggle('fast');
						_sp.expanded = _sp.getExpanded();
						state.toggle();
						_sp.allOpen = (_sp.allOpen == true) ? false : true;
					});

				break;
					
			} // end switch

			_sp._form.$el.on('submit', function(e){
				e.preventDefault();
				_sp.expanded = _sp.checkExpanded();
				// validation, ajax, rest, etc.
				var q = _sp.filters.$main.val();

				var sep = dm.env.local ? '&' : '?';
				var lvls = "expanded=" + _sp.expanded;

				location.href = _sp.searchPgUrl + sep + lvls + '&q=' + encodeURIComponent(q);
			});

			_sp.megamenuSearch.$submit.on('click', function(e){
				e.preventDefault();
				_sp.expanded = _sp.checkExpanded();

				var q = _sp.megamenuSearch.$input.val();

				var sep = dm.env.local ? '&' : '?';
				var lvls = "expanded=1";

				location.href = _sp.searchPgUrl + sep + lvls + '&q=' + encodeURIComponent(q);
			});


		},

		// appends the placeholder to the selected value
		fmtSelected: function(s, el, q){
			var dd = $(el).closest('section').children('select')[0];
			var ph = $(dd).attr('data-placeholder');
			var fmt = s.text + ' ' + ph;
			return fmt;
		},

		// returns # of panels open by user
		getExpanded: function(){
			var def = dm.env.device == 'mobile' ? 0 : 1;
			var paramExpanded = $.getParamVal('expanded');
			return paramExpanded || def;
		},

		checkExpanded: function(){
			var $rows = $('.page-search__row');
			var totalRows = $rows.length;
			var totalRowsHidden = $rows.is(':hidden').length;
			return (totalRows - totalRowsHidden);
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
		},
		getQuery : function(){
			var query = false;
			var qStr = $.getParamVal('q');

			if(qStr){
				query = decodeURIComponent(qStr);
			} 

			return query;
		}
	});


})(jQuery, window, document, undefined);


$(document).ready(function(){
	if($('.page-search').length){
		$('.page-search').searchPanel();
	}
});