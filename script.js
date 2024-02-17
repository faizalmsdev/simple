document.addEventListener("DOMContentLoaded", function() {
  const timerInputSection = document.getElementById('timer-input-section');
  const addedTimeDisplay = document.getElementById('added-time-display');
  const activeTimersDisplay = document.getElementById('active-timers-display');
  
  const activeTimers = [];

  function startTimer(hours, minutes, seconds) {
    const totalTime = hours * 3600 + minutes * 60 + seconds;
    let remainingTime = totalTime;

    const timerInterval = setInterval(() => {
      remainingTime--;

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        playAlertSound();
        updateTimeDisplay(timerIndex, 0);
        return;
      }
      
      updateTimeDisplay(timerIndex, remainingTime);
    }, 1000);

    const timerIndex = activeTimers.length;
    activeTimers.push({ remainingTime, interval: timerInterval });

    updateTimeDisplay(timerIndex, remainingTime);
  }

  function updateTimeDisplay(timerIndex, remainingTime) {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    const timerDisplay = document.getElementById(`timer-${timerIndex}`);
    if (timerDisplay) {
      const timerTime = timerDisplay.querySelector('.timer-time');
      if (hours === 0 && minutes === 0 && seconds === 0) {
        timerTime.textContent = 'Yay! Time is complete!';
        timerDisplay.classList.add('timer-ended');
      } else {
        timerTime.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
      }
    }
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  function playAlertSound() {
    // Add your sound playing logic here
  }

  function stopTimer(timerIndex) {
    clearInterval(activeTimers[timerIndex].interval);
    activeTimers.splice(timerIndex, 1);
    updateActiveTimersDisplay();
  }

  function updateActiveTimersDisplay() {
    activeTimersDisplay.innerHTML = '';
    activeTimers.forEach((timer, index) => {
      const timerDisplay = document.createElement('div');
      timerDisplay.classList.add('timer');
      timerDisplay.id = `timer-${index}`;
      const timerTime = document.createElement('div');
      timerTime.classList.add('timer-time');
      const stopButton = document.createElement('button');
      stopButton.textContent = 'Stop Timer';
      stopButton.classList.add('timer-button');
      stopButton.addEventListener('click', () => {
        stopTimer(index);
      });

      timerDisplay.appendChild(timerTime);
      timerDisplay.appendChild(stopButton);
      activeTimersDisplay.appendChild(timerDisplay);
    });
  }

  // Add event listener to start new timer button
  const startNewTimerBtn = document.getElementById('start-new-timer');
  startNewTimerBtn.addEventListener('click', function() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    startTimer(hours, minutes, seconds);
    
    // Update active timers display after starting a new timer
    updateActiveTimersDisplay();
  });
});
