
$(function(){

	var button = $('.newsletter-widget__signup-button');

	$('.newsletter-widget__signup-button').bind('click', function(e){
		e.preventDefault();
		var base = "http://pages.exacttarget.com/bgcenter/";
		var mId = "10790730";
		var pubListId = "19196655";
		var email = $('.newsletter-widget__signup-input').val();
		var params = "a=sub&m=" + mId + "&email=" + email + "&l=" + pubListId;
		var url = base + "?p" + params;

		$.getJSON(url, function(o){
			alert(o.success);
		});

	});

});