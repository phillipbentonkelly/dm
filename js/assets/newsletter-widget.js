
$(function(){

	var button = $('.newsletter-widget__signup-button');

	$('.newsletter-widget__signup-button').bind('click', function(e){
		console.log('hello');
	});

	// $('button.newsletter-widget__signup-button').click(function(){
		// 	e.preventDefault();
			
		// 	var base = "http://pages.exacttarget.com/bgcenter/";

		// 	var mId = "10790730";
		// 	var pubListId = "19196655";
		// 	var email = $('.newsletter-widget__signup-input').val();
		// 	var params = "a=sub&mid=" + mId + "&email=" + email + "&l=" + pubListId;

		// 	var url = base + "?p" + Base64.encode(params);
			
		// 	$.getJSON(url, function(){

		// });
	// });

});