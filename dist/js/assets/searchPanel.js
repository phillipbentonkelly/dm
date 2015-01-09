
if (typeof dm === 'undefined') { dm = {}; }

	dm.searchPanel = {};
	dm.selectize = {};
	dm.select2 = {};

;(function($, window, document, undefined){

	dm.searchPanel = {};
	dm.selectize = {};
	dm.select2 = {};

	dm.selectize = function(el, opts){
		$.fn.selectize.apply(el, opts);
	};

	dm.select2 = function(el, opts){
		$.fn.select2.apply(el, opts);
	};

	dm.searchPanel = function(el){

		this.el = el;

		this.lvls = {
			$one: $('.page-search__row--level-one'),
			$two: $('.page-search__row--level-two'),
			$three: $('.page-search__row--level-three')
		};

		this.inputs = {
			$main: $('.page-search__dropdown--main'),
			$filters: $('.page-search__dropdown--filter, .page-search__dropdown--filter-wide, .page-search__dropdown--filter-advanced'),
			$tokenize: $('.page-search__input--tokenize')
		};

		this.btns = {
			$lvl2t: $('.page-search__button--level-two-toggle'),
			$lvl3t: $('.page-search__button--level-three-toggle'),
			$close: $('.page-search__button--close'),
			$svSearch: $('.page-search__button--save-search'), 
			$submit: $('.page-search__button--submit')
		};

		this.init();	
	};

	dm.searchPanel.prototype = {

		self: this,

		allOpen: false,

		init: function(){
			this.lvls.$two.hide();
			this.lvls.$three.hide();

			dm.selectize(this.inputs.$main, {persist: false});
			dm.selectize(this.inputs.$tokenize, {
                    delimiter: ',',
                    persist: true,
                    create: function(input) {
                        return {
                            value: input,
                            text: input
                        }
                    }
            });

            dm.select2(this.inputs.$filters, {});

            this.eventHandlers();

		},

		eventHandlers: function(){

			var self = this;

			self.btns.$lvl2t.on('click', function(e){
				e.preventDefault();

				var device = $(this).hasClass('mobile') ? 'mobile' : 'desktop';
				
				var span = $(this).children('span');

				if(device == 'desktop'){
					
					if(self.allOpen){
						self.lvls.$three.hide();
						self.lvls.$two.hide();
						self.btns.$lvl3t.removeClass('select2-panel-open');
						span.toggle();
						self.allOpen = false;
					}else{
						self.lvls.$two.toggle();
						span.toggle();
						self.allOpen = false;
					}
				}
				if(device == 'mobile'){
					// for mobile, combine levels two and three
					var lvls = $.merge(self.lvls.$two, self.lvls.$three);
					lvls.toggle();
					span.toggle();
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

			self.btns.$svSearch.on('click', function(e){
				e.preventDefault();
				self.saveSearch();
			});

		},


		saveSearch: function(){
			return false;
		}


	};	


	$.fn.searchPanel = function(){
		// return this.each(function(){
		// 	new dm.searchPanel(this);
		// });
		return new dm.searchPanel(this);
	};

})(jQuery, window, document, undefined);

$(document).ready(function(){
		if($('.page-search').length){
			$('.page-search').searchPanel();
		}
	});
