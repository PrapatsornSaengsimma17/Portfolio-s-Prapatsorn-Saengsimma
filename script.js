let currentImages = [];
let currentIndex = 0;
let autoSlideTimer; 

function switchTab(category, event) {
    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.project-card');

    tabs.forEach(tab => tab.classList.remove('active'));
    if(event) event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function openLightbox(cardElement) {
    const imageString = cardElement.getAttribute('data-images');
    currentImages = imageString.split(',').map(img => img.trim());
    currentIndex = 0; 

    const title = cardElement.querySelector('h3').innerText;
    const desc = cardElement.querySelector('p').innerText;
    const badge = cardElement.querySelector('.badge').innerText;
    const badgeClass = cardElement.querySelector('.badge').className;

    document.getElementById('lightbox-img').src = currentImages[currentIndex];
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-badge-container').innerHTML = `<span class="${badgeClass}">${badge}</span>`;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (currentImages.length > 1) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        startAutoSlide(); 
    } else {
        prevBtn.style.display = 'none'; 
        nextBtn.style.display = 'none';
        stopAutoSlide();
    }

    document.getElementById('lightbox').style.display = 'flex';
}

function changeImage(direction, event) {
    if(event) event.stopPropagation();
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    } else if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }
    
    document.getElementById('lightbox-img').src = currentImages[currentIndex];

    if(event) {
        stopAutoSlide();
        startAutoSlide();
    }
}

function closeLightbox(event) {
    if (event.target.id === 'lightbox' || event.target.className === 'close-btn') {
        document.getElementById('lightbox').style.display = 'none';
        stopAutoSlide(); 
    }
}

function startAutoSlide() {
    stopAutoSlide(); 
    autoSlideTimer = setInterval(() => {
        changeImage(1);
    }, 4000); 
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}
