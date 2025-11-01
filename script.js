// =======================
// Game State Variables
// =======================
let humanScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;
let isMuted = false;

// =======================
// Sound Effects
// =======================
const sounds = {
    click: new Audio('sounds/click.wav'),
    win: new Audio('sounds/win.wav'),
    lose: new Audio('sounds/lose.wav'),
    tie: new Audio('sounds/tie.wav'),
    gameOver: new Audio('sounds/gameover.wav')
};

// Preload sounds
Object.values(sounds).forEach(sound => {
    sound.load();
});

function playSound(soundName) {
    if (!isMuted && sounds[soundName]) {
        // Clone the audio to allow rapid replays
        const sound = sounds[soundName].cloneNode();
        sound.play().catch(err => console.log('Audio play failed:', err));
    }
}

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

function playRound(humanChoice, buttonElement) {
    // Remove 'selected' class from ALL buttons first
    const allButtons = document.querySelectorAll('.choice-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Add visual feedback to the clicked button
    buttonElement.classList.add('selected');
    
    // Play click sound
    playSound('click');
    
    const computerChoice = getComputerChoice();
    let resultMessage = "";
    
    if (humanChoice === computerChoice) {
        resultMessage = `It's a tie! You both chose ${humanChoice}.`;
        playSound('tie');
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        resultMessage = `You win! ${humanChoice} beats ${computerChoice}.`;
        humanScore++;
        playSound('win');
    } else {
        resultMessage = `You lose! ${computerChoice} beats ${humanChoice}.`;
        computerScore++;
        playSound('lose');
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
    // Play game over sound
    playSound('gameOver');
    
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
    playSound('click');
    
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

function toggleMute() {
    isMuted = !isMuted;
    const muteBtn = document.getElementById('muteBtn');
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
    muteBtn.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
}

// =======================
// Event Listeners
// =======================
const buttons = document.querySelectorAll(".choice-btn");
buttons.forEach(button => {
    button.addEventListener("click", () => playRound(button.textContent.toLowerCase(), button));
});

// Mute button event listener
document.addEventListener('DOMContentLoaded', () => {
    const muteBtn = document.getElementById('muteBtn');
    if (muteBtn) {
        muteBtn.addEventListener('click', toggleMute);
    }
});