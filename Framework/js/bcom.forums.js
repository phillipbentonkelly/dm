/*
*   Boston.com UGC - Forums
*   Author: Eddie Kennedy ( edward.kennedy@globe.com )
*/
alert('v1');
(function( win, $, undefined ) {

  // Cache document & location objects
  var doc = win.document,
      loc = win.location,
      bannedWordHandlerSet = false;

  var ugc = {
    globals : {
      enableLastReadPost: true,
      currentPage: '' // defined at document.ready()
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
    insertParam: function(src, key, value) {
      key = encodeURIComponent(key);
      value = encodeURIComponent(value);

      var indexOfQM = src.lastIndexOf('?');
      if (indexOfQM == -1) {
        return src + '?' + key + '=' + value;
      }

      var srcBeforeParams = src.substr(0, indexOfQM);
      var keys = src.substr(indexOfQM + 1).split('&');

      var i=keys.length;
      var keyAndValue;

      while(i--) {
        keyAndValue = keys[i].split('=');

        if (keyAndValue[0] == key) {
          keyAndValue[1] = value;
          keys[i] = keyAndValue.join('=');
          break;
        }
      }

      if(i<0) {
        keys[keys.length] = [key,value].join('=');
      }

      return srcBeforeParams + '?'+ keys.join('&');
    }
  };

  var bcom_forum_admin = {

    user_status: function() { // Determines is user is an admin
      var admin_status = $('.forum-head').attr('data-admin');
      admin_status = admin_status == 'true' ? true : false;
      return admin_status;
    },

    toggle_value: function( value ) {
      var new_val;
      if ( value == 'true' ) { new_val = 'false'; }
      if ( value == 'false' ) { new_val = 'true'; }
      return new_val;
    },
    toggle_approval_value: function( value ) {
      var new_val = {};
      if ( value == 'unmoderated' ) {
        new_val.attr = 'blocked';
        new_val.srvr = 'BLOCKED';
      }
      if ( value == 'blocked' ) {
        new_val.attr = 'unmoderated';
        new_val.srvr = 'UNMODERATED';
      }
      return new_val;
    },
    edit_form: function ( type, name, desc ) {
      var form = [
        '<div class="ugc-modal">',
          '<form class="admin-edit">',
            '<div class="heading">Edit ' + type + ' <a href="#" class="close-modal" data-action="close">&times;</a></div>',
            '<div class="form-section">',
              '<label>Name</label>',
              '<input type="text" name="name" value="' + name + '" />',
            '</div>',
            '<div class="form-section">',
              '<label>Description</label>',
              '<input type="text" name="desc" value="' + desc + '" />',
            '</div>',
            '<div class="form-section submit">',
              '<input type="submit" class="btn" value="Save"/>',
            '</div>',
          '</form>',
        '</div>'
      ].join('');
      return $(form);
    },

    edit_discussion_form: function ( title ) {
      var form = [
        '<div class="ugc-modal">',
          '<form class="admin-edit">',
            '<div class="heading">Edit Discussion <a href="#" class="close-modal" data-action="close">&times;</a></div>',
            '<div class="form-section">',
              '<label>Title</label>',
              '<input type="text" name="title" value="' + title + '" />',
            '</div>',
            '<div class="form-section submit">',
              '<input type="submit" class="btn" value="Save"/>',
            '</div>',
          '</form>',
        '</div>'
      ].join('');
      return $(form);
    },

    move_form: function () {
      var form = [
        '<div class="ugc-modal">',
          '<form class="admin-move">',
            '<div class="heading">Move discussion<a href="#" class="close-modal" data-action="close">&times;</a></div>',
            '<div class="form-section">',
              '<label>New category</label>',
              // norlov: BCOM-10365
              $("#forumStructure").clone().removeAttr('id').attr("id", "categorySelector").removeAttr('style').wrap('<select>').parent().html(),
              '</div>',
            '<div class="form-section submit">',
              '<input id="categorySelectorSubmit" type="submit" class="btn" value="Save" disabled/>',
            '</div>',
          '</form>',
        '</div>'
      ].join('');
      return $(form);
    },

    reason_form: function () {
      var form = [
        '<div class="ugc-modal">',
          '<form class="admin-reason">',
            '<div class="heading">Reason for this action?<a href="#" class="close-modal" data-action="close">&times;</a></div>',
            '<div class="form-section">',
              '<textarea name="adminReason"></textarea>',
            '</div>',
            '<div class="form-section submit">',
              '<input type="submit" class="btn" value="Save"/>',
            '</div>',
          '</form>',
        '</div>'
      ].join('');
      return $(form);
    },


    /*
    *   Category Level Admin Actions
    */

    // Edit/Rename Category
    edit_category: function(event) {
      event.preventDefault();
      bcom_forum_user.statusMessage('action');
      var $this = $(event.target),
          id = $this.attr('data-id');
      $.getJSON('/ugc/forumsectioncategory/id/' + id, function(data) {
        var name = data.name,
            desc = !data.desc ? '' : data.desc;
        var $form = bcom_forum_admin.edit_form( 'category', name, desc );
        $form.appendTo('body').submit(function(event) {
          event.preventDefault();
          var form_data = $('.admin-edit').serializeArray();
          $.post('/ugc/forumsectioncategory/id/' + id, form_data, function(data) {
       	    bcom_forum_user.statusMessage('success');
            $('.ugc-modal').remove();
          });
        });
      });
    },
    archive_category: function(event) {
      event.preventDefault();
      bcom_forum_user.statusMessage('action');
      var $this = $(event.target),
          id = $this.attr('data-id'),
          new_value = bcom_forum_admin.toggle_value( $this.attr('data-value') );
      $.post('/ugc/forumsectioncategory/id/' + id + '/archived/' + new_value, function(data){
        var new_text = $this.text() == 'Archive category' ? 'Unarchive category' : 'Archive category';
        $this.text( new_text );
        $this.attr({ 'data-value': new_value });
  	    bcom_forum_user.statusMessage('success');
      });
    },

    /*
    *   Discussion Level Admin Actions
    */

    // Edit/Rename Discussion
    edit_discussion: function(event) {
      event.preventDefault();
      var $this = $(event.target),
          id = $this.attr('data-id');
      $.getJSON('/ugc/topics/' + id, function(data) {
        var title = data.title;
        var $form = bcom_forum_admin.edit_discussion_form( title );
//        $('.admin-alert').hide();
        bcom_forum_user.statusMessage( 'action');
        $form.appendTo('body').submit(function(event) {
          event.preventDefault();
          var form_data = $('.admin-edit').serializeObject();
          $.ajax({
            type: 'PATCH',
            url: '/ugc/topics/' + id,
            data: JSON.stringify( form_data ),
            dataType: 'JSON',
            contentType: 'application/json',
            xhr: function() {
                return window.XMLHttpRequest == null || new window.XMLHttpRequest().addEventListener == null 
                    ? new window.ActiveXObject("Microsoft.XMLHTTP")
                    : $.ajaxSettings.xhr();
            }
          }).done(function( jqXHR, textStatus, errorThrown ) {
      	    bcom_forum_user.statusMessage('success');
//            $('.admin-alert').hide();
            $('.ugc-modal').remove();
            window.location = window.location;
          });
        });
      });
    },
    // Sticky Discussion
    sticky_discussion: function(event) {
      event.preventDefault();
      bcom_forum_user.statusMessage('action');
      var $this = $(event.target),
          id = $this.attr('data-id'),
          new_value = bcom_forum_admin.toggle_value( $this.attr('data-value') ),
          form_data = { sticky: new_value };
      $.ajax({
        type: 'PATCH',
        url: '/ugc/topics/' + id,
        data: JSON.stringify( form_data ),
        dataType: 'JSON',
        contentType: 'application/json',
        xhr: function() {
            return window.XMLHttpRequest == null || new window.XMLHttpRequest().addEventListener == null 
                ? new window.ActiveXObject("Microsoft.XMLHTTP")
                : $.ajaxSettings.xhr();
        }
      }).done(function( jqXHR, textStatus, errorThrown ) {
        var new_text = $this.text().toLowerCase() == 'make sticky' ? 'Unstick' : 'Make Sticky';
        $this.text( new_text );
        $this.attr({ 'data-value': new_value });
        $('#discussion-' + id).find('.name, .discussion-name').toggleClass('sticky');
  	    bcom_forum_user.statusMessage('success');
      });
    },
    // Archive Discussion
    archive_discussion: function(event) {
      event.preventDefault();
      bcom_forum_user.statusMessage('action');
      var $this = $(event.target),
          id = $this.attr('data-id'),
          new_value = bcom_forum_admin.toggle_value( $this.attr('data-value') ),
          form_data = { archived: new_value };
      $.ajax({
        type: 'PATCH',
        url: '/ugc/topics/' + id,
        data: JSON.stringify( form_data ),
        dataType: 'JSON',
        contentType: 'application/json',
        xhr: function() {
            return window.XMLHttpRequest == null || new window.XMLHttpRequest().addEventListener == null 
                ? new window.ActiveXObject("Microsoft.XMLHTTP")
                : $.ajaxSettings.xhr();
        }
      }).done(function( jqXHR, textStatus, errorThrown ) {
        var new_text = $this.text() == 'Archive discussion' ? 'Unarchive discussion' : 'Archive discussion';
        $this.text( new_text );
        $this.attr({ 'data-value': new_value });
  	    bcom_forum_user.statusMessage('success');
      });
    },
    // Move Discussion
    move_discussion: function(event) {
      event.preventDefault();
	  bcom_forum_user.statusMessage('action');
      var $this = $(event.target),
          id = $this.attr('data-id');
      var $form = bcom_forum_admin.move_form();
      $form.appendTo('body').submit(function(event) {
        event.preventDefault();
        var new_cat = $('.admin-move select[id=categorySelector]').val();
        var form_data = { sectionCategoryKey: new_cat };
        $.ajax({
          type: 'PATCH',
          url: '/ugc/topics/' + id,
          data: JSON.stringify( form_data ),
          dataType: 'JSON',
          contentType: 'application/json',
          xhr: function() {
              return window.XMLHttpRequest == null || new window.XMLHttpRequest().addEventListener == null 
                  ? new window.ActiveXObject("Microsoft.XMLHTTP")
                  : $.ajaxSettings.xhr();
          }
        }).done(function( jqXHR, textStatus, errorThrown ) {
          bcom_forum_user.statusMessage('success');
          $('.ugc-modal').remove();
        });
      });
      // norlov: BCOM-10365
      $("#categorySelector").change(function() {
        $("#categorySelectorSubmit").prop('disabled', $(this).val() < 0);
    });
    },

    /*
    *   Post Level Admin Actions
    */

    // Email User
    email_user: function(event) {
      event.preventDefault();
      $('.admin-alert').show();
      var $this = $(event.target),
          user_id = $this.attr('data-user-id');
      $.get("/ugc/users/" + user_id + "/email", function(data) {
        window.location = "mailto:" + data;
        $('.admin-alert').hide();
      });
    },
    // Block User
    block_user: function(event) {
      event.preventDefault();
      var $this = $(event.target),
          id = $this.attr('data-id'),
          new_value = bcom_forum_admin.toggle_value( $this.attr('data-value') ),
          form_data = { blocked: new_value };
      var $form = bcom_forum_admin.reason_form();
      $form.appendTo('body').submit(function(event) {
          event.preventDefault();
          $('.admin-alert').show();
          form_data.adminReason = $('.admin-reason textarea[name=adminReason]').val();
          $.ajax({
            type: 'PATCH',
            url: '/ugc/users/' + id,
            data: JSON.stringify( form_data ),
            dataType: 'JSON',
            contentType: 'application/json',
            xhr: function() {
                return window.XMLHttpRequest == null || new window.XMLHttpRequest().addEventListener == null 
                    ? new window.ActiveXObject("Microsoft.XMLHTTP")
                    : $.ajaxSettings.xhr();
            }
          }).done(function( jqXHR, textStatus, errorThrown ) {
            var new_text = $this.text() == 'Block user' ? 'Unblock user' : 'Block user';
            $this.text( new_text );
            $this.attr({ 'data-value': new_value });
            $('.ugc-modal').remove();
            $('.admin-alert').hide();
          });
      });
    },
    // Block Post
    block_post: function(event) {
      event.preventDefault();
      var $this = $(event.target),
          id = $this.attr('data-id'),
          new_value = bcom_forum_admin.toggle_approval_value( $this.attr('data-value') ),
          form_data = { approvalStatus: new_value.srvr };
      var $form = bcom_forum_admin.reason_form();
      $form.appendTo('body').submit(function(event) {
          event.preventDefault();
          $('.admin-alert').show();
          form_data.adminReason = $('.admin-reason textarea[name=adminReason]').val();
          $.ajax({
            type: 'PATCH',
            url: '/ugc/interactions/' + id,
            data: JSON.stringify( form_data ),
            dataType: 'JSON',
            contentType: 'application/json',
            xhr: function() {
                return window.XMLHttpRequest == null || new window.XMLHttpRequest().addEventListener == null 
                    ? new window.ActiveXObject("Microsoft.XMLHTTP")
                    : $.ajaxSettings.xhr();
            }
          }).done(function( jqXHR, textStatus, errorThrown ) {
            var new_text = $this.text() == 'Block post' ? 'Unblock post' : 'Block post';
            $this.text( new_text );
            $this.attr({ 'data-value': new_value.attr });
            $('.ugc-modal').remove();
            $('.admin-alert').hide();
          });
      });
    },
     // Archive Post
    archive_post: function(event) {
      event.preventDefault();
      $('.admin-alert').show();
      var $this = $(event.target),
          id = $this.attr('data-id'),
          new_value = bcom_forum_admin.toggle_value( $this.attr('data-value') ),
          form_data = { archived: new_value };
      $.ajax({
        type: 'PATCH',
        url: '/ugc/interactions/' + id,
        data: JSON.stringify( form_data ),
        dataType: 'JSON',
        contentType: 'application/json',
        xhr: function() {
            return window.XMLHttpRequest == null || new window.XMLHttpRequest().addEventListener == null 
                ? new window.ActiveXObject("Microsoft.XMLHTTP")
                : $.ajaxSettings.xhr();
        }
      }).done(function( jqXHR, textStatus, errorThrown ) {
        var new_text = $this.text() == 'Block post' ? 'Post blocked' : 'Block post';
        $this.text( new_text );
        $this.attr({ 'data-value': new_value });
        $('.admin-alert').hide();
      });
    }

  };

  var bcom_forum_user = {

    abuse_form: function () {
      var form = [
        '<div class="ugc-modal abuse">',
          '<form class="report-abuse">',
            '<div class="heading">Report abuse<a href="#" class="close-modal" data-action="close">&times;</a></div>',
            '<div class="form-section">',
              '<label>Report item as: (required)</label>',
              '<select name="type">',
                '<option value="DEMERIT_OBSCENITY_VULGARITY">Obscenity/vulgarity</option>',
                '<option value="DEMERIT_HATE_SPEECH">Hate speech</option>',
                '<option value="DEMERIT_PERSONAL_ATTACK">Personal attack</option>',
                '<option value="DEMERIT_ADVERTISING_SPAM">Advertising/Spam</option>',
                '<option value="DEMERIT_COPYRIGHT_PLAGIARISM">Copyright/Plagiarism</option>',
                '<option value="DEMERIT_OTHER">Other</option>',
              '</select>',
            '</div>',
            '<div class="form-section">',
              '<label>Comment: (optional)</label>',
              '<textarea name="body"></textarea>',
            '</div>',
            '<div class="form-section submit">',
              '<input type="submit" class="btn" value="Report"/>',
            '</div>',
          '</form>',
        '</div>'
      ].join('');
      return $(form);
    },

    // Report Abusive Post
    report_abuse: function(event) {
      event.preventDefault();
      var $this = $(event.target),
          id = $this.attr('data-id'),
          user_id = $this.attr('data-user-id'),
          $form = bcom_forum_user.abuse_form();
      $form.appendTo('body').submit(function(event) {
        event.preventDefault();
        var report_type = $('.report-abuse select[name=type]').val(),
            body = $('.report-abuse textarea[name=body]').val(),
            form_data = {};
        form_data.parentKey = id;
        form_data.type = report_type;
        form_data.body = body;
        $.ajax({
          type: 'POST',
          url: '/ugc/interactions/',
          data: JSON.stringify( form_data ),
          dataType: 'JSON',
          contentType: 'application/json'
        }).done(function( jqXHR, textStatus, errorThrown ) {
          $('.ugc-modal').remove();
        });
      });
    },
    ignore_user: function(event) {
        event.preventDefault();
        var $this     = $(event.target),
            user_id   = $this.attr('data-user-id');
            text      = $this.text(),
            username  = text.split(' ')[1];
        $.post('/ugc/ignoreduser/id/' + user_id, function(data, textStatus, jqXHR){
          // Add 'ignored' class to all posts with the offending user id
          $('li[data-user-id=' + user_id + ']').addClass('ignored');
          bcom_forum_user.statusMessage( 'success', 'You are now ignoring posts from ' + username);
        });
    },
    stop_ignoring_user: function(event) {
      event.preventDefault();
      var $this     = $(event.target),
          user_id   = $this.attr('data-user-id'),
          text      = $this.text(),
          username  = $this.parents('.post').find('.username a').text();
      $.ajax({
        'url': '/ugc/ignoreduser/id/'+ user_id,
        'type': 'DELETE',
        'success': function(data, textStatus, jqXHR){
          // Add 'ignored' class to all posts with the offending user id
          $('li[data-user-id=' + user_id + ']').removeClass('ignored');
          bcom_forum_user.statusMessage( 'success', 'You are no longer ignoring posts from ' + username);
        }
      });
    },
    update_last_read_ia_on_server: function(e, $lastReadPost){
      var $discussion        = $('.discussion').first(),
          discussionId       = $discussion.data('id'),
          currentPage        = $discussion.data('page'),
          lastReadPostIndex  = ugc.globals.$posts.index($lastReadPost),
          nextIaOnThisPage   = lastReadPostIndex < 24,
          nextIaPageNumber   = nextIaOnThisPage ? currentPage : currentPage+1;
      $.post('/ugc/lastreadinteraction', // *** to test 503 on dev, replace this url with '/ugc/lastreadinteraction/503'
          { 'topic'            : discussionId,
            'ia'               : $lastReadPost.data('id'),
            'iaCreateDate'     : $lastReadPost.data('create-date'),
            'nextIaPageNumber' : nextIaPageNumber});
          //.fail(function(jqXHR, textStatus, errorThrown) {
          //        if (jqXHR.status === 503){
          //           //alert('503');
          //            bcom_forum_user.statusMessage( 'maintenance', 'Sorry, we can\'t update your read posts right now. Hang tight!');
          //        }
          //    });
    },

    add_unread_post_stars_to_discussions: function() {
      var discussionIds = [];
      $('.discussion').each(function() {
          discussionIds.push($(this).attr('data-id'));
      });
      $.getJSON('/ugc/lastreadinteractions',
        $.param({'t': discussionIds}, true),
        function(data, textStatus, jqXHR) {
          if (jqXHR.status === 200){
            $.each(data.lris, function() {
              var lastReadIa               = this,
                  lastReadIaCreateDate     = lastReadIa.iaCreateDate,
                  $discussion              = $('#discussion-' + lastReadIa.topic),
                  $discussionPostsLink     = $discussion.find('.post-count a').first(),
                  lastPostedIaCreateDate   = $discussionPostsLink.parent().next('.latest').first().attr('data-create-date'),
                  discussionHasUnreadPosts = Date.parse(lastPostedIaCreateDate) > lastReadIaCreateDate;
              if (discussionHasUnreadPosts){
                $discussionPostsLink
                  .addClass('star')
                  .querystring({page:lastReadIa.nextIaPageNumber})
                  .fragment('after-post-'+lastReadIa.ia,2);
              } else {
                $discussionPostsLink
                  .addClass('no-star');
              }
          });
        }
        $('.post-count a:not(.no-star)').addClass('star');
      });

    },

    add_unread_post_stars_to_discussion_page: function(){
      var discussionId = $('.discussion').first().attr('data-id');

      $.getJSON('/ugc/lastreadinteractions',
      {'t': discussionId},
      function(data, textStatus, jqXHR) {
        if (jqXHR.status === 204){
          ugc.globals.$posts.addClass('star');
        }
        else if (jqXHR.status === 200){
          var lastReadIa         = data.lris[0],
            lastReadIaCreateDate = lastReadIa.iaCreateDate;

          ugc.globals.$posts.each(function (){
            var $post         = $(this),
              postCreateDate  = $post.data('create-date');
            if ( Date.parse(postCreateDate) > lastReadIaCreateDate ){
              $post.addClass('star');
            }
          });
        }
      });
    },
    update_unread_posts_on_discussion_page : function(){
      var $unreadPosts = ugc.globals.$posts.filter('.star');
      $unreadPosts.each(function(){
        var $post   = $(this),
        postTopFromWindowTop = $post.offset().top - $(window).scrollTop();
        if (postTopFromWindowTop < 200){
          $post.removeClass('star');
          $(window).trigger('updateLastReadIaOnServer', [$post]);
        }
      });
    },
    highlight_post: function( element, startColor, endColor ) {
    // Idea nicked from here: http://stackoverflow.com/a/9333985
    $(element).css("-webkit-transition","all 0.6s ease")
      .css("backgroundColor", endColor)
      .css("-moz-transition","all 0.9s ease")
      .css("-o-transition","all 0.9s ease")
      .css("-ms-transition","all 0.9s ease")
      .css("backgroundColor", startColor).delay(1500).queue(function() {
        $(this).css("backgroundColor", endColor);
        $(this).dequeue(); //Prevents box from holding color with no fadeOut on second click.
      });
    },

    statusMessage: function( type, customMessageText ) {
      // Remove any existing message boxes
      $('.status-message').remove();
      // Set up variables for new message box
      var $messageBox = $('<div class="status-message" />'),
          $message = $('<span class="message" />'),
          messageText = customMessageText || '',
          duration = 3000;
      // Some default messages, if no customMessageText is provided
      if ( type == 'action' && messageText === '' ) { messageText = 'Sending...'; }
      if ( type == 'success' && messageText === '' ) { messageText = 'Success!'; }
      if ( type == 'error' && messageText === '' ) { messageText = 'There was an error. Please refresh the page and try again.'; }
      if ( type == 'maintenance' ) { duration = 4000; }
      // Finalize the $message and append it to the $messageBox
      $message.text( messageText ).addClass( type ).appendTo( $messageBox );
      // Add the $messageBox to the body
      $('body').prepend( $messageBox );
      // If the type is 'success' or 'error', fade the $messageBox out and remove it
      if( type == 'success' || type == 'error' || type == 'maintenance' ) {
        window.setTimeout( function() {
          $messageBox.fadeOut(400, function() {
            $(this).remove();
          });
        }, duration);
      }
    }

  };

  var bcom_forum_forms = {

    // Start New Discussion
    start_discussion: function(event) {
      event.preventDefault();
      if( !bcom_forum_forms.check_form( 'title', 'add-post-body' ) ) {
        $('.validation').show();
      } else {
        $('.validation').hide();
        tinyMCE.triggerSave(true,true);
        var form_data = { site: 'BCOM', type: 'FORUM' };
        form_data.sectionCategoryKey = $('#section-category-id').val();
        form_data.title = $('.add-content-form #title').val();
        var discussionBody = $('.add-content-form #add-post-body').val();
        $.ajax({
          type: 'POST',
          url: '/ugc/topics/',
          data: JSON.stringify( form_data ),
          dataType: 'JSON',
          contentType: 'application/json'
        }).done(function( data, textStatus, errorThrown ) {
          var topic_data = {
            type: 'DISCUSSION_POST',
            topicKey: data.id,
            body: discussionBody,
            title: form_data.title
          };
          $.ajax({
            type: 'POST',
            url: '/ugc/interactions/',
            data: JSON.stringify( topic_data ),
            dataType: 'JSON',
            contentType: 'application/json'
          }).done(function( jqXHR, textStatus, errorThrown ) {
            bcom_forum_forms.clear_form( '#start-discussion-form' );
            window.location = data.url;
          });
        });
      }
    },

    cancel_start_discussion: function(event) {
      event.preventDefault();
      // Clear Form
      bcom_forum_forms.clear_form( '#start-discussion-form' );
      // Redirect
      var ref_domain  = document.referrer;
      window.location.href = ref_domain;

    },

    new_post: function(event) {
      $('#edit-post-form').hide();
      $('#add-post-form').show();
      bcom_forum_forms.clear_form( '#add-post-form' );
      var new_content = ['<br/><br/>', forumSignature].join('');
      ugc.addPostEditor.setContent( new_content );
      ugc.addPostEditor.focus();
    },

    // Add Post to Discussion
    add_post: function(event) {
      event.preventDefault();
      // Check form content
      if( !bcom_forum_forms.check_form( 'add-post-title', 'add-post-body' ) ) {
        $('.validation').show();
        $('#submit-add-post').prop('disabled', false);
      } else {
        $('.validation').hide();
        tinyMCE.triggerSave(true,true);
        var form_data = $('#add-post-form').serializeObject(),
            discussion_id = $('#discussion-id').val(),
            page = $('#current-last-page').val(),
            pageQS = ( page === '1' ) ? '' : '?page=' + page,
            discussion_url = $('#discussion-url').val();
        form_data.topicKey = discussion_id;
        form_data.type = 'DISCUSSION_POST';
        $.ajax({
          type: 'POST',
          url: '/ugc/interactions/',
          data: JSON.stringify( form_data ).replace(/(\\r\\n|\\n|\\r)/gm,""),
          dataType: 'JSON',
          contentType: 'application/json'
        }).done(function( jqXHR, textStatus, errorThrown ) {
          bcom_forum_forms.clear_form( '#add-post-form' );
          // Reset hash to post id, reload page
          window.location.href = discussion_url + pageQS + '#post-' + jqXHR.id;
          window.location.reload();
          $('#submit-add-post').prop('disabled', false);
        });
      }
    },

    // Edit Post
    edit_post: function(event) {

      // Hide 'Add Post' Form
      // Show 'Edit Post' Form
      $('#add-post-form').hide();
      $('#edit-post-form').show();
      $('.add-content-head .section-header').html('Edit Your Thoughts');

      //event.preventDefault();
      var $this = $(event.target),
          post_title = $.trim( $this.parents('.post-utility').siblings('.post-head').children('.post-subject').text() ),
          post_content = bcom_forum_forms.replaceQuoteDivs($.trim( $this.parents('.post-utility').siblings('.post-content').html() )).replace(/<p><\/p>/gm,""),
          post_id = $this.attr('data-post-id'),
          edit_content = [];

      edit_content = [
        post_content
      ].join('');

      // Set reply content
      ugc.editPostEditor.setContent( edit_content );

      $('#edit-post-title').val( post_title );
      $('#edit-post-id').val( post_id );

      // Set cursor to end of quoted text
      // Cobbled together with help from: http://stackoverflow.com/questions/1253303/whats-the-best-way-to-set-cursor-caret-position
      ugc.editPostEditor.focus();
      //textarea.selection.select( textarea.dom.select( 'span#carat-holder' )[0] );
      //textarea.selection.collapse( 0 );
      //textarea.dom.remove( textarea.dom.select ( 'span#carat-holder' )[0] );

    },

    edit_post_submit: function(event) {
      // ugc/interaction/
      event.preventDefault();
      // Check form content
      if( !bcom_forum_forms.check_form( 'edit-post-title', 'edit-post-body' ) ) {
        $('.validation').show();
      } else {
        $('.validation').hide();
        tinyMCE.triggerSave(true,true);
        var form_data = $('#edit-post-form').serializeObject(),
            post_id = $('#edit-post-id').val(),
            page = $('#current-last-page').val(),
            //pageQS = ( page === '1' ) ? '' : '?page=' + page,
            pageQS = window.location.search,
            discussion_url = $('#discussion-url').val();
        $.ajax({
          type: 'PATCH',
          url: '/ugc/interactions/' + post_id,
          data: JSON.stringify( form_data ).replace(/(\\r\\n|\\n|\\r)/gm,""),
          dataType: 'JSON',
          contentType: 'application/json',
          xhr: function() {
            return window.XMLHttpRequest == null || new window.XMLHttpRequest().addEventListener == null 
                ? new window.ActiveXObject("Microsoft.XMLHTTP")
                : $.ajaxSettings.xhr();
          }
        }).done(function( jqXHR, textStatus, errorThrown ) {
          // Clear form
          bcom_forum_forms.clear_form( '#edit-post-form' );
          // Reset has to post id, reload page
          window.location.href = discussion_url + pageQS + '#post-' + post_id;
          window.location.reload();
        });
      }
    },
    replaceQuoteDivs: function(str) {
      var result = str;
      var quoteRegexp = /<div class="quote">\s*((.|\n)*?)\s*<\/div>/;
      while (quoteRegexp.test(result)) {
        result = result.replace(quoteRegexp, "[QUOTE]$1[/QUOTE]");
      }
      return result;
    },
    // 'Reply to Post' Button
    reply_to_post: function(event) {
      var $this = $(event.target),
          post_user = $.trim( $this.parents('.post-utility').siblings('.user-info').children('ul').children('.username').children('a').text() ),
          post_title = $('#discussion-title').val(),
          post_content = bcom_forum_forms.replaceQuoteDivs($.trim( $this.parents('.post-utility').siblings('.post-content').html() )).replace(/<p><\/p>/gm,""),
          post_id = $this.parents('.post').attr('id'),
       //   post_link = $('#discussion-url').val(),
       //   post_link = post_link + '#' + post_id,
          reply_content = [];
      if( post_user.substr(-1).toLowerCase() === "s" ) {
        reply_content = [
          'In response to ' + post_user + '\' comment:<br/>',
          '[QUOTE]',
            post_content,
          '[/QUOTE]',
          '<br/><br/><br/>',
          forumSignature,
          '<span id="carat-holder"></span>'
        ].join('');
      } else {
        reply_content = [
          'In response to ' + post_user + '\'s comment:<br/>',
          '[QUOTE]',
            post_content,
          '[/QUOTE]',
          '<br/><br/><br/>',
          forumSignature,
          '<span id="carat-holder"></span>'
        ].join('');
      }

      // Set reply content
      ugc.addPostEditor.setContent( reply_content );

      // Set cursor to end of quoted text
      // Cobbled together with help from: http://stackoverflow.com/questions/1253303/whats-the-best-way-to-set-cursor-caret-position
      ugc.addPostEditor.focus();
      ugc.addPostEditor.selection.select( ugc.addPostEditor.dom.select( 'span#carat-holder' )[0] );
      ugc.addPostEditor.selection.collapse( 0 );
      ugc.addPostEditor.dom.remove( ugc.addPostEditor.dom.select ( 'span#carat-holder' )[0] );

    },

    // Handle Banned Words
    banned_words: function() {
      if(!bannedWordHandlerSet) {
        bannedWordHandlerSet = true;
        $(document).ajaxError( function(e, xhr, settings, exception) {
          if ( xhr.status == 403 ) {
            var message;
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
          }
          $('#submit-add-post').prop('disabled', false);
        });
      }
    },

    // Clear Form Fields
    clear_form: function( form ) {
      $(form + ' input.user').val('');
      $(form).trigger('reset');
    },

    // Share comment to facebook
    share_comment_fb: function (event) {
      event.preventDefault();
      var commentParent = $(event.currentTarget).parents('.post');
      var pictureLink = '';
      if($('meta[property="og:image"]').attr('content').substring(0, 4) == "http"){
        pictureLink = $('meta[property="og:image"]').attr('content');
      }
      FB.ui({
        method: 'feed',
        name: $('#forum-head').find('h1').text(),
          link: loc.href,
        picture: pictureLink,
        description: $.trim(commentParent.find('.post-content').text())
      }, function(response) {/*no logic yet*/});
    },
    // Share comment to twitter
    share_comment_twitter: function (event) {
      event.preventDefault();
      var commentParent = $(event.currentTarget).parents('.post');
      var commentFromForm = $.trim(commentParent.find('.post-content').text());
      var comment = commentFromForm.substring(0, 99);
      if (comment.length == 99) {
        comment = comment.substring(0, comment.lastIndexOf(" "));
      }
      comment = encodeURIComponent(comment);
      var $el = $( event.currentTarget );
      var commentId = $el.parents('.post').eq(0).attr("data-id");
      var urlWithAnchor = loc.href;
      if (urlWithAnchor.indexOf("#") !== -1) {
        urlWithAnchor = urlWithAnchor.substring(0, urlWithAnchor.lastIndexOf("#"));
      }
      urlWithAnchor = ugc.insertParam(urlWithAnchor, "ia", commentId);

      var request = $.ajax({
        url: "/eom/SysConfig/WebPortal/Boston/Framework/_ajax/short_url.jsp?url=" + encodeURIComponent(urlWithAnchor),
        type: "GET"
      });

      var twitterQuery = "https://twitter.com/share"+
            "?via=" + "BostonDotCom" +
            "&text=" + comment;

      request.done(function(url) {
        if (url !== "404") {
            twitterQuery = twitterQuery + "&url=" + url;
         }
      });

      request.always(function(){
        window.open(twitterQuery, 'BDCTweet','width=535,height=435,resizable=no,scrollbars=no,toolbar=no,location=no,menubar=no,status=no');
      });
    },

    check_form: function( input_id, textarea_id ) {
      // Get input content
      var input_content = $('#' + input_id ).val();
      // Get textarea content
      var textarea = tinyMCE.get( textarea_id ),
          textarea_content = textarea.getContent();
      // Check content
      if( input_content === '' || textarea_content === '' ) {
        return false;
      } else {
        return true;
      }
    }
  };

  /*
  *   Document Ready Function
  *   Assign event handlers and call functions as needed
  */
  $(document).ready(function() {

    if ( $('.forum').length ) {


      $.ajaxSetup({ cache: false }); // Prevent AJAX caching
      // Determine Page Type
      var $forum_head = $('#forum-head'),
          page_type   = $forum_head.data('page-type'),
          logged_in   = $forum_head.data('ugc-user-id') > 0;

      if ( page_type == 'discussion' ) {
        /*
        *   User Functionality
        */

        ugc.globals.currentPage = $('.discussion').first().data('page');

        // Report Abuse
        $(document).on('click', 'a[data-action=report-abuse]', function(event){
            bcom_forum_user.report_abuse(event);
        });

        $(document).on('click', 'a[data-action=ignore-user]', function(event){
            bcom_forum_user.ignore_user(event);
        });

        $(document).on('click', 'a[data-action=stop-ignoring-user]', function(event){
            bcom_forum_user.stop_ignoring_user(event);
        });


        // Start Discussion Form Submit
        $('#start-discussion-form').submit(function(event) {
          bcom_forum_forms.banned_words();
          bcom_forum_forms.start_discussion(event);
        });

        // Cancel Start Discussion
        $('a[data-action=cancel]').click(function(event) {
          bcom_forum_forms.cancel_start_discussion(event);
        });

        // 'Add a New Post' Button
        $('a[data-action=new-post]').click(function(event) {
          bcom_forum_forms.new_post(event);
        });

        // 'Edit Post' Button
        $('a[data-action=edit-post]').click(function(event) {
          //bcom_forum_forms.banned_words();
          bcom_forum_forms.edit_post(event);
        });

        // Edit Post Form Submit
        $('#edit-post-form').submit(function(event) {
          bcom_forum_forms.banned_words();
          bcom_forum_forms.edit_post_submit(event);
        });

        // 'Reply to Post' Button
        $('a[data-action=reply]').click(function(event) {
          bcom_forum_forms.reply_to_post(event);
        });

        // Add Post Form Submit
        $('#add-post-form').submit(function(event) {
          $('#submit-add-post').prop('disabled', true);
          bcom_forum_forms.banned_words();
          bcom_forum_forms.add_post(event);
        });

        $('.comment-share-fb').click(function(event) {
          bcom_forum_forms.share_comment_fb(event);
        });
        
        $('.comment-share-tw').click(function(event) {
          bcom_forum_forms.share_comment_twitter(event);
        });

        // Check for after-post hash
        var hash = window.location.hash;
        if ( hash.match('after-post') !== null ) {
          var lastReadPostId = hash.split('-')[2],
              $lastReadPostEl = $('#post-'+lastReadPostId),
              $firstUnreadPostEl = $lastReadPostEl.next();
          // Check for the existence of the first unread post on the page
          if ( $firstUnreadPostEl.length ) {
            // If the first unread post is there, highlight it
            bcom_forum_user.highlight_post( $firstUnreadPostEl, '#faefa6', '#e5e5e5' );
          } else {
            // Scroll to and highlight the first post on the page
            var $firstPost = $('.discussion-list ol > li:first-child'),
                firstPostTop = $firstPost.offset().top;
            $('html, body').animate( { scrollTop: firstPostTop }, 500 );
            bcom_forum_user.highlight_post( $firstPost, '#f5db5d', '#e5e5e5' );
          }
        }
        // Check for ia query string
        var directToIa = ugc.getQueryStringValue( 'ia' );
        if ( directToIa ) {
          var $iaToGoTo = $('#post-' + directToIa),
              iaToGoToTop = $iaToGoTo.offset().top;
          $('html, body').animate( { scrollTop: iaToGoToTop }, 500 );
          bcom_forum_user.highlight_post( $iaToGoTo, '#f5db5d', '#e5e5e5' );
        }

        if (logged_in){

          if ( ugc.globals.enableLastReadPost ) {

            ugc.globals.$posts = $('.post');
            bcom_forum_user.add_unread_post_stars_to_discussion_page();
            $(window).bind('updateLastReadIaOnServer', $.debounce(250, bcom_forum_user.update_last_read_ia_on_server));
            $(window).scroll($.throttle(250, bcom_forum_user.update_unread_posts_on_discussion_page));

          } else {
            bcom_forum_user.statusMessage( 'maintenance', 'Sorry, we can\'t update your read posts right now. Hang tight!');
          }

          // Used for image uploading
          var discussion_id = $('.discussion.discussion-list').attr('data-id');
          var category_id = $('#section-category-id').val();

          var tinyMCEInit = function( textareaId, wordLimit ) {
            tinymce.baseURL = '//' + loc.host + '/js/libs/tinymce';
            // Define basic options
            var optionsObject = {
              menubar: false,
              statusbar: true,
              toolbar: 'fontselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | justifyleft justifycenter justifyright bullist numlist | link unlink | image emoticons | spellchecker',
              toolbar_items_size: 'small',
              // browser_spellcheck: true,
              // commented out according to BCOMREDESIGN-1443
              // invalid_elements: 'img',
              auto_focus: false,
              plugins: 'wordcount paste autolink emoticons textcolor image spellchecker',
              paste_as_text: true,
              paste_data_images: false,
              fontsize_formats: "10px 12px 14px 18px 20px 24px",
              theme_advanced_runtime_fontsize: '12px',
              spellchecker_rpc_url : "/ugc/jazzy-spellchecker",
              spellchecker_languages : "+English=en-us",
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
            var editor = new tinymce.Editor( textareaId, optionsObject, tinymce.EditorManager );
            editor.render();
            return editor;
          };

          ugc.addPostEditor = tinyMCEInit( 'add-post-body', 3000 );
          ugc.editPostEditor = tinyMCEInit( 'edit-post-body', 3000 );

        }
      }
      if (page_type == 'discussions' || page_type == 'categories' || page_type == 'sections'){

        if ( logged_in && ugc.globals.enableLastReadPost ){
            bcom_forum_user.add_unread_post_stars_to_discussions();
        } else if ( logged_in && !ugc.globals.enableLastReadPost ) {
          bcom_forum_user.statusMessage( 'maintenance', 'Sorry, we can\'t update your read posts right now. Hang tight!');
        }

      }
      /*
      *   Admin Functionality
      */
      if ( bcom_forum_admin.user_status() ) {

        // Append admin function status alert
        $('body').append('<div class="admin-alert">Sending...</div>');

        /*
        *   Discussion Index Page
        */

        if ( page_type == 'discussions' ) {

          // Show Admin Tools
          $('.admin-utility').show();
          $('tr.admin').show();

          // Category Utilities

          // Edit/Rename Category
          $('a[data-action=edit-category]').click(function(event) {
            bcom_forum_admin.edit_category(event);
          });
          // Archive Category
          $('a[data-action=archive-category]').click(function(event) {
            bcom_forum_admin.archive_category(event);
          });

          // Discussion Utilities

          // Edit/Rename Discussion
          $('a[data-action=edit-discussion]').click(function(event) {
            bcom_forum_admin.edit_discussion(event);
          });
          // Make Sticky
          $('a[data-action=sticky-discussion]').click(function(event) {
            bcom_forum_admin.sticky_discussion(event);
          });
          // Archive Discussion
          $('a[data-action=archive-discussion]').click(function(event) {
            bcom_forum_admin.archive_discussion(event);
          });
        }

        /*
        *   Discussion Page
        */

        if ( page_type == 'discussion' ) {

          // Show Admin Tools
          $('.admin-utility').show();
          $('.post-utility li.admin').show();

          // Discussion Utilities

          // Edit/Rename Discussion
          $('a[data-action=edit-discussion]').click(function(event) {
            bcom_forum_admin.edit_discussion(event);
          });
          // Make Sticky
          $('a[data-action=sticky-discussion]').click(function(event) {
            bcom_forum_admin.sticky_discussion(event);
          });
          // Archive Discussion
          $('a[data-action=archive-discussion]').click(function(event) {
            bcom_forum_admin.archive_discussion(event);
          });
          // Move Discussion
          $('a[data-action=move-discussion]').click(function(event) {
            bcom_forum_admin.move_discussion(event);
          });

          // Post Utilities

          // Email User
          $('a[data-action=email-user]').click(function(event) {
            bcom_forum_admin.email_user(event);
          });
          // Block User
          $('a[data-action=block-user]').click(function(event) {
            bcom_forum_admin.block_user(event);
          });
          // Block Post
          $('a[data-action=block-post]').click(function(event) {
            bcom_forum_admin.block_post(event);
          });
          // Archive Post
          $('a[data-action=archive-post]').click(function(event) {
            bcom_forum_admin.archive_post(event);
          });

        }

        /*
        *  All Pages
        */
        // Close modal window and remove admin-alert
        $(document).on('click', 'a[data-action=close]', function(e) {
          e.preventDefault();
          $('.ugc-modal,.admin-alert').remove();
        });

      }
      // norlov: a fix for BCOM-10365 (getting current category in the selector)
      //var catHrefFromBreadcrumb = $($(".breadcrumbs").find("li")[3]).find("a").attr("href");
      //var currentCatId =  catHrefFromBreadcrumb.substr(catHrefFromBreadcrumb.lastIndexOf("/") + 1);
      //$($("option[value=" + currentCatId + "]")[0]).attr('selected',true);
    
    }
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