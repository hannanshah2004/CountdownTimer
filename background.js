let countdownInterval;
let countdownTime;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'startCountdown') {
    countdownTime = message.totalTimeInSeconds;

    clearInterval(countdownInterval);

    countdownInterval = setInterval(function () {
      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        playCountdownSound();
        return;
      }

      chrome.runtime.sendMessage({
        action: 'updateTimerDisplay',
        currentTime: countdownTime,
      });

      countdownTime--;
    }, 1000);
  }
});

function playCountdownSound() {
  const audio = new Audio(chrome.runtime.getURL('sound.mp3'));
  audio.play();
}
