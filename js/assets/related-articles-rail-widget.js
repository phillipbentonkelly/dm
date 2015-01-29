//
// Related Articles right rail widget
//


(function( win, $, undefined ) {
	'use strict';
	// Related Articles
	var module = {};

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
			var mediaCount = curItem.multimedia.length;
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

			if(mediaCount < 1) {
				media = '<img class="thumb" style="height:100px;width:130px;border:1px solid black" src="" />';
				mediaMarkup.push(media);
			} else {
				for (var p = 0; p < 1; p++) {
					if(!curItem.hasImage) {
						if(curItem.multimedia[p]['--class'] && curItem.multimedia[p]['--class'] == 'main-web-images') {
							media = '<img class="thumb" style="height:100px;width:130px" src="' + curItem.multimedia[p].url + '" />';
						} else {
							media = '<img class="thumb" style="height:100px;width:130px" src="' + curItem.multimedia[0].url + '" />';
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