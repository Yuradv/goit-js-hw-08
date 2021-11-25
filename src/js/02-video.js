import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const pausedTime = localStorage.getItem(STORAGE_KEY);

function onTimeWhenPause(evt) {
  const videoTime = evt.seconds;

  localStorage.setItem(STORAGE_KEY, videoTime);
}

player.on('timeupdate', throttle(onTimeWhenPause, 1000));

///

player
  .setCurrentTime(pausedTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
