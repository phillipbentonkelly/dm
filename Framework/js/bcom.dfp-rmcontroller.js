/*
 * Responsive RichMedia "Controller"
 * Work in progress
 * should controll behaviour of richmedia ads including initialization, open/close functionality and site size
 */

(function(win, $, undefined) {
  "use strict";

  var exports = win.ads || (win.ads = {});
  var instances = exports.instances || (exports.instances = {});

  var localSettings = exports.richmediaSettings = {
    maxWidth: 1024,
    adjustOnChange: false
  };

  // safely use and forget about console logs
  // this is only here as safety in case someone forgets
  // to remove their logs for production. It happens.
  var console = win.console || {
    log: function() {},
    warn: function() {},
    error: function() {}
  };

  // master object on RM stuff
  // this is optional to boot up a new one, but really there should be just one...
  // I take that back, there can be only one....
  var rmc = exports.Controller = function() {

    // object containing all of the reg. RM items
    var richmedia = {};

    // remember which one is active and access that from the console
    var active;

    // keep track of the number of items added to the master RM object
    // this is so that you cannot init before having 2 or more items
    var richmediaCount = 0;

    // it's important to know what the open and close functions on the RM are
    var open;
    var close;

    // you will probably want to know if the init 
    // method has happened yet. That's probably a good idea 
    var init = false;

    return {
      init: function() {
        // do init shit here
        // this will only fire when the richmediaCount > 1
        // create a reference of the window for anyone to use
        // this will be handy for more than RM, it will allow other ads to interact with a jQuery version of the top most window at any time
        this.$win = $(win);

        var width = this.windowWidth = this.$win.width(),
          height = this.windowWidth = 0;

        // safety net for double inits
        // this wont happen since init SHOULD only be called by addRichMedia
        // but if someone tries to call it directly, we can block it
        if (init) {
          return;
        }

        // the creative is full width device
        if (width >= localSettings.maxWidth) {
           active = 'fwd';
        } else {
           // the creative is only partial width so should get the fallback
           height = this.$win.height();

           if (width > height) {
              // wide creative time
              // "short and fat"
              active = 'pwd-wide';
              
              if(width < 1024){
                return;
              }
           } else {
              // tall creative time
              // "tall and skinny"
              active = 'pwd-tall';
              
              if(width < 768){
                return;
              }
           }
        }

        if(open.length < 1 || close.length < 1){
          console.log('undefined open and/or close functions for RM');
          return;
        }

        win[open] = richmedia[active].settings.open;
        win[close] = richmedia[active].settings.close;
        richmedia[active].settings.addCreative();
        richmedia[active].settings.init();
        
        init = true;
        return this;
      },
      /**
       * register a richmedia type with the richmedia controller
       * @param {string} name     fwd/pwd-tall/pwd-wide
       * @param {object} obj      the instance of this richmedia
       * @param {object} settings object containing some settings for use by the controller
       */
      addRichMedia: function(name, obj, settings) {
        // this is like the DMV, you have to register here
        // although we wont tax you for driving, or registering.
        // 
        // they can be named anything but really they should be:
        //  - fwd
        //  - pwd-wide
        //  - pwd-tall
        // 
        // settings should have at least the following:
        //    - open
        //    - close
        //    - init
        //    - addCreative
        richmedia[name] = {};
        richmedia[name].object = obj;
        richmedia[name].settings = settings;

        // make sure there are at least three creatives appended to this beast
        if (++richmediaCount > 2 && !init) {
          this.init();
        }
        return this;
      },
      addCreative: function(name, obj, settings) {
        this.addRichMedia(name, obj, settings);
      },
      getCreatives: function() {
        return richmedia;
      },
      getActive: function() {
        return active;
      },
      /**
       * setOpen sets the function name to open/show the richmedia
       * @param {string} name function name to open/show
       */
      setOpen: function(name) {
        // the open function name is critical because there 
        // needs to be a way to change what the function actually calls. 
        // this is vital when accompanying creatives call replay
        open = name;
        return;
      },
      /**
       * setClose sets the function name to close/hide the richmedia
       * @param {string} name function name to close/hide 
       */
      setClose: function(name) {
        // gutta know how to close this RM
        // because different creatives have different close functions, they needs to be mapped
        // to work with the overlay
        close = name;
        return;
      },
      /**
       * addToWindow appends new html markup to the window
       * in this instance, it will always append, never prepend
       * @param {object} elem          element to be appended
       * @param {string} containerName target container, if none, it will append to body
       */
      addToWindow: function(elem, containerName) {
        // Simply a utility tool to append content to the window
        // this is important because reaching from inside an iframe to the window
        // can prove to be a pain. We dont like pain, lets make it relatively easy by creating this helper function
        // containerName can be a div to append the content, something like '#sbbContainer'
        $(containerName || 'body').append(elem);
        return this;
      },
      /**
       * get an instance of the top window
       * @return {object} returns a jQuery instance of the window
       */
      getBody: function() {
        // return a jQuery instance of body
        return $('body');
      },
      replaceWithFlash: function(obj) {
        var flashvars = {},
          params = {
            menu: "false",
            wmode: "transparent",
            allowscriptaccess: "always"
          },
          ids = {};
        if(!swfobject){
          console.log('No SWFObject!! Exiting');
          return;
        }
        swfobject.embedSWF(obj.url, obj.replaceID, obj.width, obj.height, obj.flashPlayer || "8.0.0", null, flashvars, params, ids, obj.callback || function(res) {});
        return;
      } // end replaceWithFlash
    }; //end return
  }; //end rmc
  // gimme a new one I guess
  instances.RMController = rmc();

  return;
}(window.top, jQuery));

/**
 * So how will this all work? Well this file should live on bcom and always be served.
 * When a new RM creative is served, it should be registered (but not initialized) by calling:
 * 
 *     top.ads.instances.RMController.addCreative('fwd', instanceOfObject, {
 *        open: p.openSite,
 *        close: p.closeSite,
 *        addCreative: function(){
 *           var elem = $("#pushdown_wrapper").remove();
 *              top.ads.instances.RMController.addToWindow(elem, '#someDivToAddTo');
 *           },
 *        init: p.init
 *     });
 *
 * assuming that p is the instance of the richmedia pushdown
 *
 * 
 * pwd = partial width device
 * fwd = full width device
 *
 */