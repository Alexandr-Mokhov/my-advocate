const searchContainer = document.querySelector('.js-search');
const searchInput = searchContainer.querySelector('.js-search-input');
const searchList = searchContainer.querySelector('.js-search-list');

function handleInput(evt) {
  if (evt.target.value.length >= 3) {
    getAutocompliteList(evt.target.value)
  } else {
    closeList();
  }
}

function getAutocompliteList(inputData) {
  fetch('https://api.my-advo.cat/api/search/complete?q=%D1%81%D1%83%D0%B4&target=all')
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .then(data => showResults(data.payload.list, inputData))
    .catch(err => console.log(`Ошибка - ${err}`));
}

function showResults(list, searchValue) {
  const resultSearch = list.filter(tag => {
    return tag.tags.toLowerCase().includes(searchValue.toLowerCase());
  })
  if (resultSearch && resultSearch.length > 0) {
    searchList.classList.add('header__search-list_visible');
    addElement(resultSearch);
  }
}

function addElement(arrResult) {
  while (searchList.firstChild) {
    searchList.removeChild(searchList.firstChild);
  }
  arrResult.forEach(item => {
    searchList.insertAdjacentHTML('beforeend', `<li class="header__search-list-item">${item.tags}</li>`);
  })
}

function selectVariant(evt) {
  searchInput.value = evt.target.textContent;
  closeList();
  console.log(`Производится запрос на поиск по выражению - "${evt.target.textContent}"`);
}

function closeList() {
  searchList.classList.remove('header__search-list_visible');
}

searchInput.addEventListener('input', handleInput);
searchList.addEventListener('click', selectVariant);
document.addEventListener('click', closeList);

