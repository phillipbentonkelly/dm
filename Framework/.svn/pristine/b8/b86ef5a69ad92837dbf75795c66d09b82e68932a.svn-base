/*
*   Boston.com UGC - Profiles
*   Author: Eddie Kennedy ( edward.kennedy@globe.com )
*   Contents:
*   #Init #Forms #Actions #Profiles #Util #Templates #Document Ready 
*/

(function( win, $, undefined ) {

  // Prevent AJAX caching
  $.ajaxSetup({ cache: false });

  // Cache document & location objects
  var doc = win.document,
      loc = win.location;

  // Define local ugc object
  var ugc = ugc || {};

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Init
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */
  ugc.init = function() {
    ugc.profiles.init();
  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Forms
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.forms = {

    clearForm: function( $form ) {
     $form.trigger('reset');
     if ( $('#image-url').length && $('#image-url').val() !== '' ) {
      this.removePhoto();
     }
    },

    checkForm: function( $form ) {
      var message = '<div class="required-message">Please fill out all required fields.</div>';
      var missingCount = 0;
      var requiredInputs = $form.find('[data-required="true"]');
      // Check wordcount
      var textareaId = $form.find('textarea').attr('id');
      var editor = tinymce.get( textareaId );
      if ( editor && editor.overWordCount ){
        alert('You are over the permitted word count by ' + editor.overWordCountBy +' words. Please edit your submission and re-submit.');
        return false;
      }
      // Validate checkboxed
      if ( $form.find('.checkboxes').length && $form.find('input:checked').length === 0 ) { missingCount++; }
      $.each( requiredInputs, function() {
        if ( $(this).val() === '' ) { missingCount++; }
      });
      if( missingCount > 0 ) {
        if ( !$('.required-message').length ) { $form.parent().append( message ); }
        return false;
      } else {
        if ( $('.required-message').length ) { $('.required-message').remove(); }
        return true;
      }
    },

    tinyMCEInit: function( textareaId, type, wordLimit ) {
      tinymce.baseURL = '//' + loc.host + '/js/libs/tinymce';
      // Define basic options
      var optionsObject = {
        menubar: false,
        statusbar: false,
        toolbar: false,
        browser_spellcheck: true,
        invalid_elements: 'img',
        auto_focus: textareaId,
        plugins: 'wordcount paste',
        paste_as_text: true,
        paste_data_images: false,
        setup: function( editor ) {
          editor.on('PreProcess', function(e) {
            editor.overWordCount = false;
            var wordCount = editor.plugins.wordcount.getCount();
            if ( wordCount > wordLimit ) {
              editor.overWordCount = true;
              editor.overWordCountBy = wordCount - wordLimit;
            }
          });
        }
      };
      // Extra options for the full featured editor
      if ( type !== 'basic' ) {
        optionsObject.statusbar = true;
        optionsObject.auto_focus = false;
        optionsObject.toolbar = 'bold italic underline', //| alignleft aligncenter alignright alignjustify | bullist numlist | link unlink | emoticons charmap';
        optionsObject.toolbar_items_size = 'small';
        optionsObject.plugins = 'wordcount paste';
      }
      var editor = new tinymce.Editor( textareaId, optionsObject, tinymce.EditorManager );
      editor.render();
      return editor;
    },

    tinyMCERemove: function( editor ) {
      editor.remove();
    },

    uploadPhoto: function( $el ) {
      $('#upload-image').modal();
      // Wait for iframe#image-target to load
      $("#image-target").load( function() {
        var imageUrl;
        if ( $('html.oldie').length ) {
          // <=IE8 handle iframes differently
          imageUrl = $(window.frames.image_target.document.XMLDocument).find("url").text();
        } else {
          // Moder browsers handle iframes all nice like
          imageUrl = $("#image-target").contents().find("url").text();
        }
        // Populate input value & show preview
        $('#image-url').val( imageUrl );
        $('.image-preview').attr({ src: imageUrl });
        $('.add-photo, .submit-photo').toggle();
        // Remove modal
        $('#upload-image').modal('hide');
      });
    },

    removePhoto: function( $el ) {
      // Remove input value and hide preview
      $('#image-url').val('');
      $('.image-preview').attr({ src: '' });
      $('.add-photo, .submit-photo').toggle();
    }

  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Actions
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.actions = {

    iaEndpoint: '/ugc/interactions/',
    userEndpoint: '/ugc/users/',
    ignoreUserEndpoint: '/ugc/ignoreduser/id/',

    createIa: function( actionObj, silent ) {
      silent = silent || false;
      return this.ajaxCall( 'POST', this.iaEndpoint, actionObj, silent );
    },

    modifyIa: function( actionId, actionObj, silent ) {
      return this.ajaxCall( 'PATCH', this.iaEndpoint + actionId, actionObj, silent );
    },

    modifyUser: function( userId, actionObj, silent ) {
      return this.ajaxCall( 'PATCH', this.userEndpoint + userId, actionObj, silent );
    },

    ignoreUser: function( userId, type, silent ) {
      return this.ajaxCall( type, this.ignoreUserEndpoint + userId, {}, silent );
    },

    ajaxCall: function( type, url, data, silent ) {
      var dataType = type === 'GET' ? 'html' : 'json';
      if (!silent) { ugc.util.statusMessage('action'); }
      return $.ajax({
        type: type,
        url: url,
        data: JSON.stringify(data),
        dataType: dataType,
        contentType: "application/json",
        xhr: function() {
            return window.XMLHttpRequest == null || new window.XMLHttpRequest().addEventListener == null 
                ? new window.ActiveXObject("Microsoft.XMLHTTP")
                : $.ajaxSettings.xhr();
        }
      }).done(function( jqXHR, textStatus, errorThrown ) {
        if (!silent) { ugc.util.statusMessage('success'); }
      }).fail(function( jqXHR, textStatus, errorThrown ) {
        if ( jqXHR.status === 403 ) {
          $('.status-message').remove();
          alert( jqXHR.responseText );
        } else {
          if (!silent) { ugc.util.statusMessage('error'); }
        }
      });
    }

  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Profiles
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.profiles = {

    init: function() {
      this.eventHandlers();
    },

    eventHandlers: function() {

      // User actions
      $('.user-action').on('click', function(event) {
        event.preventDefault();
        ugc.profiles.userAction( $(this) );
      });

      if( $('#edit-profile-form').length ) {
        // About Me form
        ugc.aboutMeEditor = ugc.forms.tinyMCEInit( 'forum-signature', 'basic' );

        // Edit profile
        $('#edit-profile-form').on("submit", function(event) {
          event.preventDefault();
          ugc.profiles.editProfile( $(this) );
        });
        // Edit Avatar
        $('#edit-avatar-form').submit(function(event) {
          ugc.profiles.editAvatar( event );
        });
        // Listen for a change on the file input
        $('#custom-avatar').change(function(event) {
          ugc.profiles.selectAvatar( $(this) );
        });
        // Toggle stock avatars
        $('#show-stock-avatars').on('click', function(event) {
          event.preventDefault();
          ugc.profiles.toggleAvatars( $(this) );
        });
        // Listen for change on the radio buttons
        $(document).on('click', '.avatar-list input', function(event) {
          ugc.profiles.setStockAvatar( $(this) );
        });
      }

      if( $('#submit-message-form').length ) {
        // Submit message form
        ugc.addMessageEditor = ugc.forms.tinyMCEInit( 'message-body', 'basic' );

        // Send Message
        $('#submit-message-form').on("submit", function(event) {
          event.preventDefault();
          ugc.profiles.sendMessage( $(this) );
        });
      }

      if( $('.messages').length ) {
        // Admin user actions
        if ( $('.admin-actions').length ){
          $('.admin-action').on('click', function(event) {
            event.preventDefault();
            ugc.profiles.adminAction( $(this) );
          });
        }
      }

      // Close modal
      $(document).on('click', '.close-modal', function(event) {
        event.preventDefault();
        $('.ugc-modal').remove();
      });
    },

    editProfile: function( $form ) {
      ugc.aboutMeEditor.save();
      var userId = $("#user-id").val();
      var actionObj = $form.serializeObject();
      // Validate form
      if ( ugc.forms.checkForm( $form ) ) {
        // Update user
        ugc.actions.modifyUser( userId, actionObj ).success(function() {
          // Reload page
          window.location.href = window.location.href;
        });

      }
    },

    stockAvatarsLoaded: false,

    toggleAvatars: function( $el ) {
      if ( !ugc.profiles.stockAvatarsLoaded ) {
        // Fetch list of avatars and append them to the page
        ugc.profiles.fetchAvatars();
        // Set the flag to true
        ugc.profiles.stockAvatarsLoaded = true;
        // Change the data-toggle attribute
        $el.attr('data-toggle', 'open');
        // Change link text
        $el.children('strong').text('Hide avatars');
      } else {
        // The avatars have been loaded, toggle the div
        $('ul.avatar-list').slideToggle('medium', function() {
          if ( $el.attr('data-toggle') === 'open' ) {
            $el.children('strong').text('Use one of ours...');
            $el.attr('data-toggle', 'closed');
          } else {
            $el.children('strong').text('Hide avatars');
            $el.attr('data-toggle', 'open');
          }
        });
      }
    },

    fetchAvatars: function() {
      var $stockAvatarUl = $('<ul class="avatar-list" />');
      $.getJSON('/ugc/avatars/stock', function( data ) {
        $.each( data.avatars, function( i ) {
          var count = i + 1;
          var li = [
            '<li>',
              '<label for="avatar-' + count + '"><img src="' + this.url + '" alt="" class="stock-avatar" /></label>',
              '<input type="radio" data-url="' + this.url + '"name="stockAvatarPath" value="' + this.path + '" id="avatar-' + count + '"/>',
            '</li>'
          ].join('');
          $stockAvatarUl.append( li );
        });
        $('#stock-avatars').append( $stockAvatarUl );
      });
    },

    selectAvatar: function( $input ) {
      if ( $input.val() !== '' ) {
        // Deselect all the radio buttons
        $('#edit-avatar-form input[type="radio"]:checked').each(function(){
          $(this).prop('checked', false);
        });
        // Submit the form
        $('#edit-avatar-form').submit();
      } else { return false; }
    },

    editAvatar: function( event ) {
        event.preventDefault();
        var fileElement = document.getElementById('custom-avatar');
        var formData = new FormData();
         
  		formData.append('file', fileElement.files[0], fileElement.files[0].name);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', document.getElementById('edit-avatar-form').getAttribute("action"), true);
		xhr.onload = function () {
  		if (xhr.status === 201) {
  			var patt1=new RegExp("<imageUrl>(.*?)<\/imageUrl>");
  			var imageUrl = patt1.exec(xhr.responseText);
    		ugc.profiles.updateAvatarUi( imageUrl[1] );
  		} else {
    		ugc.util.statusMessage('error', 'There was a problem uploading your avatar. Please adhere to file type/size restrictions.');
  		}
  		};
		ugc.util.statusMessage('action', 'Uploading image...');
		xhr.send(formData);
    },

    setStockAvatar: function( $input ) {
      var userId = $("#user-id").val();
      var imageUrl = $input.attr('data-url');
      var imagePath = $input.val();
      var actionObj = { imageUrl: imagePath };
      ugc.actions.modifyUser( userId, actionObj, true );
      ugc.profiles.updateAvatarUi( imageUrl );
    },

    updateAvatarUi: function( imageUrl ) {
      // Assign src attributes
      $('img.profile-image, img.user-avatar').attr( 'src', imageUrl );
      // Hide the stock avatar list
      $('ul.avatar-list').hide();
      // Change the text of the stock avatars link and set the data flag to closed
      $('#show-stock-avatars strong').text('Use one of ours...');
      $('#show-stock-avatars').attr('data-toggle', 'closed');
      // Scroll to the top of the profile
      var $profile = $('.profile-head');
      var profileTop = $profile.offset().top;
      $('html, body').animate( { scrollTop: profileTop }, 500 );
      // Clear avatar form
      //$('#custom-avatar').val('');
      $('#edit-avatar-form input[type="radio"]:checked').each(function(){
          $(this).prop('checked', false);
      });
      // Display success message
      ugc.util.statusMessage('success', 'Your avatar has been updated.');
    },

    userAction: function( $el ) {
      var elData = $el.data();
      if ( elData.actionType === 'report' ) { this.abuseReport( elData.actionId, elData.reportType ); }
      if ( elData.actionType === 'ignore-user' ) { this.ignoreUser( elData.actionId, elData.ignoreType, $el ); }
    },

    abuseReport: function( actionId, reportType ) {
      var keyName = reportType === 'user' ? 'namedUserKey' : 'parentKey';
      $form = ugc.templates.commentAbuseReport( actionId, keyName );
      $form.appendTo('body').submit(function(event) {
        event.preventDefault();
        var actionObj = $(this).find('form').serializeObject();
        ugc.actions.createIa( actionObj );
        // Remove modal
        $('.ugc-modal').remove();
      });
    },

    ignoreUser: function( actionId, ignoreType, $el ) {
      var httpMethod = ignoreType === 'start-ignore' ? 'POST' : 'DELETE';
      ugc.actions.ignoreUser( actionId, httpMethod).success( function() {
          if ( ignoreType === 'start-ignore' ) {
          	  var userName = $el.text().split(' ')[1];
              $el.data({ ignoreType: 'stop-ignore' }).removeClass('ignore-user').addClass('unignore-user').text('Stop ignoring ' + userName);
              //$target.attr('data-action', 'stop-ignoring-user').removeClass('ignore-user').addClass('unignore-user').text('Stop ignoring ' + username);
            } else {
           	  var userName = $el.text().split(' ')[2];
              $el.data({ ignoreType: 'start-ignore' }).removeClass('unignore-user').addClass('ignore-user').text('Ignore ' + userName);
            }

      });
    },

    sendMessage: function( $form ) {
      ugc.addMessageEditor.save();
      var actionObj = $form.serializeObject();
      // Validate form
      if ( ugc.forms.checkForm( $form ) ) {
        // Update user
        ugc.actions.createIa( actionObj ).success(function() {
          // Reload page
          window.location.href = window.location.href;
        });

      }
    },

    adminAction: function( $el ) {
      var elData = $el.data();
      $form = ugc.templates.adminReasonForm( elData.property, elData.value );
      $form.appendTo('body');
      $form.find('form').submit(function(event) {
        event.preventDefault();
        var actionObj = $(this).serializeObject();
        var uiDataValue, uiDataText;
        // Block unblock comment
        if ( elData.actionType === 'ia' ) {
          ugc.actions.modifyIa( elData.actionId, actionObj );
          // New UI values
          uiDataValue = elData.value === 'BLOCKED' ? 'UNMODERATED' : 'BLOCKED';
          uiDataText = elData.value === 'BLOCKED' ? 'Unblock message' : 'Block message';
        }
        // Block unblock user
        if ( elData.actionType === 'user' ) {
          ugc.actions.modifyUser( elData.actionId, actionObj );
          // New UI values
          uiDataValue = elData.value === 'true' ? 'false' : 'true';
          uiDataText = elData.value === 'true' ? 'Unblock user' : 'Block user';
        }
        // Remove modal
        $('.ugc-modal').remove();
        // Update UI
        $el.text( uiDataText ).data('value', uiDataValue);
      });
    }

  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Util
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.util = {

    statusMessage: function( type, customMessageText ) {
      // Remove any existing message boxes
      $('.status-message').remove();
      // Set up variables for new message box
      var $messageBox = $('<div class="status-message" />'),
          $message = $('<span class="message" />'),
          messageText = customMessageText || '';
      // Some default messages, if no customMessageText is provided
      if ( type == 'action' && messageText === '' ) { messageText = 'Sending...'; }
      if ( type == 'success' && messageText === '' ) { messageText = 'Success!'; }
      if ( type == 'error' && messageText === '' ) { messageText = 'There was an error. Please refresh the page and try again.'; }
      // Finalize the $message and append it to the $messageBox
      $message.text( messageText ).addClass( type ).appendTo( $messageBox );
      // Add the $messageBox to the body
      $('body').prepend( $messageBox );
      // If the type is 'success' or 'error', fade the $messageBox out and remove it
      if( type == 'success' || type == 'error') {
        window.setTimeout( function() {
          $messageBox.fadeOut(400, function() {
            $(this).remove();
          });
        }, 3000);
      }
    }
  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Templates
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.templates = {
    // Abuse report form / returns $('<div class="comment abuse-form">');
    commentAbuseReport: function( actionId, keyType ) {
      var modal = [
        '<div class="ugc-modal abuse">',
          '<div class="heading">Report abuse<a href="#" class="close-modal" data-action="close">&times;</a></div>',
          '<form action="#" class="report-abuse-form">',
            '<input type="hidden" name="' + keyType + '" value="' + actionId + '" />',
            '<div class="form-section">',
              '<label>Reason for reporting:</label>',
              '<select name="type" class="demerit-type">',
                '<option value="DEMERIT_OBSCENITY_VULGARITY">Obscenity or vulgarity</option>',
                '<option value="DEMERIT_HATE_SPEECH">Hate speech</option>',
                '<option value="DEMERIT_PERSONAL_ATTACK">Personal attack</option>',
                '<option value="DEMERIT_ADVERTISING_SPAM">Advertising spam</option>',
                '<option value="DEMERIT_COPYRIGHT_PLAGIARISM">Copyright or plagiarism</option>',
                '<option value="DEMERIT_OTHER">Other</option>',
              '</select>',
            '</div>',
            '<div class="form-section">',
              '<textarea type="text" id="abuse-textarea" class="add-abuse-comment" name="body" placeholder="Comment (optional)"></textarea>',
            '</div>',
            '<div class="form-section submit">',
              '<input type="submit" value="Submit" class="btn-strong btn-medium"/>',
            '</div>',
          '</form>',
        '</div>'
      ].join('');
      return $( modal );
    },
    adminReasonForm: function ( property, value ) {
      var modal = [
        '<div class="ugc-modal">',
          '<form class="admin-reason">',
            '<div class="heading">Reason for this action?<a href="#" class="close-modal" data-action="close">&times;</a></div>',
            '<div class="form-section">',
              '<input type="hidden" name="' + property + '" value="' + value + '" />',
              '<textarea name="adminReason" autofocus></textarea>',
            '</div>',
            '<div class="form-section submit">',
              '<input type="submit" value="Save" class="btn-strong btn-medium"/>',
            '</div>',
          '</form>',
        '</div>'
      ].join('');
      return $( modal );
    }
  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    #Document Ready
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  $(document).ready(function() {
    if ( $('.user-profile').length ) { ugc.init(); }
  });

})(this, jQuery);
/*
 * jQuery serializeObject - v0.2 - 1/20/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,a){$.fn.serializeObject=function(){var b={};$.each(this.serializeArray(),function(d,e){var f=e.name,c=e.value;b[f]=b[f]===a?c:$.isArray(b[f])?b[f].concat(c):[b[f],c]});return b}})(jQuery);


$('title').prepend($('.username .h2').text().split(' ')[0]);