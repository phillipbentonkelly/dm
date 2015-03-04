var bcom_share = {
    
    //set some default values for the user and their logged in state. We will be overriding these values if true with refreshLoginStatus
	user: { facebook: false, twitter: false, pinterest: false, googleplus: false, linkedin: false },
    
    //gigya specific login/user functions

    refreshLoginStatus: function() {
        var providers = ['twitter', 'facebook', 'pinterest', 'googleplus', 'linkedin'];
        $(providers).each(function(i){
            gigya.socialize.getUserInfo({
                callback : function (res) {
                    if (!res.errorCode && res.user && res.user.loginProvider && res.user.loginProvider == providers[i]) {
                        user[providers[i]] = res.user;
                    }
                },
                enabledProviders : providers[i]
            });
        });
    },

    socialLoggedInStatus: function(provider){
        //based on which share provider the user picks (email, facebook, twitter, etc)
        var loggedInStatus = false;
        if (provider != 'email') {
            // Log in user if needed
            if (!this.user[provider]) {
                gigya.socialize.getUserInfo({callback:function(res){ //TODO: multiply connection to gigya implement
                 //   if(res.user.loginProvider)
                    //console.log(provider);
                    //console.log(res);
                    }
                });
                gigya.socialize.login({
                    provider: provider,
                    callback: this.socialLoginCallback
                });
            } else {
                loggedInStatus = true;
            }
        } else {
            loggedInStatus = true;
        }
        return loggedInStatus;
    },

    socialLoginCallback: function (res) {
      if (res.errorCode) {
        console.log('login error', res);
      } else {
        this.refreshLoginStatus();
      }
    },

    socialSumbitCallback: function(res){
      if (res.errorCode) {
        console.log('login error', res);
      } else {
        console.log('successfully shared');
      }
    },
    socialSubmit: function(formData){
		params = {};

		if (!formData.headline) {
		  formData.headline = document.title;
		}
		if (!formData.subtitle) {
		  formData.subtitle = 'Shared from Boston.com';
		}

		// Validation
		var errors = [];
		if (!formData.share_message) {
		  errors.push('Text is missing!');
		}
		if (!formData.provider){
		  errors.push('Please choose where to post!');
		}
		if (errors.length) {
		  //var $msg = $(this).find('.message-area');
		  console.log(errors.join('<br />'));
		  //$msg.addMessage('message error', errors.join('<br />'), 3000);
		} else {
		  var action = new gigya.socialize.UserAction();
		  // Default sharing text
		  action.setTitle(formData.headline);
		  action.setSubtitle(formData.subtitle);
		  action.setLinkBack(formData.canonical);
		  action.addActionLink("BDC Share", formData.shorturl);
		  if(formData.thumb_type === 'image'){
		    var image = {
		//we should really set a default image to use in the instance that we don't have an image set for an article
		            type: 'image',
		            src: formData.thumbnail,
		            href: formData.shorturl
		    }
		    action.addMediaItem(image);
		  }
		  if(formData.thumb_type === 'video'){
		    var video = {
		              src: formData.shorturl, //URL to VIDEO
		              previewImageURL: formData.thumbnail, //URL as string
		              type: 'flash'
		          }
		    action.addMediaItem(video);
		  }              
		  
		  action.setUserMessage(formData.share_message);

		  params.providers = formData.provider;
		  params.enabledProviders = formData.provider;
		  params.userAction = action;
		  params.callback = this.socialSumbitCallback;
		  params.status = share_message;
		  //params.context = { form_id : $(this).attr('id') };
		  //$(this).loadingStatus(true, 'Sending...');
		  gigya.socialize.publishUserAction(params);
		}	
    },

	emailSubmit : function(formData) {

		//get context for use later in our ajax request
		var that = this;
	// validate the form, mark errors, and submit the email request via ajax
		console.log(formData);
		// validate the email fields (marking error classes as necessary)
		var senderValid = this.checkEmailField(formData.your_email, false); 
		var recipientValid = this.checkEmailField(formData.recipient_emails, true); 

		// stop form submit if there were errors
		if (senderValid === false || recipientValid === false) {
			return false;
		}

		// prepare form data for email service
		var dataString = 'sender_name='+ formData.your_name 
			+ '&sender_email=' + formData.your_email
			+ '&recipient_email=' + formData.recipient_emails 
			+ '&message=' + formData.share_message
			+ '&story_url=' + encodeURIComponent(formData.shorturl);

		// send ajax request to email service
		console.log("Attempting to send email-to-a-friend request to /etaf/ backend service");
		//TODO - updating this to use .done,.fail,.always instead thus removing two functions below
		$.ajax({
			type: "POST",
			url: "/etaf/",
			data: dataString,
			success: that.emailError,
			error: that.emailSuccess
		}); 

		// don't reload the page
		return false;
	},
	emailError: function(jqXHR, textStatus, errorThrown) {
		// want to do on the first error / failure
		console.log('Error submitting email-to-a-friend request.');
		// try one more time in the background
		this.emailSubmit(formData, function() {
			console.log('Success submitting email-to-a-friend request on second try.');
		}, function() {
			console.log('Error submitting email-to-a-friend request on second try - done trying.');
		});
	},

	emailSuccess: function(){
		// what to do after successful email
		console.log('Success submitting email-to-a-friend request.');
	},

	checkEmailField : function(emailField, allowMultipleAddresses) {
		var that = this;
	// return true if email field is valid
	// returns false and adds in-error class if invalid

		var fieldValid = true

		// check multiple addresses in one field, if allowed
		if (allowMultipleAddresses) {

			// split addresses out
			var emailAddresses = emailField.split(/ *, */); 
			$.each(emailAddresses, function(k, emailAddress) {

				// check if each address is invalid
				if (that.isValidEmailAddress(emailAddress) == false) {
					fieldValid = false;

				} 
			});

		// check the one address
		} else if (that.isValidEmailAddress(emailField) == false) {
			fieldValid = false;
		}

	  	// mark the field as in-error or not
	  	console.log('one of the email addresses is invalid');
	  	//TODO: visual cues for valid or not email address
	  	// if (fieldValid) {
	  	//	emailField.addClass('noerr');
	  	//	emailField.removeClass('error');
	  	// } else { 
	  	//	emailField.addClass('error');
	  	//	emailField.removeClass('noerr');
	//	}

		return fieldValid;
	},

	isValidEmailAddress : function(emailAddress) {
	// returns true if the given email is a valid address (by regex)
		var emailRegexStr = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegexStr.test(emailAddress);
	},

	resetRecipientEmailField : function(recipientEmailField) {
	// clears the given email field if the value is still the original default value
		if (recipientEmailField.attr('defaultValue') === recipientEmailField.val() ) {  
			recipientEmailField.val('') ; 
		}
	},

    // show, setup, hide shareBox functions

    showShareCommentBox: function(e){
		e.preventDefault();

        var provider = e.currentTarget.dataset.provider;

		if(!this.socialLoggedInStatus(provider)){
			return false;
		} else {
		

			$('#mfp-share input[name="provider"]').val(provider);
			this.checkShareCommentLength();
			if(provider === 'email'){
				$('#mfp-share .email-share').show();
			}
			$('#mfp-share .share-message').slideDown(500);
			$('#mfp-share .share-icon-list').slideUp(500);

		}
    },

    hideShareCommentBox: function(e){
		e.preventDefault();
        $('.share-message').slideUp(500);
        $('.share-icon-list').slideDown(500);
		$('#mfp-share .email-share').hide();
        $('#mfp-share .char-count').removeClass('length-warning');
    },

    setupShareBox: function(data){
		// - the box should be cleared of former values and reset prior to opening ~ that might have a better home with shareTrigger clearning out the form before adding content to it.
		// - get the meta needed to add action/send info for gigya	
		//adding visable info
		$("#mfp-share .title").text(data.headline);
		$("#mfp-share .copy-txt-link").text(data.shorturl);		
		//adding invisable info
        $('#mfp-share form.share-form .share-message-textarea').val(data.headline + ' ' + data.shorturl);
        $('#mfp-share input[name="canonical"]').val(data.canonical);
        $('#mfp-share input[name="shorturl"]').val(data.shorturl);
        $('#mfp-share input[name="headline"]').val(data.headline);
        $('#mfp-share input[name="thumbnail"]').val(data.thumbnail);
        $('#mfp-share input[name="thumb_type"]').val(data.thumbType);
    },        

    //utility functions for shares

    checkShareCommentLength: function() {

	// checks the length of the comment box for character count and warns when close to limit
        var $target = $('#mfp-share .char-count'),
            $textarea = $('#mfp-share .share-message-textarea'),
            textlength = $textarea.val().length,
            provider =  $('#mfp-share input[name="provider"]').val(),
            tweetCharLimit = 140,
            emailCharLimit = 80;

        $target.text(textlength);
        if (provider === 'twitter' && textlength > tweetCharLimit || provider === 'email' && textlength > emailCharLimit) {
            $target.addClass('length-warning');
        } else {
            $target.removeClass('length-warning');
        }
    },

    submitShare: function(formData, e){
		e.preventDefault();
		var that = this;
		if(formData.provider != 'email'){
			console.log('other provider');
			that.socialSubmit(formData);
		} else {
			console.log('email');
			that.emailSubmit(formData);
		}
    }
};
$(function(){
    $('.share-close').on('click', function(e){
        bcom_share.hideShareCommentBox(e);
    });
    $('.share-message-textarea').on('keyup change focus', function(){
        bcom_share.checkShareCommentLength();
    });
    $('.share-icon-link').on('click', function(e){
        bcom_share.showShareCommentBox(e);
    });
    $('form.share-form').on('submit',function(e){
        bcom_share.submitShare($(this).serializeObject(), e);
    });
	$(document).on('click', '.popup-trigger', function(e){
		e.preventDefault();
		var that = this;
		// Open directly via API
		$.magnificPopup.open({
			type: "inline",
			mainClass: 'mfp-zoom-in',
			removalDelay: 500,
			items: [
			{
				src: that.hash, // can be a HTML string, jQuery object, or CSS selector
				el: that
			}],
			callbacks: {
				beforeOpen: function() {
					bcom_share.setupShareBox(that.dataset);
				},
				close: function(){
					//this could be a little more cleaned up and targeted
					$('.share-message, .email-share').hide();
					$('.share-icon-list').show();
				}
			},
			midClick: true
		});
	});
});
