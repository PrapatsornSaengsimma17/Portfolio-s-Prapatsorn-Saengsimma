// --- ระบบจำลองรูปภาพและควบคุมหน้าเว็บ ---
let currentLightboxImages = [];
let currentLightboxIndex = 0;
let inlineSliders = [];

// ดึงการทำงานเมื่อโหลดหน้าเว็บสำเร็จ เพื่อเปิดโหมดเคลื่อนไหวอัตโนมัติ
document.addEventListener("DOMContentLoaded", () => {
    initInlineSliders();
});

// 🌟 ฟังก์ชันจัดการให้รูปเลื่อนอัตโนมัติบนการ์ดผลงาน (Carousel หน้าเว็บ)
function initInlineSliders() {
    const sliders = document.querySelectorAll('.inline-slider');
    
    sliders.forEach((slider, index) => {
        const wrapper = slider.querySelector('.slider-wrapper');
        const items = slider.querySelectorAll('.slider-item');
        const totalItems = items.length;
        
        let currentInlineIndex = 0;
        
        // ตั้งเวลาเลื่อนภาพในทุกๆ 4 วินาที (4000ms)
        setInterval(() => {
            currentInlineIndex++;
            
            // ครบรุปแล้วก้วนกลับมาเริ่มรูปแรก (รูปหน้าปก)
            if (currentInlineIndex >= totalItems) {
                currentInlineIndex = 0;
            }
            
            // คำนวณระยะการขยับสไลด์
            const translateX = -currentInlineIndex * 100;
            wrapper.style.transform = `translateX(${translateX}%)`;
        }, 4000);
    });
}

// ฟังก์ชันเปิดแท็บจัดหมวดหมู่
function switchTab(category, event) {
    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.project-card');

    tabs.forEach(tab => tab.classList.remove('active'));
    if(event) event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 🛠️ ฟังก์ชันสำหรับคลิกเปิดดูรายละเอียดรูปภาพผ่านกล่องป๊อปอัพ
function openLightbox(cardElement) {
    const sliderContainer = cardElement.querySelector('.inline-slider');
    const imageString = sliderContainer.getAttribute('data-images');
    
    if (imageString.includes('inline-jlpt')) {
        // กรณีเป็น JLPT ให้ใส่รูปเพื่อใช้ในกล่องพรีวิว
        currentLightboxImages = ['jlpt.jpg', 'jlpt2.jpg'];
    } else {
        currentLightboxImages = imageString.split(',').map(img => img.trim());
    }
    
    currentLightboxIndex = 0; 

    const title = cardElement.querySelector('h3').innerText;
    const desc = cardElement.querySelector('p').innerText;
    const badge = cardElement.querySelector('.badge').innerText;
    const badgeClass = cardElement.querySelector('.badge').className;

    document.getElementById('lightbox-img').src = currentLightboxImages[currentLightboxIndex];
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-badge-container').innerHTML = `<span class="${badgeClass}">${badge}</span>`;

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // หากมีรูปเดียวในตัว lightbox ให้ซ่อนปุ่มควบคุม
    if (currentLightboxImages.length > 1) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    } else {
        prevBtn.style.display = 'none'; 
        nextBtn.style.display = 'none';
    }

    document.getElementById('lightbox').style.display = 'flex';
}

// เปลี่ยนรูปภาพในกล่อง Lightbox และวนลูปเสมอ
function changeImage(direction, event) {
    if(event) event.stopPropagation();
    
    if (currentLightboxImages.length <= 1) return;
    
    currentLightboxIndex += direction;
    
    // เมื่อหมดรูปจะวนลูปกลับมาเริ่มต้นใหม่เสมอ ไม่เป็นภาพว่าง
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = currentLightboxImages.length - 1;
    } else if (currentLightboxIndex >= currentLightboxImages.length) {
        currentLightboxIndex = 0;
    }
    
    document.getElementById('lightbox-img').src = currentLightboxImages[currentLightboxIndex];
}

function closeLightbox(event) {
    if (event.target.id === 'lightbox' || event.target.className === 'close-btn') {
        document.getElementById('lightbox').style.display = 'none';
    }
}
