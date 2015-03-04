if (typeof bcom === "undefined") { bcom = {}; }

bcom.share = {

	defaultShareValues : {
		headline:"",
		shorturl:"",
		canonical:"",
		thumbnail:"",
		providers:""
	},
	emailFailCount: 0,
    setupShareBox: function(data){
		$('#mfp-share li.share-icon').hide();
		$("#mfp-share .title").html(data.headline);
		$("#mfp-share .copy-txt-link").text(data.shorturl);

		this.shareValues = _.clone(this.defaultShareValues);

		//saving the comma seperated list of providers for use by showShareUI, in the instance the user chooses to share via email. This displays the same list of providers on the left of the gigya email share component

		var providers = this.getNetworks(data.providers);

		for(var i = 0; i < providers.length; i++) {
			var provider = providers[i];
			$('#mfp-share li.share-icon.'+provider).show();
        }
		// - the box should be cleared of former values and reset prior to opening ~ that might have a better home with shareTrigger clearning out the form before adding content to it.

		// - get the meta needed to add action/send info for gigya
		//adding visable info
		this.shareValues.headline = data.headline;
		this.shareValues.shorturl = data.shorturl;
		this.shareValues.canonical = data.canonical;
		this.shareValues.thumbnail = data.thumbnail;
		this.shareValues.providers = data.providers;

    },
    gigyaEmailSumbitCallback: function(res){
	  //console.log(res);
      // if (res.errorCode) {
      //   console.log('login error', res);
      // } else {
      //   console.log('successfully shared');
      // }
    },
	socialShare: function(e){

		var params = {
			provider: e.currentTarget.dataset.provider,
			url: this.shareValues.canonical,
			title: this.shareValues.headline,
			thumbnailURL: this.shareValues.thumbnail
		};

		gigya.socialize.postBookmark(params);
	},
    getNetworks: function(data) {
		//console.log(data);
        if (data) {
            return data.split(",");
        }

        // Default list of networks to use
        // if none are provided
        return ["facebook",
                "twitter",
                "googleplus",
                "pinterest",
                "linkedin",
                "email"];
    },

    // Moving on to ETAF functions
	// validate the form, mark errors, and submit the email request via ajax
	emailSubmit : function(formData) {
		$('label.error').fadeOut('fast');

		// validate the email fields (marking error classes as necessary)
		var senderValid = this.checkEmailField(formData.your_email, false);
		var recipientValid = this.checkEmailField(formData.recipient_email, true);

		// stop form submit if there were errors
		if (senderValid === false || recipientValid === false) {

			if (senderValid === false){
				//console.log('sender address fail');
				$('label[for="your_email"].error').fadeIn();
			}
			if (recipientValid === false){
			 	//console.log('recipient address fail');
			 	$('label[for="recipient_email"].error').fadeIn();
			}
			return false;
		}

		// prepare form data for email service
		var dataString = 'sender_name='
			+ '&sender_email=' + formData.your_email
			+ '&recipient_email=' + formData.recipient_email
			+ '&message=' + formData.share_message
			+ '&story_url=' + encodeURIComponent(this.shareValues.canonical);

		// send ajax request to email service
		//console.log("Attempting to send email-to-a-friend request to /etaf/ backend service");
		$.ajax({
			type: "POST",
			url: "/emtaf/",
			data: dataString,
			async: false,
			success: this.emailSuccess,
			error: this.emailError(formData)
		});

		// don't reload the page
		return false;
	},

	// return true if email field is valid
	// returns false and adds in-error class if invalid
	checkEmailField : function(emailField, allowMultipleAddresses) {
		var fieldValid = true

		// check multiple addresses in one field, if allowed
		if (allowMultipleAddresses) {

			// split addresses out
			var emailAddresses = emailField.split(/ *, */);
			$.each(emailAddresses, function(k, emailAddress) {

				// check if each address is invalid
				if (bcom.share.isValidEmailAddress(emailAddress) === false) {
					fieldValid = false;

				}
			});

		// check the one address
		} else if (bcom.share.isValidEmailAddress(emailField) === false) {
			fieldValid = false;
		}

		return fieldValid;
	},

	// returns true if the given email is a valid address (by regex)
	isValidEmailAddress : function(emailAddress) {
		var emailRegexStr = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegexStr.test(emailAddress);
	},

	// clears the given email field if the value is still the original default value
	resetRecipientEmailField : function(recipientEmailField) {
		if (recipientEmailField.attr('defaultValue') === recipientEmailField.val() ) {
			recipientEmailField.val('') ;
		}
	},
	emailError: function(formData) {
		if(bcom.share.emailFailCount < 2){
			// try again in the background
		//	console.log('Error submitting email-to-a-friend request. Attempt:'+that.emailFailCount);
			bcom.share.emailFailCount++;
			bcom.share.emailSubmit(formData);

		} else {
			//console.log('Error submitting email-to-a-friend. Returning.');
			// Open directly via API
			bcom.share.showResponse('Message not sent.');
			bcom.share.hideResponse();
			return false;
		}
	},

	emailSuccess: function(){
		bcom.share.emailFailCount = 0;
		// what to do after successful email
		bcom.share.showResponse('E-mail Success!');
		bcom.share.hideResponse();
		//console.log('Success submitting email-to-a-friend request.');

	},
    showEtafBox: function(e){
		$('#mfp-share .share-message').slideDown(500);
		$('#mfp-share .share-icon-list').slideUp(500);
    },

    hideEtafBox: function(e){
		e.preventDefault();
        $('.share-message').slideUp(500);
        $('.share-icon-list').slideDown(500);
		$('#mfp-share .email-share').hide();
        $('#mfp-share .char-count').removeClass('length-warning');
    },
    hideResponse: function(){
		window.setTimeout(function(){
			$.magnificPopup.close();
		}, 5000);
    },
    showResponse: function(statusMsg){
		$.magnificPopup.open({
			items: {
				src: '<div class="share-mod success"><p class="txt-lg">'+statusMsg+'</p></div>'
			},
			type: "inline",
			mainClass: 'mfp-zoom-in',
			removalDelay: 500,
            alignTop: true
		});
    },
    checkShareCommentLength: function() {

	// checks the length of the comment box for character count and warns when close to limit
        var $target = $('#mfp-share .char-count'),
            $textarea = $('#mfp-share .share-message-textarea'),
            textlength = $textarea.val().length,
            provider =  $('#mfp-share input[name="provider"]').val(),
            charLimit = 140;

        $target.text(textlength);
        if (textlength > charLimit) {
            $target.addClass('length-warning');
        } else {
            $target.removeClass('length-warning');
        }
    }
};
//Sharing Inits
$(function(){

    $('.share-icon-link').on('click', function(e){
        if (e.currentTarget.dataset.provider != 'email'){
			bcom.share.socialShare(e);
        } else {
			bcom.share.showEtafBox();
        }
    });

    $(' .l-story-txt-share .social-btn').on('click', function(e){
      var gigyaParams = {
        provider: e.currentTarget.dataset.provider,
        url: e.currentTarget.dataset.canonical,
        title : e.currentTarget.dataset.headline,
        thumbnailURL: e.currentTarget.dataset.thumbnail
      };
      gigya.socialize.postBookmark(gigyaParams);
    });

    $('form.share-form .cancel-link').on('click',function(e){
		bcom.share.hideEtafBox(e);
    });

    $('form.share-form').on('submit',function(e){
		e.preventDefault();
        bcom.share.emailSubmit($(this).serializeObject());
        //console.log(bcom.share.shareValues);
    });
	$(document).on('click', '.popup-trigger', function(e){
		e.preventDefault();
        //console.log(e);
        var originalYPos = e.pageY;
		var that = this;
		// Open directly via API
		$.magnificPopup.open({
			type: "inline",
			mainClass: 'mfp-zoom-in',
			removalDelay: 500,
            alignTop: true,
            fixedContentPos: true,
            closeOnBgClick: false,
            closeOnContentClick: false,

			items: [
			{
				src: that.hash, // can be a HTML string, jQuery object, or CSS selector
				el: that
			}],
			callbacks: {
				beforeOpen: function() {
					//console.log(that.dataset);
					bcom.share.setupShareBox(that.dataset);
					//bcom.share.updateParams(that.dataset);
				},
                open: function(){
                    window.scrollTo(0,0);
                },
                beforeClose: function(){
                    var adjustedYPos = originalYPos;// + $('.main-nav').height() 100;
                    //console.log(adjustedYPos);
                    window.scrollTo(0,adjustedYPos-300);
                },
				close: function(){
					//this could be a little more cleaned up and targeted
					$('#mfp-share li.share-icon, .share-message, .email-share').hide();
					$("#mfp-share .title, #mfp-share .copy-txt-link").empty();
					$('.share-icon-list').show();
					bcom.share.emailFailCount = 0;
				}
			},
			midClick: true
		});
	});

    // $('.share-message-textarea').on('keyup change focus', function(){
    //     bcom.share.checkShareCommentLength();
    // });
});
