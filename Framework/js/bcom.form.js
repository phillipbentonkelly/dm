if (typeof bcom === "undefined") { bcom = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  var $formValidationMsg = $('#form-validation-msg');
  var needsAttn = [];

  // selector, validator

  module.isValid = function ( $input, type ) {
    switch ( type ) {
      case 'required':
        return $input.val().trim() !== '';
      // break

      case 'email':
        return module.validateEmail( $input.val() );
      //break;

      // default
    }
    
    return false;
  };

  module.checkValidity = function ( $inputs, type ) {
    $.each( $inputs, function() {
      var $input = $(this);
      var $inputLabel = $input.siblings('label').text().replace(' *', '');
      var needsAttnPos = needsAttn.indexOf( $inputLabel );
      
      if ( !module.isValid( $input, type ) ) {
        // If this input is not already in the error array, add it (prevents duplicates)
        if ( needsAttnPos === -1 ) {
          needsAttn.push( $inputLabel );
        }

        $input.attr('aria-invalid', 'true');
      } else {
        // If this input was previously in need of attn, but is now valid, remove from error array
        if ( needsAttnPos !== -1 ) {
          needsAttn.splice( needsAttnPos, 1 );
        }

        $input.attr('aria-invalid', 'false');
      }
    });
  };

  module.validateForm = function ( $form ) {
    // Check all required inputs
    var $requiredInputs = $form.find('input[required="required"]');
    var $emailInputs = $form.find('input[type="email"]');
    var errorMsg = '<p>The following fields are required or invalid:</p><ul>';

    module.endPoint = $form.attr('action');
    module.thanksPage = $form.find('input[name="netform_success_message"]').val();
    module.xhrType = $form.attr('method').toUpperCase() || 'POST';

    module.checkValidity( $requiredInputs, 'required' );
    module.checkValidity( $emailInputs, 'email' );

    if ( needsAttn.length > 0 ) {
      console.log("FORM NOT VALID");

      $.each(needsAttn, function ( index, val ) {
         errorMsg += '<li>' + val + '</li>';
      });

      errorMsg += '</ul>';

      $formValidationMsg.addClass('error').html( errorMsg );

      return false;
    } else {
      return true;
    }
  };

  module.validateEmail = function( email ) {
    // Validate email vs regex
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  module.submitForm = function( $form ) {
    // If form validates, do ajax submission
    if ( module.validateForm( $form ) ) {
      var formInputObject = $form.serializeObject();

      console.log(formInputObject);

      $.ajax({
        data: formInputObject,
        dataType: 'json',
        url: module.endPoint,
        type: module.xhrType
      })
      .done(function ( data, textStatus, jqXHR ) {
        // console.log('success');
        // console.log(jqXHR);
        // window.location = module.thanksPage;
      })
      .fail(function ( data, textStatus, errorThrown ) {
        // console.log('Failed: ', errorThrown);
      })
      .always(function ( data_jqXHR, textStatus, jqXHR_errorThrown ) {
        // console.log('complete');
      });
    }
  };

  module.eventHandlers = function () {
    var typingTimer;
    var doneTypingInterval = 1000;

    function reCheckValidity ( event ) {
      var $input = $(event.target);
      var isRequired = ( $input.attr('required') || $input.attr('aria-required') );
      var type = $input.attr('type');
      var isEmail = ( type && type.toLowerCase() === 'email' );
      
      // clearTimeout(typingTimer);
      
      // typingTimer = setTimeout(function () {
        if ( isRequired ) {
          module.checkValidity( $input, 'required' );
        }

        if ( isEmail ) {
          module.checkValidity( $input, 'email' );
        }
      //}, doneTypingInterval);

      //console.log('hello');
    }

    // On loveletters form submit, call submit form function
    $('.js-form-ajax').on('submit', function ( event ) {
      event.preventDefault();
      console.log('submit called');
      module.submitForm( $(this) );
    });

    $(':input').on('blur', reCheckValidity);
  };

  module.init = function() {
    module.eventHandlers();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.js-form-ajax').length) {
      module.init();
    }
  });

})(window, jQuery);
(function($,a){$.fn.serializeObject=function(){var b={};$.each(this.serializeArray(),function(d,e){var f=e.name,c=e.value;b[f]=b[f]===a?c:$.isArray(b[f])?b[f].concat(c):[b[f],c]});return b}})(jQuery);
// var emailVal = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
// $(function validateForm() {
//    $(".textRequired").each(function(i, obj) {
//      if($(this).val() == "") {
//        $(this).addClass("noInput");
//      }
//    });
//    return false;
//  });