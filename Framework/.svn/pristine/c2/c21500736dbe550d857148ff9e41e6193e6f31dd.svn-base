// // *
// // *  Split List
// // *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};

  module.setUpLists = function() {

    $.each( module.$lists, function(index, list) {
      var obj = {};
      var $list = $(list);
      var listLength = $list.children().length;
      var halfListLength = Math.floor(listLength / 2);

      // Store some information about the original list
      obj.$listParent = $list.parent();
      obj.listType = ($list.is('ol')) ? 'ol' : 'ul';
      obj.breakPoints = $list.data('break');

      // Create the split lists
      obj.$firstList = $list.clone().html($list.clone().children().slice(0, halfListLength));
      obj.$secondList = $list.clone().html($list.clone().children().slice(halfListLength, listLength));

      if ( obj.listType === 'ol' ) {
        obj.$secondList.attr({ start: halfListLength + 1 });
      }

      // Store the original version of the list with siblings
      obj.$originalVersion = obj.$listParent.children();

      // Build the split list template
      obj.splitTemplate = module.template(obj);

      // Store the split version of the list with siblings
      var $originalVersionWithoutLists = obj.$listParent.clone().children().not('ul, ol');
      obj.$splitVersion = $originalVersionWithoutLists.add(obj.splitTemplate);

      // Populate the lists array
      module.listsArray.push(obj);

    });

    module.redrawLists();

  };

  module.redrawLists = function() {

    $.each( module.listsArray, function(index, listObject) {
      for (var i = 0; listObject.breakPoints.length > i; i++) {
        var windowWidth = window.innerWidth;
        var lowerBreakpoint = listObject.breakPoints[i][0];
        var higherBreakpoint = listObject.breakPoints[i][1];

        // Check to see if we're in between breakpoints
        if (windowWidth >= lowerBreakpoint && windowWidth <= higherBreakpoint) {
          listObject.$listParent.html(listObject.$splitVersion);
          return;
        } else {
          // Otherwise just add back the original list
          listObject.$listParent.html(listObject.$originalVersion);
        }
      }
    });

  };

  module.template = function(listObject) {
    return [
      '<div class="grid--6-6">',
        '<div class="grid-6 grid-6--no-stack">',
          listObject.$firstList.prop('outerHTML'),
        '</div>',
        '<div class="grid-6 grid-6--no-stack">',
          listObject.$secondList.prop('outerHTML'),
        '</div>',
      '</div>'
    ].join('');
  };

  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  module.eventHandlers = function() {
    $(window).on('debouncedresize', function(){
      module.redrawLists();
    });
  };

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {

    module.$lists = $('.js-split-list');
    module.listsArray = []; //will contain objects of lists

    module.setUpLists();
    module.eventHandlers();

  };

  // Kickoff
  $(document).ready(function() {
    if ($('.js-split-list').length) { module.init(); }
  });

})(window, jQuery);