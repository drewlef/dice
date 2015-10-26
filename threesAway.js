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
  if (remainingDice.collection.length > 0) {
    console.log("\nSCORE: " + score);
    remainingDice.rollTheDice();
    readline.question("\nenter the id of the die you would like to keep\n", function(firstDieTaken) {
      if (!playerHasTakenTwoDice && remainingDice.collection.length > 0) {
        readline.question("\nYou have the option to take a second die once (enter to decline)\n", function(secondDieTaken) {
          if (secondDieTaken !== "") {
            score += remainingDice.scoreTwoDice(firstDieTaken, secondDieTaken);
            playerHasTakenTwoDice = true;
          } else {
            score += remainingDice.scoreDie(firstDieTaken);
          }
          playDice();
        });
      } else {
        score += remainingDice.scoreDie(firstDieTaken);
        playDice();
      }
    });
  } else {
    console.log("GAME OVER! SCORE: " + score + "\n\n\n");
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
