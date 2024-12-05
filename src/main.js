import { fetchImages } from './js/pixabay-api';
import { renderImageCard, clearGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let query = '';
let page = 1;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  query = e.target.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Enter a valid search query' });
    return;
  }

  page = 1;
  clearGallery(gallery);

  try {
    loader.classList.remove('hidden');
    const data = await fetchImages(query, page);

    if (data.hits.length === 0) {
      iziToast.warning({ message: 'No images found. Try again!' });
      return;
    }

    gallery.innerHTML = data.hits.map(renderImageCard).join('');
    lightbox.refresh();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to load images.' });
  } finally {
    loader.classList.add('hidden');
  }
});

// Infinite scrolling (завантаження наступної сторінки)
window.addEventListener('scroll', async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    page += 1;

    try {
      loader.classList.remove('hidden');
      const data = await fetchImages(query, page);

      if (data.hits.length === 0) {
        iziToast.info({ message: 'No more images available.' });
        return;
      }

      gallery.insertAdjacentHTML('beforeend', data.hits.map(renderImageCard).join(''));
      lightbox.refresh();
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Failed to load more images.' });
    } finally {
      loader.classList.add('hidden');
    }
  }
});
