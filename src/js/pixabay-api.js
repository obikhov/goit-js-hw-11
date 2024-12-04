const API_KEY = 'YOUR_PIXABAY_API_KEY';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 12) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch images.');
  }
  return response.json();
}
