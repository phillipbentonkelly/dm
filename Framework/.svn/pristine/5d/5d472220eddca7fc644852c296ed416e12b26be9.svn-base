/*
*   Comments module for Boston.com 
*   by Eddie Kennedy
* 
*/
(function( win, $, methode, undefined ) {

  // Prevent AJAX caching
  $.ajaxSetup({ cache: false });

  // Cache document & location objects
  var doc = win.document,
      loc = win.location,
      hash = loc.hash;

  // Define local ugc object
  var ugc = ugc || {};
  
  // Setup endpoints
  ugc.endpoints = (function(){
    var isMTMobile  = loc.href.indexOf('mobile.html') > 0,
        base        = isMTMobile ? '/bdc-ugc/' : '/ugc/';
    return {
      'user' : base + 'users/',
      'topic': base + 'topics/',
      'ia'   : base + 'interactions/',
      'commentsHtml': isMTMobile ? '/bdc-ugc/ajax/comments.html' :  '/ajax/comments.html'
    };
  })();
  
  // Fallback for MT blogs
  methode = methode || {};

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Init
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */
  ugc.init = function() {
    ugc.sprop6 = s.prop6;
    if ( $('#comments').length ) {

      // Check hashes
      if ( hash === '#comments' ) {
        ugc.pageUI.loadCommentsFlag = true;
        ugc.pageUI.commentsOpen = true;
      }
      if ( hash.indexOf('#comment-') >= 0 ) {
        ugc.pageUI.loadCommentsFlag = true;
        ugc.pageUI.commentsOpen = true;
        ugc.comments.ia = hash.split('-')[1];
      }

      // Initialize Page UI and Comments
      ugc.pageUI.init();
      ugc.comments.init();

    }
  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Forms
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.forms = {

    clearForm: function( $form ) {
      $form.trigger('reset');
      if ( $('#image-url').length && $('#image-url').val() !== '' ) { this.removePhoto(); }
    },

    checkForm: function( $form ) {
      var message = '<div class="required-message">Please enter a comment.</div>';
      var missingCount = 0;
      var requiredInputs = $form.find('[data-required="true"]');
      var overWordCount = false; // TODO implement word count
      var overWordCountBy = 0;
      if ( overWordCount ){
          alert('You are over the permitted word count by ' + overWordCountBy +' words. Please edit your submission and re-submit.');
          return false;
      }
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
    }

  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Actions
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.actions = {
    createIa: function( actionObj, silent ) {
      silent = silent || false;
      return this.ajaxCall( 'POST', ugc.endpoints.ia, actionObj, silent );
    },

    modifyIa: function( actionId, actionObj, silent ) {
      return this.ajaxCall( 'PATCH', ugc.endpoints.ia + actionId, actionObj, silent );
    },

    modifyUser: function( userId, actionObj, silent ) {
      return this.ajaxCall( 'PATCH', ugc.endpoints.user + userId, actionObj, silent );
    },

    streamComment: function( commentId ) {
      $.getJSON(ugc.endpoints.ia +commentId,function(c){
        var streamData = {
          method   : 'create',
          model    : {
            id          : c.id,
            is_comment  : true,
            comment   : {
              total     : $('#comments-wrapper').attr("data-comment-count"),
              user      : {
                profile     : c.actingUserProfileUrl,
                name        : c.actingUserName,
                avatar      : c.actingUserImageUrl
              }
            },
            head    : c.topicTitle,
            body    : c.body,
            url     : c.topicUrl
          }
        };
        
        var infoPathData;
        if (ugc.util.isMovableTypeId(ugc.comments.uuid)){
          infoPathData = { source: "Movable Type", id: ugc.comments.uuid };
        } else {
          infoPathData = { uuid: ugc.comments.uuid };
        }
        $.ajax({
          url: methode.infoPath,
          dataType: "json",
          async: false,
          data: infoPathData,
          success: function(info){
            streamData.model.streams = info.streams;
            streamData.model.section = info.section;
          }
        });
        
        $.ajax({
          type: "POST",
          url: methode.streamSubmitPath,
          contentType: 'application/json',
          processData: false,
          data: JSON.stringify(streamData)
        });
      });
      
    },

    ajaxCall: function( type, url, data, silent ) {
      var dataType = url.match('.html') ? 'html' : 'json';
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
          var message;
          console.log('jqXHR.responseText', jqXHR.responseText);
          if (jqXHR.responseText == "spam"){
            message = 'This looks like spam to us. Did we get it wrong? Email us at feedback@boston.com';
          } else if (jqXHR.responseText.indexOf("Topic with cms uuid") == 0){
            // do not alert
          } else {
            message = jqXHR.responseText;
          }
          $('.status-message').remove();
          if (message) {
            alert( message );
          }
        } else {
          if (!silent) { ugc.util.statusMessage('error'); }
        }
      });
    }

  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Comments
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.comments = {

    topicId: false,
    uuid: false,
    commentCount: 0,
    pageType: 'comments',
    sortOrder: 'OLDEST_CREATE_DT',
    page: 1,
    limit: 25,
    ia: false,

    init: function() {

      if ( typeof topicId !== 'undefined' ) { ugc.comments.topicId = topicId; }
      if ( typeof methode.uuid !== 'undefined' ) { ugc.comments.uuid = methode.uuid; }
      if ( typeof pluckID !== 'undefined' ) { ugc.comments.uuid = pluckID; }

      if ( ugc.comments.topicId ) {
        ugc.comments.fetchComments();
        return;
      }

      if ( ugc.comments.uuid ) {
        ugc.comments.fetchTopicId(ugc.comments.uuid).success(function(topicData) {
          if ( topicData.total > 0 ) {
            ugc.comments.topicId = topicData.topics[0].id;
            ugc.comments.fetchComments();
          } else {
            ugc.comments.createTopic(ugc.comments.uuid).success(function(topicData) {
              ugc.comments.topicId = topicData.id;
              ugc.comments.fetchComments();
            });
          }
        });
      }

      // Attach event handlers
       ugc.comments.eventHandlers();

    },

    // Event handlers
    eventHandlers: function() {
      // Change omniture for show/hide commments
      $(document).on('click', '.js-toggle-comments', function(event) {
        event.preventDefault();
        ugc.comments.toggleShowHideOmniture( $(this) );
      });

      // Show/hide replies
      $(document).on('click', '.more-replies a', function(event) {
        event.preventDefault();
        ugc.comments.toggleReplies( $(this) );
      });

      // Comment sort
      $(document).on('click', '.comment-filter', function(event) {
        event.preventDefault();
        ugc.comments.page = 1;
        ugc.comments.sortComments( $(this) );
      });

      // Permalinks
      $(document).on('click', '.comment-permalink', function(event) {
        event.preventDefault();
        var hash = $(this).attr('href');
        loc.hash = hash;
        ugc.pageUI.goToEl( hash, true );
      });

      // Pagination
      $(document).on('click', '.pagination a', function(event) {
        event.preventDefault();
        ugc.comments.paginateComments( $(this) );
      });

      // highest comment sorting ranking explanation
      $(document).on('click', '.best-rating-explain', function(event) {
        event.preventDefault();
        $.magnificPopup.open({
        items: {
        src: '<div class="share-mod success"><p class="txt-lg">' +
            'How do we decide which are the Most Liked comments? ' +
            'We don\'t subtract the number of Dislikes from Likes or use any sort of ratio. ' +
            'We found that those common formulas can let great comments slip through the cracks. ' +
            'So we use a system that relies on probability: ' +
            'What\'s the chance that a comment\'s Likes and Dislikes reflect its true value to the conversation? ' +
            'We think this is the best way to ensure that quality comments are recognized.' +
          '</p></div>'
        },
        type: "inline",
        mainClass: 'mfp-zoom-in',
        removalDelay: 500,
        alignTop: true
        });
      });

      // Attach event handlers for logged-in users
      if ( $('.user-actions').length || 1 ) {

        // Comment level user actions
        $(document).on('click', '.user-action', function(event) {
          event.preventDefault();
          event.stopPropagation();
          ugc.comments.userAction( $(this) );
        });

        // Expanding form for comments
        $(document).on('click', '.expandable-form', function(){
            $(this).addClass('expandable-form-active');
        });

        // Submit comment
        $(document).on("submit", '.add-comment-form', function(event) {
          event.preventDefault();
          ugc.comments.submitComment( $(this) );
        });

        // Close user forms
        $(document).on('click', '.cancel', function(event) {
          event.preventDefault();
          $('.user-form').remove();
        });

        // Admin user actions
        $(document).on('click', '.admin-action', function(event) {
          event.preventDefault();
          event.stopPropagation();
          ugc.comments.adminAction( $(this) );
        });
        $(document).on('click', '.close-modal', function(event) {
          event.preventDefault();
          $('.ugc-modal').remove();
        });

      }

    },

    // User actions
    userAction: function( $el ) {
      var elData = $el.data();
      if ( elData.actionType === 'reply' ) { this.submitReply( elData.actionId ); }
      if ( elData.actionType === 'report' ) { this.abuseReport( elData.actionId ); }
      if ( elData.actionType === 'like-dislike' ) { this.likeDislike( elData.actionId, elData.property, $el ); }
    },

    fetchTopicId: function( id ) {
      var url = ugc.endpoints.topic + '?cmsUuid=' + id;
      return ugc.actions.ajaxCall( 'GET', url, {}, true );
    },

    createTopic: function( id ) {
      var url = '/ugc/topics';
      var createObj = {
        cmsUuid: id,
        site: 'BCOM', // ***
        title: $('title').text(),
        type: 'ARTICLE'
      };
      return ugc.actions.ajaxCall( 'POST', url, createObj, true );
    },

    commentsUrl: function() {
      var url = [
        ugc.endpoints.commentsHtml + '?topic=' + ugc.comments.topicId,
        '&sort=' + ugc.comments.sortOrder,
        '&page=' + ugc.comments.page
      ];
      if ( ugc.sprop6 ) { url.push( '&prop6=' + ugc.sprop6 ); }
      if ( ugc.comments.ia ) { url.push( '&comment=' + ugc.comments.ia ); }
      if ( !ugc.pageUI.loadCommentsFlag ) { url.push( '&noComments=true' ); }
      return url.join('');
    },
    
    fetchComments: function() {
      if (!ugc.comments.topicId || loc.search.indexOf('&noTopic') > 0){
        console.log('no topicId');
        return;
      }
      return ugc.actions.ajaxCall( 'GET', ugc.comments.commentsUrl(), {}, true ).success(function (comments) {
        $('#comments-wrapper').replaceWith(comments).remove();
        ugc.comments.count = $('.ugc.comments-wrapper').data().commentCount;
        ugc.comments.updateCommentCounts();
        ugc.pageUI.updateUI( ugc.pageUI.loadCommentsFlag );
      });
    },

    sortComments: function( $el ) {
      ugc.comments.ia = false;
      ugc.comments.sortOrder = $el.data().sort;
      ugc.comments.fetchComments();
    },

    paginateComments: function( $el ) {
      ugc.comments.ia = false;
      ugc.comments.page = $el.data().page;
      ugc.comments.fetchComments( true );
    },

    submitComment: function( $form ) {
      var actionObj = $form.serializeObject();
      // Validate form
      if ( ugc.forms.checkForm( $form ) ) {
        ugc.actions.createIa( actionObj ).success(function(comment) {
          ugc.pageUI.loadCommentsFlag = true;
          ugc.pageUI.commentsOpen = true;
          ugc.comments.ia = comment.id;
          ugc.forms.clearForm( $form );
          // Update the hash
          loc.hash = 'comment-' + ugc.comments.ia;
          // Refresh comments
          ugc.comments.fetchComments();
        });
      }
    },

    updateCommentCounts: function() {
      if(ugc.comments.count >= 10 && $( window ).width() > 768) {
        $('.js-share-bar .total-comment-count').css('display', 'inline-block').text( ugc.comments.count );
      }
    },

    submitReply: function( actionId ) {
      $('.user-form').remove();
      var $formWrapper = ugc.templates.commentReply( actionId );
      $formWrapper.insertAfter($('#comment-' + actionId + ' > .comment-holder'));
      $formWrapper.find('form').on('submit', function(event) {
        event.preventDefault();
        var actionObj = $(this).serializeObject();
        // Validate form
        if ( ugc.forms.checkForm( $(this) ) ) {
          ugc.actions.createIa( actionObj ).success(function(reply) {
            $('.user-form').remove();
            // Update the hash
            loc.hash = 'comment-' + reply.id;
            // Refresh comments
            ugc.comments.getReplies( actionId, $('#comment-' + actionId + ' .more-replies a') );
            ugc.pageUI.goToEl( '#comment-' + actionId ); // *** Move this?
            ugc.comments.count++;
            ugc.comments.updateCommentCounts();
          });
        }
      });
    },

    cancelReply: function( editor ) {
      // Close modal
      $('.cancel-reply').on('click', function(event) {
        event.preventDefault();
          $('.new-reply').remove();
        $(this).unbind();
      });
    },

    likeDislike: function( actionId, property, $el ) {
      var actionObj = {};
      actionObj.parentKey = actionId;
      actionObj.type = property === 'likes' ? 'LIKE_ARTICLE_COMMENT' : 'DISLIKE_ARTICLE_COMMENT';
      ugc.actions.createIa( actionObj, true ).success( function() {
        // Update UI
        var $countSpan = $el.find('.count');
        var count = parseInt( $countSpan.text(), 10 );
        $countSpan.text( ++count );
        $el.toggleClass('voted');
        // setTimeout(function(){
        //     $el.parent().addClass('has-voted');
        // }, 3000);
      });
    },

    abuseReport: function( actionId ) {
      $('.user-form').remove();
      var $formWrapper = ugc.templates.commentAbuseReport( actionId );
      $formWrapper.insertAfter($('#comment-' + actionId + ' > .comment-holder')).eq(0);
      $formWrapper.find('form').on('submit', function(event) {
        event.preventDefault();
        var actionObj = $(this).serializeObject();
        ugc.actions.createIa( actionObj );
        $('.user-form').remove();
      });
    },

    getReplies: function( actionId, $el ) {
      var url = ugc.endpoints.commentsHtml + '?parent=' + actionId;
      var $parent = $('#comment-' + actionId);
      var childCount = $parent.attr('data-reply-count');
      var $childrenUl;
      ugc.actions.ajaxCall( 'GET', url, {}, true ).success(function (replies) {
        if ( childCount > 0 ) {
          // Replace children
          var $children = $('#children-' + actionId );
          $('#children-' + actionId ).html(replies);
          if ( childCount >= 2 ) {
            $el.data({ action: 'hide'}).text("Hide replies")
            .parent('div').removeClass('show-more').addClass('hide-more');
          }
        } else {
          // Append children
          $childrenUl = $('<ul class="children comment-reply-list" id="children-' + actionId + '" />').html(replies);
          $parent.append($childrenUl);
        }
        // Update reply count
        childCount++;
        $parent.attr({ 'data-reply-count': childCount });
      });
    },

    toggleReplies: function( $el ) {
      var elData = $el.data();
      if ( elData.action === 'show' ) {
        this.getReplies( elData.actionId, $el );
      } else {
        var $children = $('#children-' + elData.actionId);
        var childCount = $children.children('li').length;
        $children.children('li').filter(':gt(1)').remove();
        $el.data({ action: 'show'}).text('View ' + parseInt(childCount - 2, 10) + ' Replies')
        .parent('div').removeClass('hide-more').addClass('show-more');
      }
      ugc.pageUI.goToEl( '#comment-' + elData.actionId );
    },

    toggleShowHideOmniture: function( $el ) {
      if ($el.text() === 'View') {
        $el.data('omniture', 'comment | hide | ' + s.prop6 );
      }
      if ($el.text() === 'Hide') {
        $el.data('omniture', 'comment | view | ' + s.prop6 );
      }
    },

    // Admin actions

    adminAction: function( $el ) {
      var elData = $el.data();

      if ( elData.actionType === 'stream' ) {
        return ugc.actions.streamComment( elData.actionId );
      }
      
      var $formWrapper = ugc.templates.adminReasonForm( elData.property, elData.value );
      $formWrapper.appendTo('body').find('form').submit(function(event) {
        event.preventDefault();
        var actionObj = $(this).serializeObject();
        var uiDataValue, uiDataText;
        // Block unblock comment
        if ( elData.actionType === 'ia' ) {
          ugc.actions.modifyIa( elData.actionId, actionObj );
          // New UI values
          uiDataValue = elData.value === 'BLOCKED' ? 'UNMODERATED' : 'BLOCKED';
          uiDataText = elData.value === 'BLOCKED' ? 'Unblock comment' : 'Block comment';
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
        elData.text = uiDataText; 
        elData.value = uiDataValue;
        $el.data(elData);
        $el.text(uiDataText);
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
    },

    getQueryStringValue: function( key ) {
      var queryStringArray = loc.search.substr( 1 ).split( '&' );
      for ( var i = 0; i < queryStringArray.length; i++ ) {
        var keyValueArray = queryStringArray[i].split( '=' );
        if ( keyValueArray[0] === key ) {
          return keyValueArray[1];
        }
      }
      return false;
    },
    
    isMovableTypeId: function( id ){
      return /\d+_\d+_\d+/g.test(id);
    }
  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #Templates
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.templates = {
    commentReply: function( parent ) {
      var commentReply = [
        '<div class="new-reply user-form">',
          '<form action="#" method="post" class="form comment-reply-form" id="comment-reply-form">',
            '<input type="hidden" name="type" value="ARTICLE_COMMENT" />',
            '<input type="hidden" name="parentKey" value="' + parent + '" />',
            '<input type="hidden" name="topicKey" value="' + ugc.comments.topicId + '" />',
            '<div class="form-row">',
              '<label for="textarea">Add to the conversation</label>',
              '<div class="input-mod">',
                '<textarea class="textarea" data-required="true" id="reply-to-' + parent + '" name="body" rows="3" placeholder="Reply to this comment"></textarea>',
                '<input type="submit" class="comment-reply-btn submit-btn" value="Reply" />',
                '<p class="comment-disclaimer txt-sm">Your comment is subject to the rules of our <a class="link" href="/help/posting-rules">Posting Policy</a>.<br>This comment may appear on your public profile. <a class="link" href="/help/faq">Public Profile FAQ</a></p>',
                '<div class="content-disclaimer-abr-mod">',
                  '<div class="tz-sponsor-icon content-disclaimer-icon">',
                    '<i class="content-disclaimer-abr link-secondary">Privacy Policy</i>',
                    '<i class="sponsor-hover-info">Your comment is subject to the rules of our <a class="link" href="#">Posting Policy</a>.<br>This comment may appear on your public profile. <a class="link" href="#">Public Profile FAQ</a></i>',
                  '</div>',
                '</div>',
              '</div>',
            '</div>',
          '</form>',
        '</div>',
      ].join('');
      return $( commentReply );
    },
    // Abuse report form / returns $('<div class="comment abuse-form">');
    commentAbuseReport: function( actionId ) {
      var form = [
        '<div class="report-abuse user-form">',
          '<form action="#" class="report-abuse-form">',
            '<input type="hidden" name="parentKey" value="' + actionId + '" />',
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
              '<textarea type="text" id="abuse-textarea" class="add-abuse-comment short" name="body" placeholder="Additional comments (optional)..."></textarea>',
            '</div>',
            '<div class="form-section submit">',
              '<input type="submit" class="comment-abuse-btn submit-btn" value="Report" />',
              '<a href="#" class="cancel">Cancel</a>',
            '</div>',
          '</form>',
        '</div><!-- / .report-abuse -->'
      ].join('');
      return $( form );
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
              '<input type="submit" value="Submit" class="btn primary"/>',
            '</div>',
          '</form>',
        '</div>'
      ].join('');
      return $( modal );
    }
  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    UGC - #UI Controls
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  ugc.pageUI = {
    commentsOpen: false,
    loadCommentsFlag: false,
    $comments: $('#comments'),
    headerHeight: $('.main-nav').outerHeight() + 30, // add 30px for a visual buffer
    init: function() {
      ugc.pageUI.eventHandlers();
    },
    eventHandlers: function() {
      $('.js-goto-open-comments').on('click', function( event ) {
        event.preventDefault();
        if ( ugc.pageUI.loadCommentsFlag && !ugc.pageUI.commentsOpen ) {
          ugc.pageUI.openComments();
        } else {
          ugc.pageUI.loadComments();
        }
      });
      $(document).on('click', '.js-toggle-comments', function( event ) {
        event.preventDefault();
        if ( ugc.pageUI.loadCommentsFlag ) {
          ugc.pageUI.toggleComments();
        } else {
          ugc.pageUI.loadComments();
        }
      });
    },
    loadComments: function( goTo ) {
      ugc.pageUI.loadCommentsFlag = true;
      ugc.pageUI.commentsOpen = true;
      ugc.comments.fetchComments();
    },
    openComments: function() {
      ugc.pageUI.setOpen();
      ugc.pageUI.goToEl( '#comments', false );
    },
    toggleComments: function() {
      if ( ugc.pageUI.commentsOpen ) {
        ugc.pageUI.commentsOpen = false;
      } else {
        ugc.pageUI.commentsOpen = true;
      }
      ugc.pageUI.updateUI();
    },
    updateUI: function( loadComments ) {
      if ( ugc.pageUI.commentsOpen ) {
        ugc.pageUI.setOpen();
      } else {
        ugc.pageUI.setClosed();
      }
      if ( loadComments ) {
        var goTo = ugc.comments.ia ? '#comment-' + ugc.comments.ia : '#comments' ;
        var highlight = ugc.comments.ia ? true : false ;
        ugc.pageUI.goToEl( goTo, highlight );
      }
    },
    setOpen: function() {
      ugc.pageUI.$comments.addClass('open').removeClass('closed');
      $('.view-comments').text('Hide');
      loc.hash = '#comments';
    },
    setClosed: function() {
      ugc.pageUI.$comments.addClass('closed').removeClass('open');
      $('.view-comments').text('View');
    },
    goToEl: function( elId, highlight ) {
      var $el = $(elId);
      if( $el.length ) {
        var elTop = $el.offset().top - ugc.pageUI.headerHeight;
        $('html, body').animate( { scrollTop: elTop }, 500 );
        if ( highlight ) { ugc.pageUI.fadeColorOut( $el, '#ebf5fd' ); }
      }
    },
    fadeColorOut: function( element, color ) {
      // Idea nicked from here: http://stackoverflow.com/a/9333985
      $(element).css('-webkit-transition', 'all 0.6s ease')
        .css('backgroundColor', '#fff')
        .css('-moz-transition', 'all 0.9s ease')
        .css('-o-transition', 'all 0.9s ease')
        .css('-ms-transition', 'all 0.9s ease')
        .css('backgroundColor', color).delay(1500).queue(function() {
          $(this).css('backgroundColor', '#fff');
          $(this).dequeue(); //Prevents box from holding color with no fadeOut on second click.
        });
    }
  };

  /*
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    #Document Ready
  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  */

  $(document).ready(function() { ugc.init(); });

})(this, jQuery, methode);
/*
 * jQuery serializeObject - v0.2 - 1/20/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,a){$.fn.serializeObject=function(){var b={};$.each(this.serializeArray(),function(d,e){var f=e.name,c=e.value;b[f]=b[f]===a?c:$.isArray(b[f])?b[f].concat(c):[b[f],c]});return b}})(jQuery);