var readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var Die = require('./classes/die.js');
var RemainingDice = require('./classes/remainingDice.js');

var score;
//boolean to track if the player should be prompted to take a second die
var playerHasTakenTwoDice;
var remainingDice;

//remove and score a second die, if the user selects one
var promptSecondDie = function(firstDieTaken) {
  readline.question("\nYou have the option to take a second die once (hit enter to decline)\n", function(secondDieTaken) {
    if (secondDieTaken !== "" && secondDieTaken !== firstDieTaken) {
      score += remainingDice.removeAndScoreTwoDice(firstDieTaken, secondDieTaken);
      playerHasTakenTwoDice = true;
    } else {
      score += remainingDice.removeAndScoreDie(firstDieTaken);
    }
    playNextRound();
  });
};

//prompt the user to select a die to be scored and if eligible, prompts the user to remove a second die
var promptFirstDie = function() {
  readline.question("\nenter the id of the die you would like to keep\n", function(firstDieTaken) {
    if (!playerHasTakenTwoDice && remainingDice.collection.length > 1) {
      promptSecondDie(firstDieTaken);
    } else {
      score += remainingDice.removeAndScoreDie(firstDieTaken);
      playNextRound();
    }
  });
};

//rolls and scores the players remaining dice
var playNextRound = function() {
  if (remainingDice.collection.length > 0) {
    console.log("\nSCORE: " + score);
    remainingDice.rollTheDice();
    promptFirstDie();
  } else {
    console.log("GAME OVER! SCORE: " + score + "\n\n\n");
    start();
  }
};

//begins the game with a new set of RemainingDice
var start = function() {
  remainingDice = new RemainingDice();
  score = 0;
  playerHasTakenTwoDice = false;
  readline.question("type roll to start your turn!\n", function(answer) {
    if (answer === "roll") {
      playNextRound();
    }
  });
}
start();
