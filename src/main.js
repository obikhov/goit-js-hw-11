import { fetchImages } from './js/pixabay-api.js';

import { clearGallery, renderImages, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  const searchQuery = form.elements.query.value.trim();
  if (searchQuery === '') {
    iziToast.error({
      message: 'Please enter a search query',
    });
    return;
  }

  clearGallery(gallery);
  showLoader();

  try {
    const data = await fetchImages(searchQuery);

    if (Array.isArray(data.hits) && data.hits.length > 0) {
      renderImages(gallery, data.hits);
      hideLoader();
    } else {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoader();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
    hideLoader();
  }
}
