import SimpleLightbox from 'simplelightbox';

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy">
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </li>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  
  const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  lightbox.refresh();
}
