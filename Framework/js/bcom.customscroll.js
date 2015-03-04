

if (typeof bcom === "undefined") { bcom = {}; }
/*
 * Weather module for Boston.com prototype
 * by Chris Sherlin with edits by Jesse Marple
 * 
 * This handles the custom scrollbar UX
 * this utilizes the custom content scroller
 * http://manos.malihu.gr/jquery-custom-content-scroller/
*/
bcom.customScroll = (function(){
    'use strict';

    var module = {};

  module.init = function(){

    if ($('html').hasClass("ie8")) {
      return;
     }

    if ($(window).width() >= 520) {  
        $(".toc-mod").mCustomScrollbar({
        contentTouchScroll: true,
        scrollInertia: 100
        });
     } else {
        $(".toc-mod").css('overflow-y','scroll');
     }   
  };

  module.initFilterNav = function(){
    /*$(".filter-nav-mod").scroll(function(){
      $(".filter-nav-mod").addClass('no-after');
    });*/
    if ($(window).width() >= 520) {  
        $(".filter-nav-mod").mCustomScrollbar({
          axis: "x",
          theme: "dark",
          contentTouchScroll: true
        });
        $(".filter-nav-mod").addClass('no-after');

     } else { }   
  };

  return module;

}());

// kick off for toc-mod 
$(function(){
    if($('.toc-mod')){
        bcom.customScroll.init();    
    }
});

//hide the nav mod arrow 
$(function(){
  if($('.filter-nav-mod')){
      bcom.customScroll.initFilterNav();
  }
});
