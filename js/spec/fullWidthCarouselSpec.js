
/*describe("Check Markup Target", function () {
  
  it("Check that the target for the markup is empty", function () {
    expect($('body')).toBeEmpty();
  });
});*/

describe("Load Fixture", function () {
  var fixture;
  var ui = {
    'imgWrapperArr': [],
    'imgArr': []
  };
  var _data = {
    
  };

  beforeEach(function(){
    //_fullCarousel.loadFixture();

    _fullCarousel.loadMarkUp();

    fixture = $('.fullwidth-carousel');

    ui.imgWrapperArr = $('.fullwidth-carousel .fullwidth-carousel__media-img-wrap');
    ui.imgArr = $('.fullwidth-carousel .fullwidth-carousel__media-img-wrap img.fullwidth-carousel__media-img');
  });
  
  afterEach(function(){
    $('.fullwidth-carousel').remove();
    ui.imgWrapperArr = [];
    ui.imgArr = [];
  });

  it("Add Markup to the body", function () {
    /*expect($('body')).toContain('<div class="fullwidth-carousel">');*/
    expect( fixture ).toBeDefined();
  });

  it("Are images wrappers set? What about the images...", function(){
    expect( ui.imgWrapperArr.length ).toBeGreaterThan(0);
    expect( ui.imgArr.length ).toEqual( ui.imgWrapperArr.length );
  });
});

/*describe("Create Markup", function () {
  
  it("Add Markup to the body", function () {
    expect(_fullCarousel.createMarkUp()).toContain('<div class="fullwidth-carousel">');
  });
});

describe("Hello world 2", function () {
  
  it("Full Carousel 2", function () {
    expect(_fullCarousel.publicFunc("Hello world!")).toEqual("Hello world!");
  });
});


describe("Hello world 1", function () {
  it("Full Carousel", function () {
    expect(fullCarousel()).toEqual("Hello world!");
  });
});

describe("Create Markup", function(){
  it("Add Markup to the body", function(){
    expect(_fullCarousel.addCarouselMarkUp("Hello world!")).toContain("fullwidth-carousel");
  });
});*/

/*describe("fullCarousel result", function () {
	it("Return string", function (){
		var val = "test";

    expect(fullCarousel(val)).not.toBeUndefined();
	});
});

describe("Hello world", function () {
  it("Full Carousel", function () {
    expect(fullCarousel()).toEqual("Hello world!");
  });
});*/