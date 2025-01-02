form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = event.target.query.value.trim();
    if (!query) {
      iziToast.error({ title: 'Error', message: 'Please enter a search term!' });
      return;
    }
  
    gallery.innerHTML = '';
    showLoader(); // Показати індикатор завантаження
  
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
      hideLoader(); // Сховати індикатор завантаження
    }
  });
  