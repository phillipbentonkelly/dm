// *
// *  Module Name
// *

if (typeof dm === 'undefined') { dm = {}; }

dm.searchPanel = {};

(function( win, $, undefined ) {
  'use strict';


  dm.searchPanel = {

     allOpen: false,

     // ------------------------------------------------------------
    //  * Init
    // ------------------------------------------------------------

     init: function(){
        $('.page-search__row--level-two').hide();
        $('.page-search__row--level-three').hide();
        this.eventHandlers();

     },

     // ------------------------------------------------------------
    //  * Event Handlers
    // ------------------------------------------------------------

     eventHandlers: function(){
        var that = this;

        $('.page-search__button--level-two-toggle').click(function(e){
            e.preventDefault();
            if(that.allOpen){
                $('.page-search__row--level-two, .page-search__row--level-three').hide();
                $(this).children('span').toggle();
                $('.page-search__button--level-three-toggle').removeClass('select2-panel-open');
                that.allOpen = false;
            }else{
               $('.page-search__row--level-two').toggle();
               $(this).children('span').toggle();
            }
            
        });

        $('.page-search__button--level-three-toggle').click(function(e){
            e.preventDefault();
            $('.page-search__row--level-three').toggle();
            $(this).toggleClass('select2-panel-open');
            that.allOpen = true;
        });

        $('.page-search__button--close').click(function(e){
            $('.page-search__row--level-three').hide();
            $('.page-search__button--level-three-toggle').removeClass('select2-panel-open');
            that.allOpen = false;
        });

     },



  };

  // Kickoff
  $(document).ready(function() {
    if ($('.page-search').length) { 
        dm.searchPanel.init(); 
    }
  });

})(window, jQuery);