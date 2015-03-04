// if (typeof bcom === "undefined") { bcom = {}; }
// /*
//  * User module for Boston.com 
//  * by Jesse Marple and Eddie Kennedy
// */
// bcom.user = (function() {
//   'use strict';

//   var module = {};

//   module.init = function(){
//     //TODO it would be neat if this imageURL was dynamic...
//     module.data = { imageUrl     : '//p.o0bc.com/rw$configurationURI/Framework/img/user-blank.jpg',
//                     is_logged_in : false,
//                     notifications : {}
//                   };
//     populateData().always(render);
//     updatePathUrl();
//   };
//   var populateData = function() {
//     var pathAuth = bcom.util.getCookie( 'pathAuth' );
//     if ( pathAuth ) {
//       module.data.is_logged_in = true;
//       module.data.has_screen_name = false;
//       return $.ajax({
//           type: 'GET',
//           url: '/ugc/users/regiauthtoken/' + pathAuth,
//           dataType: "json"
//       }).done(function( response ){
//         for (var attr in response) { module.data[attr] = response[attr];}
//         module.data.has_screen_name = true;
//         module.data.notifications.supported = false;  //Notify.prototype.isSupported();
//         if (module.data.notifications.supported){
//           var ls_notifications_state = localStorage.getItem('notifications'),
//               enabled = (ls_notifications_state == 'enabled');
//           module.data.notifications.enabled = enabled;
//         }
//         $('body').trigger({
//           type:'user-name-received',
//           name: module.data.name
//         });
//       });
//     } else {
//       return $.Deferred().resolve();
//     }
//   },
  
//   render = function( ) {
//     if (module.data['name'] === ('user_' + module.data['id'])) {//BGLOBE-3489
//     	window.location.href = "https://" + window.location.host + "/eom$configurationURI/Framework/regi/membercenter-update-info.jsp";
//     } else {
// 	    var profileTemplate   = document.getElementById('nav-profile-mustache').innerHTML,
// 	        navAvatarTemplate = document.getElementById('nav-avatar-mustache').innerHTML,
// 	        profileOutput     = Mustache.render(profileTemplate, module.data),
// 	        navAvatarOutput   = Mustache.render(navAvatarTemplate, module.data);
// 	    $('body').append(profileOutput);
// 	    $('#trigger-avatar-profile').html(navAvatarOutput);
//     }
//   },
  
//   updatePathUrl = function( ) {
//     bcom.util.setCookie('pathUrl', document.location.href);
//   };
  
//   return module;
// }());

// // init'ing
// $(function(){
//   bcom.user.init();
// });

