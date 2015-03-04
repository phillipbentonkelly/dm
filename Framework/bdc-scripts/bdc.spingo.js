// ------------------------------------------------------------
//  * Init
// ------------------------------------------------------------
  var logSpinGoNavigation = function(data) {
    var url = window.location.toString();
    if (typeof window.s !== "object" && typeof window.s.t !== "function") return;
    // window.s.linkTrackVars = 'prop6,prop13,prop15,prop16';
    // window.s.linkTrackEvents = event;
    if( url === window.s.pageURL ) return;
    window.s.pageURL = url;
    window.s.prop1 = 'Entertainment | Events';
    window.s.prop6 = 'SpinGo page';
    window.s.prop13 = data.entityId + ' | ' + $(data.element).find('.sg-modal-header [itemprop="name"]').text();
    window.s.prop15 = $('.sg-search-input').val();
    window.s.prop16 = $('.sg-filterLabel span.sg-radiusLabel').text() + ' | ' + $('.sg-filterLabel span.sg-cityLabel').text();
    window.s.t();
  };

  var injectSpinGoAd = function(element) {
    // onClick tracking for Promote button on event listing
    $('.sg-promote-link').attr('data-omniture', 'events | promote listing');

    var eventHash = window.location.hash.replace(/[^a-z0-9-]/gi,'_');

    googletag.pubads().setTargeting( 'pgtype', 'events' );
    googletag.pubads().setTargeting( 'pageurl', eventHash );
    googletag.pubads().setTargeting( 's4', '' );

    var sidebar = $('.sg-modal-secondary-column');
    sidebar.prepend($('<div class="spingo-ad" style="padding-bottom:20px;"></div>'));

    var ad = { id: 'ad_bigbox',
      size: [[300,250]],
      pos: 'toprightslot'
    };

    if (SpinGoAd.adMarkup) {
      SpinGoAd.adMarkup.appendTo($('.spingo-ad'));
      googletag.pubads().refresh([SpinGoAd.adDefinition]);
      return;
    }

    $('<div id="' + ad.id + '"></div>').appendTo($('.spingo-ad'));
    SpinGoAd.adDefinition = googletag.defineSlot('/' + bcom.dfp.networkCode + '/' + bcom.dfp.keyValuePairs.s1 + '/' + bcom.dfp.keyValuePairs.s2 + '/' + bcom.dfp.keyValuePairs.s3, ad.size, ad.id).addService(googletag.pubads()).setTargeting('pos', ad.pos);
    googletag.display(ad.id);
  };

  var refreshSpinGoAd = function() {
    SpinGoAd.adMarkup = $('#ad_bigbox').detach();
  };

  var SpinGoAd = {
    adDefinition : null,
    adMarkup : false
  };

  var SpinGo = {
    config: {
      fixedTopOffset: 100,
      onNavigation: function(data) {
        if (data.filters) return; // prevents variables from upating on filter changes.
        if (!data.entityClass) return; // prevents variables from updating on intial page load
        if ($(data.element).find('.sg-modal-header [itemprop="name"]').text() === '{{event.title}}') return; // prevent variables from updating if DOM is not up-to-date
        if (window.s.pageName.match(/\|\s*homepage$/i)) {
          window.s.pageName = window.s.pageName.replace(/\|\s*homepage$/i, '| Events Detail');
        }
        var entityClass = data.entityClass;
        if (entityClass == "event" || entityClass == "venue" || entityClass == "contributor") {
          injectSpinGoAd(data.element);
          data.leaving.then(function(){
            refreshSpinGoAd();
          });
        }
        if (data.entityClass == "event") {
          window.eventId = data.entityId;
        }
        logSpinGoNavigation(data);
      }
    }
  };
   
  (function(){var a;a=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;return c=768,e=function(){return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch},l=function(){return a.outerWidth<c||a.screen.width<c},d=function(){return"desktop"===a.sessionStorage.getItem("sgForcePlatform")},f=function(){return navigator.userAgent.indexOf("SpinGoCrawler")>-1},m=function(){return e()&&l()&&!f()&&!d()},h=function(b){return(""+a.location.pathname+a.location.hash).match(b)},j=function(){var b,c,d;return(b=null!=(c=a.location.search.match(/EventID=(\d+)/))?c[1]:void 0)?b:(b=null!=(d=h(/event\/(\d+)/))?d[1]:void 0)?b:void 0},k=function(){var a,b;return(a=null!=(b=h(/venue\/(\d+)/))?b[1]:void 0)?a:void 0},i=function(){var a,b;return(a=null!=(b=h(/contributor\/(\d+)/))?b[1]:void 0)?a:void 0},(g=function(){var b,c;return a.location.search.match(/forcePlatform=desktop/)&&a.sessionStorage.setItem("sgForcePlatform","desktop"),m()?(c="#/home",(b=j())&&(c="#/events/"+b),(b=k())&&(c="#/venues/"+b),(b=i())&&(c="#/contributors/"+b),c):void 0})()},window.sgMobileRedirect=function(b){var c,d;if(d=a(window,document))return c="http://"+b.calendar.subdomain+"."+b.spinGoDomain+"/mobile/"+d,window.top.location.replace(c)}}).call(this);
  var SpinGo = (window.SpinGo = window.SpinGo || {});
    SpinGo.vars = {
      "calendar": {
        "id": 1044,
        "subdomain": "bostonevents",
        "parentUrl": "http://www.boston.com",
        "twitter": "BostonDotCom",
        "userLocation": false,
        "postalCode": "02108",
        "radiusMiles": 50 },
      "spinGoDomain": "spingo.com",
      "apiToken": "b845e1fe09bf21cd1c73780ab53c7dbd206aa8cd4caa56669d4f4d6db0bdc997",
      "calendarApiHost": "calendarapi.spingo.com",
      "loggingApiHost": "loggingapi.spingo.com",
      "theme": {
        "featuredColor": "#9E1C25",
        "accentColor": "#1E1F1E" }
    };
    sgMobileRedirect(SpinGo.vars);

    (function() {
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement('script');
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", "//d16twqtnxc0kgx.cloudfront.net/apps/calendar-ui/v3.4.3/calendar-ui.js");
      head.appendChild(script);
      SpinGo.css = document.createElement('link');
      SpinGo.css.setAttribute("type", "text/css");
      SpinGo.css.setAttribute("rel", "stylesheet");
      SpinGo.css.setAttribute("href", "//d16twqtnxc0kgx.cloudfront.net/apps/calendar-ui/v3.4.3/calendar-ui.css");
      head.appendChild(SpinGo.css);
  }());
