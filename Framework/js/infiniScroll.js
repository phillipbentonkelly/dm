// Created by Jonathan Eatherly, (https://github.com/joneath)
// MIT license
// Version 0.3

(function() {
  Backbone.InfiniScroll = function(collection, options) {
    options = options || { };

    var self = { },
        $el,
        $target,
        targetEvent,
        targetEventHandler,
        fetchOn,
        page,
        pageSize,
        prevScrollY = 0;
        pageSize = collection.length || 25;

    self.collection = collection;
    self.options = _.defaults(options, {
      success: function(){ },
      error: function(){ },
      onFetch: function(){ },
      target: $(window),
      targetEvent: "scroll",
      targetSelector: null,
      param: "until",
      extraParams: {},
      pageSizeParam: "page_size",
      untilAttr: "id",
      pageSize: pageSize,
      scrollOffset: 100,
      remove: false,
      strict: false,
  
      includePage: false
    });

    var initialize = function() {
      $el            = self.options.$el
      $target        = self.options.target;
      targetEvent    = self.options.targetEvent;
      targetSelector = self.options.targetSelector;
      
      var targetEventHandlerMap = { 
        "scroll" : self.throttledWatchScroll,
        "click"  : self.onClickLoadMoreButton
      };
      
      targetEventHandler = targetEventHandlerMap[targetEvent];
      fetchOn = true;
      page = 1;
      $target.on(targetEvent, targetSelector, targetEventHandler);
    };

    self.destroy = function() {
      $target.off(targetEvent, targetSelector, targetEventHandler);
    };

    self.enableFetch = function() {
      fetchOn = true;
      if (self.options.targetEvent === "click"){
        $(self.options.targetSelector).show()
      }
    };

    self.disableFetch = function() {
      fetchOn = false;
      if (self.options.targetEvent === "click"){
        $(self.options.targetSelector).hide()
      }
    };

    self.onFetch = function() {
      self.options.onFetch();
    };
    
    self.atMaxPage = function(){
      return (self.options.maxPage && page + 1 >= self.options.maxPage);
    };

    self.fetchSuccess = function(collection, response) {
      if  (!self.atMaxPage() && ((self.options.strict && collection.length >= (page + 1) * self.options.pageSize)
              || (!self.options.strict && response.data.length > 0))){
        self.enableFetch();
        page += 1;
      } else {
        self.disableFetch();
      }
      self.options.success(collection, response);
    };

    self.fetchError = function(collection, response) {
      self.enableFetch();

      self.options.error(collection, response);
    };
    
    self._fetch = function() {
      var lastModel = self.collection.last();
      if (!lastModel) { return; }
      self.onFetch();
      self.disableFetch();
      self.collection.fetch({
        success: self.fetchSuccess,
        error: self.fetchError,
        remove: self.options.remove,
        data: $.extend(buildQueryParams(lastModel), self.options.extraParams)
      });
    };

    self.watchScroll = function(e) {
      var queryParams,
          scrollY = $target.scrollTop() + $target.height(),
          elHeight = $el.offset().top + $el.get(0).scrollHeight;
      
      if (!elHeight) {
        elHight = $(document).height();
      }
      if (fetchOn && scrollY >= elHeight - self.options.scrollOffset && prevScrollY <= scrollY) {
        self._fetch();
      }
      prevScrollY = scrollY;
    };
    
    self.throttledWatchScroll = _.throttle(self.watchScroll, 500);

    self.onClickLoadMoreButton = function(e) {
      e.preventDefault();
      self._fetch();
    };

    function buildQueryParams(model) {
      var params = { };

      params[self.options.param] = typeof(model[self.options.untilAttr]) === "function" ? model[self.options.untilAttr]() : model.get(self.options.untilAttr);
      params[self.options.pageSizeParam] = self.options.pageSize;

      if (self.options.includePage) {
        params.page = page + 1;
      }

      return params;
    }

    initialize();

    return self;
  };
})( );
