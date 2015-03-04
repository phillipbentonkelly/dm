// * streamer.js
// - Append 'modal' window to hold iframe
// - Parse page data
// - Load iframe, passing page data
// * Following error currently thrown from Facebook:
// * Refused to load the script 'https://r.devedit.boston.com/streamer/streamer.js' because it violates the following Content Security Policy directive: "script-src https://*.facebook.com http://*.facebook.com https://*.fbcdn.net http://*.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* chrome-extension://lifbcibllhkdhoafpjfnlhfpfgnpldfl 'unsafe-inline' 'unsafe-eval' https://*.akamaihd.net http://*.akamaihd.net *.atlassolutions.com https://*.internet.org http://*.internet.org".
(function() {
  var loc = window.location;
  var host = loc.host;
  
	var streamer = {
		init: function() {
      this.baseUrl = jQuery('#streamerJS').attr('src').replace('streamer.js', '');
 			var parseMethod 					= this.determineParseMethod( host );
			var parseData 						= this.parseData( parseMethod );
			var parseDataQueryString	= this.buildQueryString( parseData );
			var popup 								= this.popup( parseDataQueryString );
			jQuery('body').append( popup );
			this.eventHandlers();			
		},

		determineParseMethod: function( host ) {
			if ( host.indexOf('twitter.com') >= 0 ) { return 'twitter'; }
			if ( host.indexOf('instagram.com') >= 0 ) { return 'instagram'; }
			return 'default';
		},

		parseData: function( parseMethod ) {
			// This needs to be cleaned up and expanded ***
			// Instagram caption - window._jscalls[2][2][0].props.media.caption
			var parseObject = {};
			parseObject.is_external = host.indexOf('boston.com') === -1 ? true : false;
			if ( parseMethod === 'default' || parseMethod === 'instagram' ) {
				var tempObject = {}
				jQuery('meta').each( function() {
					var property = jQuery(this).attr('property');
					if ( property && property.indexOf('og:') === 0 ) {
						var property = jQuery(this).attr('property');
						var value = jQuery(this).attr('content');
						tempObject[property] = value;
					}
				});
				parseObject.title = tempObject['og:title'];
				parseObject.description = tempObject['og:description'];
				parseObject.image = tempObject['og:image'];
				parseObject.url = loc.protocol + '//' + loc.host + loc.pathname;
				if ( parseMethod === 'instagram' ) {
					parseObject.title = tempObject['og:description'];
					//parseObject.description = encodeURIComponent( window._jscalls[2][2][0].props.media.caption );
					parseObject.description = window._jscalls[2][2][0].props.media.caption;
				}
			}
			if ( parseMethod === 'twitter' ) {
				var parseObject = {};
				parseObject.is_external = true;
				parseObject.is_tweet = true;
				parseObject.url = loc.href;
				parseObject.name = jQuery('.tweet.original-tweet').eq(0).attr('data-name');
				parseObject.handle = jQuery('.tweet.original-tweet').eq(0).attr('data-screen-name');
				//parseObject.text = encodeURIComponent( jQuery('.tweet-text').eq(0).text() );
				parseObject.text = jQuery('.tweet-text').eq(0).text();
				parseObject.avatar = jQuery('.avatar.js-action-profile-avatar').attr('src');
			}
			console.log("PARSE OBJECT >>>", parseObject);
			return parseObject;
		},

		buildQueryString: function( parseObject ) {
			var queryString = '?';
			parseObject = parseObject || false;
			if ( parseObject ) {
				for ( var key in parseObject ) {
					queryString += key + '=' + encodeURIComponent ( parseObject[key] ) + '&';
				}
				return queryString.slice( 0, queryString.length- 1 );
			} else {
				return false;
			}
		},

		popup: function( parseDataQueryString ) {
			var popup = [
				'<div id="bcom-streamer-popup-wrapper">',
					'<div id="bcom-streamer-popup">',
						//'<div><a href="#" class="bcom-streamer-close">&times;</div>',
						'<iframe src="' + this.baseUrl + 'iframe/streamer-iframe.html'+ parseDataQueryString +'" width="100%" height="650" seamless="seamless" />',
					'</div>',
				'</div>'
			].join('');
			return popup;
		},

		eventHandlers: function() {
			window.addEventListener("message", function(event) {
				if ( event.data === 'close-streamer' ) {
					jQuery('#bcom-streamer-popup-wrapper').remove();
				}
			}, false);
		}
	};

	// Kickoff, we load jQuery first, if need be
	if ( !($ = window.jQuery) ) {
		var script = document.createElement('script');
		script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
		script.onload = streamer.init();
		document.body.appendChild( script );
	} else {
		streamer.init();
	}

})();