import { fetchImages } from './js/pixabay-api';
import { renderImages, showError, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search');
const gallery = document.querySelector('.gallery');
const errorMessage = document.querySelector('#error-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = input.value.trim();
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query!'
        });
        return;
    }

    gallery.innerHTML = '';
    errorMessage.style.display = 'none';

    showLoader();

    try {
        const images = await fetchImages(query);
        hideLoader();

        if (images.length === 0) {
            showError('Sorry, there are no images matching your search query. Please try again!');
        } else {
            renderImages(images);
        }
    } catch (error) {
        hideLoader();
        console.error('Error fetching images:', error);

        showError('Failed to fetch images. Please check your request or try again later.');
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images. Please try again later.'
        });
    }
});
