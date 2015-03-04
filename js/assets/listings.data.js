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


		//This is a field on the feed
		this.options.URLFromFeed = "http://realestate.chron.com/listings-search/?sort_field=featured_weight&sort_direction=desc&search_num_results=10&region=MA&locality=Springfield&neighborhood=East Springfield&curr_page=1&view=gallery";
		//  Get this ^ from the feed


		this.getFeedParams = function (url) {
			var params = url.split("?")[1];
			var paramArray = params.split("&");
			var _return = [];
			for (var i=0; i < paramArray.length; i++) {
				var itemSplit= paramArray[i].split("=");
				var item = {
					"param": itemSplit[0],
					"value": itemSplit[1]
				};
				_return.push(item);
			}

			return _return;
		}

		this.mapFeedParams = function (params) {
			var _returnArray = [];
			for (var i=0; i < params.length; i++) {
				var paramAPI = {
					"name": params[i].param,
					"value": params[i].value
				};
				//These are the fields that I could figure out because the URL samples are for some apiv3 and the one I was given is apiv2.1
				var validList= "region,locality,neighborhood,zip,min_baths,max_baths,min_half_baths,max_half_baths,min_beds,max_beds,min_price,max_price,min_sqft,max_sqft,placester_prop_type,air_cond,address,county,name,agent_name,email,phone,min_floors,max_floors,min_parking_spaces,max_parking_spaces,min_lotsize,max_lotsize,min_hoa,max_hoa,min_year_built,max_year_built,purchase_types,listing_type,zoning_type";

				if ( (validList.indexOf(params[i].param + ",") >= 0) ||
					 ("," + validList.indexOf(params[i].param + ",") >= 0) ||
					 ("," + validList.indexOf(params[i].param) >= 0) ) {
					//List all known parameters
					console.log("me",params[i].param);
					switch (params[i].param) {

						case "region":
							paramAPI["name"]= "location[region]";
							break;

						case "zip":
							paramAPI.name = "location[postal]";
							break;

						case "neighborhood":
							paramAPI.name = "location[neighborhood]";
							break;
						
						case "locality":
							paramAPI.name = "location[locality]";
							break;

						case "neighborhood":
							paramAPI.name = "location[neighborhood]";
							break;

						case "address":
							paramAPI.name = "location[address]";
							break;

						case "purchase_types":
							paramAPI.name = "purchase_types[]";
							break;

						case "listing_type":
							paramAPI.name = "listing_type[]";
							break;

						case "zoning_type":
							paramAPI.name = "zoning_type[]";
							break;

						case "phone":
							paramAPI.name = "contact[phone]";
							break;

						case "email":
							paramAPI.name = "contact[email]";
							break;

						case "agent_name":
							paramAPI.name = "rets[aname]";
							break;

						default: 
							paramAPI.name = params[i].param;

					}
					_returnArray.push(paramAPI);
				}

				
				
			}
			
			var _return = "";
			for (var i=0; i < _returnArray.length; i++) {
				_return += _returnArray[i].name + "=" + _returnArray[i].value + "&";
			}


			return _return;
		}



		this.init = function () {
			base.options.apiKey = 'LpjiWDtK7ViWvh1PiO53IKe34j8yZjcuKnIk46ZHYnAa';
			base.dropdown = base.$element.find('select#listingDropDown').get(0);
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

				return this.$element.data("urlParam");
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
						_content = _content.replace('{{cur_data.price}}', '$' + parseInt(_listing.cur_data.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
						_content = _content.replace('{{updated_at}}', _listing.updated_at );
						_content = _content.replace('{{image}}',(typeof _image !==  'undefined' ? _image.url : ''));
						_content = _content.replace('{{location.address}}',_listing.location.address);
						_content = _content.replace('{{location.locality}}',_listing.location.locality);
						_content = _content.replace('{{location.region}}',_listing.location.region);
						_content = _content.replace('{{cur_data.beds}}',_listing.cur_data.beds);
						_content = _content.replace('{{cur_data.baths}}',_listing.cur_data.baths);
					}catch(err){ console.log(err); }

						//Make sure no template markup is left behind.
						_content = _content.replace('{{purchase_type}}','');
						_content = _content.replace('{{cur_data.price}}','');
						_content = _content.replace('{{updated_at}}', '');
						_content = _content.replace('{{image}}','');
						_content = _content.replace('{{location.address}}','');
						_content = _content.replace('{{location.locality}}','');
						_content = _content.replace('{{location.region}}','');
						_content = _content.replace('{{cur_data.beds}}','');
						_content = _content.replace('{{cur_data.baths}}','');


					_template.removeClass('template')
						.html(_content);

					_template.children().wrap('<a href="http://bostoncom.placester.net/property/' + _listing.id + '"></a>');

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

				//Manually map each option to its url query params
				base.$dropdown.find('option[value="All"]').attr("data-url-param","&sort_by=cur_data.price&sort_type=asc&metadata[price]=200000&metadata[price]_match=gt");
				base.$dropdown.find('option[value="New"]').attr("data-url-param","&sort_by=created_at&sort_type=desc");
				base.$dropdown.find('option[value="Open House"]').attr("data-url-param","&");
				base.$dropdown.find('option[value="Luxury"]').attr("data-url-param","&min_price=1000000");
				
				//Update dropdown
				//Remove all current options but not the option ALL
				base.$dropdown.change(function () {
					base.listings.get($($(this).children().get(this.selectedIndex)));
				});
				//Get all
				base.listings.get(base.$dropdown.find('option[value="All"]'));
				
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



