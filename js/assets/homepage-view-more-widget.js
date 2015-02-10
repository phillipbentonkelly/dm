(function( win, $, undefined ) {
	'use strict';
	// Related Articles
	var module = {};

	module.allArticles = [
		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "Test details1",
			details: "Test details1.1 NUMBA 1",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			details: "Test details6.1 NUMBA 6",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			details: "Test details7.1 NUMBA 7",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			details: "Test details8.1 NUMBA 8",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			details: "Test details9.1 NUMBA 9",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			details: "Test details10.1 NUMBA 10",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			details: "Test details11.1 NUMBA 11",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			details: "Test details12.1 NUMBA 12",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
/*
		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #2",
			detailsOverlay: "Test details2",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #3",
			detailsOverlay: "Test details3",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					},

					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__2.jpg',
			title: "Article #4",
			detailsOverlay: "Test details4",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					},

					{'tag-type':'Luxury',
					'tag-color': 'maroon'
					}
			]
		},

		{
			image: 'images/listings/reNews__listings__4.jpg',
			detailsOverlay: "Test details5",
			details: "Test details5.1 NUMBA 5",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
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
			title: "Article #6",
			details: "Test details6.1",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					},
					{'tag-type':'For Sale',
					'tag-color': 'white'
					},
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #7",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					},

					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__2.jpg',
			title: "Article #8",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					},

					{'tag-type':'Luxury',
					'tag-color': 'maroon'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #9",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #10",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #11",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					},

					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__2.jpg',
			title: "Article #12",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					},

					{'tag-type':'Luxury',
					'tag-color': 'maroon'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #13",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					}
			]
		},

		
		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #14",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #15",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					},

					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__2.jpg',
			title: "Article #16",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					},

					{'tag-type':'Luxury',
					'tag-color': 'maroon'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #17",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #18",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					},

					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__2.jpg',
			title: "Article #19",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					},

					{'tag-type':'Luxury',
					'tag-color': 'maroon'
					}
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Article #20",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					}
			]
		} */
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
				console.log("Building Tags");
			}

			var _tagMarkup = tagMarkup.join('');
			markup = [	'<div class="real-estate-news__tile">',
							'<div class="real-estate-news__category-tag-container">',
								_tagMarkup,
							'</div>',
							'<img src="' + curItem.image + '" />',
							
							console.log("Building markup"),
							'<div class="detailsOverlay">' + curItem.details + '</div>',
							'<div class="test">' + "hi" + '</div>',
							
						'</div>'
					].join('');

			// Inject ads after first 4 articles
			if( module.allArticles.indexOf(articlesDisplayed[i]) < 6 ) {
				module.$hook.append(markup);
				console.log("Ads IF");
			} else {
				module.$container.append(markup);
				console.log("Ads Else");
			}
			module.$container.append(module.$viewMore);

		}
	};

	module.showMoreArticles = function() {
		module.curIndex += 6;
		if($('.real-estate-news__tile').length < module.listLength) {
			module.buildWidget(module.curIndex);
		}
		console.log("showMoreArticles");
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
		module.$hook =  $('.related-articles__hook');
		module.$ads = $('.real-estate-news__wrapper adSlots');
		module.$viewMore = $('.real-estate-news').find('.viewMore'); ///effective change
		module.$articlesDisplayed = $('.real-estate-news__tile').length;

		module.listLength = module.allArticles.length;
		module.totalPages = Math.ceil(module.listLength / 6);
		module.curIndex = 0;

		module.buildWidget(0);
		module.eventHandlers();
		console.log("init");
	};

	// KICKOFF
	$(document).ready(function() {
		module.init();
		console.log("Kickoff");
	});

})(window, jQuery);