// script.js
let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 1);
    startStopBtn.textContent = 'Pause';
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = 'Start';
}

function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    laps = [];
    updateLaps();
    running = false;
    startStopBtn.textContent = 'Start';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = time.getUTCMilliseconds().toString().padStart(3, '0');
    display.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (running) {
        laps.push(display.textContent);
        updateLaps();
    }
}

function updateLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTimer();
        running = true;
    } else {
        pauseTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
