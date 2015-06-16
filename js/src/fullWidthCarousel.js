/*function helloWorld() {
  return "Hello world!";
}

function fullCarousel() {
  return "Hello world!";
};*/

var _fullCarousel = (function (jQ, _) {
  
  var el = {
    jQ_body: jQ('body'),
    jQ_win: jQ(window),
    jQ_imageWrap: jQ('.fullwidth-carousel__media-img-wrap'),
    jQ_mediaWin: jQ('.fullwidth-carousel__media-window'),
    jQ_slideWrap: jQ('.fullwidth-carousel__media-slide-wrap')
  };
  
  return {
    publicFunc: function (val){
      return val;
    }
  }
})($, _);


/*var fullCarousel = (function (val) {
  return val;

  var el = {
    jQ_body: jQ('body'),
    jQ_win: jQ(window),
    jQ_imageWrap: jQ('.fullwidth-carousel__media-img-wrap'),
    jQ_mediaWin: jQ('.fullwidth-carousel__media-window'),
    jQ_slideWrap: jQ('.fullwidth-carousel__media-slide-wrap')
  };

  return val;{
    function publicFunc (val){
      var value = val;
      return value;
    }

    publicFunc("publicFunc return");
  }
})();*/




/*var basketModule = (function () {
  var basket = [];

  function doSomethingPrivate() {
    console.log("Func: doSomethingPrivate");
  }

  function doSomething() {
    console.log("Func: doSomething");
  }

  return {
    // Add items to our basket
    addItem: function (values) {
      basket.push(values);
    },

    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length;
    },

    // Public alias to a private function
    doSomething: doSomethingPrivate,

    // Get the total value of items in the basket
    getTotal: function () {
      var q = this.getItemCount(),
        p = 0;

      while (q--) {
        p += basket[q].price;
      }

      return p;
    }
  };
})();*/





