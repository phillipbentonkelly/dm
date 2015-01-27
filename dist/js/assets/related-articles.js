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
		},

		{
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
			title: "Tom and Gisele's Brookline Pad Looks Almost Ready",
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
			image: 'images/related-articles/related-articles__thumbs__2.jpg',
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
			image: 'images/related-articles/related-articles__thumbs__1.jpg',
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
	],

	init: function() {
		article.$container = $('.related-articles-mobile');
		article.$moduleContainer = $('.related-articles');
		article.$viewMore = $('.related-articles').find('.viewMore');

		article.$pageback = $('.related-articles-mobile').find('.re-widget-left');
		article.$pageforawrd = $('.related-articles-mobile').find('.re-widget-right');
		article.listLength = this.allArticles.length;
		article.totalPages = Math.ceil(article.listLength / 2);
		article.curPage = 1;

		article.buildWidget(0);
		article.buildModule();

		article.eventHandlers();
		article.curIndex = 0;
		console.log('related-articles.js loaded');
	},

	// RIGHT COLUMN WIDGET
	buildWidget: function(indexStart) {
		// teardown old articles to build next page
		article.$container.find('.related-articles-mobile__item').remove();

		var articlesDisplayed = this.allArticles.slice(indexStart, (indexStart+2));

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

			article.$container.append(markup);
		}
	},

	// LEFT COLUMN MODULE
	buildModule: function() {
		for (var i = 0; i < this.allArticles.length; i++) {
			var curArticle = this.allArticles[i];
			var markup = [];
			var tagMarkup = [];

			// build each article's tags
			for (var j = 0; j < curArticle.tags.length; j++) {
				var tag = '<a href="javascript:;" class="category-tag ' + curArticle.tags[j]['tag-color'] + '">' + curArticle.tags[j]['tag-type'] + '</a>';
				tagMarkup.push(tag);
			}

			_tagMarkup = tagMarkup.join('');
			markup = [	'<div class="related-articles__item">',
								'<div class="additional-info">',
									'<img class="thumb" src="' + curArticle.image + '" />',
									'<div class="tags">',
									_tagMarkup,
									'</div>',
								'</div>',

								'<div class="main-info">',
									'<a href="javascript:;">',
										'<h2 class="title">' + curArticle.title + '</h2>',
									'</a>',
									'<p class="description">' + curArticle.description + '</p>',
								'</div>',

								'<div class="date">' + curArticle.date + '</div>',
						'</div>'
					].join('');

			article.$moduleContainer.append(markup);
		}
	},

	eventHandlers: function() {
		// show previous page of articles
		article.$pageback.click(function() {
			
			// if on first page
			if(article.curPage != 1) {
				article.curIndex -= 2;
				article.curPage --;
				article.buildWidget(article.curIndex);
			} else {
				return;
			}
		});

		// show next page of articles
		article.$pageforawrd.click(function() {
			
			// if on last page
			if(article.curPage < article.totalPages) {
				article.curIndex += 2;
				article.curPage ++;
				article.buildWidget(article.curIndex);
			} else {
				return;
			}
		});

		article.$viewMore.click(function() {
			article.showMore();
		});
	},

};




$(document).ready(function() {
	article.init();
});
