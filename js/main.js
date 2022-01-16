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

const numberListElement = document.querySelector('.numberList');

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
let isRandom = false;
let isHeart = false;

const musicList = [
  {
    id: 1,
    title: 'Walk On Da Street',
    author: '16 Typh x 16 BrT',
    file: '1.mp3',
    image: 'https://i.ytimg.com/vi/mLc9JrE-UKc/maxresdefault.jpg',
  },
  {
    id: 2,
    title: 'Muộn rồi mà sao còn',
    author: 'Sơn Tùng MTP ',
    file: '2.mp3',
    image: 'https://2sao.vietnamnetjsc.vn/images/2021/04/29/23/53/3.jpg',
  },
  {
    id: 3,
    title: 'Thời Không Sai Lệch',
    author: 'Ngải Thần ',
    file: '3.mp3',
    image: 'https://i.ytimg.com/vi/P9mqCv1yhBE/maxresdefault.jpg',
  },
  {
    id: 4,
    title: 'Từng Cho Nhau',
    author: 'Hà Nhi',
    file: '4.mp3',
    image:
      'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/9/c/5/8/9c58b3a2091e7e3bce691074c962429d.jpg',
  },
  {
    id: 5,
    title: 'Trốn Tìm',
    author: 'Đen',
    file: '5.mp3',
    image: 'https://i1.sndcdn.com/artworks-SulYyzvm47QgVmqH-yL2nCw-t500x500.jpg',
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
function play() {
  songElement.play();
  playElement.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
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

function createSongElement(song) {
  if (!song) return;

  const template = document.getElementById('songTemplate');
  if (!template) return;

  const songElement = template.content.firstElementChild.cloneNode(true);
  songElement.dataset.id = song.id;

  //render
  const titleElement = songElement.querySelector('.name');
  if (titleElement) titleElement.textContent = song.title;

  const authorElement = songElement.querySelector('.authorlist');
  if (authorElement) authorElement.textContent = song.author;

  const idElement = songElement.querySelector('.id');
  if (idElement) idElement.textContent = song.id < 10 ? `0${song.id}` : song.id;

  const imgElement = songElement.querySelector('.imageList');
  if (imgElement) imgElement.setAttribute('src', song.image);

  return songElement;
}

function initListSong() {
  const ulElement = document.getElementById('listSong');
  if (!ulElement) return;
  for (const song of musicList) {
    const liElement = createSongElement(song);
    ulElement.appendChild(liElement);
  }

  const liActive = ulElement.querySelector(`[data-id="${musicList[indexSong].id}"]`);
  liActive.classList.add('active');

  const liList = ulElement.querySelectorAll('li');

  for (const li of liList) {
    li.addEventListener('click', () => {
      for (const li of liList) {
        li.classList.remove('active');
      }
      li.classList.add('active');
      indexSong = Number.parseInt(li.dataset.id);
      start(musicList, indexSong - 1);
      play();
    });
  }
  return indexSong;

  // ulElement.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   li = e.target;
  //   console.log(li);
  //   indexSong = Number.parseInt(li.dataset.id);
  //   console.log(indexSong);
  //   start(musicList, indexSong - 1);
  //   playPause();
  // });
}

function displaySongPlay() {}

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

  numberListElement.textContent = `${musicList.length} songs on the list 🎼`;

  // render list
  initListSong();
})();
