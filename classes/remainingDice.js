var Die = require('./die.js');

//A class that contains the remaining dice to be rolled and scored by the player
var RemainingDice = function() {
  this.collection = [];
  this.collection.push(new Die());
  this.collection.push(new Die());
  this.collection.push(new Die());
  this.collection.push(new Die());
  this.collection.push(new Die());
};

//display the values of the remaining dice
RemainingDice.prototype.displayRemaining = function() {
  console.log("\nREMAINING DICE:\n")
  for (var i = 0; i < this.collection.length; i++) {
    console.log((i + 1) + ": " + this.collection[i].value)
  }
};

//rolls the dice and outputs their corresponding values
RemainingDice.prototype.rollTheDice = function() {
  for (var i = 0; i < this.collection.length; i++) {
    this.collection[i].roll();
  }
  this.displayRemaining();
};

//removes the selected die from the collection and returns the value
RemainingDice.prototype.removeAndScoreDie = function(id) {
  var die = this.collection[id - 1];
  this.collection.splice(id - 1, 1);
  if (die.value === 3) {
    return 0
  } else {
    return die.value;
  }
};

//removes two dice and returns the score or the two. This function is necessary to ensure the
//order the dice are removed in the correct order
RemainingDice.prototype.removeAndScoreTwoDice = function(firstDieTaken, secondDieTaken) {
  var score = 0
  if (parseInt(firstDieTaken) >= secondDieTaken) {
    score += this.removeAndScoreDie(firstDieTaken);
    score += this.removeAndScoreDie(secondDieTaken);
  } else {
    score += this.removeAndScoreDie(secondDieTaken);
    score += this.removeAndScoreDie(firstDieTaken);
  }
  return score;
};

module.exports = RemainingDice;
