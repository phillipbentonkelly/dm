/*function helloWorld() {
  return "Hello world!";
}

function fullCarousel() {
  return "Hello world!";
};*/

var _fullCarousel = (function (jQ, _) {
  
  var ui = {
    jQ_body: jQ('body'),
    jQ_win: jQ(window),
    jQ_imageWrap: jQ('.fullwidth-carousel__media-img-wrap'),
    jQ_mediaWin: jQ('.fullwidth-carousel__media-window'),
    jQ_slideWrap: jQ('.fullwidth-carousel__media-slide-wrap')
  };
  
  return {
    publicFunc: function (val){
      return val;
    },
    loadMarkUp: function(){
      $('body').append('<div class="fullwidth-carousel"><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--left fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--left-arrow dm-icon dm-icon--arrow-left-gray-x-small"></span></div></div><div class="fullwidth-carousel__media-slide-wrap"><div class="fullwidth-carousel__media-window"><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div></div></div><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--right fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--right-arrow dm-icon dm-icon--arrow-right-gray-x-small"></span></div></div></div>');
    },
    loadFixture: function(src){
      //$('body').append( setFixtures( createMarkUp() ) );
    },
    createMarkUp: function (){
      return '<div class="fullwidth-carousel"><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--left fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--left-arrow dm-icon dm-icon--arrow-left-gray-x-small"></span></div></div><div class="fullwidth-carousel__media-slide-wrap"><div class="fullwidth-carousel__media-window"><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div></div></div><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--right fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--right-arrow dm-icon dm-icon--arrow-right-gray-x-small"></span></div></div></div>';
    }
  }
})($, _);


/*
<div class="fullwidth-carousel"><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--left fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--left-arrow dm-icon dm-icon--arrow-left-gray-x-small"></span></div></div><div class="fullwidth-carousel__media-slide-wrap"><div class="fullwidth-carousel__media-window"><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div></div></div><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--right fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--right-arrow dm-icon dm-icon--arrow-right-gray-x-small"></span></div></div></div>



var fullCarousel = (function (val) {
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





