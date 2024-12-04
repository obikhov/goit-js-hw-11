import SimpleLightbox from 'simplelightbox';

/**
 * Функція для створення HTML-картки зображення.
 * @param {Object} image - Об'єкт зображення з API Pixabay.
 * @returns {string} - HTML-розмітка картки.
 */
export function createImageCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </li>
  `;
}

/**
 * Функція для оновлення галереї.
 * @param {Array} images - Масив об'єктів зображень.
 */
export function updateGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(createImageCard).join('');
  gallery.innerHTML = markup;

  // Оновлення SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
