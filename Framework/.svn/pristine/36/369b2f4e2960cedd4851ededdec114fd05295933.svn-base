// election results
// to be used in conjunction with bdc.election.js
// by Ryan Page + Adam DeFelice
// 9/2014
// 



// the election results object
var electionResults = {
  // this function updates the dom
  draw: function(data) {
    $('.election-results__source, .election-results__source--mobile').text(data.precinctsPercentage + " Precincts Reporting"); //data.precinctsPercentage
    var $candidateNodes = $('.election-results__candidate-row');
    for ( var i = 0; i < data.candidates.length; i++ ) {
      var $candidate = $candidateNodes.filter('[data-id=' + data.candidates[i].id + ']');

      var $percentage = $candidate.find('.election-results__candidate-percent');
      $percentage.text(data.candidates[i].percentage); // data.candidates[i].percentage

      var $voteCount = $candidate.find('.election-results__candidate-votes');
      // $voteCount.text(Number(data.candidates[i].voteCount).toLocaleString('en')); // data.candidates[i].voteCount

      function commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
      }
      $voteCount.text(commaSeparateNumber(data.candidates[i].voteCount)); // data.candidates[i].voteCount
      var $percentageBar = $candidate.find('.election-results__candidate-bar-percent--blue, .election-results__candidate-bar-percent--red, .election-results__candidate-bar-percent--green, .election-results__candidate-bar-percent--gray');
      $percentageBar.width(data.candidates[i].percentage); //data.candidates[i].percentage
      // set the checkbox if we have a winner
      if (data.candidates[i].winner || candidateOverrides.indexOf(data.candidates[i].id.toString()) > -1) {
        var $winner = $candidate.find('.election-results__checkmark');
        $winner.addClass('winner-white');
        var $winnerMobile = $candidate.find('.election-widget-final__checkmark--small');
        $winnerMobile.addClass('winner');
      }

    }
  },
  drawBallot: function(data) {
    var $ballotNodes = $('.election-results__ballot-data');
    for (var i = 0; i < data.candidates.length; i++) {
      var $ballot = $ballotNodes.filter('[data-id=' + data.candidates[i].id + ']');

      var $percentage = $ballot.find('.election-results__ballot-percent');
      $percentage.text(data.candidates[i].percentage);  // data.candidates[i].percentage
      
      var $voteCount = $ballot.find('.election-results__ballot-votes');
      // $voteCount.text(Number(data.candidates[i].voteCount).toLocaleString('en')); //data.candidates[i].voteCount
      function commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
      }
      $voteCount.text(commaSeparateNumber(data.candidates[i].voteCount)); // data.candidates[i].voteCount

    if (data.candidates[i].winner || candidateOverrides.indexOf(data.candidates[i].id.toString()) > -1) {
        $ballot.addClass('winner-ballot');
      }
    }
  },
  init: function() {

    // ------ IGNORE THESE, THEY WERE FOR THE PRIMARY -------
    // we pass the race's ID and a function to add it to the dom
    /*
    new Race('22003', electionResults.draw); // dem governor
    new Race('22796', electionResults.draw); // rep governor
    new Race('22004', electionResults.draw); // dem lt. governor
    new Race('22799', electionResults.draw); // rep lt. governor
    new Race('22005', electionResults.draw); // dem attorney gen.
    new Race('22800', electionResults.draw); // rep attorney gen.
    new Race('22014', electionResults.draw); // District 6 rep
    new Race('22014', electionResults.draw); // District 6 dem
    */

    // THESE ARE THE ONES WE'LL NEED FOR THE ACTUAL ELECTION
    // new Race('22957', electionResults.drawCandidate) // governor
    // new Race('24696', electionResults.drawBallot) // gas tax
    // new Race('24697', electionResults.drawBallot) // bottle bill
    // new Race('24698', electionResults.drawBallot) // casino repeal
    // new Race('24699', electionResults.drawBallot) // sick leave
    // new Race('22961', electionResults.drawCandidate) // treasurer
    // new Race('22959', electionResults.drawCandidate) // secretary of state
    // new Race('23140', electionResults.drawCandidate) // state auditor
    // new Race('', electionResults.drawCandidate) // sixth congressional district
    // new Race('22041', electionResults.drawCandidate) // state senate, first hampden and hanpshire district
    // new Race('22983', electionResults.drawCandidate) // state senate, worcester and norfolk district
    // new Race(141196617222, electionResults.draw);
    // new Race(141196621318, electionResults.draw,  treasurerRace);
    // new Race(141196619270, electionResults.draw,  sosRace);
    // new Race(141196804614, electionResults.draw,  auditorRace);
    // new Race(1415077200000, electionResults.draw,  sixthCongressRace);
    // new Race(141195679238, electionResults.draw,  hampdenRace);
    // new Race(141196643846, electionResults.draw,  worcesterRace);

    // new Race(141198397958, electionResults.drawBallot, ballotGas);
    // new Race(141198398982, electionResults.drawBallot, ballotBottle);
    // new Race(141198400006, electionResults.drawBallot, ballotCasino);
    // new Race(141198401030, electionResults.drawBallot, ballotSick);

    new Races([22957, 22961, 22959, 23140, 22952, 22041, 22983], electionResults.draw);
    new Races([24696, 24697, 24698, 24699], electionResults.drawBallot);
    new Race(30003 + "&state=nh", electionResults.draw);
  }
};

// Kickoff
$(document).ready(function() {
  electionResults.init();
  setInterval(function(){electionResults.init();}, 18000);
});
