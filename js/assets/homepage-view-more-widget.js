(function( win, $, undefined ) {
	'use strict';
	// Related Articles
	var module = {};
	var _ads = _ads || {};

	module.allArticles = [
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "Test details1",
			details: "Test details1.1 NUMBA 1",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__5.jpg',
			detailsOverlay: "Test details2",
			details: "Test details2.1 NUMBA 2",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "Test details3",
			details: "Test details3.1 NUMBA 3",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__5.jpg',
			detailsOverlay: "Test details4",
			details: "Test details4.1 NUMBA 4",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "Test details5",
			details: "Test details5.1 NUMBA 5",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 6th house you should buy",
			price: "$190,000",
			details: "Test details6.1 NUMBA 6",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 7th house you should buy",
			price: "$190,000",
			details: "Test details7.1 NUMBA 7 cake",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			yar: "whoa",
			p: "Dude",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 8th house you should buy",
			price: "$190,000",
			details: "Test details8.1 NUMBA 8",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 9th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 10th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 11th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 12th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 13th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 14th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 15th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 16th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 17th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "This is the 18th house you should buy",
			price: "$190,000",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Test tag',
					'tag-color': 'orange'
					},

					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},
	];
	var adCount = 0;
	module.buildWidget = function() {
		module.articlesDisplayed = module.allArticles.slice(module.curIndex, (module.curIndex+4));
		// build each article's markup
		for (var i = 0; i < module.articlesDisplayed.length; i++) {
			var curItem = module.articlesDisplayed[i];
			var markup =[];
			var tagMarkup = [];
			var articlesOnPage = $('.real-estate-news').children('.real-state-news__tile').length;

			// build each article's tags
			for (var j = 0; j < curItem.tags.length; j++) {
				var tag = '<a href="javascript:;" class="category-tag ' + curItem.tags[j]['tag-color'] + ' topSpacing' + '">' + curItem.tags[j]['tag-type'] + '</a>';
				tagMarkup.push(tag);
			}

			var _tagMarkup = tagMarkup.join('');
			markup = [	'<div class="real-estate-news__tile">',
							'<div class="real-estate-news__category-tag-container">',
								_tagMarkup,
							'</div>',
							'<img src="' + curItem.image + '" />',
							'<div class="detailsWrapper">',
								'<div class="detailsArrow"></div>',
								'<div class="detailsOverlay">',
									'<h1>',
										'<span class="col">' + curItem.detailsOverlay + '</span>',
										'<span class="priceSpan">' + curItem.price + '</span>',
									'</h1>',
									'<p>' + curItem.description +'</p>',
								'</div>',
							'</div>',
						'</div>'
					].join('');

			
			if( module.articlesDisplayed.indexOf(curItem) === 2 ) {
				// module.$container.append(_ads.scroll.init);
				var adName = "ad_bigbox" +  (++adCount);
				var adName2 = "ad_bigbox" + (++adCount);
				var adMarkup = [
					'<div class="adSlot ad-container ad-container--content-ad ad-container--' + adName + '" style="margin-bottom:15px;margin-right:2%;">',
						'<div id="' + adName + '"></div>',
					'</div>',
					'<div class="adSlot ad-container ad-container--content-ad ad-container--' + adName2 + '" style="margin-bottom:15px;">',
						'<div id="' + adName2 + '"></div>',
					'</div>',
				].join('');

				module.$container.append(adMarkup);

				var networkCode = bcom.dfp.networkCode;
				var adUnit = bcom.dfp.adUnit;
				googletag.cmd.push(function() {
					googletag.defineSlot('/' + networkCode + '/' + adUnit, [[300,250]], adName)
					.addService(googletag.pubads())
					.setTargeting("pos", "atf");
					googletag.display( adName );
				});

				googletag.cmd.push(function() {
					googletag.defineSlot('/' + networkCode + '/' + adUnit, [[300,250]], adName2)
					.addService(googletag.pubads())
					.setTargeting("pos", "atf");
					googletag.display( adName2 );
				});

				module.$container.append(markup);
			} else {
				// append velow ad slots
				module.$container.append(markup);
			}
			// append button after all items
			module.$container.append(module.$viewMore);
		}
	};

	module.showMoreArticles = function() {
		// increase index to grab next 6 articles
		module.curIndex += 4;
		if($('.real-estate-news__tile').length < module.listLength) {
			module.buildWidget(module.curIndex);
		}
	};

	// Event Handlerss
	module.eventHandlers = function() {
		module.$viewMore.click(function() {
			module.showMoreArticles();
		});
	};

	module.init = function() {
		module.$container = $('.real-estate-news__wrapper');
		
		module.$ads = $('.adSlots');
		module.$viewMore = $('.real-estate-news').find('.viewMore');
		module.$articlesDisplayed = $('.real-estate-news__tile').length;

		module.listLength = module.allArticles.length;
		module.totalPages = Math.ceil(module.listLength / 4);
		module.curIndex = 0;

		module.buildWidget();
		module.eventHandlers();
	};

	// KICKOFF
	$(document).ready(function() {
		module.init();
	});

})(window, jQuery);