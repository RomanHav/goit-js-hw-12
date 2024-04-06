import { fetchInfo } from './pixabay-api';
// import { inputValue } from '../main';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search');
const loadButton = document.querySelector('.load-button');
export const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export async function markup() {
  loader.style.display = 'block';

  try {
    const data = await fetchInfo(input.value.trim());
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
      loadButton.style.display = 'none';
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
      // loadButton.style.display = 'block';
      const item = document.querySelector('.gallery-item');
      const rect = item.getBoundingClientRect();
      console.log(item.getBoundingClientRect());
      window.scrollBy({
        top: rect.height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
