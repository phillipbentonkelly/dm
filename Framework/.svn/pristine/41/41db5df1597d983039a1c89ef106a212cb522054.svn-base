;(function(win){
  "use strict";

  // Use the parents jQuery here in the iframe
  var iframeBody = document.getElementsByTagName("body")[0];
  var jQuery = function (selector) { return parent.jQuery(selector, iframeBody); };
  var $ = jQuery;

  if ( !$('.temp').length ){ return; }

  // Define some variables
  var $iframe = $(win.frameElement);
  var $parent = $iframe.parents('.quick-tz-ad');
  var content = $('.temp').html();

  // Move content
  $parent.addClass('quick-tz-w-art sponsor-quick-tz').prepend(content);

  // Update images src
  var images = $parent.find('img');
  for ( var i = 0; i < images.length; i++ ) {
    $(images[i]).attr({ src: $(images[i]).data().src });
  }

  // Remove the iframe
  $iframe.remove();

}(window));
