// // * streamer-iframe.js
// // Checks pathAuth cookie for login status
// // Parses query string values
// // Builds form based on values
// // Appends for to page
// // Handles submission of form
(function( win, $ ) {

	var streamer = {
		user: false,
		submissionType: '',
    streams: [],

		init: function() {
			var $content;
			this.checkUserStatus();
			if ( this.user) {
        this.populateStreams();
				this.pubnubSetup();
				var dataObject = this.buildQueryStringObject();
				console.log("DATA OBJECT", dataObject);
				if ( dataObject.is_tweet === 'true' ) {
					this.submissionType = 'tweet';
					$content = this.templates.tweet( dataObject );
				} else {
					this.submissionType = 'tease';
					$content = this.templates.tease( dataObject );
				}
			} else {
				$content = this.templates.loginPrompt();
			}
			$('main').html( $content );
			this.eventHandlers();
		},

		pubnubSetup: function() {
			this.pubnub = PUBNUB.init({
				publish_key		: "pub-c-127a2b10-aa80-4a62-ac2e-30a1fce6f220",
				subscribe_key	: "sub-c-4a78c224-164c-11e3-9f04-02ee2ddab7fe"
			});
		},

		checkUserStatus: function() {
			var pathAuth = this.getCookieValue( 'pathAuth' );
			if ( pathAuth ) {
		    return $.ajax({
		        type: 'GET',
		        url: '/ugc/users/regiauthtoken/' + pathAuth,
		        async: false,
		        dataType: "json",
		    }).done(function( data ) {
		    		streamer.user = data;
		    }).fail(function( jqXHR, textStatus, errorThrown ) {
		    });
			}
		},
    populateStreams: function() {
	    return $.ajax({
	        type: 'GET',
	        url: '/mis/import/post2bdc/streams',
	        async: false,
	        dataType: 'xml'
	    }).done(function( data ) {
        $.each($(data).find('Item'), function(){
          var $item = $(this);
          streamer.streams.push({id: $item.attr('id'), name: $item.text()});
        });
      }).fail(function( jqXHR, textStatus, errorThrown ) {
        console.log('populateStreams fail', jqXHR, textStatus, errorThrown);
	    });
    },
    streamOptions: function(){
      return $.map(streamer.streams, function(stream){
        return '<option value="'+stream.id+'">'+stream.name+'</option>';
      }).join('');
    },
		submitData: function( $form ) {
			var dataObject = $form.serializeObject();
			var channel = dataObject.target;
			var method = "create";
			var model;
			console.log("THE DATA OBJECT FOR SUBMISSION", dataObject);
			if ( this.submissionType === 'tweet' ) {
				model = {
          "is_social": true,
					"is_tweet": dataObject.is_tweet,
          "id": dataObject.url,
					"url": dataObject.url,
					"tweet": {
						"name": dataObject.name,
						"handle": dataObject.handle,
						"text": dataObject.text.parseLinks().parseUsers().parseHash(),
						"avatar": dataObject.avatar
					},
					"category": dataObject.category,
	        "is_pinned": dataObject.is_pinned,
	        "is_external": dataObject.is_external
				};
			} else {
				model = {
          "id": dataObject.url,
					"head": dataObject.title,
					"url": dataObject.url,
					"body": dataObject.description,
					"category": dataObject.category,
					"has_image": true,
					"image": {
						"thumb_quick": dataObject.image,
					},
	        "is_pinned": dataObject.is_pinned,
	        "is_external": dataObject.is_external
				}; 
			}
			console.log("MODEL ON BOOKMARKLET SIDE", model);
			var uuid = "7c2483eb-9393-4be9-ac59-6f73a111f79e";
			var message = {
				method : method,
				model : model,
				options: {merge: true},
				uuid : uuid
			};
      console.log("channel", channel);
      console.log("message", message);
      $.ajax('/mis/import/bgstorypost', {
        type: 'POST',
        data: JSON.stringify({
    			channel: channel,
    			message: message}),
        contentType: 'application/json',
        dataType: 'json'
      });
			this.pubnub.publish({
				channel: channel,
				message: message,
				callback : function(details) {
					var success  = details[0];
					var response = details[1];
					var $message;
					if (success) { 
						console.log( "Success!", response );
						$message = streamer.templates.successMessage();
					}
					if (!success) { 
						console.log( "Fail!", response );
						$message = streamer.templates.errorMessage();
					}
					jQuery('#streamer-form').html($message);
				}
			});
		},

		getCookieValue: function( theCookie ) {
		  var cookieArray = document.cookie.split( ';' );
		  for ( var i = 0; i < cookieArray.length; i++ ) {
		    var thisCookie  = cookieArray[i].split( '=' );
		    var cookieName  = $.trim( thisCookie[0] );
		    var cookieValue = $.trim( thisCookie[1] );
		    if ( cookieName === theCookie ) {
		      return unescape( cookieValue );
		    }
		  }
		  return false;
		},

		buildQueryStringObject: function() {
			var queryStringObject = {};
	    var queryStringArray = window.location.search.substr( 1 ).split( '&' );
	    for ( var i = 0; i < queryStringArray.length; i++ ) {
	      var keyValueArray = queryStringArray[i].split( '=' );
	      queryStringObject[ keyValueArray[0] ] = decodeURIComponent( keyValueArray[1] );
	    }
	    return queryStringObject;
		},

		eventHandlers: function() {
			if ( $('#streamer-form').length ) {
				var self = this;
				$(document).on('submit', '#streamer-form', function(event) {
					event.preventDefault();
					self.submitData( $(this) );
				});
				jQuery(document).on('click', '.streamer-close', function(event) {
					event.preventDefault();
					console.log("WINDOW PARENT", window.parent);
					window.parent.postMessage("close-streamer", "*"); // Remove the splat, is dangerous
				});
			}
		},
		templates: {
			tease: function( dataObject ) {
				var tease = [
					'<header>',
						'<div class="user-info">',
							'<span class="greeting">Hello, <a href="' + streamer.user.profileUrl + '">' + streamer.user.name + '</a>.</span>',
							'<a href="' + streamer.user.profileUrl + '">',
								'<img src="' + streamer.user.imageUrl + '" alt="' + + streamer.user.name + '" class="user-avatar"/>',
							'</a>',
						'</div>',
					'</header>',
					'<form id="streamer-form">',
						'<div class="streamer-form-section col">',
							'<label>Select stream:</label>',
							'<select name="target" id="target-stream">',
                streamer.streamOptions(),
							'</select>',
						'</div>',
            // '<div class="streamer-form-section col">',
            //   '<label>Select category:</label>',
            //   '<select name="category" id="category">',
            //     '<option value="A&amp;E">A&amp;E</option>',
            //     '<option value="Food">Food</option>',
            //     '<option value="Lifestyle">Lifestyle</option>',
            //     '<option value="Local">Local</option>',
            //     '<option value="Politics">Politics</option>',
            //     '<option value="Local">Sports</option>',
            //   '</select>',
            // '</div>',
						'<div class="streamer-form-section inline">',
							'<label>Pin?</label>',
							'<input type="checkbox" name="is_pinned" id="is_pinned"/>',
						'</div>',
						'<div class="streamer-form-section">',
							'<label>Title</label>',
							'<input type="text" name="title" value="' + dataObject.title + '" />',
						'</div>',
						'<div class="streamer-form-section">',
							'<label>Description</label>',
							'<textarea name="description">' + dataObject.description + '</textarea>',
						'</div>',
						'<div class="streamer-form-section">',
							'<label>URL</label>',
							'<input type="text" name="url" value="' + dataObject.url + '" />',
						'</div>',
						'<div class="streamer-form-section">',
							'<label>Image</label>',
							'<input type="hidden" name="image" value="' + dataObject.image + '" />',
							'<div class="image-holder">',
								'<img src="' + dataObject.image + '" alt="' + dataObject.title + '" />',
							'</div>',
						'</div>',
						'<input type="hidden" name="is_external" value="true" />',
						'<div class="streamer-submit-section">',
							'<input type="submit" value="Submit" />',
							'<a href="#" class="streamer-close">Cancel</a>',
						'</div>',
					'</form>'
				].join('');
				return $(tease);
			},
			tweet: function( dataObject ) {
				var tweet = [
					'<header>',
						'<div class="user-info">',
							'<span class="greeting">Hello, <a href="' + streamer.user.profileUrl + '">' + streamer.user.name + '</a>.</span>',
							'<a href="' + streamer.user.profileUrl + '">',
								'<img src="' + streamer.user.imageUrl + '" alt="' + + streamer.user.name + '" class="user-avatar"/>',
							'</a>',
						'</div>',
					'</header>',
					'<form id="streamer-form">',
						'<div class="streamer-form-section col">',
							'<label>Select stream:</label>',
							'<select name="target" id="target-stream">',
								'<option value="main">Main</option>',
								'<option value="featured">Featured</option>',
							'</select>',
						'</div>',
						'<div class="streamer-form-section col">',
							'<label>Select category:</label>',
							'<select name="category" id="category">',
								'<option value="A&amp;E">A&amp;E</option>',
								'<option value="Food">Food</option>',
								'<option value="Lifestyle">Lifestyle</option>',
								'<option value="Local">Local</option>',
								'<option value="Politics">Politics</option>',
								'<option value="Local">Sports</option>',
							'</select>',
						'</div>',
						'<div class="streamer-form-section inline">',
							'<label>Pin?</label>',
							'<input type="checkbox" name="is_pinned" id="is_pinned"/>',
						'</div>',
						'<div class="streamer-form-section">',
							'<label>Name</label>',
							'<input type="text" name="name" value="' + dataObject.name + '" />',
						'</div>',
						'<div class="streamer-form-section">',
							'<label>Handle</label>',
							'<input type="text" name="handle" value="' + dataObject.handle + '" />',
						'</div>',
						'<div class="streamer-form-section">',
							'<label>Tweet</label>',
							'<textarea name="text">' + dataObject.text + '</textarea>',
						'</div>',
						// '<div class="streamer-form-section">',
						// 	'<label>URL</label>',
						// 	'<input type="text" name="url" value="' + dataObject.url + '" />',
						// '</div>',
						'<div class="streamer-form-section">',
							'<label>Avatar</label>',
							'<input type="hidden" name="avatar" value="' + dataObject.avatar + '" />',
							'<div class="image-holder">',
								'<img src="' + dataObject.avatar + '" alt="' + dataObject.name + '" />',
							'</div>',
						'</div>',
						'<input type="hidden" name="is_tweet" value="true" />',
						'<input type="hidden" name="is_external" value="true" />',
						'<div class="streamer-submit-section">',
							'<input type="submit" value="Submit" />',
							'<a href="#" class="streamer-close">Cancel</a>',
						'</div>',
					'</form>'
				].join('');
				return $(tweet);
			},
			successMessage: function() {
				var message = [
					'<div class="streamer-message">',
						'<p>This story was successfully submitted.</p>',
						'<p><a href="#" class="streamer-close">Done</a></p>',
					'</div>'
				].join('');
				return $(message);
			},
			errorMessage: function() {
				var message = [
					'<div class="streamer-message">',
						'<p>There was a problem with your submission.</p>',
						'<p><a href="#" class="streamer-close">Done</a></p>',
					'</div>'
				].join('');
				return $(message);
			},
			loginPrompt: function() {
				var prompt = [
					'<div class="login-prompt">Please login to <a href="#">Boston.com</a> to use the bookmarklet.</div>'
				].join('');
				return $(prompt);
			}
		}

	};

	streamer.init();

})( window, jQuery, undefined );
// String functions via:
// http://www.simonwhatley.co.uk/parsing-twitter-usernames-hashtags-and-urls-with-javascript
String.prototype.parseLinks = function() {
  return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function( url ) {
    return url.link( url );
  });
};
String.prototype.parseUsers = function() {
  return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
    var username = u.replace("@","");
    return u.link("http://twitter.com/"+username);
  });
};
String.prototype.parseHash = function() {
  return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
    var tag = t.replace("#","%23");
    return t.link("http://search.twitter.com/search?q="+tag);
  });
};
/*
 * jQuery serializeObject - v0.2 - 1/20/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,a){$.fn.serializeObject=function(){var b={};$.each(this.serializeArray(),function(d,e){var f=e.name,c=e.value;b[f]=b[f]===a?c:$.isArray(b[f])?b[f].concat(c):[b[f],c]});return b}})(jQuery);