let currentImages = [];
let currentIndex = 0;

function switchTab(category, event) {
    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.project-card');

    // เปลี่ยนสีปุ่มที่ถูกกด
    tabs.forEach(tab => tab.classList.remove('active'));
    if(event) event.target.classList.add('active');

    // กรองผลงาน
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function openLightbox(cardElement) {
    // 1. ดึงชื่อไฟล์รูปทั้งหมดจาก data-images แล้วจับแยกใส่ Array
    const imageString = cardElement.getAttribute('data-images');
    currentImages = imageString.split(',').map(img => img.trim());
    currentIndex = 0; // เริ่มที่รูปแรกเสมอ

    // 2. ดึงข้อความและหัวข้อจากในตัวการ์ด
    const title = cardElement.querySelector('h3').innerText;
    const desc = cardElement.querySelector('p').innerText;
    const badge = cardElement.querySelector('.badge').innerText;
    const badgeClass = cardElement.querySelector('.badge').className;

    // 3. เอาข้อมูลไปใส่ในกล่อง Popup (Lightbox)
    document.getElementById('lightbox-img').src = currentImages[currentIndex];
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-badge-container').innerHTML = `<span class="${badgeClass}">${badge}</span>`;

    // 4. เช็คว่าถ้ามีรูปมากกว่า 1 รูป ให้แสดงปุ่มเลื่อนซ้าย-ขวา
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (currentImages.length > 1) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    } else {
        prevBtn.style.display = 'none'; // ถ้ามีรูปเดียวให้ซ่อนปุ่ม
        nextBtn.style.display = 'none';
    }

    // 5. แสดงกล่อง Popup
    document.getElementById('lightbox').style.display = 'flex';
}

function changeImage(direction, event) {
    // ป้องกันไม่ให้การคลิกปุ่มเลื่อนไปเผลอปิดกล่อง Popup
    event.stopPropagation();
    
    // เปลี่ยน index ของรูป
    currentIndex += direction;
    
    // วนลูปรูปภาพ (ถ้ารูปสุดท้ายแล้วกดถัดไป ให้กลับมารูปแรก)
    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    } else if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }
    
    // อัปเดตรูปใหม่บนหน้าจอ
    document.getElementById('lightbox-img').src = currentImages[currentIndex];
}

function closeLightbox(event) {
    // ปิดเมื่อคลิกที่พื้นหลังสีดำ หรือคลิกปุ่มกากบาท (X)
    if (event.target.id === 'lightbox' || event.target.className === 'close-btn') {
        document.getElementById('lightbox').style.display = 'none';
    }
}
