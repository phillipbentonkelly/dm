
$(function(){

	var $widget = $('.newsletter-widget__input-wrapper');
	var $button = $('.newsletter-widget__signup-button');
	var $input = $('.newsletter-widget__signup-input');

	$('.newsletter-widget__signup-button').bind('click', function(e){
		e.preventDefault();
		var base = "http://pages.exacttarget.com/bgcenter";
		var mId = '10790730';
		var pubListId = '19196655';
		var email = $('.newsletter-widget__signup-input').val();

		var paramObj = {
			'a' : 'sub',
			'm' : mId,
			'l' : pubListId,
			'e' : email,
			'o' : 'j'
		};

		var params = $.param(paramObj);

		//console.log(params);

		$.ajax({
			url: 'http://pages.exacttarget.com/bgcenter/',
			type: 'POST',
			data: params,
			dataType: 'jsonp',
			headers: {
				Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
			}
		}).then(function(data){
			if(data.success){
				var successMsg = '<p class="newsletter-widget__sucess-msg">Success! Thank you</p>';
				$input.remove();
				$widget.append(successMsg);
				
				$button.text('').style('background: #b48455');
			}else{
				console.log(params);
			}
		});

	});

});