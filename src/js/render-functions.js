import { fetchInfo, pagination } from './pixabay-api';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search');
let inputValue = '';

export function request() {
  inputValue = input.value.trim();
  return inputValue;
}

export function clearInput() {
  input.value = ''; // Очищаємо інпут
}

export async function markup() {
  const gallery = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');
  const searchWord = request();
  loader.style.display = 'block';

  try {
    const data = await fetchInfo(searchWord);
    if (data.hits.length === 0) {
      loader.style.display = 'none';
      iziToast.error({
        theme: 'dark',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FAFAFB',
        backgroundColor: '#EF4040',
        position: 'topRight',
        progressBarColor: '#B51B1B',
      });
    } else {
      const images = data.hits
        .map(element => {
          return `<li class="gallery-item">
        <a class="image-link" href="${element.largeImageURL}">
          <img class="image" src="${element.webformatURL}" alt="${element.tags}" />
        </a>
        <ul class="about-image">
          <li class="likes">
            <span class="likes-title">Likes</span>
            <span class="likes-count">${element.likes}</span>
          </li>
          <li class="views">
            <span class="views-title">Views</span>
            <span class="views-count">${element.views}</span>
          </li>
          <li class="comments">
            <span class="comments-title">Comments</span>
            <span class="comments-count">${element.comments}</span>
          </li>
          <li class="downloads">
            <span class="downloads-title">Downloads</span>
            <span class="downloads-count">${element.downloads}</span>
          </li>
        </ul>
      </li>`;
        })
        .join('');
      loader.style.display = 'none';
      gallery.insertAdjacentHTML('beforeend', images);
      let largeGallery = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 250,
      });
      largeGallery.refresh();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function renderMore() {
  pagination.page += 1;
  markup();
}
