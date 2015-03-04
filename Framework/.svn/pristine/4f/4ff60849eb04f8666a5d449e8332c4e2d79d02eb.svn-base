delete console;
console.log('window.stream', window.stream);
(function( win, $, undefined ) {
  "use strict";

  if (!window.stream){
    return;
  }

  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  var app = {
    root: "/",
    stream: window.stream,
    streamFetchSize: window.stream.queryLimit || 25,
    maxStreamFetches: window.stream.queryDepth || 50
  };

  var track = {

    streamBundleNumber: function(){
      return app.collection.fetchNumber;
    },

    streamFilterName: function(){
      return _.findWhere( app.stream.filters, {id: app.collection.filterId} ).name;
    },
    streamName: function(){
      return s.prop1 + ' | ' + app.stream.name;
    },

    streamAssetType: function(){
      return s.prop6;
    },

    nodeWhereClicked: function(event){
      var $target = $(event.target),
          nodeWhereClicked = $target.data('where-clicked');
      return nodeWhereClicked;
    },

    nodeStyle: function(view){

      if (view.model.get('fetchNumber') == 'Ad'){
        return 'Ad';
      } else if (view.model.get('has_sponsor')){
        return 'Sponsored Content';
      } else {
        return 'Editorial';
      }
    },

    nodeAssetType: function(view){
      return view.model.get('tracking').prop6;
    },

    nodeNumberClicked: function(view){
      var $nodes = $('.stream-items > .stream-item'),
          nodeNumberClicked = $nodes.index(view.$el);
      return nodeNumberClicked;
    },

    streamInitiallyLoads : function(){
      var s_account="nytbglobe,nytbgglobal";
      var s=s_gi(s_account);
      s.linkTrackVars="prop55,prop56,prop57,prop58,eVar55,eVar56,eVar57,eVar58,events";
      s.linkTrackEvents="event29,event37";
      s.prop55=s.eVar55=track.streamBundleNumber();
      s.prop56=s.eVar56=track.streamFilterName();
      s.prop57=s.eVar57=track.streamName();
      s.prop58=s.eVar58=track.streamAssetType();
      s.events="event29,event37"; //StreamAdServed,StreamLoad
      s.tl(this,'o','StreamLoad');
      bcom.util.clearSVars(s);
    },

    streamLoadsMoreContent: function(){
      var s_account="nytbglobe,nytbgglobal";
      var s=s_gi(s_account);
      s.linkTrackVars="prop55,prop56,prop57,prop58,eVar55,eVar56,eVar57,eVar58,events";
      s.linkTrackEvents="event29,event37";
      s.prop55=s.eVar55=track.streamBundleNumber();
      s.prop56=s.eVar56=track.streamFilterName();
      s.prop57=s.eVar57=track.streamName();
      s.prop58=s.eVar58=track.streamAssetType();
      s.events="event29,event37"; //StreamAdServed,StreamLoad
      s.tl(this,'o','StreamLoad');
      bcom.util.clearSVars(s);
    },

    streamFilterApplied: function(){
      var s_account="nytbglobe,nytbgglobal";
      var s=s_gi(s_account);
      s.linkTrackVars="prop55,prop56,prop57,prop58,eVar55,eVar56,eVar57,eVar58,events";
      s.linkTrackEvents="event39";
      s.prop55=s.eVar55=track.streamBundleNumber();
      s.prop56=s.eVar56=track.streamFilterName();
      s.prop57=s.eVar57=track.streamName();
      s.prop58=s.eVar58=track.streamAssetType();
      s.events="event39"; //StreamFilterSelect
      s.tl(this,'o','StreamFilter');
      bcom.util.clearSVars(s);
    },

    streamItemClicked: function(event, view){
      var nodeName = view.model.get('head'),
          isPinned = view.model.get('is_pinned');

      var s_account="nytbglobe,nytbgglobal";
      var s=s_gi(s_account);
      s.linkTrackVars="prop50,prop51,prop52,prop53,prop54,prop55,prop56,prop57,prop58,eVar50,eVar51,eVar52,eVar53,eVar54,eVar55,eVar56,eVar57,eVar58,events";
      s.linkTrackEvents=isPinned ? "event36" : "event35";
      s.prop50=s.eVar50=track.nodeAssetType(view);
      s.prop51=s.eVar51=track.nodeNumberClicked(view);
      s.prop52=s.eVar52=nodeName;
      s.prop53=s.eVar53=track.nodeStyle(view);
      s.prop54=s.eVar54=track.nodeWhereClicked(event);
      s.prop55=s.eVar55=view.model.get('fetchNumber');
      s.prop56=s.eVar56=track.streamFilterName();
      s.prop57=s.eVar57=track.streamName();
      s.prop58=s.eVar58=track.streamAssetType();
      s.events= isPinned ? "event36" : "event35";
      s.tl(this,'o','StreamClick');
      bcom.util.clearSVars(s);
    },

    newStreamItemAlert: function(){
      var s_account="nytbglobe";
      var s=s_gi(s_account);
      s.linkTrackVars="prop50,prop51,prop52,prop53,prop54,prop55,prop56,prop57,prop58,eVar50,eVar51,eVar52,eVar53,eVar54,eVar55,eVar56,eVar57,eVar58,events";
      s.linkTrackEvents="event33";
      s.prop50=s.eVar50="Alert";
      s.prop51=s.eVar51="N/A";
      s.prop52=s.eVar52="Alert";
      s.prop53=s.eVar53="Alert";
      s.prop54=s.eVar54="Alert";
      s.prop55=s.eVar55="N/A";
      s.prop56=s.eVar56=track.streamFilterName();
      s.prop57=s.eVar57=track.streamName();
      s.prop58=s.eVar58=track.streamAssetType();
      s.events="event33"; //StreamNodeAlert
      s.tl(this,'o','NodeAlert');
      bcom.util.clearSVars(s);
    },

    newStreamItemAlertClicked: function(newItemCount){
      var s_account="nytbglobe";
      var s=s_gi(s_account);
      s.linkTrackVars="prop50,prop51,prop52,prop53,prop54,prop55,prop56,prop57,prop58,eVar50,eVar51,eVar52,eVar53,eVar54,eVar55,eVar56,eVar57,eVar58,events";
      s.linkTrackEvents="event34";
      s.prop50=s.eVar50="Alert";
      s.prop51=s.eVar51="N/A";
      s.prop52=s.eVar52=newItemCount;
      s.prop53=s.eVar53="Alert";
      s.prop54=s.eVar54="Alert";
      s.prop55=s.eVar55="N/A";
      s.prop56=s.eVar56=track.streamFilterName();
      s.prop57=s.eVar57=track.streamName();
      s.prop58=s.eVar58=track.streamAssetType();
      s.events="event34"; //StreamNodeAlertClick
      s.tl(this,'o','NodeAlertClick');
      bcom.util.clearSVars(s);
    }
  };

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // LayoutManager Configuration
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var JST = window.JST = window.JST || {};
  // https://github.com/tbranyen/boilerplate-handlebars-layoutmanager/blob/master/app/app.js

  Backbone.Layout.configure({
      // Allow LayoutManager to augment Backbone.View.prototype.
      manage: true,
      prefix: "/templates/",
      fetchTemplate: function(path) {
        path = path + ".mustache";
        if (!JST[path]) {
          $.ajax({
            url: path,
            cache: true,
            async: false
          }).then(function(contents){
            JST[path] = contents;
          });
        }
        return JST[path];
      },
      renderTemplate: function(template, context) {
        return Mustache.render(template, context);
      }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Router
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var Router = Backbone.Router.extend({
    initialize: function(options) {
      this.layout = new Backbone.Layout({
        template: "layouts/main"
      });
      // Append the Layout and Render
      this.layout.$el.appendTo("#streams-row") ;
      this.firstStreamRender = true;
    },
    routes: {
      ""      : "renderStream",
      ":hash" : "renderStream"
    },
    renderStream: function(hash){
      var isNotFilterHash = hash && hash.indexOf('filter-') !== 0;
      if (isNotFilterHash && !this.firstStreamRender){
        return;
      }

      var _this          = this,
          filterId       = hash && hash.indexOf('filter-') === 0 ? hash.replace('filter-','') : app.stream.filters[0].id,
          collection     = new ContentCollection([], { stream   : app.stream.id,
                                                       filterId : filterId,
                                                       usePubnub: app.stream.usePubnub || bcom.util.getQueryStringValue('usePubnub') == 'true'
                                                     });
      app.collection = collection; // so tracking can access collection on fetch
      collection.fetch({reset:true}).done(function(){
        //stream.localStorage = new Backbone.LocalStorage(stream.name);

        _this.layout.setViews({
          "#stream-wrap": [
            app.streamView = new StreamView({collection: collection})
          ]
        })
        var intervalId,
            intervalRunLimit=3,
            intervalRun = 0,
            intervalDelay = 333,
            shouldRender = function(){
              return !app.collection.usePubnub || app.collection.receivedAllHistory || intervalRun > intervalRunLimit
            },
            renderNow = function (){
              _this.layout.render();
              if (filterId !== app.stream.filters[0].id){
                track.streamFilterApplied();
              }
              _this.firstStreamRender = false;
            },
            renderWhenShouldOnInterval = function(){
              intervalRun++
              //console.log('intervalRun', intervalRun, !app.collection.usePubnub, app.collection.receivedAllHistory, intervalRun > intervalRunLimit )
              if (shouldRender()){
                renderNow();
                clearInterval(intervalId);
              }
            };
            intervalId = setInterval(renderWhenShouldOnInterval, intervalDelay);
      });
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Content Model
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var ContentModel = Backbone.Model.extend({
    notify: function() {
      if (localStorage && localStorage.getItem('notifications') == 'disabled'){return;}
      var title,
          body,
          icon;
      if (this.get("is_tweet")){
        var tweet = this.get("tweet");
        title = tweet.name + " @" + tweet.handle;
        body = tweet.text;
        icon = tweet.avatar;
      } else if (this.get("is_comment")){
        var comment = this.get("comment");
        title = comment.user.name + " comments on " + this.get("title");
        body  = this.get("subhead");
        icon  = comment.user.avatar;
      } else {
        title = this.get("head");
        body = this.get("subhead");
        icon = this.get("has_image") ? this.get("image").thumb_quick : null;
      }

      title = bcom.util.stripHtml(title) || "missing title";
      body  = bcom.util.stripHtml(body);

      var notification = new Notify(title, {
          body:  body,
          icon:  icon,
          notifyShow: function(){
            setTimeout(function(){
              $(notification.myNotify).trigger("close");
            }, 5000);
          },
          notifyClick: function(){
            this.model.collection.trigger("notification:click", this.model);
            var newWindow = window.open(this.model.get('url'), '_blank');
            newWindow.focus();
            var s=s_gi('nytbglobe');
            s.tl(this.model.attributes,'o','Desktop_notification_item_click');
          }
      });
      notification.model = this;
      notification.show();
    },
    formattedStreamDate: function(){
      var timestamp           = this.get('timestamp'),
          formattedStreamDate = timestamp; //moment.utc(timestamp).subtract(1,'s').format('YYYYMMDDHHmmss');
      return formattedStreamDate;
    },
    sendToTv: function() {
        PUBNUB.publish({
          channel: 'globetv_ugc',
          message: this.get("video").id,
          callback: function(details) {
            var success = details[0];
            var response = details[1];
            if (success) {
            }
            if (!success) {
              alert("Fail!", response);
            }
          }
      });
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Content Collection
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var ContentCollection = Backbone.Collection.extend({
    model : ContentModel,
    url   : "/fragment/SysConfig/WebPortal/BDC/Framework/sandbox/jflaherty/getJsonbyStream.jpt",
    initialize: function(models, options) {
      this.stream = options.stream;
      this.filterId = options.filterId;
      this.name = app.stream.env + ":" + this.stream + ":" + this.filterId;
      this.fetchNumber = 0;
      this.usePubnub = options.usePubnub;
      
      if (this.usePubnub){
        this.on('first:fetch:xhr:done',     this.startUpdates,      this);
        this.on('pubnub:history:received',  this.subscribeToUpdates,this);
        this.on('pubnub:message:received',  this.receiveUpdate,     this);       
      }
 
    },
    startUpdates: function(maxLastStreamDate){
      var _this   = this;
      PUBNUB.history({
        count    : 5,
        channel  : _this.name,
        error    : function(){ if (console){console.log("error", arguments);}},
        callback : function(response){ _this.receiveHistory(response, _this, maxLastStreamDate);}
      });
    },
    receiveHistory: function(response, _this, maxLastStreamDate){
      var messages  = response[0],
        startTime = response[1],
        endTime   = response[2];
      var allMessagesNew = _.chain(messages).reverse().all(function(message){
        var modelLastStreamDate = message.model.lastStreamDate;
        console.log(message.model.head);
        if (modelLastStreamDate < maxLastStreamDate){
          return false;
        } else {
          _this.trigger("pubnub:message:received", message);
          return true;
        }
      }).value();
      if (allMessagesNew){
        PUBNUB.history({
          start: startTime,
          count : 5,
          channel: _this.name,
          error    : function(){ if (console){console.log("error", arguments);}},
          callback : function(nextResponse){ _this.receiveHistory(nextResponse, _this, maxLastStreamDate);}
        });
      } else {
         _this.receivedAllHistory = true;
         _this.trigger("pubnub:history:received");
      }
    },
    subscribeToUpdates: function(){
      var _this = this;
      PUBNUB.subscribe({
        channel   : _this.name,
        callback  : function(message){ _this.trigger("pubnub:message:received", message);}
      });
    },
    receiveUpdate: function(message){
      if (!message.model){return;}
      switch (message.method) {
        case "create":
          this.add(message.model, {
            from_pubnub : true
          });
          break;
      }
    },
    comparator: function(a, b){
      var aPinned    = a.get("is_pinned"),
          bPinned    = b.get("is_pinned"),
          aTime      = a.get("timestamp"),
          bTime      = b.get("timestamp");

      if (aPinned && !bPinned){ return -1;}
      if (!aPinned && bPinned){ return 1;}

      return bTime.localeCompare(aTime);
    },
    fetch: function(options){
      var xhr,
          _this = this;

      options.data  = options.data || {};
      _.defaults(options.data, {
            limit    : app.streamFetchSize,
            stream   : _this.stream,
            filter   : _this.filterId
      });
      options.fetchNumber = _this.fetchNumber += 1;
      xhr = Backbone.Collection.prototype.fetch.call(this, options);

      xhr.done(function(response, status, options){
        if (_this.fetchNumber == 1){
          _this.trigger("first:fetch:xhr:done", response.maxLastStreamDate);
          track.streamInitiallyLoads();
        } else {
          track.streamLoadsMoreContent();
        }
      });
      return xhr;
    },
    parse: function(response, options){
      _.each(response.data, function(x){
        x.fetchNumber = this.fetchNumber;
      }, this);
      return response.data;
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Stream View
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var StreamView = Backbone.Layout.extend({
    template: "stream",
    className: "stream",
    attributes : function () {
      return {
        "id": this.collection.name + "-stream"
      };
    },
    initialize: function(options) {
      this.newItemCount       = 0;
      this.adCount            = 0;
      this.adLimit            = 20;
      this.visibleContentCount= 0;
      this.filters            = app.stream.filters;
      this.showFilter         = this.filters.length > 1 ? true : false;
      this.currentBreakPoint  = bcom.util.getCurrentBreakPoint();
      this.blockAds           = bcom.util.getQueryStringValue('blockStreamAds') === 'true';

      var _this = this;

      var scrollOptions = {
        $el           : this.$el,
        param         : 'startingdate',
        untilAttr     : 'formattedStreamDate',
        pageSizeParam : 'limit',
        scrollOffset  : 500,
        pageSize      : app.streamFetchSize,
        maxPage       : app.maxStreamFetches,
        onFetch       : function() { _this.loadingGraphic('show'); },
        success       : function() { _this.loadingGraphic('hide'); }
      };
      
      if (Modernizr.touch){
        $.extend(scrollOptions, {
          target         : this.$el,
          targetSelector : ".load-stories-btn",
          targetEvent    : "click"
        });
      }

      this.infiniScroll = new Backbone.InfiniScroll(this.collection, scrollOptions);

      this.listenTo(this.collection, {
        "add"               : this.addOne,
        "reset"             : this.render,
        "change:is_pinned"  : this.onChangeIsPinned,
        "notification:click": this.onNotificationClick
      });

      // Refresh ads on resize
      this.refreshOnResize();
    },
    serialize: function(){
      return {
        newItemCount  : this.newItemCount,
        filters       : this.filters,
        showFilter    : this.showFilter
      };
    },
    loadingGraphic: function( status ) {
      if ( status === 'show' ) {
        this.$el.append('<div class="loading-stream-items"><div class="loading"><i class="dot one"></i><i class="dot two"></i><i class="dot three"></i></div></div>');
        return;
      }
      if ( status === 'hide' ) {
        this.$el.find('.loading-stream-items').remove();
        return;
      }
    },
    beforeRender: function() {
      this.visibleContentCount = 0;
      this.collection.each(function( model, i ) {
        this.addOne( model, this.collection );
      }, this);
    },
    afterRender: function(){
      var _this         = this,
          $quickFilters = $('.js-quick-filter'),
          $filterActive = 'filter-active';
      $quickFilters.removeClass($filterActive);
      $('.js-quick-filter-' + this.collection.filterId).addClass( $filterActive );
      if ( _this.scrollTop ){
        bcom.util.scrollToEl( _this.$el, 100);
        _this.scrollTop = false;
      }
      $(".filter-nav-mod").one('scroll', function() {
          $(".filter-nav-mod").addClass('no-after');
      });

    },
    remove: function() {
      this.infiniScroll.destroy();
      return Backbone.View.prototype.remove.call(this);
    },
    createView: function( model ) {
      var ViewClass = StreamItemView;
      if ( model.get("is_social") ||  model.get("is_comment") ) { ViewClass = StreamItemSocialView; }
      if ( model.get("is_big_tz") ) { ViewClass = StreamItemBigTeaseView; }
      //if ( model.get("has_scoreboard") ) { ViewClass = StreamItemScoreboardView; }
      return new ViewClass({
        model      : model,
        streamName : this.collection.name
      });
    },
    addOne: function( model, collection, options ) {
      options = options || {};
      // Items from PubNub should be added but not rendered
      if ( options.from_pubnub ) {
        model.notify();
        model.set( 'from_pubnub', true );
        model.set('fetchNumber', 'update');
        this.newItemCount += 1;
        this.$(".new-item-count").text( this.newItemCount );
        this.$('.stream-notification').attr({ 'data-new-count': this.newItemCount });
        // if (this.newItemCount == 1){
        //   track.newStreamItemAlert();
        // }
        return;
      }
      // Insert stream item
      this.insertView('.stream-items', this.createView(model) ).render();
      this.visibleContentCount += 1;
      // Insert ad if neccesary
      if ( !this.blockAds ) {
        if ( this.visibleContentCount % bcom.dfp.streamCount === 0 && this.adCount < 20 ) {
          this.adCount++;
          this.insertView('.stream-items', new StreamItemAdView({
            count: this.adCount,
            fetchNumber: 'ad'
          })).render();
        }
      }

    },
    events: {
      "click .js-quick-filter": "onClickFilter",
      "click .load-new-stream-items": "onLoadNewStreamItems"
    },
    onClickFilter: function(e){
      e.preventDefault();
      var filter = 'filter-' + $(e.target).data("filters");
      app.router.navigate(filter, true);
    },
    onChangeIsPinned: function(){
      this.collection.sort();
      return this.render();
    },
    onLoadNewStreamItems: function(e){
      e.preventDefault();
      var newItemCountAtClickTime = this.newItemCount;
      this.loadNewStreamItems();
      track.newStreamItemAlertClicked(newItemCountAtClickTime);
    },
    onNotificationClick: function(model){
      this.loadNewStreamItems();
    },
    loadNewStreamItems: function(){
      this.newItemCount = 0;
      this.scrollTop = true;
      this.render();
    },
    refreshOnResize: function() {
      var that = this;
      $(window).on('debouncedresize', function( event ) {
        if ( that.currentBreakPoint !== bcom.util.getCurrentBreakPoint() ) {
          var definitionArray = [];
          $.each(streamAds, function( i, adObject ) {
            definitionArray.push(adObject.adDefinition);
          });
          // Reset current breakpoint
          that.currentBreakPoint = bcom.util.getCurrentBreakPoint();
          googletag.cmd.push(function() {
            googletag.pubads().setTargeting( 'breakpoint', that.currentBreakpoint );
            googletag.pubads().refresh( definitionArray );
          });
        }
      });
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Stream Item View - Ad
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var streamAds = {}; // Empty object used to store ads

  var StreamItemAdView = Backbone.Layout.extend({
    template: 'stream-ad',
    className: 'stream-item',
    initialize: function( options ){
      options = options || {};
      // Define some add properties
      this.count = options.count;
      this.adName = 'ad_stream' + this.count;
      this.adPos = ['btf'];
      this.adPos.push( 'stream' + this.count );
      // Prevent ad setup from runnin if afterRender() is called twice
      this.run = true;
      // Check for existence of ad in streamAds{}
      if ( streamAds[ this.count ] === undefined ) {
        this.displayed = false;
        streamAds[ this.count ] = { adName: this.adName, adPos: this.adPos };
      } else {
        this.displayed = true;
      }
      // Add the ad to the streamAds{} object
      //streamAds[ this.count ] = { adName: this.adName, adPos: this.adPos };
    },
    serialize: function(){
      return {
        adName : this.adName
      };
    },
    afterRender: function() {
      if ( this.run ) {
        var i = this.count;
        var filterName = String(app.collection.filterId.replace(/-/g,''));
        var bundleNumber = String(track.streamBundleNumber());
        if ( this.displayed ) {
          googletag.cmd.push(function() {
            googletag.pubads().setTargeting('stream', filterName );
            googletag.pubads().setTargeting('streamcount', bundleNumber );
            googletag.pubads().refresh([ streamAds[ i ].adDefinition ]);
          });
        } else {
          googletag.cmd.push(function() {
            // Define resizing info
            streamAds[ i ].mapping = googletag.sizeMapping()
              .addSize([960, 0], [[300,250],[600,250],[320,50],[676,117]])
              .addSize([768, 0], [[300,250],[600,250],[320,50],[676,117]])
              .addSize([0, 0], [[300,250],[320,50],[676,117]])
              .build();
            // Define ad slot
            streamAds[ i ].adDefinition = googletag.defineSlot(bcom.dfp.networkCode + '/' + bcom.dfp.adUnit, [[300,250],[600,250],[320,50],[676,117]],  streamAds[ i ].adName)
              .defineSizeMapping(streamAds[ i ].mapping)
              .addService(googletag.pubads())
              .setTargeting('pos', streamAds[ i ].adPos );
            googletag.pubads().setTargeting('stream', filterName );
            googletag.pubads().setTargeting('streamcount', bundleNumber );
            googletag.display( streamAds[ i ].adName );
          });
        }
        this.run = false;
        return;
      }
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Stream Item View - Default
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var StreamItemView = Backbone.Layout.extend({
    model: ContentModel,
    serialize: function() {
      var attrs                   = _.clone(this.model.attributes),
          timestamp               = attrs.timestamp;
      attrs.formattedTimestamp = timestamp; //moment(timestamp).fromNow();
      return attrs;
    },
    attributes : function () {
        return { "class": 'stream-item' };
    },
    initialize: function(options){
        this.template = 'stream-item-default';
        this.listenTo(this.model, {
          "change": this.render
        });
        this.sentToTv = false;
    },
    events: {
      "click .user-action a"  : "userAction",
      "submit .tz-poll"       : "submitPoll",
      "click .external"       : "externalLink",
      "swipe"                 : "sendToTv",
      "click a"               : "onClickThrough"
     // "click .popup-trigger": "popupTrigger"
    },
    beforeRender: function(){
      if (this.model.get("from_pubnub") && !this.model.get("rendered")){
          this.model.set({rendered: true}, {silent: true});
      }
      if (this.model.get("is_external")){
        this.$el.find('a').addClass("external");
      }
    },
    afterRender: function(){
      if(this.model.get("has_scoreboard")){
        bcom.streamscoreboard(this.$el.find(".scoreboard-mod"),this.model.get("scoreboard").league,this.model.get("scoreboard").gameCode);
      }
    },
    popupTrigger: function(e){
      e.preventDefault();
    },
    submitPoll: function(e){
      //what we are missing here is a way to determin what the target/pollID we need to complete this process.
      e.preventDefault();
      var checkedValue = $(e.target).find('input:checked').val();
    },
    userAction: function(e){
      e.preventDefault();
      var $target  = $(e.target),
          data     = $target.data(),
          property = data.property,
          value    = data.value,
          update   = {};

      update[property] = value;
      this.model.save(update);
    },
    externalLink: function(e) {
      //alert("External link! We can put an interstitial here! Sadface.")
    },
    sendToTv: function(e){
      e.preventDefault();
      if (!this.sentToTv){
        this.model.sendToTv();
        this.sentToTv = true;
      }
    },
    onClickThrough: function(e){
      track.streamItemClicked(e, this);
    }

  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Stream Item View - Big Tease
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var StreamItemBigTeaseView = StreamItemView.extend({
    initialize: function(options){
        this.template = 'stream-item-big-tease';
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Stream Item View - Scoreboard
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var StreamItemScoreboardView = StreamItemView.extend({
    initialize: function(options){
        // once this initalizes and renders we need to call a function
        // to fill it with data
        //this.template = 'stream-item-scoreboard';
        //var newData = bcom.streamscoreboard.test(this.model);
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Stream Item View - Social
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var StreamItemSocialView = StreamItemView.extend({
    initialize: function(options){
        this.template = 'stream-item-social';
    },
    serialize: function() {
      var attrs                   = _.clone(this.model.attributes),
          timestamp               = attrs.timestamp;
      attrs.formattedTimestamp    = timestamp; //moment(timestamp).fromNow();
      return attrs;
    }
  });


  app.router = new Router();
  Backbone.history.start({ pushState: false, root: app.root });
  win.app = app;

  var enableNotifications = function(e){
    e.preventDefault();
    var _this = this;
    var myNotification = new Notify('Notifications enabled!', {
        body: 'Watch for new stories here!',
        icon: '/img/circleb-80x80.png',
        permissionGranted : function(){
          localStorage.setItem('notifications','enabled');
          myNotification.show();
          $(_this)
            .text('Disable Notifications')
            .addClass('disable-notifications')
            .removeClass('enable-notifications');
        }
    });
    myNotification.requestPermission();
  };
  var disableNotifications = function(e){
    e.preventDefault();
    localStorage.setItem('notifications','disabled');
    $(this)
      .text('Enable Notifications')
      .addClass('enable-notifications')
      .removeClass('disable-notifications');
  };

  $(document).on('click', '.enable-notifications', enableNotifications);
  $(document).on('click', '.disable-notifications', disableNotifications);

  _.mixin({
    pushUnique: function( array, value ) {
      if ( array[value] === undefined ) { array.push( value ); }
    }
  });

})( window, jQuery );
