var nums = [1,2,3]
,   fns = []

_.each(nums, function(num){
  console.log("num", num);
  fns.push(function(){
    console.log("fn ", num);
  })
})

_.each(fns, function(fn){
  fn();
});
