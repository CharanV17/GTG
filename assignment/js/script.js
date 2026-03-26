// Gallery
const images = [
    'assets/f7d2a29c6a0c7e783b9b54e2b2dd33f72b786b44.jpg',
    'assets/a8c8f067b9a3a2d097a82012c1bf9fd831a81dcb.jpg',
    'assets/0f17cfd29207b586b6636514f0a6a41abb0984fd.jpg',
    'assets/Group 1000003951.jpg',
    'assets/f7d2a29c6a0c7e783b9b54e2b2dd33f72b786b44.jpg',
    'assets/a8c8f067b9a3a2d097a82012c1bf9fd831a81dcb.jpg',
    'assets/0f17cfd29207b586b6636514f0a6a41abb0984fd.jpg',
    'assets/Group 1000003951.jpg'
];
let currentIndex = 0;

const mainImg = document.getElementById('main-img');
const dots = document.querySelectorAll('.dots span');
const thumbs = document.querySelectorAll('.thumb');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');

function setActiveThumbnail(index) {
    thumbs.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === index);
    });

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
    });
}

function updateImage(index = currentIndex) {
    currentIndex = index;

    if (mainImg) {
        mainImg.src = images[currentIndex];
    }

    setActiveThumbnail(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
}

thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
        updateImage(Number(thumb.dataset.index));
    });
});

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        updateImage(Number(dot.dataset.index));
    });
});

if (prevButton) {
    prevButton.addEventListener('click', prevImage);
}

if (nextButton) {
    nextButton.addEventListener('click', nextImage);
}

if (mainImg) {
    setActiveThumbnail(currentIndex);
}

// Radio buttons for add to cart
const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
const addToCart = document.getElementById('add-to-cart');

function updateCartLink() {
    const fragrance = document.querySelector('input[name="fragrance"]:checked')?.value || '';
    const purchase = document.querySelector('input[name="purchase"]:checked')?.value || '';
    if (addToCart && fragrance && purchase) {
        addToCart.href = `https://example.com/cart?fragrance=${fragrance}&purchase=${purchase}`;
    }
}

fragranceRadios.forEach(radio => radio.addEventListener('change', updateCartLink));
purchaseRadios.forEach(radio => radio.addEventListener('change', updateCartLink));
updateCartLink();

// Subscriptions
const singleSub = document.getElementById('single-sub');
const doubleSub = document.getElementById('double-sub');

purchaseRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'single') {
            singleSub.classList.add('active');
            doubleSub.classList.remove('active');
        } else if (radio.value === 'double') {
            doubleSub.classList.add('active');
            singleSub.classList.remove('active');
        } else {
            singleSub.classList.remove('active');
            doubleSub.classList.remove('active');
        }
    });
});

// Count up animation
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = document.querySelectorAll('.number');
            numbers.forEach(num => {
                const target = +num.getAttribute('data-target');
                const suffix = num.getAttribute('data-suffix') || '';
                let count = 0;
                const increment = Math.max(1, target / 60);
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    num.textContent = `${Math.floor(count)}${suffix}`;
                }, 30);
            });
            observer.unobserve(entry.target);
        }
    });
});

if (statsSection) {
    observer.observe(statsSection);
}
