// *
// *  Omniture Click Tracking
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};

  module.trackClick = function(link) {
    var s = s_gi('nytbglobe');
    module.clearVars();
    s.tl(link, 'o', $(link).data().omniture);
     module.clearVars();
  };

  module.clearVars = function() {
    for (var i=0; i < 75; i++) {
      s['prop'+i]='';
      s['eVar'+i]='';
      s['c'+i]='';
      s['v'+i]='';
      if(i<=5)
        s['hier'+i]='';
     }
     svarArr = ['list1','pageName','channel','products','events','campaign','purchaseID','state','zip','server','linkName'];
    for ( i=1; i < svarArr.length ; i++) {
       s[svarArr[i]]='';
    }
  };

  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  module.eventHandlers = function() {
    $(document).on('click', '[data-omniture]', function(event) {
      module.trackClick(this);
    });
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    module.eventHandlers();
  };

  // Kickoff
  $(document).ready(function() {

    if ($('[data-omniture]').length) { module.init(); }
  });

})(window, jQuery);