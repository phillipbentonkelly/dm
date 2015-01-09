(function ($) {
	window.realestate = {};
	window.realestate.propertyListing = function (element, options) {
		var base = this;

		this.base=this;
		this.element = element;
		this.$element = $(element);


		var defaultOptions = {
			'filters' : {
				'property_type': {
					'key': 'property_type',
					'name': 'Property Type',
					'appendName': true
				},
				'purchase_types': {
					'key': 'purchase_types',
					'name': 'Purchase Type',
					'appendName': false,
					'displayName': {
						'sale': 'For Sale',
						'rental': 'For Rent'
					}
				}
			}
		};

		this.options = $.extend({}, defaultOptions, options);



		this.init = function () {
			base.options.apiKey = 'LpjiWDtK7ViWvh1PiO53IKe34j8yZjcuKnIk46ZHYnAa';
			base.dropdown = base.$element.find('.drop-down').get(0);
			base.$dropdown = $(base.dropdown);
			//Clear content
			base.$element.find('.listing-container')
				.children()
				.filter(function () { return !$(this).hasClass('template'); })
				.remove();

			//Get filters
			this.filters.get();

		};
		this.listings = {
			_url: function () {
				return 'http://api.cfk.placester.net/api/v2.1/listings.json?api_key=' + base.options.apiKey;
			}, 
			_keys: function () {
				return this.$element.data('realestatePropertyListingFilter') + '[]=' + this.$element.data('realestatePropertyListingFilterValue');
			},
			get: function ($element) {
				this.$element = $element;
				$.ajax({
				  dataType: 'json',
				  url: this._url(),
				  data: this._keys(),
				  success: this.update
				});
			},		
			update: function (data) {
				var thisRef = this;
				base.$element.find('.listing-container')
					.children()
					.filter(function () { return !$(this).hasClass('template'); })
					.remove();


				for (var listing in data.listings) {
					var _template = base.$element.find('.listing-container')
						.children()
						.filter(function () { return $(this).hasClass('template'); })
						.clone(true);

					var _content = _template.html();
					var _listing = data.listings[listing];
					var _image = $(_listing.images).filter(function () { return this.order==1; })[0];
					
					try{
						_content = _content.replace('{{purchase_type}}',_listing.purchase_types[0]);
						_content = _content.replace('{{cur_data.price}}', '$' + _listing.cur_data.price);
						_content = _content.replace('{{updated_at}}', _listing.updated_at );
						_content = _content.replace('{{image}}',_image.url);
						_content = _content.replace('{{location.address}}',_listing.location.address);
						_content = _content.replace('{{location.locality}}',_listing.location.locality);
						_content = _content.replace('{{location.region}}',_listing.location.region);
						_content = _content.replace('{{cur_data.beds}}',_listing.cur_data.beds);
						_content = _content.replace('{{cur_data.baths}}',_listing.cur_data.baths);
					}catch(err){ console.log(err); }

					_template.removeClass('template')
						.html(_content);
					
					base.$element.find('.listing-container').append(_template);

					$('[data-src]').each(function () {
						$(this).attr('src',$(this).attr('data-src'));
					});
				}
				mplistingObj.updateDisplayParams();
			}
		},
		this.filters = {
			_url: function () {
				return 'http://api.cfk.placester.net/api/v2.1/listings/aggregate.json?api_key=' + base.options.apiKey;
			}, 
			_keys: function () {
				var _ret = '';
				for (var filter in base.options.filters) {
					_ret += '&keys[]=' + base.options.filters[filter].key;
				}
				return _ret.substring(1);
			},
			get: function () {
				$.ajax({
				  dataType: 'json',
				  url: this._url(),
				  data: this._keys(),
				  success: this.update
				});
			},
			update: function (data, status) {
				//Get all filters
				for (var filter in data) {
					if (typeof base.options.filters[filter] !== 'undefined') 
						base.options.filters[filter].elements = data[filter];
				}

				//Update dropdown
				//Remove all current options but not the option ALL
				base.$dropdown.find('.drop-down__options')
					.children()
					.filter(function () { return $(this).html()!='All'; })
					.remove();
				var _all = base.$dropdown.find('.drop-down__options').children().filter(function () { return $(this).html()=='All'; });

				for (var filter in base.options.filters) {
					for (var filterElement in base.options.filters[filter].elements) {
						
						var _filter = base.options.filters[filter];
						var _filterValue = _filter.elements[filterElement];

						var _name = '';
						//Check if the filter name should be added
						if (base.options.filters[filter].appendName) 
							_name = base.options.filters[filter].name + ':';

						//Check if any specific element retrieved has a name override
						if ((typeof _filter.displayName !== 'undefined') && (typeof _filter.displayName[_filterValue] !== 'undefined')) {
							_name += _filter.displayName[_filterValue];
						} else {
							_name += _filterValue;
						}
						var _option = _all.clone(true);

						_option.data('realestatePropertyListingFilter',filter);
						_option.data('realestatePropertyListingFilterValue',_filterValue);
						_option.html(_name);

						_option.click(function () {
							base.listings.get($(this));
						});
						base.$dropdown.find('.drop-down__options').append(_option);

					}
				}
				//Get all
				_all.data('realestatePropertyListingFilter','all');
				_all.data('realestatePropertyListingFilterValue','all');
				base.listings.get(_all);
				
			}
		};
		base.init();
		
		//Make sure the element is reusable and never recreated if it 
		//has been already set once
		base.$element.data('realestatePropertyListing',this);
	};
	
	$.fn.propertyListing = function (options) {
		if (typeof $(this).data('realestatePropertyListing') === 'undefined')
			return new window.realestate.propertyListing(this,options);
	
		return $(this).data('realestatePropertyListing');
	};

	$(document).ready(function () {
		//Comment this to remove the autoload
		$('.mplistings').propertyListing();
	});
})(jQuery);



