import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images, append = false) {
    const gallery = document.querySelector('.gallery');

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

    new SimpleLightbox('.gallery a').refresh();
}

export function showError(message) {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

export function showLoader() {
    document.querySelector('#loader').style.display = 'block';
}

export function hideLoader() {
    document.querySelector('#loader').style.display = 'none';
}

export function toggleLoadMore(show) {
    const loadMoreBtn = document.querySelector('#load-more');
    loadMoreBtn.style.display = show ? 'block' : 'none';
}