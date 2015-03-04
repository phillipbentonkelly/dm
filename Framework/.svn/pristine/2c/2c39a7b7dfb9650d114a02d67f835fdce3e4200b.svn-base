var validate = {};

validate.resetForm = function() {
	var inputs = [validate.$name, validate.$email, validate.$phoneNumber, validate.$message];
	validate.$form.show();
	validate.$successMessage.hide();
	validate.$errorMessage.hide();
	// reset all form inputs
	for(var i = 0; i < inputs.length; i ++) {
		inputs[i].val('');
	}
};

validate.success = function() {
	validate.$form.hide();
	validate.$successMessage.show();
};

validate.error = function() {
	validate.$form.hide();
	validate.$errorMessage.show();
};

validate.form = function() {
	var errors = 0;
	var inputs = this.$form.children();
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
// validate name field
	this.$name.val() === "" ? this.$name.css('border', '1px solid red') : this.$name.css('border', '1px solid #A0A0A0');

// validate email field
	// if nothing is provided
	if(this.$email.val() === "") {
		this.$email.css('border', '1px solid red');
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

	if(errors) {
		validate.$required.css('color', 'red');
	} else {
		validate.$required.css('color', '#A0A0A0');
		validate.success();
	}
};

validate.eventHandlers = function() {
	// prevent contact form submission to show validation error message
	validate.$submitButton.click(function(e){
		e.preventDefault();
		validate.form();
	});

	$('body').on('click', '.contact__form-dismiss', function() {
		validate.resetForm();
	});

	validate.$tempErrorTrigger.click(function() {
		validate.error();
	});

};

validate.init = function() {
	validate.$form = $('.contact__form');
	validate.$successMessage = $('.contact__form-success');
	validate.$errorMessage = $('.contact__form-error');
	validate.$required = $('.contact__form-required');
	validate.$name = $('.contact__form-name');
	validate.$email = $('.contact__form-email');
	validate.$phoneNumber = $('.contact__form-number');
	validate.$message = $('.contact__form-message');
	validate.$submitButton = $('.contact__form-submit');
	validate.$tempErrorTrigger = $('.temp-error-trigger');
	validate.eventHandlers();
};

$(document).ready(function() {
	validate.init();
});