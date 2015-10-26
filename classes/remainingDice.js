var Die = require('./die.js');
//initialize the reminaing dice to contain 5 newly rolled dice
var RemainingDice = function() {
  this.collection = [];
  //TODO: make this more efficient
  this.collection.push(new Die());
  this.collection.push(new Die());
  this.collection.push(new Die());
  this.collection.push(new Die());
  this.collection.push(new Die());
};
RemainingDice.prototype.displayRemaining = function() {
  console.log("\nREMAINING DICE:\n")
  for (var i = 0; i < this.collection.length; i++) {
    console.log((i + 1) + ": " + this.collection[i].value)
  }
};
RemainingDice.prototype.rollTheDice = function() {
  for (var i = 0; i < this.collection.length; i++) {
    this.collection[i].roll();
  }
  this.displayRemaining();
};
RemainingDice.prototype.scoreDie = function(id) {
  var die = this.collection[id - 1];
  this.collection.splice(id - 1, 1);
  if(die.value === 3) {
    return 0
  } else {

    return die.value;
  }
  console.log("VALUE: " + die.value);

};
module.exports = RemainingDice;
