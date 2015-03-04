/*
 * Utility methods for Boston.com
 *
*/

var bcom = bcom || {};

(function init(){
  if (typeof moment !== 'undefined') {
    moment.lang('en', {
      relativeTime : {
        future: "in %s",
        past: "%s ago",
        s: "seconds",
        m: "1 min",
        mm: "%d min",
        h: "1 hour",
        hh: "%d hours",
        d: "1 day",
        dd: "%d days",
        M: "1 month",
        MM: "%d months",
        y: "1 year",
        yy: "%d years"
      }
    });
  }
})();

bcom.util = {
  getCookie: function( key, _document, _$ ) {
    var cookie;
    var cookiePairStrings, pairCount, index;
    var currentPair, currentKey;
    var value;

    _document = _document || document;
    _$ = _$ || $;

    cookie = _document.cookie;
    cookiePairStrings = cookie.split(';');

    pairCount = cookiePairStrings.length;
    for (index = 0; index < pairCount; index++) {
        currentPair = cookiePairStrings[index].split('=');
        currentKey = _$.trim(currentPair[0]);
        if (currentKey === key) {
            value = currentPair[1];
            value = _$.trim(value);
            value = unescape(value);
            // according with BDC-511
            if (currentKey === "pathAuth" || currentKey === "RDB") {
              var date = new Date( new Date().getTime() + 1000*60*60*24*365*4 );
              _document.cookie = currentKey + "=" + value + "; expires=" + date.toUTCString() + "; path=/; domain=.boston.com";
            }
            break;
        }
    }

    return value;
  },

  _buildCookieString: function (key, value, expirationDays, _today) {
          var expiryDate;
          var cookieFragments;

          cookieFragments = [];

          cookieFragments.push(key + "=" + value);
          if (typeof expirationDays !== "undefined") {
              expiryDate = _today || new Date();
              expiryDate.setDate(expiryDate.getDate() + expirationDays);

              cookieFragments.push("expires=" + expiryDate.toUTCString());
          }
          cookieFragments.push("path=/");
          cookieFragments.push("domain=.boston.com");

          return cookieFragments.join(";");
      },

  setCookie: function (key, value, expirationDays) {
    document.cookie = bcom.util._buildCookieString(key, value, expirationDays);
  },

  getQueryStringValue: function( key ) {

    var queryStringArray = window.location.search.substr( 1 ).split( '&' );

    for ( var i = 0; i < queryStringArray.length; i++ ) {
      var keyValueArray = queryStringArray[i].split( '=' );
      if ( keyValueArray[0] === key ) {
          return keyValueArray[1];
      }
    }

    return false;
  },

  addScriptToHead: function(src){
    var $script = $('<script/>');
    $script.attr("type", "text/javascript");
    $script.attr("src", src);
    $script.async = false;
    $('head').append($script);
  },

  scrollNode: document.documentElement || document.body.parentNode || document.body,

  fixToContainer: function(el, index){
    var $this = $(el);
    var $parent = $this.parent();
    var parentTop = $parent.offset().top;
    var parentBottom = parentTop + $parent.height() - $this.outerHeight();
    var wtop = (window.pageYOffset || bcom.util.scrollNode.scrollTop) + $('.main-nav').height() + 50;
    //console.log($this);
    //console.log(parentBottom);
    if(wtop <= parentBottom && wtop >= parentTop) {
      if($(window).width() < 900) {
        $this.css('margin-top', 0);
      } else {
        $this.css('margin-top', wtop - parentTop);
      }
    } else if(wtop < parentTop) {
      $this.css('margin-top', 0);
    }
  },

  getCurrentBreakPoint: function() {
    // For ad use
    var width = $(window).width();
    if ( width < 768  ) { return 'mobile'; }
    if ( width < 960 ) { return 'tablet'; }
    return 'desktop';
  },

  scrollToEl: function( $el, padding){
    var elTop = $el.offset().top;
    if (padding){
      elTop -= padding;
    }
    $('html, body').animate( { scrollTop: elTop }, 500 );
    return $el;
  },

  stripHtml: function(html){
    return $('<p>' + html + '</p>').text();
  },

  getScripts: function(names, callback) {
    var received = 0;
    var realCallback = function() {
        received++;
        if (received === names.length)
            $(callback);
    };

    for (var i = 0; i < names.length; i++)
        $.getScript(names[i], realCallback);
  },

  clearSVars: function(s){
    for (var i=0; i < 75; i++) {
      s['prop'+i]='';
      s['eVar'+i]='';
      if(i<=5)
        s['hier'+i]='';
    }
    svarArr = ['pageName','channel','products','events','campaign','purchaseID','state','zip','server','linkName'];
    for (var i=1; i < svarArr.length ; i++) {
       s[svarArr[i]]='';
    }
  },
  saveSVars: function(s){
    //holding our vars in an object for later use
    var sHolder = {};

    for (var i=0; i < 75; i++) {
      sHolder['prop'+i] = s['prop'+i];
      sHolder['eVar'+i] = s['eVar'+i];
      if(i<=5)
        sHolder['hier'+i] = s['hier'+i];
    }
    svarArr = ['pageName','channel','products','events','campaign','purchaseID','state','zip','server','linkName'];
    for (var i=1; i < svarArr.length ; i++) {
       sHolder[svarArr[i]] = s[svarArr[i]];
    }
    return sHolder;
  },
  resetSVars: function(saved) {
    //saved is the eVars and props we are restoring to omniture after a s.t() clear
    for (var i=0; i < 75; i++) {
      s['prop'+i] = saved['prop'+i];
      s['eVar'+i] = saved['eVar'+i];
      if(i<=5)
        s['hier'+i] = saved['hier'+i];
    }
    svarArr = ['pageName','channel','products','events','campaign','purchaseID','state','zip','server','linkName'];
    for (var i=1; i < svarArr.length ; i++) {
       s[svarArr[i]] = saved[svarArr[i]];
    }
  },
  getOrdinal: function(n){
    var s=["th","st","nd","rd"],
        v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
  },
  mkCleanHref: function(link, queryStr){
    /** DM-43: Compensate for urls with anchor tags **/
    if(link != undefined){
      var hash = link.indexOf('#');
      // if we have an anchor tag in our url, move it to the end
      if(hash > -1){
        var splitUrl = link.split('#');
        var page = splitUrl[0];
        var anchorTag = '#' + splitUrl[1]; //re-apply the hash to the anchor tag
        return page + queryStr + anchorTag; 
      }else{
         return link + queryStr;
      }
    }else{
      return false;
    }
  }

};