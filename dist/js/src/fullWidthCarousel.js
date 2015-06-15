function helloWorld() {
  return "Hello world!";
}

var fullCarousel = (function (jQ, _) {
  var el = {
    $body: jQ('body'),
    $win: jQ(window),
    $imageWrap: jQ('.fullwidth-carousel__media-img-wrap'),
    $mediaWin: jQ('.fullwidth-carousel__media-window'),
    $slideWrap: jQ('.fullwidth-carousel__media-slide-wrap')
  };
})($, _);

var basketModule = (function () {
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
})();





