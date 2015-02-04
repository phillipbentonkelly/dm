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
		var articlesDisplayed = module.allArticles.slice(indexStart, (indexStart+4));

		// build each article's markup
		for (var i = 0; i < articlesDisplayed.length; i++) {
			var curItem = articlesDisplayed[i];
			var markup =[];
			var tagMarkup = [];
			var articlesOnPage = $('.related-articles').children('.related-articles__item').length;

			// build each article's tags
			for (var j = 0; j < curItem.tags.length; j++) {
				var tag = '<a href="javascript:;" class="category-tag ' + curItem.tags[j]['tag-color'] + '">' + curItem.tags[j]['tag-type'] + '</a>';
				tagMarkup.push(tag);
			}

			var _tagMarkup = tagMarkup.join('');
			markup = [	'<div class="related-articles__item">',
							'<img class="thumb" src="' + curItem.image + '" />',
							'<div class="main-info">',
								'<a href="javascript:;">',
									'<h2 class="title">' + curItem.title + '</h2>',
								'</a>',
								'<p class="description">' + curItem.description + '</p>',
							'</div>',
							'<div class="additional-info">',
								'<div class="date">' + curItem.date + '</div>',
								'<div class="tags">',
								_tagMarkup,
								'</div>',
							'</div>',
						'</div>'
					].join('');

			// Ad placeholder injected every 4 articles
			if(articlesOnPage > 0 && articlesOnPage %4 ===0) {
				var adMarkup = '<div id="ad_bigbox3" style="height:250px;width:300px;float:left;background:lightgrey;margin:20px 40px 20px 0;" class="ad-placeholder"></div><div id="ad_bigbox4" style="height:250px;width:300px;float:left;background:lightgrey;margin:20px 0 20px 0;" class="ad-placeholder"></div>';
				module.$container.append(adMarkup);
			}
			module.$container.append(markup);
			module.$container.append(module.$viewMore);
		}
	};

	module.showMoreArticles = function() {
		if($('.related-articles__item').length < module.listLength) {
			module.buildWidget(4);
		} else {
			return;
		}
	};

	// Event Handlers
	module.eventHandlers = function() {
		module.$viewMore.click(function() {
			module.showMoreArticles();
		});
	};

	module.init = function() {
		module.$container = $('.related-articles');
		module.$viewMore = $('.related-articles').find('.viewMore');
		module.$articlesDisplayed = $('.related-articles__item').length;

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