describe("Load Fixture", function () {
  var initOps = _fullCarousel.initOps();
  
  beforeEach(function(){
    _fullCarousel.loadMarkUp();

    initOps.fixture = $('.fullwidth-carousel');
    initOps.ui.imgWrapperArr = $('.fullwidth-carousel .fullwidth-carousel__media-img-wrap');
    initOps.ui.imgArr = $('.fullwidth-carousel .fullwidth-carousel__media-img-wrap img.fullwidth-carousel__media-img');
  });
  
  afterEach(function(){
    $('.fullwidth-carousel').remove();
    initOps = _fullCarousel.initOps();
    _fullCarousel.resetElemStyles( initOps.ui.bodyObj );
    
  });

  it("Add Markup to the body", function () {
    /*expect($('body')).toContain('<div class="fullwidth-carousel">');*/
    expect( initOps.fixture ).toBeDefined();
  });

  it("Are images wrappers set? What about the images...", function(){
    expect( initOps.ui.imgWrapperArr.length ).toBeGreaterThan(0);
    expect( initOps.ui.imgArr.length ).toEqual( initOps.ui.imgWrapperArr.length );
  });
  
  it("Calculate the width of the body elem.", function(){
    initOps.ui.bodyObj.width(480);
    expect(_fullCarousel.calcBodyWidth( initOps.ui.bodyObj, 'Jasmine: Before' )).toBeGreaterThan(0);
  });
});


describe("Config Carousel Properties", function(){
  var initOps = _fullCarousel.initOps();
  
  beforeEach(function(){
    _fullCarousel.loadMarkUp();

    initOps.fixture = $('.fullwidth-carousel');
    initOps.ui.imgWrapperArr = $('.fullwidth-carousel .fullwidth-carousel__media-img-wrap');
    initOps.ui.imgArr = $('.fullwidth-carousel .fullwidth-carousel__media-img-wrap img.fullwidth-carousel__media-img');
  });
  
  afterEach(function(){
    $('.fullwidth-carousel').remove();
    initOps = _fullCarousel.initOps();
    _fullCarousel.resetElemStyles( initOps.ui.bodyObj );
  });


});

