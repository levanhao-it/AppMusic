function initSearch() {
  const searchInput = document.querySelector('.header__input');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    searchSong(searchInput.value);
  });
}
function searchSong(searchTerm) {
  const songList = getAllListSong();
  for (const song of songList) {
    const needToShow = isMatch(song, searchTerm);

    song.hidden = !needToShow;
  }
}

function isMatch(liElement, searchTerm) {
  if (!liElement) return false;
  if (searchTerm === '') return true;

  const name = liElement.querySelector('.name');
  if (!name) return false;

  return name.textContent.toLowerCase().includes(searchTerm);
}

function getAllListSong() {
  return document.querySelectorAll('ul>li');
}

(() => {
  initSearch();
})();
