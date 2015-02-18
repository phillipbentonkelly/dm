
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
		var params = $( this ).serialize();

		$.ajax({
			url: 'newsletter-handler.php',
			type: 'post',
			data: params,
			dataType: 'json',
			success: function(data){
				newsletterSignup.$email.val('').attr('placeholder', 'Success! Thank you');
				newsletterSignup.$submit.addClass('success').attr('disabled', 'disabled');
			},
			error: function(data){
				// below
				newsletterSignup.$email.val('').attr('placeholder', 'Error. Please try again.');
				newsletterSignup.$submit.addClass('failure');
				setTimeout(function(){
					newsletterSignup.$submit.removeClass('failure');
				}, 500);
			}
		});

	});

});