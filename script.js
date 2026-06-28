/**
 * 1. ระบบคัดกรองหน้าผลงาน (Tab Switching & Filtering)
 */
function switchTab(category) {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
    }

    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hide');
            card.style.animation = 'none';
            card.offsetHeight; /* Trigger reflow */
            card.style.animation = 'fadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
        } else {
            card.classList.add('hide');
        }
    });
}

/**
 * 2. ระบบ Popup ขยายรูปภาพ (Lightbox View)
 */
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imageSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

/**
 * 3. อัปเดตปีลิขสิทธิ์อัตโนมัติในส่วน Footer
 */
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
