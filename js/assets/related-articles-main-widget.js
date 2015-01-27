
// Related Articles
var article = {

	allArticles: [
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
		}
	],


	init: function() {
		article.$container = $('.related-articles');

		article.$viewMore = $('.related-articles').find('.viewMore');
		article.listLength = this.allArticles.length;
		article.totalPages = Math.ceil(article.listLength / 6);
		
		article.buildWidget(0);
		article.eventHandlers();
		article.curIndex = 0;
	},

	buildWidget: function(indexStart) {
		// teardown old articles to build next page
		article.$container.find('.related-articles__item').remove();

		var articlesDisplayed = this.allArticles.slice(indexStart, (indexStart+6));

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

			_tagMarkup = tagMarkup.join('');
			markup = [	'<div class="related-articles__item">',

							'<img class="thumb" src="' + curItem.image + '" />',
							'<a href="javascript:;">',
								'<h2 class="title">' + curItem.title + '</h2>',
							'</a>',

							'<p class="description">' + curItem.description + '</p>',
							
							'<div class="additonal-info">',
								'<div class="date">' + curItem.date + '</div>',
								'<div class="tags">',
									_tagMarkup,
								'</div>',
							'</div>',

						'</div>'
					].join('');

			article.$container.append(markup);
		}
	},

	eventHandlers: function() {
		article.$viewMore.click(function() {
			alert('so you wanna see more eh?');
		})
	}

};




$(document).ready(function() {
	article.init();
});