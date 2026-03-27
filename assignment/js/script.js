// Gallery
const images = [
    'assets/f7d2a29c6a0c7e783b9b54e2b2dd33f72b786b44.jpg',
    'assets/a8c8f067b9a3a2d097a82012c1bf9fd831a81dcb.jpg',
    'assets/0f17cfd29207b586b6636514f0a6a41abb0984fd.jpg',
    'assets/aed0e9a718e6863cb177edc099de63dbd908eb05.jpg',
    'assets/f7d2a29c6a0c7e783b9b54e2b2dd33f72b786b44.jpg',
    'assets/a8c8f067b9a3a2d097a82012c1bf9fd831a81dcb.jpg',
    'assets/0f17cfd29207b586b6636514f0a6a41abb0984fd.jpg',
    'assets/aed0e9a718e6863cb177edc099de63dbd908eb05.jpg'
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

// Site search
const searchToggle = document.getElementById('search-toggle');
const searchForm = document.getElementById('site-search');
const searchInput = document.getElementById('site-search-input');
const searchClose = document.getElementById('site-search-close');
const searchStatus = document.getElementById('site-search-status');
const searchableSections = Array.from(document.querySelectorAll('main section[id], footer[id]'));

const sectionLabels = {
    home: 'Home',
    product: 'Product',
    fragrances: 'Fragrances',
    about: 'About Us',
    blog: 'Blog',
    contact: 'Contact'
};

let activeSearchHighlight = null;

function clearSearchHighlight() {
    if (activeSearchHighlight) {
        activeSearchHighlight.classList.remove('search-match-target');
        activeSearchHighlight = null;
    }
}

function openSearch() {
    if (!searchForm || !searchToggle) {
        return;
    }

    searchForm.hidden = false;
    searchToggle.setAttribute('aria-expanded', 'true');
    if (searchInput) {
        searchInput.focus();
        searchInput.select();
    }
}

function closeSearch() {
    if (!searchForm || !searchToggle) {
        return;
    }

    searchForm.hidden = true;
    searchToggle.setAttribute('aria-expanded', 'false');
    if (searchStatus) {
        searchStatus.textContent = '';
    }
}

function highlightSearchTarget(target) {
    clearSearchHighlight();
    activeSearchHighlight = target;
    activeSearchHighlight.classList.add('search-match-target');
    window.setTimeout(clearSearchHighlight, 2200);
}

if (searchToggle && searchForm && searchInput) {
    searchToggle.addEventListener('click', () => {
        if (searchForm.hidden) {
            openSearch();
        } else {
            closeSearch();
        }
    });

    searchClose?.addEventListener('click', closeSearch);

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim().toLowerCase();

        clearSearchHighlight();

        if (!query) {
            if (searchStatus) {
                searchStatus.textContent = 'Enter a keyword to search the page.';
            }
            return;
        }

        const match = searchableSections.find((section) => {
            const label = sectionLabels[section.id] || section.id || '';
            const haystack = `${label} ${section.textContent || ''}`.toLowerCase();
            return haystack.includes(query);
        });

        if (!match) {
            if (searchStatus) {
                searchStatus.textContent = `No results found for "${query}".`;
            }
            return;
        }

        const label = sectionLabels[match.id] || 'this section';
        match.scrollIntoView({ behavior: 'smooth', block: 'start' });
        highlightSearchTarget(match);

        if (searchStatus) {
            searchStatus.textContent = `Showing results in ${label}.`;
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !searchForm.hidden) {
            closeSearch();
        }
    });
}

// Collection toggles
const collectionItems = document.querySelectorAll('.collection-item');

function setCollectionState(item, expanded) {
    const image = item.querySelector('.collection-item-img');
    const expandedSrc = item.dataset.expandedSrc;
    const collapsedSrc = item.dataset.collapsedSrc;

    item.classList.toggle('active', expanded);
    item.classList.toggle('collection-item-frame', !expanded);
    item.setAttribute('aria-expanded', expanded ? 'true' : 'false');

    if (image) {
        image.src = expanded ? expandedSrc : collapsedSrc;
        image.alt = expanded ? 'Signature Scents details' : 'Signature Scents collapsed card';
    }
}

collectionItems.forEach((item) => {
    item.addEventListener('click', () => {
        const isExpanded = item.classList.contains('active');
        setCollectionState(item, !isExpanded);
    });

    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            item.click();
        }
    });
});

// Radio buttons for add to cart
const fragranceRadios = document.querySelectorAll(
    'input[name="fragrance"], input[name="double-fragrance-one"], input[name="double-fragrance-two"]'
);
const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
const addToCart = document.getElementById('add-to-cart');

function updateCartLink() {
    const purchase = document.querySelector('input[name="purchase"]:checked')?.value || '';
    if (!addToCart || !purchase) {
        return;
    }

    if (purchase === 'double') {
        const fragranceOne = document.querySelector('input[name="double-fragrance-one"]:checked')?.value || '';
        const fragranceTwo = document.querySelector('input[name="double-fragrance-two"]:checked')?.value || '';

        if (fragranceOne && fragranceTwo) {
            addToCart.href = `https://example.com/cart?purchase=${purchase}&fragrance1=${fragranceOne}&fragrance2=${fragranceTwo}`;
        }
        return;
    }

    const fragrance = document.querySelector('input[name="fragrance"]:checked')?.value || '';
    if (fragrance) {
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

const btn = document.querySelector('.newsletter button');
const input = document.querySelector('.newsletter input');

if (btn && input) {
    btn.addEventListener('click', () => {
        if (input.value.trim() === '') {
            alert('Please enter email');
        } else {
            alert('Subscribed!');
        }
    });
}

const footerRight = document.querySelector('.footer-right');
if (footerRight) {
    ['.footer-news-title', '.newsletter', '.footer-news-note'].forEach((selector) => {
        const nodes = footerRight.querySelectorAll(selector);
        nodes.forEach((node, idx) => {
            if (idx > 0) {
                node.remove();
            }
        });
    });
}
