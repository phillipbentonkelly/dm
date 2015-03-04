/*
*
*   This file adds p1 tags to various links thoughout the site.
*   Why do this in JS you might ask. That seems crazy you might say.
*   A: Methode
*   Hopefully someday we can kill this file. But I'm not holding my breath.
*
*/
function addP1(linkObj, p1){
  var href = $(linkObj).attr('href');
  var cleanHref = bcom.util.mkCleanHref(href, p1);
  linkObj.attr('href', cleanHref );
}

// Top teases on homepage
if ( $('#top-tz-list').length ) { // Safety first!
  $("#top-tz-list li").each(function(i, li) {
      var count = i + 1;
      var link = $(li).find('a').attr('href');
      var queryString = '?p1=Topofpage:sub_headline_' + count;
      var cleanHref = bcom.util.mkCleanHref(link, queryString);
      $(li).find('a').attr({href: cleanHref});
  });
}

// Elevated feature stack
if ( $('#elevated-feature-stack').length) { // Safety first!
  $("#elevated-feature-stack article.feat-tz").each(function(i, article) {
    var count = i + 1;
    var queryString = '?p1=right_rail:feature_stack' + ':module_' + count + ':' + omnitureSectionForTracking;
    var $links = $(article).find('.omnistack');
    $links.each(function(i, link) {
      var $linkObject = $(link);
      var linkHref = $linkObject.attr('href');
      var cleanHref = bcom.util.mkCleanHref(linkHref, queryString);
      $linkObject.attr({href: cleanHref});
    });
  });
}

// Lower feature stack
// feat-tz-top changed to lower-feature-stack
if ( $('#lower-feature-stack').length ) { // Safety first!
  $('#lower-feature-stack article.feat-tz').each(function(i, article) {
    var queryString = '?p1=lower_rail:feature_stack:' + omnitureSectionForTracking;
    var $links = $(article).find('.omnistack');
    $links.each(function(i, link) {
      var $linkObject = $(link);
      var linkHref = $linkObject.attr('href');
      var cleanHref = bcom.util.mkCleanHref(linkHref, queryString);
      $linkObject.attr({href: cleanHref});
    });
  });
}

// Carousel Leads
if ( $('.lead-tz').length && (bcom.dfp.adUnit == "boston.com/homepage")) { //Safety First
  $('.lead-tz').each(function(i, tease) {
    var $links = $(tease).find('.omniclick');
    $links.each(function(i, link) {
      var $linkObject = $(link);
      var linkHref = $linkObject.attr('href');
      var queryString = '?p1=Topofpage:Carousel_lead_headline';
      if ($linkObject.hasClass('lead-tz-art-bd')) {
        queryString = '?p1=Topofpage:Carousel_lead_image';
      }
      if ($linkObject.parent().hasClass('list-item')) {
        queryString = '?p1=Topofpage:Carousel_lead_linklist';
      }
      var cleanHref = bcom.util.mkCleanHref(linkHref, queryString);
      $linkObject.attr({href: cleanHref});
    });
  });
}

// Carousel Sub
if ( $('.lead-list > .lead-nav-item').length && (bcom.dfp.adUnit == "boston.com/homepage")) { //Safety First
  $('.lead-list > .lead-nav-item').each(function(){
    addP1( $(this).children('a[data-omniclick*="image"]') , "?p1=Topofpage:Carousel_sub_image");
    addP1( $(this).children('a[data-omniclick*="headline"]') , "?p1=Topofpage:Carousel_sub_headline");
  });
}

// Recent Stories List
if ( $('.section-recent-list').length ) { //Safety First
  $('.section-recent-list__item').each(function(i, item){
    var $link = $(item);
    var $imageLink = $link.find('.section-recent-list__image-link');
    if ($imageLink.length) {
      $imageLink.attr({ href: $imageLink.attr('href') + '?p1=recent_image_' + (i + 1) + '_hp' });
    }
    var $headlineLink = $link.find('.section-recent-list__headline-link');
    if( $headlineLink.length ){
      var queryString = '?p1=recent_headline_' + (i + 1) + '_hp';
      var headlineLinkHref = $headlineLink.attr('href');
      var cleanHref = bcom.util.mkCleanHref(headlineLinkHref, queryString);
      $headlineLink.attr({ href: cleanHref });
    }
    
  });
}
 
// Recent Stories List
if ( $('.js-add-p1').length ) { //Safety First
  // to allow multiple js-add-p1's on a page
  $('.js-add-p1').each(function() {
    var p1Template = $(this).data('p1');
    var children = $(this).children();
    children.each(function(i, item) {
      var anchor = $(item).find('a');
      var p1Value = p1Template.replace('#', i + 1);
      anchor.attr({ href: anchor.attr('href') + '?p1=' + p1Value });
    });
  });
}
