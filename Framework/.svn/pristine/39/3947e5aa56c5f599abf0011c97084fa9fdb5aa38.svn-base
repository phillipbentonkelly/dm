/*
 * User module for Boston.com 
 * by Jesse Marple and Eddie Kennedy
*/
var bcom_user = (function() {
	'use strict';

	var module = {};

	module.init = function(){
		this.checkUserStatus();
	};
	module.checkUserStatus = function() {
		var pathAuth = this.getCookieValue( 'pathAuth' );
		if ( pathAuth ) {
	    return $.ajax({
	        type: 'GET',
	        url: '/ugc/users/regiauthtoken/' + pathAuth,
	        async: false,
	        dataType: "json",
	    }).done(function( data ) {
		
			var profileTemplate = document.getElementById('nav-profile-mustache').innerHTML;
			var profileOutput = Mustache.render(profileTemplate,data);

			var navAvatarTemplate = document.getElementById('nav-avatar-mustache').innerHTML;
			var navAvatarOutput = Mustache.render(navAvatarTemplate,data);

			$('body').append(profileOutput);

			$('#trigger-avatar-profile').html(navAvatarOutput);
			//$('img.nav-avatar.nav-avatar-ear').attr('src',data.imageUrl);
			//$('.nav-username').text(data.name);

	    }).fail(function( jqXHR, textStatus, errorThrown ) {

	    });
		}
	};

	module.getCookieValue = function( theCookie ) {
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
	};

	return module;
}());



