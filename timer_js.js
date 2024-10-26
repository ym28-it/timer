let timerInterval;
let countdownInterval;
let elapsedSeconds = 0;
let countdownSeconds = 0;
let isRunning = false;
let countdownRunning = false;
let isPaused = false;

const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const countdownInput = document.getElementById("countdownInput");
const countdownButton = document.getElementById("countdownButton");

// Create an Audio object for the notification sound
const countdownEndSound = new Audio('timer_sound1.mp3');  // Make sure this file is in your project folder

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

function startTimer() {
    if (!isRunning && !countdownRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            timerElement.textContent = formatTime(elapsedSeconds);
        }, 1000);
    } else if (!countdownRunning && countdownSeconds > 0){
        countdownSeconds = parseInt(countdownInput.value, 10);
        timerElement.textContent = formatTime(countdownSeconds);
        startCountdown();
    }
}

function pauseTimer() {
    if (isRunning || countdownRunning) {
        clearInterval(timerInterval);
        clearInterval(countdownInterval);  // Pause both countdown and regular timer
        isRunning = false;
        countdownRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    clearInterval(countdownInterval);  // Reset both countdown and regular timer
    isRunning = false;
    countdownRunning = false;
    elapsedSeconds = 0;
    countdownSeconds = 0;
    timerElement.textContent = "00:00:00";
    countdownInput.textContent = "0";
}

function startCountdown() {
    if (!countdownRunning && countdownSeconds > 0) {
        countdownRunning = true;
        countdownInterval = setInterval(() => {
            if (countdownSeconds > 0) {
                countdownSeconds--;
                timerElement.textContent = formatTime(countdownSeconds);
            } else {
                clearInterval(countdownInterval);
                countdownRunning = false;
                countdownEndSound.play();  // Play the sound when countdown ends
                startTimer(); // Start the timer after the countdown finishes
            }
        }, 1000);
    }
}

// When the user clicks the countdown button
startButton.addEventListener("click", () => {
    if (!countdownRunning) {
        countdownSeconds = parseInt(countdownInput.value, 10);
        timerElement.textContent = formatTime(countdownSeconds);
        startCountdown();
    }
});

// Function to allow user to enter time on clicking the timer display
function setTimerTime() {
    const userTime = prompt("Enter time in format HH:MM:SS");
    if (userTime) {
        const [hours, minutes, seconds] = userTime.split(":").map(Number);
        if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
            elapsedSeconds = hours * 3600 + minutes * 60 + seconds;
            timerElement.textContent = formatTime(elapsedSeconds);
        } else {
            alert("Invalid time format. Please use HH:MM:SS.");
        }
    }
}

timerElement.addEventListener("click", setTimerTime);  // Add event listener for timer display click
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
