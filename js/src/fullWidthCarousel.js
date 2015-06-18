var _fullCarousel = (function (jQ, _) {
  
  var ui = {
    jQ_body: $('body'),
    jQ_win: $(window),
    jQ_imageWrap: $('.fullwidth-carousel__media-img-wrap'),
    jQ_mediaWin: $('.fullwidth-carousel__media-window'),
    jQ_slideWrap: $('.fullwidth-carousel__media-slide-wrap')
  };
  
  return {
    initOps: function( options ){
      ui = {
        jQ_body: $('body'),
        jQ_win: $(window),
        jQ_imageWrap: $('.fullwidth-carousel__media-img-wrap'),
        jQ_mediaWin: $('.fullwidth-carousel__media-window'),
        jQ_slideWrap: $('.fullwidth-carousel__media-slide-wrap')
      };

      var locOps = {
        '_data': {},
        'fixture': {},
        'ui': {
          'winObj': $(window),
          'bodyObj': $('body'),
          'imgWrapperArr': [],
          'imgArr': []
        }
      };
      var ops = (typeof(options) !== 'undefined')? options : locOps;

      return ops;
    },
    resetElemStyles: function( elemObj ){
      // split on semi colon (between styles) then colon for attr
      try{
        if( typeof(elemObj) === 'object' && elemObj.width() !== 'undefined' ){
          // console.log( 'style: ', elemObj.attr('style'), 'elem width: ', elemObj.width(), 'obj: ', elemObj );
          var elemStyleProArr = elemObj.attr('style').split(':');
          // var currElemStyles = [];

          for(var i = 0; i < elemStyleProArr.length; i++){
            // console.log(i, elemStyleProArr[i]);

            if(i % 2 === 0){
              // console.log("Odd/Even: ", i ,' : ', i % 2, ' : ', i % 2 !== 0, ' : value: ', elemStyleProArr[i]);

              // currElemStyles.push(elemStyleProArr[i]);
              elemObj.css( elemStyleProArr[i], 'auto' );
            }
          }

          this.calcBodyWidth( elemObj, 'Jasmine: After' );
        }
      }catch(err){
        // console.log("Error: ", err);
      }
      
      return true;
    },
    calcBodyWidth: function ( jQ_obj, label ){
      var retObjRef = (typeof(jQ_obj) === 'object' && jQ_obj.width() === 'number')? jQ_obj : $('body');
      var labl = (typeof(label) === 'string')? label : '';
      console.log( "Func: calcBodyWidth: ", retObjRef.width(), labl );

      return retObjRef.width();
    },
    checkScreenWidth: function() {
      var body = $('body');

      if ( body.width() > 960 ) {
        return true;
      } else {
        return false;
      }
    },
    setImgWidth: function( maxWidth ){
        var imgWidth = this.checkScreenWidth() ? 960 : Math.ceil( $('body').width() * 0.8 );
        ui.jQ_imageWrap.width(imgWidth);
        ui.jQ_slideWrap.css('min-height', ui.jQ_imageWrap.height() );
        console.log('img wrap width', imgWidth, $('.fullwidth-carousel__media-img-wrap').width() );

        console.log( ui.jQ_imageWrap.width() );
      return true;
    },
    loadMarkUp: function(){
      $('body').append(this.createMarkUp());
    },
    loadFixture: function(src){
      //$('body').append( setFixtures( createMarkUp() ) );
    },
    createMarkUp: function (){
      // return '<div class="fullwidth-carousel"><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--left fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--left-arrow dm-icon dm-icon--arrow-left-gray-x-small"></span></div></div><div class="fullwidth-carousel__media-slide-wrap"><div class="fullwidth-carousel__media-window"><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div></div></div><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--right fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--right-arrow dm-icon dm-icon--arrow-right-gray-x-small"></span></div></div></div>';

      return '<div class="fullwidth-carousel"><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--left fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--left-arrow dm-icon dm-icon--arrow-left-gray-x-small"></span></div></div><div class="fullwidth-carousel__media-slide-wrap"><div class="fullwidth-carousel__media-window"><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div><div class="fullwidth-carousel__media-img-wrap"><img class="fullwidth-carousel__media-img" src="http://placehold.it/960x580"></div></div></div><div class="fullwidth-carousel__media-nav-anchor"><div class="fullwidth-carousel__media-nav--right fullwidth-carousel__media-nav"><span class="fullwidth-carousel__media-nav--right-arrow dm-icon dm-icon--arrow-right-gray-x-small"></span></div></div></div>';
    }
  }
})($, _);

