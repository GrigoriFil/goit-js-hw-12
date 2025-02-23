import axios from 'axios';

const API_KEY = '49000091-3868361750e1c7c48df9380e6';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

export async function fetchImages(query, page = 1) {
    if (!query.trim()) {
        throw new Error('Search query is empty!');
    }

    const params = {
        key: API_KEY,
        q: encodeURIComponent(query),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
