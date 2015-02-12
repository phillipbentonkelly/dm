(function( win, $, undefined ) {
	'use strict';
	// Related Articles
	var module = {};

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

	module.buildWidget = function() {
		var articlesDisplayed = module.allArticles.slice(module.curIndex, (module.curIndex+6));

		// build each article's markup
		for (var i = 0; i < articlesDisplayed.length; i++) {
			var curItem = articlesDisplayed[i];
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



			// Inject ads after first 4 articles
			// change the int value to change what gets generated on the page
			if( module.allArticles.indexOf(articlesDisplayed[i]) < 6 ) {
				module.$hook.append(markup);
			} else {
				module.$container.append(markup);
			}
			module.$container.append(module.$viewMore);

		}
	};

	module.showMoreArticles = function() {
		module.curIndex += 6;
		if($('.real-estate-news__tile').length < module.listLength) {
			module.buildWidget(module.curIndex);
		}
		return;
	};

	// Event Handlerss
	module.eventHandlers = function() {
		module.$viewMore.click(function() {
			module.showMoreArticles();
			console.log("eventHandler");

		});
	};

	module.init = function() {
		module.$container = $('.real-estate-news'); //effective change
		module.$hook =  $('.related-articles__hook'); // I know that this is what helps ads populate....
		module.$ads = $('.real-estate-news__wrapper adSlots');
		module.$viewMore = $('.real-estate-news').find('.viewMore'); ///effective change
		module.$articlesDisplayed = $('.real-estate-news__tile').length;

		module.listLength = module.allArticles.length;
		module.totalPages = Math.ceil(module.listLength / 6);
		module.curIndex = 0;

		module.buildWidget(0);
		module.eventHandlers();
	};

	// KICKOFF
	$(document).ready(function() {
		module.init();
	});

})(window, jQuery);