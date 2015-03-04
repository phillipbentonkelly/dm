(function( win, $, undefined ) {
    
  var app = {
    root: "/",
    streamMeta: window.stream
  }

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
        // Check for a global JST object.  When you build your templates for
        // production, ensure they are all attached here.
        var JST = window.JST || {};

        // If the path exists in the object, use it instead of fetching remotely.
        if (JST[path]) {
          return JST[path];
        }

        // If it does not exist in the JST object, mark this function as
        // asynchronous.
        var done = this.async();
    
        // Fetch via jQuery's GET.  The third argument specifies the dataType.
        $.get(path, function(contents) {
          done(Mustache.compile(contents));
        }, "text");
      }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Router
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var Router = Backbone.Router.extend({
    initialize: function(options) {      
      this.initialData = options.initialData;
      
      this.layout = new Backbone.Layout({
        template: "layouts/main"
      });
      // Append the Layout and Render 
      this.layout.$el.appendTo("#streams-row") ;
    },
    routes: {
      ""      : "renderStream",
      ":filter" : "renderStream",
      },
    renderStream: function(filter){
      filter = filter || "all";
      var name      = app.streamMeta.name, // TODO unhack
          stream; 
      if (!app.stream){
        app.stream = new ContentCollection([], {name: name, filter: filter}); 
        app.stream.set(this.initialData, {silent:true});
      } else {
        app.stream.filter = filter;
      }
      stream = app.stream; 
           
      stream.fetch();
      this.layout.setViews({
        "#stream-wrap": [ 
          new StreamView({collection: stream})
        ]
      }).render();
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Content Model
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var ContentModel = Backbone.Model.extend({
    notify: function() {
        var safe_rx   = /[<>\r\n]+/g
        ,   safe      = function(t) { return t ? t.replace( safe_rx, '' ) : t}
        ,   title 
        ,   body 
        ,   icon;
        if (this.get("is_tweet")){
          var tweet = this.get("tweet");
          title = tweet.name + " @" + tweet.handle;
          body = safe(tweet.text);
          icon = tweet.avatar;
        } else {
          title = safe(this.get("head"));
          body = safe(this.get("subhead"));
          icon = this.get("has_image") ? this.get("image").thumb_quick : null;
        }
      var notification = new Notify(title, {
          body:  body,
          icon:  icon,
          notifyShow: function(){
            setTimeout(function(){
              $(notification.myNotify).trigger("close");
            }, 5000);
          }
      });
      notification.showNotification();
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Content Collection
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  
  var ContentCollection = Backbone.PubNub.Collection.extend({
    model: ContentModel,
    pubnub: PUBNUB,
    //localStorage: new Backbone.LocalStorage("ContentCollection-"),
    initialize: function(models, options) {
      this.name         = options.name;
      this.filter       = options.filter;
      //this.localStorage = new Backbone.LocalStorage("ContentCollection-" + this.name);
      this.bind('add', this.syncLocal, this);

    },
    comparator: function(a, b){
      var aPinned    = a.get("is_pinned"),
          bPinned    = b.get("is_pinned"),
          aTime      = a.get("timestamp"),
          bTime      = b.get("timestamp");
          
      if (aPinned && !bPinned){ return -1}
      if (!aPinned && bPinned){ return 1}
      
      return bTime.localeCompare(aTime);
    },
    url: function(){
      var urlTemplate = "/fragment$configurationURI/Framework/sandbox/jflaherty/getlast500JsonbyStream.jpt?stream=backbone-collection-{{name}}",
          url         = urlTemplate.replace("{{name}}", "news");
      if (this.filter && (this.filter != "all")){
        url += "-" + this.filter;
      }
      return url;
    },
    syncLocal: function(model, collection, options){
      collection.sync("update", model, options);
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
      this.newItemCount = 0;
      this.adCount      = 0; 
      this.filters      = _.map(app.streamMeta.filters, function(v){
        var slug = v.toLowerCase().replace('all stories', "all").replace(' ','-');
        return {
          name : v,
          slug : slug
        };
      }, this); 
      
      this.listenTo(this.collection, {
        "add": this.addOne,
        "reset": this.render,
        "change:is_pinned": this.onChangeIsPinned,
      });
    },
    serialize: function(){
      return {
        newItemCount  : this.newItemCount, 
        filters       : this.filters
      };
    },
    events: {
      "click .js-quick-filter": "onClickFilter",
      "click .load-new-stream-items": "onLoadNewStreamItems"
    },
    afterRender: function(){
      var $quickFilters   = $('.js-quick-filter'),
        $filterActive     = 'filter-active';
      $quickFilters.removeClass($filterActive);
      $('.js-quick-filter-'+this.collection.filter).addClass($filterActive);
    },
    beforeRender: function() {
      var counter = 0;
      _.chain(this.collection.slice(0,25)).each(function(model, i){
        // Show an add every 5
        if ( i > 0 && i % bcom.dfp.streamCount === 0 ) {
          this.adCount++
          this.insertView('.stream-items', new StreamItemAdView({ count: this.adCount }));
        }
        if (this.modelPassesFilter(model)){
          var targetClass = ".stream-items";
          //we need to check for is_big_tz, is_social [is_tweet, is_comment], else should be the default template          
          if(model.get("is_social")){
            this.insertView(targetClass, new StreamItemSocialView({
                                                  model       : model, 
                                                  streamName  : this.collection.name
                                               }));
          } else if(model.get("is_big_tz")){
            this.insertView(targetClass, new StreamItemBigTeaseView({
                                                  model       : model, 
                                                  streamName  : this.collection.name
                                               }));
          } else {
            this.insertView(targetClass, new StreamItemView({
                                                  model       : model, 
                                                  template: "value", 
                                                  streamName  : this.collection.name
                                               }));            
          };
        }
      }, this);
    },
    addOne: function(model, collection, options) {
      if (options && options.alreadyExists){ return };
      try{
        model.notify();
      } catch(e){
        console.log("Notify error: ", e, "with model", model);
      }
      this.newItemCount += 1;
      this.$(".new-item-count").text(this.newItemCount);
      this.$('.stream-notification').attr({ 'data-new-count': this.newItemCount })
    },
    modelPassesFilter: function(model){
      return (!this.filterName || this.filterName == 'all' || _.contains(model.get("section"), this.filterName) || model.get("category").toUpperCase() === this.filterName.toUpperCase());
    },
    onClickFilter: function(e){
      this.filterName = $(e.target).data("filters");
      app.router.navigate('#'+this.filterName, true);
    },
    onChangeIsPinned: function(){
      this.collection.sort();
      return this.render();
    },
    onLoadNewStreamItems: function(e){
      this.newItemCount = 0;
      e.preventDefault();
      return this.render();
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Stream Item View - Ad
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var StreamItemAdView = Backbone.Layout.extend({
    template: 'stream-ad',
    className: 'stream-item',
    afterRender: function( options ) {
      var i = options.options.count;
      this.$el.find('.quick-tz').attr({ id: 'ad_streamdisplay' + i });
      googletag.cmd.push(function() {
        googletag.defineSlot(bcom.dfp.networkCode + '/' + bcom.dfp.adUnit, [300,250],  "ad_streamdisplay" + i)
          .addService(googletag.pubads())
          .setTargeting("pos", "atf");
        googletag.display("ad_streamdisplay" + i);
      });
    }
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Stream Item View - Default
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  
  var StreamItemView = Backbone.Layout.extend({
    model: ContentModel,
    serialize: function() {
      var attrs                   = _.clone(this.model.attributes),
          timestamp               = attrs["timestamp"];
      attrs["formattedTimestamp"] = moment(timestamp).fromNow();
      return attrs;
    },
    attributes : function () {
        return {
                   "class": 'stream-item'
               };        
    },
    initialize: function(options){
        this.template = 'stream-item-default'; 
        this.listenTo(this.model, {
          "change": this.render
        });
    },
    events: {
      "click .user-action a"  : "userAction",
      "submit .tz-poll"       : "submitPoll",
      "click .external"     : "externalLink"
     // "click .popup-trigger": "popupTrigger"
    },
    afterRender: function(){
      if (this.model.get("is_read")){
        this.$el.addClass("read");
      }
      if (this.model.get("is_external")){
        this.$el.find('a').addClass("external");
      }
    },
    popupTrigger: function(e){
      e.preventDefault();
      console.log(e);
    },
    submitPoll: function(e){
      //what we are missing here is a way to determin what the target/pollID we need to complete this process.
      e.preventDefault();
      var checkedValue = $(e.target).find('input:checked').val();
      console.log('submitPoll value: '+checkedValue);

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
  // Stream Item View - Social
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  var StreamItemSocialView = StreamItemView.extend({
    initialize: function(options){    
        this.template = 'stream-item-social';
    },
    serialize: function() {
      var attrs                   = _.clone(this.model.attributes),
          timestamp               = attrs["timestamp"];
      attrs["formattedTimestamp"] = moment(timestamp).fromNow();
      return attrs;
    },
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Initial Data Fetch
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  
  $.getJSON('/data/stream-prime.json').done(function (stream){
    var initialData = _.map(stream.data, function(x){
      x.timestamp = "2013-11-11T17:47:08.000Z"; // change timestamps to all be older than new content
      x.id = x.slug;
      return x;
    });
    app.router = new Router({initialData: initialData});
    Backbone.history.start({ pushState: false, root: app.root });
    win.app = app;  
    
  });

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  // Temporary Stuff
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  $(document).on('click', '.enable-notifications', function(e){
    e.preventDefault();
    var myNotification = new Notify('Notifications enabled!', {
        body: 'At this point real-time updates would start arriving...but Ian still needs to work on that. So for now, you need to reload the page before real-time updates work.',
        icon: 'http://img.xcitefun.net/users/2012/04/291617,xcitefun-congratulations1.gif'
    });
    myNotification.show(); 
  });

  _.extend(Backbone.LocalStorage.prototype, {
    update: function(model) {
      this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
      if (!_.include(this.records, model.id.toString()))
        this.records.push(model.id.toString()); this.save();
      return this.find(model);
    }
  });
  
})( window, jQuery );
  