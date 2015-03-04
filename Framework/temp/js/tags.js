(function( win, $, undefined ) {

  // The App Object
  var app = {
    root: "/"
  };
  var uuid = PUBNUB.uuid();
  var pubnub = PUBNUB.init({
    publish_key: "pub-c-127a2b10-aa80-4a62-ac2e-30a1fce6f220",
    subscribe_key: "sub-c-4a78c224-164c-11e3-9f04-02ee2ddab7fe",
    uuid: uuid
  });

  // For Local Development

  // Router Object
  var Router = Backbone.Router.extend({
    initialize: function() {      

      // New Collection
      this.tags = new TagCollection();
      
      pubnub.subscribe({
        channel: uuid,
        callback: function(message) {
          var data;
          data = message;
          return this.tags.set(data);
        },
        connect: function() {
          return pubnub.publish({
            channel: "getTags",
            message: {
              uuid: uuid
            }
          });
        }
      });
      this.tags.set(initial.tags);
      // New Layout
      this.layout = new Backbone.Layout({
        template: "#tags",
        views: {
          "div.list": new TagCollectionView({ collection: this.tags }),
          "div.map": new TagCollectionMapView({ collection: this.tags })
        }
      });
      // Append the Layout and Render 
      this.layout.$el.appendTo("#main");
      this.layout.render();
    },
    routes: {
      "": "index"
    },
    index: function() {
      this.tags.fetch({
        reset: true
      });
    }
  });

  // Tag Model
  var TagModel = Backbone.PubNub.Model.extend({
    name: "Tag",
    pubnub: pubnub,
    
    defaults: {
      name: null
    },
    initialize: function() {    
      var name = this.get("name");
      var initialContents = _.filter(initial.contents, 
                                    function(content){
                                       return name == "All" 
                                         || _.contains(content.get("tags"), name);
                                     });
      this.contents = new ContentCollection([], {"tag": this});
      this.contents.set(initialContents);
      this.listenTo(this.contents, "all", this.raiseContentEvent);
      
    },
    addContent: function(content) {
      this.contents.add(content);
    },
    raiseContentEvent: function(e, m){
      this.trigger("content"+":"+e, m);
    }
  });

  // Tag Collection
  var TagCollection = Backbone.PubNub.Collection.extend({
    name: "TagCollection",
    model: TagModel,
    pubnub: pubnub,
    initialize: function() {
    }
  });

  // Tag View
  var TagView = Backbone.Layout.extend({
    template: "#tag",
    tagName: "li",
    className: "tag",
    serialize: function() {
      return { model: this.model };
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    beforeRender: function() {
      this.insertView(new ContentCollectionView({
        collection: this.model.contents
      }));
    }
  });

  var TagOptionView = Backbone.Layout.extend({
    template: "#tagOption",
    tagName: "option",
    attributes: function() {
      return {
        "value": this.model.name,
        "data-cid": this.model.cid
      } 
    },
    serialize: function() {
      return { model: this.model };
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    }
  });

  // Tag Collection View
  var TagCollectionView = Backbone.Layout.extend({
    template: "#tagCollection",
    className: "tags",
    newContentTag: null,
    
    serialize: function() {
      return { collection: this.collection };
    },

    beforeRender: function() {
      this.collection.each(function( tag ) {
       
        this.insertView("ul.tags", new TagView({
          model: tag
        }));
        if (tag.get("name") != "All"){ 
          this.insertView("select.tags", new TagOptionView({
            model: tag
          }));
          
        };

        ;
      }, this);
    },

    afterRender: function(){
      this.input = this.$(".new-tag");
      this.updateNewContentTag();
      this.allTag = this.collection.findWhere({"name":"All"});
    },

    initialize: function() {
      this.listenTo(this.collection, {
        "add": this.render,
        "reset": this.render
      });
    },
    events: {
      "keypress .new-tag": "createTagOnEnter",
      "change select.tags": "updateNewContentTag",
      "keypress .new-content": "createContentOnEnter"
    },
    
    updateNewContentTag: function(){
      var cid = this.$("select.tags option:selected").first().data('cid');
      this.newContentTag = this.collection.get(cid);
    },

    createTagOnEnter: function(e) {
      var input = this.$(".new-tag");
      if (e.keyCode != 13 || !input.val()) return;
      this.collection.add({ "name" : input.val()});
      input.val("");
    },
    
    createContentOnEnter: function(e) {
      var input = this.$(".new-content");
      if (e.keyCode != 13 || !input.val()) return;
      this.newContentTag.addContent({ "title" : input.val(), "location": [42.3590, -71.0507]});
      this.allTag.addContent({ "title" : input.val()});
      input.val("");
    },

    
  });
  
  
  var TagCollectionMapView = Backbone.Layout.extend({
    template: "#tagCollectionMap",
    
    serialize: function() {
      return { collection: this.collection };
    },

    beforeRender: function() {
      this.layerGroups = {};
      this.collection.each(function( tag ) {
        if (tag.get("name") == "All"){ return true;}
        var layerGroup = new L.LayerGroup();
        var markers = [];
        tag.contents.each(function(content){
          var marker = L.marker(content.get("location"));
        	var popContent = [
        		'<div class="popup-content">',
        			'<h2>',
        				'<a href="' + content.get("url") + '" target="_blank">',
        					content.get("title"),
        				'</a>',
        			'</h2>',
        			'<div>',
        				'<a href="' + content.get("url") + '" target="_blank">',
        					'<img src="' + content.get("imageUrl") + '" alt="' + content.get("url") + '" />',
        				'</a>',
        			'</div>',
        			'<p>Tags: ' + content.get("tags") + '</p>',
        		'</div>'
        	].join('');
          marker.bindPopup(popContent);
          marker.addTo(layerGroup);
        });
        this.layerGroups[tag.get("name")] = layerGroup;
      }, this);
      this.controlLayers = L.control.layers(null, this.layerGroups);
    },

    afterRender: function(){
      var layerGroups = this.layerGroups;
      this.map = L.map('map').setView([42.3581, -71.0636], 13);
      L.tileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg', {
          attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
          maxZoom: 18
      }).addTo( this.map );      
      this.controlLayers.addTo( this.map );
      _.each(this.layerGroups, function(layerGroup, layerName){
        this.map.addLayer(layerGroup);
      }, this);
    },

    initialize: function() {
      this.collection.each(function(tag){
        this.listenTo(tag.contents, {
            "add": this.testAdd
        });
      }, this);
      this.listenTo(this.collection, {
        "add": this.render,
        "reset": this.render,
        "content:focus": this.updateContentFocus
      });
    },
    updateContentFocus: function(content){
      var loc = content.get("location");
      var latlong = new L.LatLng(loc[0], loc[1]);
      this.map.panTo(latlong);
      console.log("updated", loc);
    }
  });
  
  var ContentCollectionMapView = Backbone.Layout.extend({
    template: "#tagCollectionMap",
    
    serialize: function() {
      return { collection: this.collection };
    },

    beforeRender: function() {
      
      this.collection.each(function( tag ) {
        
        this.insertView("#tagMapLayerGroup", new TagMapLayerGroupView({
          model: tag
        }));
      }, this);
    },

    afterRender: function(){
    },

    initialize: function() {
      this.listenTo(this.collection, {
        "add": this.render,
        "reset": this.render
      });
    },
    events: {
    }
  });
  
  
  
  // Content Model
  var ContentModel = Backbone.Model.extend({
    defaults: {
      title: null,
    }
  });

  // Content Collection
  var ContentCollection = Backbone.PubNub.Collection.extend({
    name: "content",
    model: ContentModel,
    pubnub: pubnub,
    initialize: function(models, options) {
      options || (options = {})
     if (options && options.tag) {
        this.tag = options.tag
        this.name += "-tag-"+ this.tag.get("name");
      }
    }
  });

  // Content View
  var ContentView = Backbone.Layout.extend({
    template: "#content",
    tagName: "li",
    className: "content",
    serialize: function() {
      return { model: this.model };
    },
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    events: {
      "click .mapped": "clickMapped"
    },
    clickMapped: function() {
      this.model.trigger("focus", this.model);
    },
  });

  // Content Collection View
  var ContentCollectionView = Backbone.Layout.extend({
    template: "#contentCollection",
    className: "contents",
    serialize: function() {
      return { collection: this.collection };
    },

    beforeRender: function() {
      this.collection.each(function( content ) {
        this.insertView("ul.contents", new ContentView({
          model: content
        }));
      }, this);
    },

    initialize: function() {
      this.listenTo(this.collection, {
        "add": this.render,
        "reset": this.render
      });
    }
  });
  
  
  
  
  var initial = {
    tags: [
      {"name":"All"},
      {"name":"News"},
      {"name":"Sports"},
      {"name":"Entertainment"},
      // {"name":"Life"},
      // {"name":"Health"},
      // {"name":"Your Town"},
      // {"name":"Travel"},
      // {"name":"Marketplace"},
      // {"name":"Money"},
      // {"name":"Food & Dining"},
      // {"name":"Cars"},
      // {"name":"Jobs"},
      // {"name":"Real Estate"},
      // {"name":"Extra Bases"},
      // {"name":"Love Letters"},
      // {"name":"Crossword"},
      // {"name":"Obituaries"},
      // {"name":"The Big Picture"},
      // {"name":"Video"}
    ],
    contents: _.map([
    	{
    		"title": "Aquarium solves fishy mystery in Pleasure Bay",
    		"url": "http://www.bostonglobe.com/metro/2013/09/10/mystery-fish-spotted-pleasure-bay-big-mola-mola-blue-shark/Q5pGe5DUz5gaAftLMCMeEL/story.html",
    		"imageUrl": "http://c.o0bg.com/rf/image_460w/Boston/2011-2020/2013/09/10/BostonGlobe.com/Metro/Images/shark4-001.jpg",
    		"tags": ["Entertainment"],
    		"location": [42.334846, -71.018575],
    		"locationName": "Boston"
    	},
      // {
      //   "title": "Getting the view from inside aquarium’s tank",
      //   "url": "http://www.bostonglobe.com/lifestyle/2013/09/30/new-camera-technology-gives-visitors-new-england-aquarium-diver-eye-view-what-happening-deep-giant-ocean-tank/nxXKt7K5TJJJdpVG24rb0K/story.html",
      //   "imageUrl": "http://c.o0bg.com/rf/image_960w/Boston/2011-2020/2013/09/19/BostonGlobe.com/Lifestyle/Images/dive3.jpg",
      //   "tags": ["Entertainment"],
      //   "location": [42.3590, -71.0507],
      //   "locationName": "Boston"
      // },
    	{
    		"title": "Red Sox’ ‘beard bonding’ symbolic of attitude adjustment",
    		"url": "http://www.bostonglobe.com/sports/2013/10/02/beards/BAQGj2IcEckzCq5Z0Piy3N/story.html",
    		"imageUrl": "http://c.o0bg.com/rf/image_960w/Boston/2011-2020/2013/10/02/BostonGlobe.com/Sports/Images/beard-big.jpg",
    		"tags": ["Sports"],
    		"location": [42.3464, -71.0975],
    		"locationName": "Boston"
    	},
    	{
    		"title": "MIT’s ‘Alchemist’ gets Walter White makeover",
    		"url": "http://www.bostonglobe.com/lifestyle/names/2013/09/30/alchemist-sculpture-mit-turns-into-walter-white-from-breaking-bad/PRfvTx7nCM8BxzYB5wQMAI/story.html",
    		"imageUrl": "http://c.o0bg.com/rf/image_371w/Boston/2011-2020/2013/09/30/BostonGlobe.com/Lifestyle/Advance/Images/bad1.jpg",
    		"tags": ["News"],
    		"location": [42.3598, -71.0921],
    		"locationName": "Cambridge"
    	}
      ], function(o){return new ContentModel(o);})
  };
  

  // Define Router and kick things off
  app.router = new Router();
  Backbone.history.start({ pushState: true, root: app.root });

  win.app = app;

  
 

})( window, jQuery );
