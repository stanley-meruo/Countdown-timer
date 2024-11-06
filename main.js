const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timeInput = document.getElementById('timeInput');
const countdownText = document.getElementById('countdown');
const countdownCircle = document.querySelector('.countdown-circle');

let timer;
let totalTime;
let remainingTime;
let isPaused = false;

document.querySelectorAll('.buttons button').forEach(button => {
  const icon = button.querySelector('lord-icon');
  button.addEventListener('mouseover', () => {
    icon.setAttribute('colors', 'primary:#000000');
  });

  button.addEventListener('mouseout', () => {
    icon.setAttribute('colors', 'primary:#ffffff');
  });
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimer() {
  if (remainingTime <= 0) {
    clearInterval(timer);
    countdownCircle.style.strokeDashoffset = '0';
    countdownText.textContent = '00:00';
    return;
  }

  remainingTime--;
  countdownText.textContent = formatTime(remainingTime);

  const dashOffset = (282.743 * (remainingTime / totalTime)).toFixed(3);
  countdownCircle.style.strokeDashoffset = dashOffset;
}

startBtn.addEventListener('click', () => {
  if (isPaused && timer) {
    isPaused = false;
    timer = setInterval(updateTimer, 1000);
    return;
  }

  clearInterval(timer);
  totalTime = parseInt(timeInput.value) || 0;
  remainingTime = totalTime;

  if (totalTime > 0) {
    countdownText.textContent = formatTime(totalTime);
    countdownCircle.style.strokeDashoffset = 282.743;
    timer = setInterval(updateTimer, 1000);
  }
});

pauseBtn.addEventListener('click', () => {
  if (!isPaused) {
    clearInterval(timer);
    isPaused = true;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  countdownText.textContent = '00:00';
  countdownCircle.style.strokeDashoffset = 282.743;
  isPaused = false;
});
