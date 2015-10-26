//represents a 6 sided die
var Die = function() {
};

//sets the value of the die to a value between 1 and 6
Die.prototype.roll = function(id) {
  this.value = Math.floor(Math.random() * 6) + 1;
};

module.exports = Die;
