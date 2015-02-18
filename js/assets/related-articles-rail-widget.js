//
// Related Articles right rail widget
//


(function( win, $, undefined ) {
	'use strict';
	// Related Articles
	var module = {};

	module.tags = 	[	{ tag: 'Arlington', color: '#c6323', link: '/locations/arlington/2.0.1944328483', tagtype: 'Location'},
						{ tag: 'Boston', color: '#c6323', link: '/locations/boston/2.0.1944328611', tagtype: 'Location'},
						{ tag: 'Allston-Brighton', color: '#c6323', link: '/locations/allston+brighton/2.0.1944328466', tagtype: 'Location'},
						{ tag: 'Back Bay', color: '#c6323', link: '/locations/back+bay/2.0.1944328500', tagtype: 'Location'},
						{ tag: 'Beacon Hill', color: '#c6323', link: '/locations/beacon+hill/2.0.1944328577', tagtype: 'Location'},
						{ tag: 'Charlestown', color: '#c6323', link: '/locations/charlestown/2.0.1944328696', tagtype: 'Location'},
						{ tag: 'Dorchester', clor: '#c6323', link: '/locations/dorchester/2.0.1944328713', tagtype: 'Location'},
						{ tag: 'Downtown', color: '#c6323', link: '/locations/downtown/2.0.1944328730', tagtype: 'Location'},
						{ tag: 'East Boston', color: '#c6323', link: '/locations/east+boston/2.0.1944328611', tagtype: 'Location'},
						{ tag: 'Fenway-Kenmore', color: '#c6323', link: '/locations/fenway+kenmore/2.0.1944328764', tagtype: 'Location'},
						{ tag: 'Financial District', color: '#c6323', link: '/locations/financial+district/2.0.1944328781', tagtype: 'Location'},
						{ tag: 'Jamaica Plain', color: '#c6323', link: '/locations/jamaica+plain/2.0.1944328852', tagtype: 'Location'},
						{ tag: 'North End', color: '#c6323', link: '/locations/north+end/2.0.1944329141', tagtype: 'Location'},
						{ tag: 'South Boston', color: '#c6323', link: '/locations/south+boston/2.0.1944329255', tagtype: 'Location'},
						{ tag: 'South End', color: '#c6323', link: '/locations/south+end/2.0.1944329272', tagtype: 'Location'},
						{ tag: 'West Roxbury', color: '#c6323', link: '/locations/west+roxbury/2.0.1944430437', tagtype: 'Location'},
						{ tag: 'Brookline', color: '#c6323', link: '/locations/brookline/2.0.1944328645', tagtype: 'Location'},
						{ tag: 'Cambridge', color: '#c6323', link: '/locations/cambridge/2.0.1944328662', tagtype: 'Location'},
						{ tag: 'Newton', color: '#c6323', link: '/locations/newton/2.0.1944329124', tagtype: 'Location'},
						{ tag: 'Quincy', color: '#c6323', link: '/locations/quincy/2.0.1944329158', tagtype: 'Location'},
						{ tag: 'Somerville', color: '#c6323', link: '/locations/somerville/2.0.1944329192', tagtype: 'Location'},
						{ tag: 'Cape Cod', color: '#c6323', link: '/locations/cape+cod/2.0.1944328679', tagtype: 'Location'},
						{ tag: 'Belmont', color: '#c6323', link: '/locations/belmont/2.0.1944328594', tagtype: 'Location'},
						{ tag: 'Braintree', color: '#c6323', link: '/locations/braintree/2.0.1944328628', tagtype: 'Location'},
						{ tag: 'Hingham', color: '#c6323', link: '/locations/hingham/2.0.1944328798', tagtype: 'Location'},
						{ tag: 'Lexington', color: '#c6323', link: '/locations/lexington/2.0.1944328913', tagtype: 'Location'},
						{ tag: 'Medford', color: '#c6323', link: '/locations/medford/2.0.1944328930', tagtype: 'Location'},
						{ tag: 'Melrose', color: '#c6323', link: '/locations/melrose/2.0.1944329036', tagtype: 'Location'},
						{ tag: 'Milton', color: '#c6323', link: '/locations/milton/2.0.1944329053', tagtype: 'Location'},
						{ tag: 'Natick', color: '#c6323', link: '/locations/natick/2.0.1944329070', tagtype: 'Location'},
						{ tag: 'Needham Heights', color: '#c6323', link: '/locations/needham+heights/2.0.1944329107', tagtype: 'Location'},
						{ tag: 'Reading', color: '#c6323', link: '/locations/reading/2.0.1944329175', tagtype: 'Location'},
						{ tag: 'Wakefield', color: '#c6323', link: '/locations/wakefield/2.0.1944329289', tagtype: 'Location'},
						{ tag: 'Waltham', color: '#c6323', link: '/locations/waltham/2.0.1944329306', tagtype: 'Location'},
						{ tag: 'Watertown', color: '#c6323', link: '/locations/watertown/2.0.1944329323', tagtype: 'Location'},
						{ tag: 'Westwood', color: '#c6323', link: '/locations/westwood/2.0.1944430454', tagtype: 'Location'},
						{ tag: 'Weymouth', color: '#c6323', link: '/locations/weymouth/2.0.1944430471', tagtype: 'Location'},
						{ tag: 'Winchester', color: '#c6323', link: '/locations/winchester/2.0.1944430488', tagtype: 'Location'},
						{ tag: 'Wellesley', color: '#c6323', link: '/locations/wellesley/2.0.1944329340', tagtype: 'Location'},
						{ tag: 'Buying', color: '#c6323', link: '/buying/2.0.1966001199', tagtype: 'Category'},
						{ tag: 'New Developments', color: '#c6323', link: '/new+developments/2.0.1966001250', tagtype: 'Category'},
						{ tag: 'Open Houses', color: '#c6323', link: '/open+houses/2.0.1966017649', tagtype: 'Category'},
						{ tag: 'Home Improvement', color: '#c6323', link: '/home+improvement/2.0.1966001216', tagtype: 'Category'},
						{ tag: 'News', color: '#c6323', link: '/news/2.0.1966017666', tagtype: 'Category'},
						{ tag: 'Renting', color: '#c6323', link: '/renting/2.0.1966017683', tagtype: 'Category'},
						{ tag: 'Luxury', color: '#c6323', link: '/luxury/2.0.1966001233', tagtype: 'Category'},
						{ tag: 'Sponsored', color: '#c6323', link: '', tagtype: 'Sponsored'},
						{ tag: 'Open House', color: '#c6323', link: '', tagtype: 'Open House'},
						{ tag: 'New Listing', color: '#c6323', link: '', tagtype: 'New Listing'}
					];

	module.getArticles = function() {
		$.get('http://devedit.boston.com/eom/SysConfig/WebPortal/BDC/Framework/feeds/placester/getArticles.jsp?mode=full', function(data) {
			module.allArticles = data['articles'];
			console.log('All Articles', module.allArticles);
			module.buildWidget(module.allArticles, 0);
			module.listLength = module.allArticles.length;
			module.totalPages = Math.ceil(module.listLength / 2);
		});
	};

	module.buildWidget = function(allArticles, indexStart) {
		// teardown old articles to build next page
		module.$container.find('.related-articles-mobile__item').remove();

		var articlesDisplayed = allArticles.slice(indexStart, (indexStart+2));

		// build each article's markup
		for (var i = 0; i < articlesDisplayed.length; i++) {
			var curItem = articlesDisplayed[i];
			var markup =[];
			var tagMarkup = [];
			var mediaMarkup = [];
			var media;
			var mediaCount = curItem.images ? curItem.images.length : 0;
			var description;
			var articleLink = curItem.link;
			var title;
			var date = curItem.creationDate ? module.formatDate(curItem.creationDate) : 'no date available';

			// conditionally set description
			if (curItem.SEOInformation) {
				description  = curItem.SEOInformation.summary;
			} else if (curItem.content) {
				description = curItem.content;
			} else {
				description = 'Sorry, no description available for this article';
			}
			// trim description to first 100 characters
			description = description.slice(0, 100) + ' ...';

			// conditionally set title
			if (curItem.title) {
				title  = curItem.title;
			} else if (curItem.SEOInformation) {
				title = curItem.SEOInformation.headline;
			} else {
				title = 'Sorry, no title available for this article';
			}

			// build each article's tags
			if(curItem.keywords && curItem.keywords.length > 1) {
				var t = 0;
				while (t < 3) {
					var tag = '<a href="javascript:;" class="category-tag maroon">' + curItem.keywords[t] + '</a>';
					tagMarkup.push(tag);
					t++;
				}
			}

			if(mediaCount < 1) {
				media = '<img class="thumb" style="height:100px;width:130px;border:1px solid black" src="" />';
				mediaMarkup.push(media);
			} else {
				for (var p = 0; p < 1; p++) {
					if(!curItem.hasImage) {
						if(curItem.images[p]['--class'] && curItem.images[p]['--class'] == 'main-web-images') {
							media = '<img class="thumb" style="height:120px;width:175px" src="' + curItem.images[p].url + '" />';
						} else {
							media = '<img class="thumb" style="height:120px;width:175px" src="' + curItem.images[0].url + '" />';
						}
						mediaMarkup.push(media);
					}
				}
			}

			var _tagMarkup = tagMarkup.join('');
			markup = [	'<div class="related-articles-mobile__item">',
								'<div class="additional-info">',
									mediaMarkup,
									'<div class="tags">',
									_tagMarkup,
									'</div>',
								'</div>',

								'<div class="main-info">',
									'<a href="' + articleLink + '">',
										'<h2 class="title">' + title + '</h2>',
									'</a>',
									'<p class="description">' + description + '</p>',
								'</div>',

								'<div class="date">' + date + '</div>',
						'</div>'
					].join('');

			module.$container.append(markup);
		}
	};

	module.formatDate = function(timestamp) {
		var year = timestamp.slice(0,4);
		var month = timestamp.slice(4,6);
		var day = timestamp.slice(6,8);
		var date = moment(timestamp,'YYYYMMDDHHmmss');
		var formattedDate = date.format('MMMM Do YYYY');
		return formattedDate;
	};

	// Event Handlers
	module.eventHandlers = function() {
		module.$pageback.click(function() {
			// if on first page
			if(module.curPage != 1) {
				module.curIndex -= 2;
				module.curPage --;
				module.buildWidget(module.allArticles, module.curIndex);
			} else {
				return;
			}
		});

		module.$pageforawrd.click(function() {
			// if on last page
			if(module.curPage < module.totalPages) {
				module.curIndex += 2;
				module.curPage ++;
				module.buildWidget(module.allArticles, module.curIndex);
			} else {
				return;
			}
		});
	};

	module.init = function() {
		module.$container = $('.related-articles-mobile');
		module.$pageback = $('.related-articles-mobile').find('.re-widget-left');
		module.$pageforawrd = $('.related-articles-mobile').find('.re-widget-right');
		module.curPage = 1;
		module.curIndex = 0;

		module.getArticles();
		module.eventHandlers();
	};

	// KICKOFF
	$(document).ready(function() {
		module.init();
	});

})(window, jQuery);