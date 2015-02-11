var validate = {};

validate.form = function() {
	var errors = 0;
	var inputs = this.$form.children();
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
// validate name field
	this.$name.val() === "" ? this.$name.css('border', '1px solid red') : this.$name.css('border', '1px solid #A0A0A0');

// validate email field
	// if nothing is provided
	if(this.$email.val() === "") {
		this.$email.css('border', '1px solid red')
	// if errors, update alert message
	} else if( !emailRegex.test(this.$email.val()) ) {
		errors ++;
		validate.$required.text('Please provide a valid email');
	// keep the original state
	} else {
		this.$email.css('border', '1px solid #A0A0A0');
		validate.$required.html('<span>* </span>Required');
	}
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
	// prevent contact form submission to show validation error message
	validate.$submitButton.click(function(e){
		e.preventDefault();
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