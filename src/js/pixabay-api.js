const API_KEY = '47470900-b8e0eef515806370832377144';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`);
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }
  const data = await response.json();
  return data.hits;
}






// 47470900-b8e0eef515806370832377144