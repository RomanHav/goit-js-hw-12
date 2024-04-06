import axios from 'axios';

export let pagination = {
  page: 1,
  per_page: 15,
};
export let totalHits = 0;
export async function fetchInfo(searchWord) {
  try {
    const params = {
      q: searchWord,
      key: '43138861-aa01fee7d014e33c8f4078e7d',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };

    const response = await axios.get(
      `https://pixabay.com/api/?key=${params.key}&q=${params.q}&image_type=${params.image_type}&orientation=${params.orientation}&safesearch=${params.safesearch}&page=${pagination.page}&per_page=${pagination.per_page}`
    );
    // page += 1;
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    totalHits = response.data.totalHits;
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
