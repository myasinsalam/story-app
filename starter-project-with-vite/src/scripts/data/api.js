// import CONFIG from '../config';

// const ENDPOINTS = {
//   ENDPOINT: `${CONFIG.BASE_URL}/your/endpoint/here`,
// };

// export async function getData() {
//   const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
//   return await fetchResponse.json();
// }
const BASE_URL = 'https://story-api.dicoding.dev/v1';

export async function getStories() {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/stories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  return result.listStory;
}