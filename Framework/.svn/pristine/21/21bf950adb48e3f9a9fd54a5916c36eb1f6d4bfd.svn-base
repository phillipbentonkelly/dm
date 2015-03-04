ball = { url       : location.href,
         userAgent : navigator.userAgent,
         ajax      : [],
         errors    : [],
         marks     : {
    
         },
         dates     : {
           start : (new Date())
         }
      };

if (location.search.indexOf('bat1') > 0 || (Math.random() < 0.5)) { // 50%
  bat = (function(){
    var exports = {},
      mitt = '/mitt';
    
    exports.v = 1;
  
    exports.hit = function(json){
      $.ajax({
        type: 'POST',
        url : mitt + '/catch',
        contentType: 'application/json',
        data: JSON.stringify(json)
      });
    };
  
    exports.addTiming = function(){
      if (performance && performance.timing){
        ball.timing = performance.timing;
      }    
    };
  
    exports.timeAjax = function(){
      $( document ).ajaxSend(function(e, jqxhr, settings) {
        var now = (new Date()).getTime();
        jqxhr.startTime = now;
      });
      $( document ).ajaxComplete(function(e, jqxhr, settings) {
        var now = (new Date()).getTime();
        var result = {
            url  : settings.url,
            time : now - jqxhr.startTime
          };
        ball.ajax.push(result);
      });
      $( document ).ajaxError(function(e, jqxhr, settings, error) {
        var now = (new Date()).getTime();
        var result = {
            url: settings.url,
            time: now - jqxhr.startTime,
            error: error
          };
        ball.ajax.push(result);
      });
    };
  
    return exports;
  })();



  (function(){
    var getCookie = function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    };

    bat.timeAjax();
    window.onload = function(){
      setTimeout(function(){
        if (performance && performance.measure){
          performance.measure('load');
          ball.marks.load = performance.getEntriesByName('load').pop().duration
        }
        ball.dates.load = new Date();
        bat.addTiming();
        var rdb = getCookie('RDB');
        if (rdb){
          ball.rid = parseInt(rdb.substr(76,86), 10);
        } 
        ball.aam_uuid = getCookie('aam_uuid');
        bat.hit(ball);
      }, 1);
    };
  })();
}