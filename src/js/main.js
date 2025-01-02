import { fetchImages } from './pixabay-api.js';
import { renderGallery } from './render-functions.js';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import 'simplelightbox/dist/simple-lightbox.min.css';


const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.query.value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
    return;
  }

  gallery.innerHTML = '';
  loader.classList.remove('hidden');

  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.info({ title: 'Info', message: 'No images found. Try another search term.' });
    } else {
      renderGallery(images);
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to load images.' });
  } finally {
    loader.classList.add('hidden');
  }
});

