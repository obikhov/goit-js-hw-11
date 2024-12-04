import { fetchImages } from './pixabay-api.js';
import { updateGallery } from './render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';



// HTML-елементи
const form = document.getElementById('search-form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

// Перевірка форми та показ індикатора завантаження
async function onSearch(event) {
  event.preventDefault();

  const query = form.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query.' });
    return;
  }

  loader.classList.remove('hidden');
  gallery.innerHTML = ''; // Очистити попередні результати

  try {
    const data = await fetchImages(query);
    if (data.hits.length === 0) {
      iziToast.warning({ title: 'No Results', message: 'No images found. Try another query.' });
    } else {
      updateGallery(data.hits);
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
  } finally {
    loader.classList.add('hidden');
  }
}

// Додати слухача подій
form.addEventListener('submit', onSearch);
