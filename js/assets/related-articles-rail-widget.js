//
// Related Articles right rail widget
//


(function( win, $, undefined ) {
	'use strict';
	// Related Articles
	var module = {};

	module.tags =	{	'Arlington': { color: '#ce6323', link: '/locations/arlington/2.0.1944328483', tagtype: 'Location'},
						'Boston': { color: '#ce6323', link: '/locations/boston/2.0.1944328611', tagtype: 'Location'},
						'Allston-Brighton': { color: '#ce6323', link: '/locations/allston+brighton/2.0.1944328466', tagtype: 'Location'},
						'Back Bay': { color: '#ce6323', link: '/locations/back+bay/2.0.1944328500', tagtype: 'Location'},
						'Beacon Hill': { color: '#ce6323', link: '/locations/beacon+hill/2.0.1944328577', tagtype: 'Location'},
						'Charlestown': { color: '#ce6323', link: '/locations/charlestown/2.0.1944328696', tagtype: 'Location'},
						'Dorchester': { color: '#ce6323', link: '/locations/dorchester/2.0.1944328713', tagtype: 'Location'},
						'Downtown': { color: '#ce6323', link: '/locations/downtown/2.0.1944328730', tagtype: 'Location'},
						'East Boston': { color: '#ce6323', link: '/locations/east+boston/2.0.1944328611', tagtype: 'Location'},
						'Fenway-Kenmore': { color: '#ce6323', link: '/locations/fenway+kenmore/2.0.1944328764', tagtype: 'Location'},
						'Financial District': { color: '#ce6323', link: '/locations/financial+district/2.0.1944328781', tagtype: 'Location'},
						'Jamaica Plain': { color: '#ce6323', link: '/locations/jamaica+plain/2.0.1944328852', tagtype: 'Location'},
						'North End': { color: '#ce6323', link: '/locations/north+end/2.0.1944329141', tagtype: 'Location'},
						'South Boston': { color: '#ce6323', link: '/locations/south+boston/2.0.1944329255', tagtype: 'Location'},
						'South End': { color: '#ce6323', link: '/locations/south+end/2.0.1944329272', tagtype: 'Location'},
						'West Roxbury': { color: '#ce6323', link: '/locations/west+roxbury/2.0.1944430437', tagtype: 'Location'},
						'Brookline': { color: '#ce6323', link: '/locations/brookline/2.0.1944328645', tagtype: 'Location'},
						'Cambridge': { color: '#ce6323', link: '/locations/cambridge/2.0.1944328662', tagtype: 'Location'},
						'Newton': { color: '#ce6323', link: '/locations/newton/2.0.1944329124', tagtype: 'Location'},
						'Quincy': { color: '#ce6323', link: '/locations/quincy/2.0.1944329158', tagtype: 'Location'},
						'Somerville': { color: '#ce6323', link: '/locations/somerville/2.0.1944329192', tagtype: 'Location'},
						'Cape Cod': { color: '#ce6323', link: '/locations/cape+cod/2.0.1944328679', tagtype: 'Location'},
						'Belmont': { color: '#ce6323', link: '/locations/belmont/2.0.1944328594', tagtype: 'Location'},
						'Braintree': { color: '#ce6323', link: '/locations/braintree/2.0.1944328628', tagtype: 'Location'},
						'Hingham': { color: '#ce6323', link: '/locations/hingham/2.0.1944328798', tagtype: 'Location'},
						'Lexington': { color: '#ce6323', link: '/locations/lexington/2.0.1944328913', tagtype: 'Location'},
						'Medford': { color: '#ce6323', link: '/locations/medford/2.0.1944328930', tagtype: 'Location'},
						'Melrose': { color: '#ce6323', link: '/locations/melrose/2.0.1944329036', tagtype: 'Location'},
						'Milton': { color: '#ce6323', link: '/locations/milton/2.0.1944329053', tagtype: 'Location'},
						'Natick': { color: '#ce6323', link: '/locations/natick/2.0.1944329070', tagtype: 'Location'},
						'Needham Heights': { color: '#ce6323', link: '/locations/needham+heights/2.0.1944329107', tagtype: 'Location'},
						'Reading': { color: '#ce6323', link: '/locations/reading/2.0.1944329175', tagtype: 'Location'},
						'Wakefield': { color: '#ce6323', link: '/locations/wakefield/2.0.1944329289', tagtype: 'Location'},
						'Waltham': { color: '#ce6323', link: '/locations/waltham/2.0.1944329306', tagtype: 'Location'},
						'Watertown': { color: '#ce6323', link: '/locations/watertown/2.0.1944329323', tagtype: 'Location'},
						'Westwood': { color: '#ce6323', link: '/locations/westwood/2.0.1944430454', tagtype: 'Location'},
						'Weymouth': { color: '#ce6323', link: '/locations/weymouth/2.0.1944430471', tagtype: 'Location'},
						'Winchester': { color: '#ce6323', link: '/locations/winchester/2.0.1944430488', tagtype: 'Location'},
						'Wellesley': { color: '#ce6323', link: '/locations/wellesley/2.0.1944329340', tagtype: 'Location'},
						'Buying': { color: '#773659', link: '/buying/2.0.1966001199', tagtype: 'Category'},
						'New Developments': { color: '#773659', link: '/new+developments/2.0.1966001250', tagtype: 'Category'},
						'Open Houses': { color: '#773659', link: '/open+houses/2.0.1966017649', tagtype: 'Category'},
						'Home Improvement': { color: '#773659', link: '/home+improvement/2.0.1966001216', tagtype: 'Category'},
						'News': { color: '#773659', link: '/news/2.0.1966017666', tagtype: 'Category'},
						'Renting': { color: '#773659', link: '/renting/2.0.1966017683', tagtype: 'Category'},
						'Luxury': { color: '#773659', link: '/luxury/2.0.1966001233', tagtype: 'Category'},
						'Sponsored': { color: '#a1b3b4', link: '', tagtype: 'Sponsored'},
						'Open House': { color: '#77a9c3', link: '', tagtype: 'Open House'},
						'New Listing': { color: '#b4a455', link: '', tagtype: 'New Listing'}
					};

	module.getArticles = function() {
		var q = decodeURIComponent($.getParamVal('q'));
		if(q != '' || q != null){
			var markup = [];
			var container = $('.related-articles-mobile__items');	
			// initialize google api

			// send query to google

			// return response data
			var dummyData = {"responseData": {"results":[{"GsearchResultClass":"GwebSearch","unescapedUrl":"http://www.brooklinema.gov/","url":"http://www.brooklinema.gov/","visibleUrl":"www.brooklinema.gov","cacheUrl":"http://www.google.com/search?q\u003dcache:83HZKvm-2cMJ:www.brooklinema.gov","title":"\u003cb\u003eBrookline\u003c/b\u003e, MA - Official Website | Official Website","titleNoFormatting":"Brookline, MA - Official Website | Official Website","content":"The \u003cb\u003eBrookline\u003c/b\u003e Fire Department and the Town of \u003cb\u003eBrookline\u003c/b\u003e are asking residents \nand business owners to \u0026quot;Help Us Help You\u0026quot; by locating and shoveling out your ..."},{"GsearchResultClass":"GwebSearch","unescapedUrl":"http://en.wikipedia.org/wiki/Brookline,_Massachusetts","url":"http://en.wikipedia.org/wiki/Brookline,_Massachusetts","visibleUrl":"en.wikipedia.org","cacheUrl":"http://www.google.com/search?q\u003dcache:ZdGpJr56pJIJ:en.wikipedia.org","title":"\u003cb\u003eBrookline\u003c/b\u003e, Massachusetts - Wikipedia, the free encyclopedia","titleNoFormatting":"Brookline, Massachusetts - Wikipedia, the free encyclopedia","content":"\u003cb\u003eBrookline\u003c/b\u003e /ˈbrʊkˌlɪn/, /ˈbrʊkˌlaɪn/ is a town in Norfolk County, \nMassachusetts, in the United States, and is a part of Greater Boston. \u003cb\u003eBrookline\u003c/b\u003e \nborders six of ..."},{"GsearchResultClass":"GwebSearch","unescapedUrl":"http://www.brookline.k12.ma.us/","url":"http://www.brookline.k12.ma.us/","visibleUrl":"www.brookline.k12.ma.us","cacheUrl":"","title":"Public Schools of \u003cb\u003eBrookline\u003c/b\u003e","titleNoFormatting":"Public Schools of Brookline","content":"Official site contains information about the administration, schools, curriculum, \nand school committee."},{"GsearchResultClass":"GwebSearch","unescapedUrl":"http://www.brooklinelibrary.org/","url":"http://www.brooklinelibrary.org/","visibleUrl":"www.brooklinelibrary.org","cacheUrl":"http://www.google.com/search?q\u003dcache:T8wsoq8sl9MJ:www.brooklinelibrary.org","title":"The Public Library of \u003cb\u003eBrookline\u003c/b\u003e Home Page","titleNoFormatting":"The Public Library of Brookline Home Page","content":"The mission of the Public Library of \u003cb\u003eBrookline\u003c/b\u003e is to provide access to recorded \nknowledge and information to all the people of \u003cb\u003eBrookline\u003c/b\u003e, Massachusetts."}],"cursor":{"resultCount":"943,000","pages":[{"start":"0","label":1},{"start":"4","label":2},{"start":"8","label":3},{"start":"12","label":4},{"start":"16","label":5},{"start":"20","label":6},{"start":"24","label":7},{"start":"28","label":8}],"estimatedResultCount":"943000","currentPageIndex":0,"moreResultsUrl":"http://www.google.com/search?oe\u003dutf8\u0026ie\u003dutf8\u0026source\u003duds\u0026start\u003d0\u0026hl\u003den\u0026q\u003dBrookline","searchResultTime":"0.21"}}, "responseDetails": null, "responseStatus": 200};
			
			$.each(dummyData.responseData.results, function(item, data){
				markup = [	'<div class="related-articles-mobile__item">',
								'<div class="additional-info">',
									'<div class="tags">',
									'</div>',
								'</div>',

								'<div class="main-info">',
									'<a href="' + data.cacheUrl + '">',
										'<h2 class="title">' + data.title + '</h2>',
									'</a>',
									'<p class="description">' + data.content + '</p>',
								'</div>',

								//'<div class="date">' + date + '</div>',
						'</div>'
					].join('');
			});

			container.append(markup);

			// insert response data in DOM
			
		}else{
			$.get('http://devedit.boston.com/eom/SysConfig/WebPortal/BDC/Framework/feeds/placester/getArticles.jsp?mode=full', function(data) {
				module.allArticles = data['articles'];
				console.log('All Articles', module.allArticles);
				module.buildWidget(module.allArticles, 0);
				module.listLength = module.allArticles.length;
				module.totalPages = Math.ceil(module.listLength / 2);
			});
		}
		
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
			if(curItem.keywords) {
				var c = 0;
				for (var k=0; k < curItem.keywords.length; k++) {
					if (typeof module.tags[curItem.keywords[k]] !== "undefined") {
						console.log(curItem.keywords[k]);
						var curTag = module.tags[curItem.keywords[k]];
						var tag = '<a href="' + curTag.link + '" style="background:' + curTag.color + '" class="category-tag">' + curItem.keywords[k] + '</a>';
						tagMarkup.push(tag);
						c++;
					}
					if (c >= 4) break;
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