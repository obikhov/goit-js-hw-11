import { fetchImages } from './js/pixabay-api';
import { createImageMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
let page = 1;
let query = '';

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  page = 1;
  gallery.innerHTML = '';

  try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0) {
      iziToast.error({ message: 'No images found. Please try again!' });
      return;
    }

    gallery.innerHTML = createImageMarkup(data.hits);
    lightbox.refresh();
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again!' });
    console.error(error);
  }
});
