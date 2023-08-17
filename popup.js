document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  const minutesInput = document.getElementById('minutes');
  const secondsInput = document.getElementById('seconds');
  const timerDisplay = document.getElementById('timerDisplay');

  startButton.addEventListener('click', function () {
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);

    if (isNaN(minutes) || isNaN(seconds)) {
      alert('Please enter valid minutes and seconds.');
      return;
    }

    const totalTimeInSeconds = minutes * 60 + seconds;

    chrome.runtime.sendMessage({
      action: 'startCountdown',
      totalTimeInSeconds: totalTimeInSeconds,
    });
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'updateTimerDisplay') {
      const minutesLeft = Math.floor(message.currentTime / 60);
      const secondsLeft = message.currentTime % 60;
      timerDisplay.textContent = `${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`;
    }
  });
});
