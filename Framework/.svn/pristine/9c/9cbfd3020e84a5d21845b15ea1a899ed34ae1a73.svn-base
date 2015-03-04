// *
// *  User Panel
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};

  module.pathAuth = bcom.util.getCookie('pathAuth');
  module.regiUrl = '/ugc/users/regiauthtoken/' + module.pathAuth;
  module.memberCenterUrl = 'https://' + win.location.host + '/eom$configurationURI/Framework/regi/membercenter-update-info.jsp';

  module.getUserData = function() {
    return $.ajax({
      type: 'GET',
      url: module.regiUrl,
      dataType: 'json'
    });
  };

  module.render = function(data) {
    // 401 is returned is user is logged in on different environment (dev/qa/prd)
    if ( data.status === 401 ) { return; }
    // 500/404 is returned if the user does not have a screen name
    if ( data.status === 500 || data.status === 404 ) {
      module.$userPanel.html(module.templates.loggedInWithoutUserName());
      module.$avatar.replaceWith('<img class="page-header__avatar" data-state="closed" src="//u.o0bc.com/avatars/stock/_no-user-image.gif"/>');
      return;
    }
    // Check for valid username / BGLOBE-3489
    if (data.name === 'user_' + data.id) {
      win.location.href = module.memberCenterUrl;
      return;
    }
    module.$userPanel.html(module.templates.loggedIn(data));
    module.$avatar.replaceWith('<img class="page-header__avatar" data-state="closed" src="' + data.imageUrl + '"/>');
    // Commented out for BDC-1409 // module.$avatar.attr({src: data.imageUrl});
  };

  module.templates = {
    // Logged out template is grabbed from the markup on DOM ready
    loggedOut: '',
    loggedIn: function(data) {
      return [
        '<div class="user-panel__header">',
          '<a href="' + data.profileUrl + '">',
            '<img src="' + data.imageUrl + '" alt="' + data.name + '" class="user-panel__avatar"/>',
          '</a>',
          '<span class="user-panel__header-text">',
            'Hi, <a href="' + data.profileUrl + '" class="user-panel__profile-link">' + data.name + '</a>!',
          '</span>',
        '</div>',
        '<ul class="user-panel__list user-panel__list--logged-in">',
          '<li class="user-panel__item">',
            '<a href="' + data.profileUrl + '" class="user-panel__link">Profile</a>',
          '</li>',
          '<li class="user-panel__item">',
            '<a href="' + module.memberCenterUrl + '" class="user-panel__link">Member Center</a>',
          '</li>',
          '<li class="user-panel__item">',
            '<a href="/logout" class="user-panel__link">Logout</a>',
          '</li>',
        '</ul>',
      ].join('');
    },
    loggedInWithoutUserName: function() {
      return [
        '<ul class="user-panel__list user-panel__list--logged-in">',
          '<li class="user-panel__item">',
            '<a href="' + module.memberCenterUrl + '" class="user-panel__link">Member Center</a>',
          '</li>',
          '<li class="user-panel__item">',
            '<a href="/logout" class="user-panel__link">Logout</a>',
          '</li>',
        '</ul>',
      ].join('');
    }
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {

    if (module.pathAuth) {
      module.$userPanel = $('.user-panel');
      module.$avatar = $('.js-replace-with-avatar');
      // Commented out for BDC-1409 // module.$avatar = $('.js-avatar');
      module.templates.loggedOut = module.$userPanel.html();
      module.getUserData().success(function(data, textStatus, jqXHR){
        module.render(data);
      }).error(function(data, textStatus, jqXHR) {
        module.render(data);
      });
    }

    bcom.util.setCookie('pathUrl', win.location.href);
  };

  // Kickoff
  $(document).ready(function() {
    if ($('.user-panel').length) { module.init(); }
  });

})(window, jQuery);