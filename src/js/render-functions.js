import SimpleLightbox from 'simplelightbox';

export function renderGallery(images) {
  const gallery = document.querySelector('#gallery');
  const markup = images
    .map(({ webformatURL, largeImageURL, tags }) => {
      return `<li>
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy">
        </a>
      </li>`;
    })
    .join('');
  gallery.innerHTML = markup;

  const lightbox = new SimpleLightbox('a', { captionsData: 'alt', captionDelay: 250 });
  lightbox.refresh();
}
