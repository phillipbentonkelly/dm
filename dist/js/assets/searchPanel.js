
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

		this.lvls = {
			$one: $('.page-search__row--level-one'),
			$two: $('.page-search__row--level-two'),
			$three: $('.page-search__row--level-three')
		};

		this.inputs = {
			$main: $('.page-search__dropdown--main'),
			$filters: $('.page-search__dropdown--filter, 
						.page-search__dropdown--filter-wide, 
						.page-search__dropdown--filter-advanced'),
			$tokenize: $('.page-search__input--tokenize')
		}

		this.btns = {
			$lvl2t: $('.page-search__button--level-two-toggle'),
			$lvl3t: $('.page-search__button--level-three-toggle'),
			$close: $('.page-search__button--close'),
			$svSearch: $('.page-search__button--save-search'), 
			$search: $('.page-search__buttons--submit')
		}

		this.init();	
	}

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
				var arrow = $(this).children('span');
				if(device == 'desktop'){
					if(self.allOpen){
						arrow.toggle();
						self.lvls.$three.hide();
						self.lvls.$two.hide();
						self.btns.$lvl3t.removeClass('.select2-panel-open');
						self.allOpen = false;
					}else{
						arrow.toggle();
						self.lvls.$two.toggle();
						self.allOpen = false;
					}
				}

				if(device == 'mobile'){
					var lvls = $.merge(self.lvls.$two, self.lvls.$three);
					arrow.toggle();
					lvls.toggle();
				}
				
			});

			self.btns.$lvl3t.on('click', function(e){
				e.preventDefault();
				self.lvls.$three.toggle();
				self.btns.$lvl3t.removeClass('.select2-panel-open');
				self.allOpen = (self.allOpen == true) ? false : true;
			});

			self.btns.$close.on('click', function(e){
				e.preventDefault();
				var arrow = $(this).children('span');
				self.lvls.$three.hide();
				arrow.toggle();
				self.allOpen = false;
			});

		},


	};	


	$.fn.searchPanel = function(){
		return this.each(function(){
			new dm.searchPanel(this);
		});
	}


})(jQuery, window, document, undefined);


$(document).ready(function(){
	/*if($('.page-search').length){
		$('.page-search').searchPanel();
	}*/
});