//Elevated feature stack tracking

$("#elevated-feature-stack .feat-tz-scroller article").each(function(i, article) {
  var count = i + 1;
  var link = $(article).find('.tz-title a').attr('href');
  var channel = omnitureSectionForTracking;
  var queryString = '?p1=right_rail:feature_stack' + ':module_' + count + ':' + channel;
  var cleanHref = bcom.util.mkCleanHref(link, queryString);
  $(article).find('.tz-title a').attr({href: cleanHref}).removeClass('omnistack');
  $(article).find('.feat-tz-img-mod').attr({href: cleanHref}).removeClass('omnistack');
});