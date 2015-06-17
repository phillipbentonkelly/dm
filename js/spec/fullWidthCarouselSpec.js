
/*describe("Check Markup Target", function () {
  
  it("Check that the target for the markup is empty", function () {
    expect($('body')).toBeEmpty();
  });
});*/

describe("Create Markup", function () {
  
  it("Add Markup to the body", function () {
    expect(_fullCarousel.createMarkUp()).toContain('<div class="fullwidth-carousel">');
  });
});

describe("Hello world 2", function () {
  
  it("Full Carousel 2", function () {
    expect(_fullCarousel.publicFunc("Hello world!")).toEqual("Hello world!");
  });
});


/*describe("Hello world 1", function () {
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