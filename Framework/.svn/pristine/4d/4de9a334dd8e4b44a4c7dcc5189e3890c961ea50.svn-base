// election widget
// to be used in conjunction with bdc.election.js
// by Ryan Page + Adam DeFelice
// 9/2014
// 
// the election widget object

var electionWidget = {
  
  // this function updates the dom
  draw: function(data) {
    $('.election-widget-final__precincts-reporting').text(data.precinctsPercentage);

    var $candidateNodes = $('.election-widget-final__candidate');
    for (var i = 0; i < data.candidates.length; i++) {
      var $candidate = $candidateNodes.filter('[data-id=' + data.candidates[i].id + ']');
      // console.log($candidate);

      var $percentage = $candidate.find('.election-widget-final__percentage');
      $percentage.text(data.candidates[i].percentage);

      var $voteCount = $candidate.find('.election-widget-final__vote-count');
      // $voteCount.text(Number(data.candidates[i].voteCount).toLocaleString('en'));
      // $voteCount.text(data.candidates[i].voteCount);
      function commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
      }
      
      $voteCount.text(commaSeparateNumber(data.candidates[i].voteCount)); // data.candidates[i].voteCount
  
      if (data.candidates[i].winner || candidateOverrides.indexOf(data.candidates[i].id.toString()) > -1) {
        // console.log(data.candidates[i].winner);
        var $winner = $candidate.find('.election-widget-final__checkmark');
        $winner.addClass('winner');
      }
    }
  },
  //  draw: function(data) {
  //   $('.election-widget-final__precincts-reporting').text("95%"); //data.precinctsPercentage

  //   var $candidateNodes = $('.election-widget-final__candidate');
  //   for (var i = 0; i < data.candidates.length; i++) {
  //     var $candidate = $candidateNodes.filter('[data-id=' + data.candidates[i].id + ']');

  //     var $percentage = $candidate.find('.election-widget-final__percentage');
  //     $percentage.text("46%");  // data.candidates[i].percentage

  //     var $voteCount = $candidate.find('.election-widget-final__vote-count');
  //     $voteCount.text("500,000"); //data.candidates[i].voteCount
  //   }
  // },
  init: function() {
    // we pass the race's ID and a function to add it to the dom
    // new Race('22003', electionWidget.draw); // dem governor
    // new Race('22796', electionWidget.draw); // rep governor
    // new Race(141196617222, electionWidget.draw);
    new Race(22957, electionWidget.draw);
    // new Race('22957', electionWidget.draw);
    // console.log(new Race('22957', electionWidget.draw));
  }
};

// Kickoff
$(document).ready(function() {
  electionWidget.init();
  setInterval(function(){electionWidget.init();}, 18000);
});
