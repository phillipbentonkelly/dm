// *
// *  Social Sharing Module
// *  References:
// *    - Gigya Dev API: http://developers.gigya.com/020_Client_API
// *    - Magnific Popup: http://dimsemenov.com/plugins/magnific-popup/documentation.html
// *

if (typeof bdc === "undefined") { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  var _gigya = {};
  var _email = {};
  var _modal = {};
  var _events = {};
  var _meta = {};

  // Helper function
  var formatNumber = function(number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + ' k'; // http://stackoverflow.com/questions/9461621
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // http://stackoverflow.com/a/2901298
  };


  // ------------------------------------------------------------
  //  * Gigya Sharing
  // ------------------------------------------------------------

  _gigya.apiKey = '3_Wg9crmyjY3ezpaXBCfJH4s5tG0Ygid81wSzG8Z8bM-or7-rCwxK29QWEOLLjACs5';
  _gigya.scriptUrl = 'http://cdn.gigya.com/js/gigya.js?apiKey=' + _gigya.apiKey;

  _gigya.loadScript = function() {
    return $.ajax({ url: _gigya.scriptUrl, dataType: 'script' });
  };

  _gigya.share = function($link) {
    var linkData = $link.data();
    var data = {
      provider: linkData.provider,
      url: linkData.canonical,
      title: linkData.headline,
      thumbnailURL: linkData.thumbnail,
      shortURLs: 'whenRequired',
      cid: linkData.cid
    };
    // http://developers.gigya.com/020_Client_API/010_Socialize/socialize.postBookmark
    gigya.socialize.postBookmark(data);
  };

  _gigya.getShareBarCounts = function() {
    gigya.socialize.getProviderShareCounts({
      enabledProviders: 'facebook,twitter,pinterest',
      callback: _gigya.displayShareBarCounts
    });
  };

  _gigya.displayShareBarCounts = function(response) {
    if (response.errorCode === 0) {
      for ( var provider in response.shareCounts ) {
        var count = response.shareCounts[provider];
        if (count >= 10 && $( window ).width() > 768) {
          count = formatNumber(count);
          $('.js-' + provider + '-count').css('display', 'inline-block').text(count);
        }
      }
    }
  };

  _gigya.getSocialCounts = function($els) {
    $els.each(function(i, el) {
      var $el = $(el);
      var data = $el.data();
      gigya.socialize.getProviderShareCounts({
        URL: data.canonical,
        enabledProviders: data.providers,
        callback: function(response) {
          if (response.errorCode === 0) {
            var total = 0;
            for ( var provider in response.shareCounts ) {
              total = total + response.shareCounts[provider];
              var value = formatNumber(response.shareCounts[provider]);
              $el.find('.js-' + provider + '-count').text(value);
            }
            var formattedTotal = formatNumber(total);
            $el.find('.js-total-count').text(formattedTotal + ' Shares');
          }
        }
      });
      $el.data().loaded = true;
    });
  };

  _gigya.getSocialCountsOnHover = function($el) {
    if( !$el.data().loaded ) {
      _gigya.getSocialCounts($el);
    }
  };

  // ------------------------------------------------------------
  //  * Email Sharing
  // ------------------------------------------------------------

  _email.submit = function($form) {
    var formData = $form.serializeObject();
    // Validate form data
    if ( !_email.validateFormData(formData) ) { return false; }

    // Format data
    var emailData = [
      'sender_name=',
      '&sender_email=' + formData.sender_email,
      '&recipient_email=' + formData.recipient_email,
      '&message=' + formData.share_message,
      '&story_url=' + encodeURIComponent(formData.canonical_url)
    ].join('');

    _email.send( emailData );
  };

  _email.send = function(emailData) {
    $.ajax({
      type: "POST",
      url: "/emtaf/",
      data: emailData,
      success: _email.success,
      error: _email.error
    });
  };

  _email.cancel = function() {
    _modal.toggleForm();
    _email.hideErrorMessage();
    module.$modalForm.trigger('reset');
    if ( module.clickOrigin === 'social-bar' ) { $.magnificPopup.close(); }
  };

  _email.success = function() {
    _modal.message('Your email was sent successfully.');
    _email.hideErrorMessage();
    module.$modalForm.trigger('reset');
  };

  _email.error = function() {
    _modal.message('There was an error with your submission. Please reload the page and try again.');
    _email.hideErrorMessage();
    module.$modalForm.trigger('reset');
  };

  _email.validateFormData = function(formData) {
    // Hide all validation messages
    _email.hideErrorMessage();

    var senderIsValid = _email.validateEmail(formData.sender_email);
    var recipientIsValid = _email.validateEmail(formData.recipient_email);
    
    if ( !senderIsValid ) { $('.js-sender-error').show(); }
    if ( !recipientIsValid ) {$('.js-recipient-error').show(); }

    return !senderIsValid || !recipientIsValid ? false : true ;
  };

  _email.validateEmail = function(email) {
    var errorCount = 0;
    var emailArray = email.split(/ *, */);
    $.each(emailArray, function( i, emailAddress) {
      var emailRegEx = /^[a-zA-Z0-9._-]+(\+[a-z0-9-]+)?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if ( !emailRegEx.test(emailAddress) ) { errorCount++; }
    });
    return errorCount > 0 ? false : true;
  };

  _email.hideErrorMessage = function() {
    $('.js-sender-error, .js-recipient-error').hide();
  };

  // ------------------------------------------------------------
  //  * Share Modal
  // ------------------------------------------------------------

  _modal.set = function($modal, data) {
    // Set modal either populates or clears the modal depending on `data`
    data = data || {thumbType:'',thumbnail:'',headline:'',shorturl:'',canonical:''};
    $modal.find('.js-share-modal-headline').text(data.headline);
    $modal.find('.js-share-modal-canonical-url').val(data.canonical);
    $modal.find('.js-gigya-share').each(function(i, anchor) {
      $(anchor).data(data);
    });
    if ( data.provider === 'email' ) {
      module.clickOrigin = 'social-bar';
      _modal.toggleForm();
    }
  };

  _modal.init = function($link) {
    var linkData = $link.data();
    var $modal = $($link.attr('href'));
    //var $body = $('body');

    // Store scrollbar position ***
    // var scrollBarPosition = $body.scrollTop();

    $.magnificPopup.open({
      type: 'inline',
      mainClass: 'mfp-zoom-in',
      alignTop: true,
      fixedContentPos: true,
      closeOnBgClick: false,
      closeOnContentClick: false,
      midClick: true,
      items: [{ src: $link.attr('href'), el: $link }],
      callbacks: {
        beforeOpen: function() {
          _modal.set($modal, linkData);
        },
        open: function(){},
        beforeClose: function(){
          // Reset scrollbar position ***
          // $body.scrollTop(scrollBarPosition);
        },
        close: function(){
          _modal.set($modal);
          module.$modalForm.hide();
          module.$modalMenu.show();
        }
      }
    });
  };

  _modal.toggleForm = function() {
    module.$modalForm.toggle();
    module.$modalMenu.toggle();
  };

  _modal.message = function(message) {
    var markup = [
      '<div class="share-modal">',
        '<div class="share-modal__status-message">' + message + '</div>',
      '</div>'
    ].join('');
    $.magnificPopup.open({
      items: { src: markup },
      type: 'inline',
      mainClass: 'mfp-zoom-in',
      alignTop: true
    });
  };

  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  _events.handlers = function() {

    // Share Modal Trigger
    $(document).on('click', '.js-share-modal', function(event){
      event.preventDefault();
      _modal.init( $(this) );
    });

    // Share via Gigya
    $('.js-gigya-share').on('click', function(event) {
      event.preventDefault();
      _gigya.share( $(this) );
    });

    // Social Counts on Hover
    if ($('.js-get-social-counts-on-hover').length) {
      $('.js-get-social-counts-on-hover').on('mouseenter', function(event) {
        _gigya.getSocialCountsOnHover( $(this) );
      });
    }
    
    if (module.$modalForm.length) {
      // Share via Email
      $('.js-email-share').on('click', function(event) {
        event.preventDefault();
        _modal.toggleForm();
      });
      // Send Email
      module.$modalForm.on('submit', function(event) {
        event.preventDefault();
        _email.submit( $(this) );
      });
      // Cancel Email
      $('.js-email-share-cancel').on('click', function(event) {
        event.preventDefault();
        _email.cancel();
      });
    }
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {

    module.$modalMenu = $('.js-modal-share-menu');
    module.$modalForm = $('.js-email-share-form');

    // Set if 'email' is clicked from the social bar
    module.clickOrigin = null;
    module.shareBarPresent = $('.js-share-bar').length;
    module.socialCountsPresent = $('.js-get-social-counts').length;

    var kickoff = function() {
      _events.handlers();
      if (module.shareBarPresent) { _gigya.getShareBarCounts(); }
      if (module.socialCountsPresent) { _gigya.getSocialCounts( $('.js-get-social-counts') ); }
    };

    if (typeof gigya === 'object') {
      kickoff();
    } else {
      _gigya.loadScript().success(function() {
        kickoff();
      });
    }
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.js-gigya-share').length) {
      module.init();
    }
  });

})(window, jQuery);