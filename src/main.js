import { fetchImages } from './pixabay-api';
import { renderImageCard } from './render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;

const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  query = e.target.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Enter a valid search query' });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  loader.style.display = 'block';

  try {
    const data = await fetchImages(query, page);
    loader.style.display = 'none';

    if (data.hits.length === 0) {
      iziToast.warning({ message: 'No results found. Try another query!' });
      return;
    }

    gallery.innerHTML = data.hits.map(renderImageCard).join('');
    lightbox.refresh();
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({ title: 'Error', message: 'Failed to fetch images' });
  }
});
