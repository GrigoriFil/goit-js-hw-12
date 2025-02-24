import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

export function renderImages(images, append = false) {
    if (!append) {
        gallery.innerHTML = '';
    }

    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="image-item">
            <a href="${largeImageURL}" class="gallery-item">
                <img src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="metadata">
                <span>Likes: ${likes}</span>
                <span>Views: ${views}</span>
                <span>Comments: ${comments}</span>
                <span>Downloads: ${downloads}</span>
            </div>
        </div>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
}

export function showError(message) {
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
}

export function showLoader() {
    const loader = document.querySelector('#loader');
    if (loader) {
        loader.style.display = 'block';
    }
}

export function hideLoader() {
    const loader = document.querySelector('#loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

export function toggleLoadMore(show) {
    const loadMoreBtn = document.querySelector('#load-more');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = show ? 'block' : 'none';
    }
}