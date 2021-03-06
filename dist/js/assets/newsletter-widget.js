
$(document).ready(function(){

	var newsletterSignup = {
		$form : $('.newsletter-widget__signup-form'),
		$email: $('.newsletter-widget__signup-input'),
		$successMsg : $('.newsletter-widget__msg--success'),
		$failureMsg : $('.newsletter-widget__msg--failure'),
		$invalidEmail : $('.newsletter-widget__msg--invalid-email'),
		$submit : $('.newsletter-widget__signup-button')
	};

	$('.newsletter-widget__signup-form').on('submit', function(e){
		e.preventDefault();
		var email = newsletterSignup.$email.val();
		var dataToSend = {
			'a': 'sub',
			'm': '10790730',
			'l': '19196655',
			'e': email
		};
		var params = $.param(dataToSend);

		$.ajax({
			crossDomain: true,
			url: 'http://pages.exacttarget.com/bgcenterstage/',
			type: 'post',
			data: params,
			dataType: 'jsonp',
			headers: { 'Access-Control-Allow-Origin': '*' },
			complete: function(data){
				if(data.statusText){
					newsletterSignup.$email.val('').attr('placeholder', 'Success! Thank you');
					newsletterSignup.$submit.addClass('success').attr('disabled', 'disabled');
				}else{
					newsletterSignup.$email.val('').attr('placeholder', 'Error. Please try again.');
					newsletterSignup.$submit.addClass('failure');
					setTimeout(function(){
						newsletterSignup.$submit.removeClass('failure');
					}, 500);
				}
			}
		});
	});

});