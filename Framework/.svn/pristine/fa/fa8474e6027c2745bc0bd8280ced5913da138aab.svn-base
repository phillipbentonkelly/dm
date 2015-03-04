if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};

  module.loadAjaxItems = function() {
    // iterate through matched elements, load data, append to element if successful 
    module.$ajaxLoadItems.each(function(index, element) {
      var $element = $(element);
      var ajaxUrl = $element.attr('data-ajax-load');
      var ajaxSuccess = $element.attr('data-ajax-success');

      // find callback function - this allows dots in function name     
      var callback = window;
      $.each(ajaxSuccess.split("."), function(idx, val) {
      	if (callback[val]) callback = callback[val];
      });
      if (callback === window) callback = null;
      
      // This could be extended to support other stuff and setting dataType appropriately  
      $.ajax({
        url: ajaxUrl,
        dataType: 'html',
        success: function(data) {
          $element.append(data);
          $element.attr('data-ajax-loaded', true);
          if (callback) {
            callback(data);
          } else {
            $element.append(data);
          }
        }
      });
    });
  }
 
  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    // Grab DOM Elements with non-empty data-ajax-load attributes
    module.$ajaxLoadItems = $('[data-ajax-load]:not([data-ajax-load=""])');
  
    // Do AJAX loading
    module.loadAjaxItems();
  };

  // Kickoff
  $(document).ready(function() {
    module.init();
  });

})(window, jQuery);
