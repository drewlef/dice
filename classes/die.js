var Die = function() {
};
Die.prototype.roll = function(id) {
  this.value = Math.floor(Math.random() * 6) + 1;
};

module.exports = Die;
