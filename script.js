
function playGame(){
    //
        let humanScore = 0; // player's score
        let computerScore = 0; // computer's score

// Computer Choice
function getComputerChoice(){
    const n = Math.floor(Math.random() * 3); // 0, 1, or 2
    if (n === 0) return "rock";
    if (n === 1) return "paper";
    return "scissors";
}


// Human Choice
function getHumanChoice(){
    const choice = prompt("Enter rock, paper, or scissors:");
    return choice.toLowerCase(); //keep return output standard
}

//score keeper
function playRound(humanChoice, computerChoice) {
        humanChoice = humanChoice.toLowerCase();

if (humanChoice === computerChoice){
    console.log(`It's a tie! You both chose ${humanChoice}.`)
}

else if (
(humanChoice === "rock" && computerChoice === "scissors") ||
(humanChoice === "paper" && computerChoice === "rock") ||
(humanChoice === "scissors" && computerChoice === "paper") 
)
{
    console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
    humanScore++;
}
else {
    console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
    computerScore ++;
}

console.log(`Score - You: ${humanScore} | Computer: ${computerScore}`);

}


//play 5 rounds
for (let i = 1; i <= 5; i++) {
    console.log(`\n--- Round ${i} ---`);
    playRound(getHumanChoice(), getComputerChoice());
}

//Declare winner of game

console.log("\n=== Game Over ====");
if (humanScore > computerScore){
    console.log(`You won the game! Final score: You ${humanScore} - Computer ${computerScore}`);

} else if (computerScore > humanScore) {
console.log(`You lost the game! Final score: You ${humanScore} - Computer ${computerScore}`);

} else {
    console.log(`It's a tie! Final score: You ${humanScore} - Computer ${computerScore}`);
}
}
