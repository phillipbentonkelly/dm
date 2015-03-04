;(function(win, $, undefined){
   "use strict";

   var exports = win.ads || (win.ads = {});
   var instances = exports.instances || (exports.instances = {});
   var controller = win.ads.instances.RMController;

   var date = new Date();

   var console = win.console || {
      log: function(){},
      warn: function(){},
      error: function(){}
   };

   var Overlay = exports.Overlay = function(args){
      // keep track of state of the site
      var is_open = false;

      // keep track of the user's viewing experience
      // this is needed later to swap out the creative if necessary
      var has_cookie = false;

      var nargs = args || {};

      // basic DFP settings here
      // these should be replaced by macros that will be replaced
      // by dfp when being served
      var dfpSettings = {
         creative: nargs.creative,
         replayCreative: nargs.replayCreative,
         fallback: nargs.fallback,
         freeForm: nargs.freeForm,
         pagename: nargs.pagename || "homepage",
         width: nargs.width || 1300,
         height: nargs.height || 850,
         dropAmount: nargs.dropAmount || 10,
         cookieName: nargs.cookieName || "overlay_" + date.getMonth().toString() + date.getDate().toString(),
         autoTrackingPixel: nargs.autoTrackingPixel || '',
         replayTrackingPixel: nargs.replayTrackingPixel || '',
         testpage: !!(win.location.search.match(/testpage/)),
         clickTags: nargs.clickTags
      };

      // some basic settings for later use
      // this is used for flexability but I dont know how it's helping
      var settings = {
         replaceID: 'Overlay-replace',
         imageClassName: 'Overlay-fallback',
         mapname: 'Overlay_fallback'
      };

      var cache;

      var setCookie = function(name, value){
         var cookieString = '';
         var date = new Date();

         date.setHours(23);
         date.setMinutes(59);
         date.setSeconds(59);

         cookieString += name + '=' + value + '; ';
         cookieString += 'expires=' + date.toUTCString() + '; ';
         cookieString += 'domain=.boston.com; ';
         cookieString += 'path=/';

         document.cookie = cookieString;
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

      /**
       * Updates the CSS for the overlay
       * this could/should be added to the CSS file that will be loaded in
       *
       * Some styles still have to be set dynamically when they're calculating the 
       * negative left value to make centered
       * this could/should be rethought so that it can be all CSS
       */
      function updateOverlayStyles(){
         var $overlay = $('.Overlay');
         var $overlay_replace = $('#Overlay-replace');
         
         $overlay_replace
            .css({
               position: 'relative',
               // left: '50%',
               // 'margin-left': -(parseInt(dfpSettings.width, 10)/2) + 'px',
               top: dfpSettings.dropAmount + 'px',
               display: 'block',
               margin: '0 auto'
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

      /**
       * Updates the flash creatives.
       * It can be called on init or it can be called on replay
       * this is important to note because it determines the creative to serve 
       * based on the cookie values.
       */
      function replaceFlash(){
         var CreativeToUse = !has_cookie ? dfpSettings.creative : dfpSettings.replayCreative;
         if(!/swf/.test(CreativeToUse)){
            console.log('statics only');
            updateOverlayStyles();
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

      /**
       * return public methods. 
       * This should include methods that are required through the rmcontroller
       */
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
               .addClass(settings.imageClassName);
            // append the fallback to the container
            staticFallback.appendTo(cache.container);

            // add the right class to the container
            cache.container.className += (dfpSettings.freeForm ? 'freeform' : 'boxed');

            controller.addToWindow(cache.container);
            setTimeout(replaceFlash, 2000);

            return this;
         },
         replay: function(){
            is_open = true;
            cache
               .$body
               .find('.Overlay')
               .show();
            if(!has_cookie){
               has_cookie = true;
               replaceFlash();
            }
         },
         hidereplay: function(){
            is_open = false;
            cache
               .$body
               .find('.Overlay')
               .hide();
         }
      };
   };

   // // make sure that the controller knows what the function names
   // // will be called on the window
   // controller.setOpen('replay');
   // controller.setClose('hideoverlay');

   // // create a new instance of the overlay
   // // this will be passed to the controller and used to creative functionality
   // var p = instances.Overlay = new Overlay();

   // var p1 = instances.Overlay = new Overlay({
   //    creative: 'http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg',
   //    replayCreative: 'http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg',
   //    fallback: 'http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg'
   // });
   // var p2 = instances.Overlay = new Overlay({
   //    creative: 'http://cache.boston.com/images/ads/citizens/010414/citizens_tall.jpg',
   //    replayCreative: 'http://cache.boston.com/images/ads/citizens/010414/citizens_tall.jpg',
   //    fallback: 'http://cache.boston.com/images/ads/citizens/010414/citizens_tall.jpg'
   // });

   // // add the overlay that was just created to the controller
   // // there needs to be at least three for it to initialize anything
   // controller.addCreative('fwd', p, {
   //    open: p.replay,
   //    close: p.hidereplay,
   //    addCreative: function(){},
   //    init: p.init
   // });
   // controller.addCreative('pwd-tall', p2, {
   //    open: p2.replay,
   //    close: p2.hidereplay,
   //    addCreative: function(){},
   //    init: p2.init
   // });
   //    controller.addCreative('pwd-wide', p1, {
   //    open: p1.replay,
   //    close: p1.hidereplay,
   //    addCreative: function(){},
   //    init: p1.init
   // });

   return;
}(window.top, window.top.jQuery));