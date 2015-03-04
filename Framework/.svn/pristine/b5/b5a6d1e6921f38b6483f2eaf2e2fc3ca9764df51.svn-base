// useful election classes
// by Ryan Page + Adam DeFelice
// 9/2014
// 
// Candidate class
function Candidate(info, percent) {
  this.id = info.ap_candidate_id;
  this.voteCount = info.vote_count;
  this.percentage = percent;
  this.winner = info.winner;
  return this;
}

function Races(raceIDs, drawFunction) {
  this.raceIDs = raceIDs;
  this.races = [];
  this.URL = "/electionapi/races/number?";
  for (i = 0; i < raceIDs.length; i++) {
    if (i !== 0)
      this.URL += "&";
    this.URL += "number=" + this.raceIDs[i];
  }
  // console.log(this.URL);
  var that = this;
  $.getJSON(this.URL, function(d) {
    for ( i = 0 ; i < d.length ; i++ ) {
      var raceData = [d[i]];
      var race = new Race(raceData.id, drawFunction, raceData);
      that.races.push(race);
    }
  });
  return this;
}

// Race class
function Race(raceID, drawFunction, raceData) {
  this.totalVotes = 0;
  this.candidates = [];
  this.precincts = 0;
  this.precinctsReporting = 0;
  this.callback = function(d) {that.parseRaceData.apply(that, [d, drawFunction]);};
  this.URL = '/electionapi/races/number?number=' + raceID;
  // console.log(this.URL);

  // do some unfortunate scope tricks to make the callback effect /this/ Race instance
  var that = this;
  if (raceData)
    this.callback(raceData);
  else 
    $.getJSON(this.URL, this.callback); // thanks dan
  return this;
}


// function addWinnerClass() {
//   if (this.winner).addClass()
// }

Race.prototype.parseRaceData = function(data, drawFunction) {
  // console.log(data);
  var unit = data[0]['reporting_units'][0];
  var results = unit['results'];
  
  // set some instance variables
  this.precinctsReporting = unit['precincts_reporting'];
  this.precincts = unit['total_precincts'];
  this.precinctsPercentage = '0%';
  if (this.precincts > 0) {
    this.precinctsPercentage = Math.round(this.precinctsReporting/this.precincts * 100) + '%';
  }

  // count total race votes
  for (var i = 0; i < results.length; i++) {
    this.totalVotes += results[i]['vote_count'];
  }

  // get, store race candidates
  for (i = 0; i < results.length; i++) {
    // get the percentage while we still can see the total number of votes
    // while we're here, let's not divide by zero
    var percent = '0%';
    if (this.totalVotes > 0) {
      // percent = Math.round(results[i]['vote_count'] / this.totalVotes * 100) + '%';
      percentRaw = results[i]['vote_count'] / this.totalVotes * 100;
      percent = Math.round(percentRaw * 10)/ 10 + '%';
    }
    this.candidates.push(new Candidate(results[i], percent));
  }

  // update the dom accordingly
  drawFunction(this);
};