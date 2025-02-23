import axios from 'axios';

const API_KEY = '49000091-3868361750e1c7c48df9380e6';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
    if (!query.trim()) {
        throw new Error('Search query is empty!');
    }

    const params = {
        key: API_KEY,
        q: encodeURIComponent(query),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    };

    console.log('Fetching images with params:', params);

    try {
        const response = await axios.get(BASE_URL, { params });
        console.log('API Response:', response.data);
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching images:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
}