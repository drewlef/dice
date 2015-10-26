var Die = require('./classes/die.js');
var RemainingDice = require('./classes/remainingDice.js');
var score;
var playerHasTakenTwoDice;
var remainingDice;
var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
var playDice = function() {
  //TODO: this is in the wrong place
  console.log("\n\n\n\n\nSIZE: " + remainingDice.collection.length);
  if (remainingDice.collection.length > 0) {
    console.log("\nSCORE: " + score);
    remainingDice.rollTheDice();
    readline.question("\nenter the id of the die you would like to keep\n", function(firstDieTaken) {
      score += remainingDice.scoreDie(firstDieTaken);
      if (!playerHasTakenTwoDice && remainingDice.collection.length > 0) {
        remainingDice.displayRemaining();
        readline.question("\nYou have the option to take a second die once (type no to decline)\n", function(secondDieTaken) {
          if (secondDieTaken !== "no") {
            score += remainingDice.scoreDie(secondDieTaken);
            playerHasTakenTwoDice = true;
          }
          playDice();
        });
      } else {
        playDice();
      }
    });
  } else {
    console.log("Your score is: " + score);
    start();
  }
};
var start = function() {
  remainingDice = new RemainingDice();
  score = 0;
  playerHasTakenTwoDice = false;
  readline.question("type roll to start your turn!\n", function(answer) {
    if (answer === "roll") {
      playDice();
    }
  });
}
start();
