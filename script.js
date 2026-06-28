/**
 * 1. ระบบกดสลับเปลี่ยนหน้าผลงาน (Tab Switching & Filtering)
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
 * 2. ระบบเปิดกล่องแชทลอยอธิบายผลงาน (Dynamic Pop-up Modal)
 */
function openLightbox(imageSrc) {
    const currentCard = event.currentTarget.closest('.project-card');
    
    const title = currentCard.querySelector('h3').innerText;
    const desc = currentCard.querySelector('p').innerText;
    const badgeHTML = currentCard.querySelector('.badge').outerHTML;

    document.getElementById('lightbox-img').src = imageSrc;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-badge-container').innerHTML = badgeHTML;

    document.getElementById('lightbox').style.display = 'flex';
}

/**
 * 3. ระบบปิดกล่องแชทลอย
 */
function closeLightbox(e) {
    if (e.target.id === 'lightbox' || e.target.classList.contains('close-btn')) {
        document.getElementById('lightbox').style.display = 'none';
    }
}

/**
 * 4. อัปเดตปี ค.ศ. อัตโนมัติในส่วนล่างสุดของเว็บ
 */
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
