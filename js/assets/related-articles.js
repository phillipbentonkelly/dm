
if (typeof dm === 'undefined') { dm = {}; }

/* environmental variables */
dm.env = {
	device : (screen.width <= 480) ? 'mobile' : 'desktop',
	local : document.URL.indexOf('localhost') != -1 ? true : false
};

dm.RelatedArticles = {};

dm.Article = {}; 

(function($, window, document, undefined){

	dm.RelatedArticles = function(el, s){

		this.$el = $(el);

		this.rail = (s.place === 'rail') ? true : false;

		this.articles = {};
		this.articlesToDisplay = this.rail ? 2 : 6;
		this.search = false;
		

		this.module = {
			$container: $('.related-articles'),
			$railContainer: $('.related-articles-mobile__items'),
			$hook: $('.related-articles__hook'),
			$keywords: $('meta[name="keywords"]').attr("content"),
			$displayed: $('.related-articles__item').length,
			$pgFwd: $('.related-articles-mobile').find('.re-widget-right'),
			$pgBack: $('.related-articles-mobile').find('.re-widget-left'),
			$viewMore: $('.related-articles').find('.viewMore')
		};

		this.currIndex = 1; this.currPg = 0; this.totalPgs = 0;
		
		this.tags =	{	'Arlington': { color: '#ce6323', link: '/locations/arlington/2.0.1944328483', tagtype: 'Location'},
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

		this.init();

	};

	dm.RelatedArticles.prototype = {

		init: function(){
			var self = this;
			var query = $.getParamVal('q');
			// tell us if there's a search
			this.search = (query === null || query === '') ? false : true;

			var callUrl = '';
			var params = {};

			$.ajaxSetup({ type: 'get' });

			if(this.search){
				// call google
				callUrl = 'https://www.googleapis.com/customsearch/v1';

				params = {
					cx: '001595115685171809073:-cf7lydwdko',
					key: 'AIzaSyBzi21Tf-qWHnKjnXyOjRvIiNgtiwbUGX8',
					q: decodeURIComponent(query),
					alt: 'json'
				};

				$.ajax({
					url: callUrl,
					data: params,
					complete: function(data){
						self.articles = data.items;
						self.buildWidget(self.articles, 0);
						self.totalPgs = Math.ceil(self.articles.length / self.articlesToDisplay);
					}
				});

			}else{

				callUrl = 'http://devedit.boston.com/eom/SysConfig/WebPortal/BDC/Framework/feeds/placester/getArticles.jsp'
				params = { mode: 'full' };

				$.ajax({
					url: callUrl,
					data: params,
					complete: function(data){
						self.articles = data.responseJSON.articles;
						self.buildWidget(self.articles, 0);
						self.totalPgs = Math.ceil(self.articles.length / self.articlesToDisplay);							
					}
				});

			}

			this.eventHandlers();

		},


		buildWidget: function(articles, start){

			var self = this;

			// teardown old articles to build next page
			if(self.rail){
				self.module.$railContainer.find('.related-articles-mobile__item').remove();
			}


			var articlesToRender = articles.slice( start, (start + self.articlesToDisplay) );

			$.each(articlesToRender, function(i, item){

				var title, desc, date, keywords, media;
				var link = item.link;
				// var mediaCount = item.images ? item.images.length : 0;
				var mediaMarkup, kwTagMarkup, markup = [];

				var noTitleMsg = 'Sorry, no title available for this article';
				var noDescMsg = 'Sorry, no description available for this article'; 

				if(this.search){
					title = (item.htmlTitle || item.title) || noTitleMsg;
					desc = (item.htmlSnippet || item.snippet) || noDescMsg;
					keywords = item.pagemap.metatags.news_keywords;
				}else{
					title = item.title || (item.SEOInformation ? item.SEOInformation.headline : noTitleMsg);
					desc = item.description || (item.SEOInformation ? item.SEOInformation.summary : noDescMsg);
					date = item.creationDate ? self.formatDate(item.creationDate) : 'no date available';
					keywords = item.keywords;
					//var mediaCount = item.images ? item.images.length : 0;
					mediaMarkup = self.getMediaMarkup(item.images);
					
				}

				if(keywords){
					kwTagMarkup = self.getKeywordTagMarkup(keywords);
					kwTagMarkup = kwTagMarkup.join(' ');
				}

				if(self.rail){

					markup = [	'<div class="related-articles-mobile__item">',
								'<div class="additional-info">',
									mediaMarkup,
									'<div class="tags">',
									kwTagMarkup,
									'</div>',
								'</div>',

								'<div class="main-info">',
									'<a href="' + link + '">',
										'<h2 class="title">' + title + '</h2>',
									'</a>',
									'<p class="description">' + desc + '</p>',
								'</div>',
								'<div class="date">' + date + '</div>',
						'</div>'
					].join('');

					self.module.$railContainer.append(markup);

				}else{

					markup = [	'<div class="related-articles__item">',
							mediaMarkup,
							'<div class="main-info">',
								'<a href="' + link + '">',
									'<h2 class="title">' + title + '</h2>',
								'</a>',
								'<p class="description">' + desc + '</p>',
							'</div>',
							'<div class="additional-info">',
								'<div class="date">' + date + '</div>',
								'<div class="tags">',
									kwTagMarkup,
								'</div>',
							'</div>',
						'</div>'
					].join('');


					if(i < 4){
						self.module.$hook.append(markup);
					}else{
						self.module.$container.append(markup);
					}
					self.module.$container.append(self.module.$viewMore);
				}	

			});

			
		},

		formatDate: function(timestamp) {
			var year = timestamp.slice(0,4);
			var month = timestamp.slice(4,6);
			var day = timestamp.slice(6,8);
			var date = moment(timestamp,'YYYYMMDDHHmmss');
			var formattedDate = date.format('MMMM Do YYYY');
			return formattedDate;
		},

		getKeywordTagMarkup: function(keywords){
			var kwTagMarkup = [];
			for (var k=0; k >= 4; k++) {
				if (typeof self.tags[keywords[k]] !== "undefined") {
					var curTag = self.tags[keywords[k]];
					var tag = '<a href="' + curTag.link + '" style="background:' + curTag.color + '" class="category-tag">' + keywords[k] + '</a>';
					kwTagMarkup.push(tag);
					k++;
				}
			}
			return kwTagMarkup;	
		},

		eventHandlers: function(){

			var self = this;

			self.module.$pgFwd.on('click', function(e){
				
				if(self.currPg < self.totalPgs){
					self.currIndex += self.articlesToDisplay;
					self.currPg++;
					self.buildWidget(self.articles, self.currIndex);
				}else{
					return;
				}
			});

			self.module.$pgBack.on('click', function(){
				// if on first page
				if(self.currPage != 1) {
					self.currIndex -= self.articlesToDisplay;
					self.currPage --;
					self.buildWidget(self.articles, self.currIndex);
				} else {
					return;
				}
			});

			if(!self.rail){
				self.module.$viewMore.on('click', function() {
					self.showMoreArticles();
				});
			}

			

		},

		showMoreArticles: function() {
			var self = this;
			if($('.related-articles__item').length < self.articles.length) {
				self.currIndex += self.articlesToDisplay;
				self.buildWidget(self.articles, self.currIndex);
			} else {
				return;
			}
		},

		getMediaMarkup: function(imgs){
			var mediaMarkup = [];
			var imgCss, imgSrc;
			var hasImg = false;
			if(imgs != undefined){
				imgCss = 'height:120px;width:175px';
				$.each(imgs, function(i, img){
					if(this['--class'] == 'main-web-images'){
						imgSrc = 'http://' + this.url;
						hasImg = true;
						return false;
					}
				});
				if(!hasImg){
					imgSrc = imgs[0].url;
				}

			}else{
				imgCss = 'height:120px;width:175px;border:1px solid black';
				imgSrc = '';
			}

			mediaMarkup = '<img class="thumb" src="' + imgSrc + '" style="' + imgCss + '" />'; 

			return mediaMarkup;
		}

	};

	$.fn.RelatedArticles = function(args){
		return this.each(function(){
			new dm.RelatedArticles(this, args);
		});
	};

})(jQuery);

$(document).ready(function(){
	var isSerp = document.URL.indexOf('serp') != -1 ? true : false;
	var placement = (isSerp && dm.env.device === 'desktop') ? 'rail' : 'main';
	$('.related-articles, .related-articles-mobile__items').RelatedArticles({
		place: placement
	});
});