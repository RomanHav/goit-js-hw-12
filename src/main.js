// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { markup, gallery } from './js/render-functions';
import { pagination, totalHits } from './js/pixabay-api';

const loadBtn = document.querySelector('.load-button');
loadBtn.style.display = 'none';
const input = document.querySelector('.search');
const button = document.querySelector('.button');

let inputValue = '';
function request() {
  inputValue = input.value.trim();
  return inputValue;
}
function saveSearchWord() {
  const searchWord = inputValue;
  return searchWord;
}
function renderImages(evt) {
  evt.preventDefault();

  saveSearchWord();
  if (request().length === 0) {
    console.log(`${request()}----`);
    iziToast.error({
      theme: 'dark',
      message: 'The field must be fullfield',
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
      progressBarColor: '#B51B1B',
    });
  } else {
    console.log(request());
    gallery.innerHTML = '';
    pagination.page = 1;
    markup();
    input.value = '';
    loadBtn.style.display = 'block';
  }
}

loadBtn.addEventListener('click', event => {
  pagination.page++;

  input.value = saveSearchWord();
  const totalPages = Math.ceil(totalHits / pagination.per_page);
  const loadItems = pagination.page * pagination.per_page;

  if (pagination.page === totalPages) {
    pagination.per_page = loadItems - totalHits;
    console.log(pagination.per_page);
    markup();
    event.target.style.display = 'none';

    return iziToast.info({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }
  markup();
  input.value = '';
});

button.addEventListener('click', renderImages);
// button.addEventListener('click', clearInput);
