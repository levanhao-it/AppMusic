const songElement = document.getElementById('song');
const playElement = document.querySelector('.play-inner');
const nextElement = document.querySelector('.play-forward');
const prevElement = document.querySelector('.play-back');
const durationElement = document.querySelector('.duration');
const remainingElement = document.querySelector('.remaining');
const rangerBar = document.querySelector('.range');

const musicNameElement = document.querySelector('.music-name');
const authorElement = document.querySelector('.singer');
const imageElment = document.querySelector('.music-image');
const musicThumb = document.querySelector('.music-thumb');

const playRepeatElement = document.querySelector('.play-repeat');
const randomElement = document.querySelector('.play-random');
const heartElement = document.querySelector('.heart-music');

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
let isRandom = false;
let isHeart = false;

const musicList = [
  {
    id: 1,
    title: 'WALK ON DA STREET',
    author: '16 Typh x 16 BrT Cukak ',
    file: 'WALK ON DA STREET  16 Typh x 16 BrT Cukak Remix.mp3',
    image: 'https://i.ytimg.com/vi/mLc9JrE-UKc/maxresdefault.jpg',
  },
  {
    id: 2,
    title: 'MUỘN RỒI MÀ SAO CÒN',
    author: 'SƠN TÙNG MTP ',
    file: 'SƠN TÙNG MTP  MUỘN RỒI MÀ SAO CÒN  OFFICIAL MUSIC VIDEO.mp3',
    image: 'https://2sao.vietnamnetjsc.vn/images/2021/04/29/23/53/3.jpg',
  },
  {
    id: 3,
    title: 'Thời Không Sai Lệch',
    author: 'Ngải Thần ',
    file: 'Thời Không Sai Lệch .mp3',
    image: 'https://i.ytimg.com/vi/P9mqCv1yhBE/maxresdefault.jpg',
  },
  {
    id: 4,
    title: 'Từng Cho Nhau',
    author: 'Hà Nhi',
    file: 'Từng Cho Nhau.mp3',
    image:
      'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/c/5/8/9c58b3a2091e7e3bce691074c962429d.jpg',
  },
];

function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musicList.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // pre
    indexSong--;
    if (indexSong < 0) {
      indexSong = musicList.length - 1;
    }
    isPlaying = true;
  } else if (dir === 0) {
    indexSong = Math.trunc(Math.random() * musicList.length);
    isPlaying = true;
  }
  start(musicList, indexSong);
  playPause();
}

function playPause() {
  if (isPlaying) {
    musicThumb.classList.add('is-playing');
    songElement.play();
    isPlaying = false;
    playElement.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
  } else {
    musicThumb.classList.remove('is-playing');
    songElement.pause();
    playElement.innerHTML = `<ion-icon name="play"></ion-icon>`;
    isPlaying = true;
  }
}

function displayTimer() {
  const { duration, currentTime } = songElement;
  rangerBar.max = duration;
  rangerBar.value = currentTime;
  remainingElement.textContent = formatTimer(currentTime);
  if (!duration) {
    durationElement.textContent = '00:00';
  } else {
    durationElement.textContent = formatTimer(duration);
  }
}

function formatTimer(second) {
  const minutes = Math.floor(second / 60);
  const seconds = Math.floor(second - minutes * 60);
  const newMinutes = `0${minutes}`.slice(-2);
  const newSeconds = `0${seconds}`.slice(-2);
  return `${newMinutes}:${newSeconds}`;
}

function handleChangeBar() {
  songElement.currentTime = rangerBar.value;
}

function handleEndSong() {
  if (isRepeat) {
    // handle repeat song
    start(musicList, indexSong);
    isPlaying = true;
    playPause();
  } else if (isRandom) {
    indexSong = Math.trunc(Math.random() * musicList.length);
    start(musicList, indexSong);
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}

function start(musicList, indexSong) {
  songElement.setAttribute('src', `./music/${musicList[indexSong].file}`);
  musicNameElement.textContent = musicList[indexSong].title;
  authorElement.textContent = musicList[indexSong].author;
  imageElment.setAttribute('src', musicList[indexSong].image);
}

(() => {
  start(musicList, indexSong);
  if (!playElement) return;
  playElement.addEventListener('click', playPause);
  if (!nextElement) return;
  nextElement.addEventListener('click', () => {
    if (isRandom) {
      changeSong(0);
    } else {
      changeSong(1);
    }
  });
  if (!prevElement) return;
  prevElement.addEventListener('click', () => {
    if (isRandom) {
      changeSong(0);
    } else {
      changeSong(-1);
    }
  });
  displayTimer();
  let timer = setInterval(displayTimer, 1000);
  rangerBar.addEventListener('change', handleChangeBar);
  songElement.addEventListener('ended', handleEndSong);

  playRepeatElement.addEventListener('click', () => {
    if (isRepeat) {
      isRepeat = false;
      playRepeatElement.classList.remove('active');
    } else {
      isRepeat = true;
      playRepeatElement.classList.add('active');
    }
  });
  randomElement.addEventListener('click', () => {
    if (isRandom) {
      isRandom = false;
      randomElement.classList.remove('active');
    } else {
      isRandom = true;
      randomElement.classList.add('active');
    }
  });

  heartElement.addEventListener('click', () => {
    if (isHeart) {
      isHeart = false;
      heartElement.classList.remove('active');
    } else {
      isHeart = true;
      heartElement.classList.add('active');
    }
  });
})();
