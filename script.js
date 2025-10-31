// =======================
// Game State Variables
// =======================
let humanScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

// =======================
// DOM Elements
// =======================
const humanScoreEl = document.getElementById("humanScore");
const computerScoreEl = document.getElementById("computerScore");
const roundInfoEl = document.getElementById("roundInfo");
const resultEl = document.getElementById("result");
const resultTextEl = resultEl.querySelector(".result-text");

// Create Game Over container dynamically
const container = document.querySelector(".container");
let gameOverEl = null;

// =======================
// Functions
// =======================
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const n = Math.floor(Math.random() * 3);
    return choices[n];
}

function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    let resultMessage = "";

    if (humanChoice === computerChoice) {
        resultMessage = `It's a tie! You both chose ${humanChoice}.`;
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        resultMessage = `You win! ${humanChoice} beats ${computerChoice}.`;
        humanScore++;
    } else {
        resultMessage = `You lose! ${computerChoice} beats ${humanChoice}.`;
        computerScore++;
    }

    // Update DOM
    humanScoreEl.textContent = humanScore;
    computerScoreEl.textContent = computerScore;
    roundInfoEl.textContent = `Round ${round} of ${maxRounds}`;
    resultTextEl.textContent = resultMessage;

    round++;

    if (round > maxRounds) {
        endGame();
    }
}

function endGame() {
    // Hide choices
    document.querySelector(".choices").classList.add("hidden");

    // Create Game Over message
    gameOverEl = document.createElement("div");
    gameOverEl.classList.add("game-over");

    let winnerMessage = "";
    if (humanScore > computerScore) winnerMessage = "You won the game!";
    else if (computerScore > humanScore) winnerMessage = "You lost the game!";
    else winnerMessage = "It's a tie!";

    gameOverEl.innerHTML = `
        <h2>Game Over</h2>
        <p>${winnerMessage}<br>Final Score: You ${humanScore} - Computer ${computerScore}</p>
        <button class="restart-btn">Play Again</button>
    `;

    container.appendChild(gameOverEl);

    // Add restart button event
    document.querySelector(".restart-btn").addEventListener("click", restartGame);
}

function restartGame() {
    humanScore = 0;
    computerScore = 0;
    round = 1;

    humanScoreEl.textContent = humanScore;
    computerScoreEl.textContent = computerScore;
    roundInfoEl.textContent = `Round ${round} of ${maxRounds}`;
    resultTextEl.textContent = "Choose your move";

    document.querySelector(".choices").classList.remove("hidden");
    gameOverEl.remove();
    gameOverEl = null;
}

// =======================
// Event Listeners
// =======================
const buttons = document.querySelectorAll(".choice-btn");
buttons.forEach(button => {
    button.addEventListener("click", () => playRound(button.textContent.toLowerCase()));
});
