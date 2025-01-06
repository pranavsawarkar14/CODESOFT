const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');
const navLeft = lightbox.querySelector('.nav.left');
const navRight = lightbox.querySelector('.nav.right');
let currentIndex = 0;

function showLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryItems[currentIndex].src;
    lightboxImg.alt = galleryItems[currentIndex].alt;
    lightbox.style.display = 'flex';
}

function hideLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    lightboxImg.alt = '';
}

function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    } else if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }
    showLightbox(currentIndex);
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => showLightbox(index));
});

closeBtn.addEventListener('click', hideLightbox);

navLeft.addEventListener('click', () => navigateLightbox(-1));
navRight.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) hideLightbox();
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'Escape') hideLightbox();
    }
});
