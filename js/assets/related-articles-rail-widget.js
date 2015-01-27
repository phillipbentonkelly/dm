//
// Related Articles right rail widget
//


(function( win, $, undefined ) {
	'use strict';
	// Related Articles
	var module = {};

	module.allArticles = [
		{
			image: 'images/related-articles/related-articles__thumbs__2.jpg',
			title: "Tom and Gisele's Brookline Pad Looks Almost Ready",
			description: "The dream home of the most famouse couple in Massachusetts looks like it's close to completion.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Open House',
					'tag-color': 'light-blue'
					},

					{'tag-type':'Luxury',
					'tag-color': 'maroon'
					},
			]
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Tom and Gisele's Brookline Pad Looks Almost Ready",
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
			title: "Testing this article, This should be on Page 2",
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
			title: "Tom and Gisele's Brookline Pad Looks Almost Ready",
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
			title: "Tom and Gisele's Brookline Pad Looks Almost Ready",
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
			title: "Testing this article, This should be on Page 2",
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
			title: "Tom and Gisele's Brookline Pad Looks Almost Ready",
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
			title: "Tom and Gisele's Brookline Pad Looks Almost Ready",
			description: "This updated Italianate mansion, once known as The Gilbert House, was originally built in 1854 and has undergone extensive renovations while remaining loyal to the home's orignal design.",
			date: "September 9, 2014",
			tags: [
					{'tag-type':'Jamaica Plain',
					'tag-color': 'orange'
					}
			]
		}
	];

	module.buildWidget = function(indexStart) {
		// teardown old articles to build next page
		module.$container.find('.related-articles-mobile__item').remove();

		var articlesDisplayed = module.allArticles.slice(indexStart, (indexStart+2));

		// build each article's markup
		for (var i = 0; i < articlesDisplayed.length; i++) {
			var curItem = articlesDisplayed[i];
			var markup =[];
			var tagMarkup = [];

			// build each article's tags
			for (var j = 0; j < curItem.tags.length; j++) {
				var tag = '<a href="javascript:;" class="category-tag ' + curItem.tags[j]['tag-color'] + '">' + curItem.tags[j]['tag-type'] + '</a>';
				tagMarkup.push(tag);
			}

			var _tagMarkup = tagMarkup.join('');
			markup = [	'<div class="related-articles-mobile__item">',
								'<div class="additional-info">',
									'<img class="thumb" src="' + curItem.image + '" />',
									'<div class="tags">',
									_tagMarkup,
									'</div>',
								'</div>',

								'<div class="main-info">',
									'<a href="javascript:;">',
										'<h2 class="title">' + curItem.title + '</h2>',
									'</a>',
									'<p class="description">' + curItem.description + '</p>',
								'</div>',

								'<div class="date">' + curItem.date + '</div>',
						'</div>'
					].join('');

			module.$container.append(markup);
		}
	};

	// Event Handlers
	module.eventHandlers = function() {
		module.$pageback.click(function() {
			// if on first page
			if(module.curPage != 1) {
				module.curIndex -= 2;
				module.curPage --;
				module.buildWidget(module.curIndex);
			} else {
				return;
			}
		});

		module.$pageforawrd.click(function() {
			
			// if on last page
			if(module.curPage < module.totalPages) {
				module.curIndex += 2;
				module.curPage ++;
				module.buildWidget(module.curIndex);
			} else {
				return;
			}
		});
	};

	module.init = function() {
		module.$container = $('.related-articles-mobile');

		module.$pageback = $('.related-articles-mobile').find('.re-widget-left');
		module.$pageforawrd = $('.related-articles-mobile').find('.re-widget-right');
		module.listLength = module.allArticles.length;
		module.totalPages = Math.ceil(module.listLength / 2);
		module.curPage = 1;
		module.curIndex = 0;

		module.buildWidget(0);
		module.eventHandlers();
	};

	// KICKOFF
	$(document).ready(function() {
		module.init();
	});

})(window, jQuery);