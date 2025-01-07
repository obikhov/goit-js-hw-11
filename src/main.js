import { fetchImages } from './js/pixabay-api';
import { createImageMarkup, clearGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';




const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
const perPage = 40;

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({ title: 'Warning', message: 'Enter a search term' });
    return;
  }

  page = 1;
  clearGallery(gallery);

  try {
    loader.classList.add('visible');
    const data = await fetchImages(query, page, perPage);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images match your query. Try again!',
      });
      return;
    }

    gallery.innerHTML = createImageMarkup(data.hits);
    lightbox.refresh();
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    loader.classList.remove('visible');
  }
});
