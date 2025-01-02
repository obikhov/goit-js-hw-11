const API_KEY = '47470900-b8e0eef515806370832377144';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 20) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data from Pixabay API.');
  }
  
  return response.json();
}
