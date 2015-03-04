var SBB_options = {
   static_pencil: 'http://cache.boston.com/images/ads/dunkin/102413/6131_DD_959x30.jpg',
   static_bb: 'http://cache.boston.com/images/ads/dunkin/102413/6131_DD_959x300.jpg',
   flash_pencil: 'http://cache.boston.com/images/ads/dunkin/102413/6131_DD_959x30.swf',
   sbb_creative: 'http://cache.boston.com/images/ads/dunkin/102413/6131_DD_959x300.swf',
   sbb_creative_replay: 'http://cache.boston.com/images/ads/dunkin/102413/6131_DD_959x300.swf',
   sbb_creative_fallback: '',
   width: 959,
   pencil_height: 30,
   sbb_height: 300,
   clickTags: {
         clickTAG: 'http://boston.com',
         clickTAG1: 'http://google.com',
         clickTAG2: 'http://apple.com',
         clickTAG3: 'http://apple.com'
      },
   cookie_name: 'sbb_template',
   delay_load: false
};

/**
 * -------------------------------
 * template-template overview
 * -------------------------------
 *
 * A lot of this is pretty basic and well commented. The template 
 * contains all of the setup for the object oriented approach for 
 * boston.com rich media templates. A few conventions are loosely followed here:
 *
 * - multi-word variables are underscored (variable_name)
 * - functions are camelcase (functionName)
 * - objects that create new instances of said template are caps (SBB)
 *
 * This approach should be able to fold into a new boston.com responsive layout with minor tinkering.
 *
 * ----------------
 * NOTES
 * ----------------
 * When using window, document, or body, use the window.top version of what you're accessing
 * This is incase you get stuck in an iframe, you will always have access to the top most window.
 * as you read through the comments, you will notice where "safe" definitions are.
 * 
 * All new instances (really it should be just one) of richmedia should be appended to the instances 
 * object on the window, that way you can access the instance and "alias" functions so that the creative
 * can call any method made visible. 
 *
 * example: 
 * win.openCreative = ads.instances[o.cookie_name].open;
 * o
 * win.openCreative = P.open;
 */
;(function(o){
   "use strict";

   // this is a new addition and important to understand
   // If an ad is forcing an iframe, this line will force win to
   // be equal to the top most window. This way when you start adding 
   // elements to the DOM, you should be adding it to the top most window
   var win = (this === window.top ? window: window.top);

   // defining doc as win.document makes sure that the document is that of the
   // top most parent. Again, this is to combat the possibility of being stuck into an iframe
   var doc = win.document;

   // define $ for safe use as the alias. defining off of win makes it so that you dont have to 
   // have jQuery defined in an iframe if you're forced there.
   var $ = win.jQuery;

   // remember ads
   var ads = win.ads || (win.ads = {});

   // alias the controller to something thats actually typable
   var controller = win.ads.instances.RMController;

   // make exports be window.ads
   // window.ads is either a collection of RichMedia ad objects
   // or a new empty object... one or the other
   var exports = win.ads || (win.ads = {});

   // instances is a collection of what's already on the page
   // you should add any new ad instances to this so that you
   // have access to it from the window.
   var instances = exports.instances || (exports.instances = {});

   // check the search query to see if
   // the user wants it to be a testpage
   var is_testpage = /testpage/ig.test(win.location.search);

   // console safety net
   // this is so that you can comfortably use console without
   // being afraid to forget to remove it for production
   // it might be wise to force logs to be empty functions at the end,
   // just to make sure that we arent showing too much info to anyone looking in
   var console = win.console || {
      log: function(){},
      warn: function(){},
      error: function(){},
      time: function(){},
      timeEnd: function(){}
   };

   // setCookie sets a cookie that will expire at midnight that night
   // this expires value is not able to be set by you...
   // well I mean, you can if you'd like but why would you?
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

      doc.cookie = cookieString;
      return cookieString;
   };

   // hasCookie accepts name, value and set
   // name and value are obvious, but set is the following:
   //
   // set: boolean 
   // set to true for the cookie to be set if there is not one found (and it's not a testpage)
   // set to false if you would not like to set the cookie if there is not one found.
   var hasCookie = function(name, value, set){
      var cookies = doc.cookie.split('; '),
         len = cookies.length,
         lookingFor = name + '=' + value,
         i = 0;

      if(is_testpage){
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

   // returns the swf from the DOM
   // this should be used to call methods 
   // on the swf object
   function thisMovie(movieName) {
      if(win.navigator.appName.indexOf("MSIE") != -1) {
         return win[movieName];
      } else {
         return doc[movieName];
      }
   }

   // call on the window so that when the creative is done, 
   // you have controll to send it to a new frame
   // things to note: The creative should impliment external interface calls
   // calls should be mapped accordingly and differs from AS2 to AS3
   // If you have some issues getting it to work, make sure appropriate security settings are
   // included in the flash creative.
   var GoToFrame = win.GoToFrame = function(adName, fn){
      var ad = thisMovie(adName),
         frameNum = (typeof fn == 'undefined' ? 1: fn);

      try{
         ad.GoToFrame(frameNum);
      }catch(err){
         console.log('Could not trigger GoToFrame\n' + err);
      }
   };

   // doTracking will use omniture to track events
   // the text arg will be what gets appended to the text that is sent to omniture
   // o.cookie_name is the advertiser (and sometimes date)
   // ex: jetblue_0927_13 | Event | user closed
   // 
   // this is also added to the window for creatives that call it on their own
   var doTracking = win.doTracking = function(text){
      var s = s_gi('nytbglobe'),
         textString = o.cookie_name + ' | Event | ' + text;
         
      s.tl(true,'o',textString);
      console.log(textString);
      return;
   };

   console.log('SBB');

   // main definition of the template is all here
   // All functionality should be build into here. 
   // anything on exports will be available through window.ads
   var SBB = exports.SBB = function(){
      // get the topbody for appending and stuff
      // might not need this right now and should remove if
      // not used later on
      var topBody = controller.getBody();

      // if autoplay,
      // trigger the billboard to expand
      // or determin the correct creative to display
      var autoplay = !hasCookie('SBB_' + o.cookie_name, 'true', true);

      // keep a cache object so that you dont have to 
      // look into the DOM every time
      // this gets populated by popCache
      var cache = {};

      // has_init keeps track of the state of the instance's state
      // this is handy when trying to avoid a double init 
      var has_init = false;

      // keep track of state of the creative
      // this is because SBB uses toggler which is the same function
      // So open/close functions will have to keep track of what they need to do
      var isOpen = false;

      // has the user seen this creative?
      var has_cookie = hasCookie(o.cookie_name, 'seenSBB', true);

      // know what the creative type is so that
      // you can auto close if needed since statics wont make any
      // calls to the window
      var creativeType = 'statics';

      // reference to a timeout for statics
      // this should be set only when statics are served 
      // and cleared when the creative closes
      var autoclose;

      // init it moved out to be a function and put on the instance 
      // so that all of the meat and potatoes happen when you want, not when 
      // it's created. This is usefull for things like the weather page, where for 
      // some reason, richmedia needs to wait for window => load instead of DOM ready
      function init(){
         // prevent multiple inits being called
         if(has_init){
            console.log('blocking double init');
            return;
         }
         $('#ad_pencil')
            .css({
               width: '959px',
               margin: '0 auto 30px',
               overflow: 'hidden'
            });

         popCache();
         if(autoplay){
            toggler();
            autoclose = setTimeout(closeSBB, 10*1000);
         }
         has_init = true;
         return;
      }

      // append static images to the containers for the
      // SBB and the pencil
      function addStaticImages(){
         var pencil = $('<img />')
                        .addClass('pencil-replace')
                        .attr({
                           src: o.static_pencil,
                           usemap: '#pencilMap',
                           id: 'pencil-replace'
                        });

         var sbb = $('<img />')
                     .addClass('bb-replace')
                     .attr({
                        src: o.static_bb,
                        usemap: '#bbMap',
                        id: 'bb-replace'
                     });

         console.log(cache);
         cache.pencilContainer.append(pencil);
         cache.bbbContainer.append(sbb);

         controller.addToWindow(cache.pencilContainer, '#ad_pencil');
         controller.addToWindow(cache.bbbContainer, '#ad_pencil');

         tryAndGimmeFlash();
      }

      function tryAndGimmeFlash(){
         // replace the pencil
         controller.replaceWithFlash({
            flashVars: {},
            url: o.flash_pencil,
            replaceID: 'pencil-replace',
            width: o.width,
            height: o.pencil_height,
            callback: function(res){}
         });

         // replace the SBB
         controller.replaceWithFlash({
            flashVars: {},
            url: (autoplay? o.sbb_creative: o.sbb_creative_replay),
            replaceID: 'bb-replace',
            width: o.width,
            height: o.sbb_height,
            callback: function(res){
               if(res.success){
                  creativeType = 'flash';
                  return;
               }
               if(autoclose){
                  clearTimeout(autoclose);
               }
            }
         });
      }

      // popCache populates a cache object
      // this is called by init, not when the new instance is instantiated. 
      function popCache(){
         cache = {
            sbbContainer: topBody.find('#ad_pencil'),
            pencilContainer: $('<div />').addClass('pencil_container'),
            bbbContainer: $('<div />').addClass('sbb_container')
         };

         cache.pencilContainer
            .css({
               overflow: 'hidden'
            });
         cache.bbbContainer
            .css({
               overflow: 'hidden',
               height: 0
            });

         addStaticImages();

         return;
      }

      // opens the sliding billboard
      // this is going to be aliased when put on the window,
      // so call it what you will
      function openSBB(){
         cache.pencilContainer
            .animate({
               height: 0
            }, 650);
         cache.bbbContainer
            .animate({
               height: 300
            }, 650);
         isOpen = true;
      }

      // close the sliding billboard
      // this is going to be aliased when put on the window,
      // so call it what you will
      function closeSBB(){
         cache.pencilContainer
            .animate({
               height: 30
            }, 650);
         cache.bbbContainer
            .animate({
               height: 0
            }, 650);
         
         if(autoclose){
            clearTimeout(autoclose);
         }

         isOpen = false;
      }

      function toggler(){
         (isOpen? closeSBB: openSBB)();
      }

      // any public methods should be made available here
      return {
         init: init,
         getCache: function(){
            return cache;
         },
         open: toggler,
         close: toggler,
         addCreative: function(){}
      };
   };

   // create a new instance of SBB
   // and add it to teh instances object
   // Don't worry about this doing stuff only when DOM is ready, that
   // is all taken care of when it's created. 
   var sbbInstance = instances[o.cookie_name] = new SBB();

   controller.setOpen('toggler');
   controller.setClose('toggler');

   controller.addCreative('fwd', sbbInstance, sbbInstance);

   /**
    * Code for stripped overlay
    * can be found in site/js/bcom.dfp.overlay-stripped.js
    */
(function(f,l,h){var b=f.ads||(f.ads={});h=b.instances||(b.instances={});var m=f.ads.instances.RMController,n=new Date,p=f.console||{log:function(){},warn:function(){},error:function(){}},b=b.FallBackOverlay=function(a){function b(){var a=l(".Overlay");l("#Overlay-replace").css({position:"relative",margin:"0 auto",top:c.dropAmount+"px"});a.css({width:"100%",height:"100%","background-color":a.hasClass("boxed")?"rgba(0,0,0,.5)":"transparent",position:"fixed",top:0,left:0,"z-index":9001,display:k?"none":
"block"})}function h(){var a=k?c.replayCreative:c.creative;/swf/.test(a)?m.replaceWithFlash({url:a,replaceID:"Overlay-replace",width:c.width,height:c.height,callback:function(a){p.log(a);b()},flashVars:c.clickTags}):(p.log("statics only"),b(),g=setTimeout(q,1E4))}function q(){g&&clearTimeout(g);e.$body.find(".Overlay").hide()}var k=!1,g;a=a||{};var c={creative:a.creative||"http://cache.boston.com/images/ads/citizens/010414/citizens_1300x850_010414.swf",replayCreative:a.replayCreative||"http://cache.boston.com/images/ads/citizens/010414/citizens_1300x850_010414.swf",
fallback:a.fallback||"http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg",freeForm:a.freeForm||!1,pagename:a.pagename||"homepage",width:a.width||1300,height:a.height||850,dropAmount:a.dropAmount||10,cookieName:a.cookieName||"overlay_"+n.getMonth().toString()+n.getDate().toString(),autoTrackingPixel:a.autoTrackingPixel||"",replayTrackingPixel:a.replayTrackingPixel||"",testpage:!!f.location.search.match(/testpage/),clickTags:a.clickTags||{clickTag:"http://boston.com",clickTAG1:"http://boston.com",
clickTAG2:"http://boston.com",clickTAG3:"http://boston.com",clickTAG4:"http://boston.com"}},e;return{init:function(){a:{var a=c.cookieName,d=top.document.cookie.split("; "),b=d.length,f=a+"=seen",g=0;if(!c.testpage){for(;g<b;g++)if(d[g]===f){k=!0;break a}d="";b=new Date;b.setHours(23);b.setMinutes(59);b.setSeconds(59);d=d+(a+"=seen; ")+("expires="+b.toUTCString()+"; ");d+="domain=.boston.com; ";d+="path=/";top.document.cookie=d}k=!1}e={$body:m.getBody(),container:document.createElement("div")};e.container.className+=
"Overlay ";l("<img />").attr({usemap:"#Overlay_fallback",src:c.fallback,id:"Overlay-replace"}).css({margin:"0 auto",display:"block"}).addClass("Overlay-fallback").appendTo(e.container);e.container.className+=c.freeForm?"freeform":"boxed";m.addToWindow(e.container);setTimeout(h,2E3);return this},replay:function(){e.$body.find(".Overlay").show();k||(k=!0,h())},hidereplay:q,addCreative:function(){}}};h.Overlay1=new b({creative:"http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg",replayCreative:"http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg",
fallback:"http://cache.boston.com/images/ads/citizens/010414/citizens_wide.jpg"});h.Overlay2=new b({creative:"http://cache.boston.com/images/ads/citizens/010414/citizens_tall.jpg",replayCreative:"http://cache.boston.com/images/ads/citizens/010414/citizens_tall.jpg",fallback:"http://cache.boston.com/images/ads/citizens/010414/citizens_tall.jpg"})})(window.top,window.top.jQuery);

   controller.addCreative('pwd-tall', instances.Overlay1, instances.Overlay1);
   controller.addCreative('pwd-wide', instances.Overlay2, instances.Overlay2);

   return;
}(SBB_options));