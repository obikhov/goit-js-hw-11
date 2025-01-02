import { fetchImages } from './pixabay-api.js';
import { renderImages } from './render-functions.js';
import { showLoader, hideLoader } from './loader.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.elements.query.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
    return;
  }

  gallery.innerHTML = '';
  showLoader();

  try {
    const { hits, totalHits } = await fetchImages(query);

    if (hits.length === 0) {
      iziToast.warning({ title: 'No results', message: 'No images found. Try another query!' });
    } else {
      renderImages(hits);
      iziToast.success({ title: 'Success', message: `Found ${totalHits} images!` });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
});
