import { fetchImages } from './js/pixabay-api';
import { renderImages, showError, showLoader, hideLoader, toggleLoadMore } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.createElement('button');

loadMoreBtn.id = 'load-more';
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.style.display = 'none';
loadMoreBtn.style.margin = '20px auto';
loadMoreBtn.style.padding = '10px 20px';
loadMoreBtn.style.border = 'none';
loadMoreBtn.style.cursor = 'pointer';
document.body.appendChild(loadMoreBtn);

let query = '';
let page = 1;
const PER_PAGE = 40;

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    query = input.value.trim();
    if (!query) {
        iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
        return;
    }

    page = 1;
    gallery.innerHTML = '';
    toggleLoadMore(false);
    showLoader();

    try {
        const data = await fetchImages(query, page);
        hideLoader();

        if (data.hits.length === 0) {
            showError('Sorry, there are no images matching your search query. Please try again!');
        } else {
            renderImages(data.hits);
            if (data.totalHits > PER_PAGE) {
                toggleLoadMore(true);
            }
        }
    } catch (error) {
        hideLoader();
        showError('Failed to fetch images. Please try again later.');
        iziToast.error({ title: 'Error', message: 'Failed to fetch images. Please try again later.' });
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();

    try {
        const data = await fetchImages(query, page);
        hideLoader();
        renderImages(data.hits, true);

        const totalPages = Math.ceil(data.totalHits / PER_PAGE);
        if (page >= totalPages) {
            toggleLoadMore(false);
            iziToast.info({ title: 'Info', message: "We're sorry, but you've reached the end of search results." });
        }

        smoothScroll();
    } catch (error) {
        hideLoader();
        showError('Failed to fetch more images. Please try again later.');
        iziToast.error({ title: 'Error', message: 'Failed to fetch more images. Please try again later.' });
    }
});

function smoothScroll() {
    const galleryItems = document.querySelectorAll('.image-item');
    if (galleryItems.length > 0) {
        const cardHeight = galleryItems[0].getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
}