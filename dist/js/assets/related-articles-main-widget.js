(function( win, $, undefined ) {
	'use strict';
	// Related Articles
	var module = {};

	module.getArticles = function() {
		$.get('http://devedit.boston.com/eom/SysConfig/WebPortal/BDC/Framework/feeds/placester/getArticles.jsp?mode=full', function(data) {
			module.allArticles = data.articles; //['articles'] is better written in dot notation.
			console.log('All Articles', module.allArticles);
			module.buildWidget(module.allArticles);
		});
	};

	module.buildWidget = function(allArticles) {
		var articlesDisplayed = allArticles.slice(module.curIndex, (module.curIndex+6));
		// build each article's markup
		for (var i = 0; i < articlesDisplayed.length; i++) {

			var curItem = articlesDisplayed[i];
			var markup =[];
			var tagMarkup = [];
			var mediaMarkup = [];
			var mediaCount = curItem.multimedia.length;
			var media;
			var description = curItem.metadata.SEOInformation.summary || curItem.content || 'Sorry, no description available for this article';
			description = description.slice(0, 100) + ' ...';
			var articleLink = curItem.link;
			var title = curItem.title || curItem.metadata.SEOInformation.headline || 'Sorry, no title available for this article';
			var date = curItem.creationDate ? module.formatDate(curItem.creationDate) : 'no date available';

			// build each article's tags
			if(curItem.metadata.keywords.length > 1) {
				var t = 0;
				while (t < 3) {
					var tag = '<a href="javascript:;" class="category-tag maroon">' + curItem.metadata.keywords[t] + '</a>';
					tagMarkup.push(tag);
					t++;
				}
			}

			// find best image to use as thumbnail
			if(mediaCount < 1) {
				media = '<img class="thumb" style="height:120px;width:175px;border:1px solid black" src="" />';
				mediaMarkup.push(media);
			} else {
				for (var p = 0; p < mediaCount; p++) {
					if(!curItem.hasImage) {
						if(curItem.multimedia[p]['--class'] && curItem.multimedia[p]['--class'] == 'main-web-images') {
							media = '<img class="thumb" style="height:120px;width:175px" src="' + curItem.multimedia[p].url + '" />';
						} else {
							media = '<img class="thumb" style="height:120px;width:175px" src="' + curItem.multimedia[0].url + '" />';
						}
						curItem.hasImage = true;
						mediaMarkup.push(media);
					}
				}
			}

			var _tagMarkup = tagMarkup.join('');
			markup = [	'<div class="related-articles__item">',
							mediaMarkup,
							'<div class="main-info">',
								'<a href="' + articleLink + '">',
									'<h2 class="title">' + title + '</h2>',
								'</a>',
								'<p class="description">' + description + '</p>',
							'</div>',
							'<div class="additional-info">',
								'<div class="date">' + date + '</div>',
								'<div class="tags">',
									_tagMarkup,
								'</div>',
							'</div>',
						'</div>'
					].join('');

			module.$container.append(markup);
			module.$container.append(module.$viewMore);
		}
	};

	module.showMoreArticles = function() {
		if($('.related-articles__item').length < module.allArticles.length) {
			module.curIndex += 6;
			module.buildWidget(module.allArticles);
		} else {
			return;
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
		module.$viewMore.click(function() {
			module.showMoreArticles();
		});
	};

	module.init = function() {
		module.$container = $('.related-articles');
		module.$viewMore = $('.related-articles').find('.viewMore');
		module.$articlesDisplayed = $('.related-articles__item').length;
		module.curIndex = 0;

		module.getArticles();

		// module.buildWidget(0);
		module.eventHandlers();
	};

	// KICKOFF
	$(document).ready(function() {
		module.init();
	});

})(window, jQuery);