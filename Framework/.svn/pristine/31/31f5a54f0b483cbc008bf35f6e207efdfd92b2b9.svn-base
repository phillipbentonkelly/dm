;(function(){
   "use strict";

   var win = win || top.window;

   var exports = win.ads || (win.ads = {});
   var instances = exports.instances || (exports.instances = {});
   var controller = win.ads.instances.RMController;

   var date = new Date();

   var console = win.console || {
      log: function(){},
      warn: function(){},
      error: function(){}
   };

   // console.log(swfobject);
   // win.swfobject = controller.swfobject = swfobject;

   var FallBackOverlay = exports.FallBackOverlay = function(args){
      // keep track of state of the site
      var is_open = false;

      // keep track of the user's viewing experience
      // this is needed later to swap out the creative if necessary
      var has_cookie = false;

      // timeout reference for statics
      var autoplay;

      args = args ||  {};

      // basic DFP settings here
      // these should be replaced by macros that will be replaced
      // by dfp when being served
      var dfpSettings = {
         creative: args.creative || "http://cache.boston.com/images/ads/citizens/010414/citizens_1300x850_010414.swf",
         replayCreative: args.replayCreative || "http://cache.boston.com/images/ads/citizens/010414/citizens_1300x850_010414.swf",
         fallback: args.fallback || "http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg",
         freeForm: args.freeForm || false,
         pagename: args.pagename || "homepage",
         width: args.width || 1300,
         height: args.height || 850,
         dropAmount: args.dropAmount || 10,
         cookieName: args.cookieName || "overlay_" + date.getMonth().toString() + date.getDate().toString(),
         autoTrackingPixel: args.autoTrackingPixel || '',
         replayTrackingPixel: args.replayTrackingPixel || '',
         testpage: !!(win.location.search.match(/testpage/)),
         clickTags: args.clickTags || {
            clickTag: "http://boston.com",
            clickTAG1: "http://boston.com",
            clickTAG2: "http://boston.com",
            clickTAG3: "http://boston.com",
            clickTAG4: "http://boston.com"
         }
      };

      // some basic settings for later use
      // this is used for flexability but I dont know how it's helping
      var settings = {
         replaceID: 'Overlay-replace',
         imageClassName: 'Overlay-fallback',
         mapname: 'Overlay_fallback'
      };

      var setCookie = function(name, value){
         var cookieString = '',
            date = new Date();

         date.setHours(23);
         date.setMinutes(59);
         date.setSeconds(59);

         cookieString += name + '=' + value + '; ';
         cookieString += 'expires=' + date.toUTCString() + '; ';
         cookieString += 'domain=.boston.com; ';
         cookieString += 'path=/';

         top.document.cookie = cookieString;
         return cookieString;
      };

      // hasCookie accepts name, value and set
      // name and value are obvious, but set is the following:
      //
      // set: boolean 
      // set to true for the cookie to be set if there is not one found (and it's not a testpage)
      // set to false if you would not like to set the cookie if there is not one found.
      var hasCookie = function(name, value, set){
         var cookies = top.document.cookie.split('; '),
            len = cookies.length,
            lookingFor = name + '=' + value,
            i = 0;

         if(dfpSettings.testpage){
            return false;
         }

         for(; i < len; i++){
            if(cookies[i] === lookingFor){
               return true;
            }
         }

         if(!!set){
            setCookie(name, value);
         }

         return false;
      };

      var cache;

      function updateOverlayStyles(){
         var $overlay = $('.Overlay');
         var $overlay_replace = $('#Overlay-replace');
         
         $overlay_replace
            .css({
               position: 'relative',
               margin: '0 auto',
               top: dfpSettings.dropAmount + 'px'
            });
         $overlay
            .css({
               width: '100%',
               height: '100%',
               'background-color': $overlay.hasClass('boxed') ? 'rgba(0,0,0,.5)' : 'transparent',
               position: 'fixed',
               top:0,
               left:0,
               'z-index': 9001,
               display: (has_cookie ? 'none': 'block')
            });

      }

      function replaceFlash(){
         var CreativeToUse = !has_cookie ? dfpSettings.creative : dfpSettings.replayCreative;
         if(!/swf/.test(CreativeToUse)){
            console.log('statics only');
            updateOverlayStyles();
            autoplay = setTimeout(closeOverlay, 10*1000);
            return;
         }
         // update the static with a flash creative
         controller.replaceWithFlash({
            url: CreativeToUse,
            replaceID: 'Overlay-replace',
            width: dfpSettings.width,
            height: dfpSettings.height,
            callback: function(res){
               console.log(res);
               updateOverlayStyles();
            },
            flashVars: dfpSettings.clickTags
         });
      }

      function closeOverlay(){
         is_open = false;

         if(autoplay){
            clearTimeout(autoplay);
         }
         cache
            .$body
            .find('.Overlay')
            .hide();
      }

      function playOverlay(){
         is_open = true;
         cache
            .$body
            .find('.Overlay')
            .show();
         if(!has_cookie){
            has_cookie = true;
            replaceFlash();
         }
      }

      return {
         init: function(){
            has_cookie = hasCookie(dfpSettings.cookieName, 'seen', true);
            cache = {
               $body: controller.getBody(),
               container: document.createElement('div')
            };

            cache.container.className += "Overlay ";

            var staticFallback = $("<img />")
               .attr({
                  usemap: '#' + settings.mapname,
                  src: dfpSettings.fallback,
                  id: settings.replaceID
               })
               .css({
                  margin: '0 auto',
                  display: 'block'
               })
               .addClass(settings.imageClassName);
            // append the fallback to the container
            staticFallback.appendTo(cache.container);

            // add the right class to the container
            cache.container.className += (dfpSettings.freeForm ? 'freeform' : 'boxed');

            controller.addToWindow(cache.container);
            setTimeout(replaceFlash, 2000);

            return this;
         },
         replay: playOverlay,
         hidereplay: closeOverlay,
         addCreative: function(){}
      };
   };

   instances.Overlay1 = new FallBackOverlay({
      creative: 'http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg',
      replayCreative: 'http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg',
      fallback: 'http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg'
   });

   instances.Overlay2 = new FallBackOverlay({
      creative: 'http://cache.boston.com/images/ads/citizens/010414/citizens_tall.jpg',
      replayCreative: 'http://cache.boston.com/images/ads/citizens/010414/citizens_tall.jpg',
      fallback: 'http://cache.boston.com/images/ads/citizens/010414/citizens_tall.jpg'
   });


   // instances['fallbackoverlay'] = new FallBackOverlay();

   return;
}());