var validate = {};

validate.form = function() {
	var errors = 0;
	var inputs = this.$form.children();
	var emailRegex = new RegExp("@");

	// validate name field
	this.$name.val() === "" ? this.$name.css('border', '1px solid red') : this.$name.css('border', '1px solid #A0A0A0');

	// validate email field
	this.$email.val() === "" ? this.$email.css('border', '1px solid red') : this.$email.css('border', '1px solid #A0A0A0');
	// emailRegex.test(this.$email) ? this.$email.css('border', '1px solid #A0A0A0') : this.$email.css('border', '1px solid red');
	
	// check for errors
	for(var i = 0; i < inputs.length; i++) {
		if( $(inputs[i]).attr('style') === 'border: 1px solid red;')  {
			validate.$required.css('color', 'red');
			errors ++;
		}
	}

	errors ? validate.$required.css('color', 'red') : validate.$required.css('color', '#A0A0A0');
};

validate.eventHandlers = function() {
	validate.$submitButton.click(function(e) {
		validate.form();
	});
};


validate.init = function() {
	validate.$form = $('.contact__form');
	validate.$required = $('.contact__form-required');
	validate.$name = $('.contact__form-name');
	validate.$email = $('.contact__form-email');
	validate.$phoneNumber = $('.contact__form-number');
	validate.$message = $('.contact__form-message');
	validate.$submitButton = $('.contact__form-submit');
	validate.eventHandlers();
};

$(document).ready(function() {
	validate.init();
});