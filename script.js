document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. ระบบเลื่อนภาพสไลด์อัตโนมัติ (Inline Slider) ทุกๆ 4 วินาที
    // ==========================================
    const sliders = document.querySelectorAll(".card-image.inline-slider");

    sliders.forEach(slider => {
        const wrapper = slider.querySelector(".slider-wrapper");
        const items = slider.querySelectorAll(".slider-item");
        const totalItems = items.length; 
        let currentIndex = 0;

        // สำหรับงานที่มีรูปภาพรูปเดียว (JLPT และ ค่ายภาษา) จะใช้เอฟเฟกต์เฟดนุ่มๆ วนอยู่ที่เดิม ไม่สไลด์ไปหน้าขาว
        if (totalItems === 1) {
            setInterval(() => {
                wrapper.style.transition = "opacity 0.4s ease-in-out";
                wrapper.style.opacity = "0.4";
                setTimeout(() => {
                    wrapper.style.opacity = "1";
                }, 400); 
            }, 4000);
            return;
        } 

        // สำหรับงานที่มีหลายรูปภาพ (ยุวกาชาด มี 2 รูปตามที่คุณระบุ) จะสไลด์สลับภาพซ้าย-ขวาอย่างสมบูรณ์
        setInterval(() => {
            currentIndex++;
            if (currentIndex >= totalItems) {
                currentIndex = 0; 
            }
            const offset = currentIndex * -100;
            wrapper.style.transition = "transform 0.5s ease-in-out";
            wrapper.style.transform = `translateX(${offset}%)`;
        }, 4000);
    });

    // ==========================================
    // 2. ระบบกดคลิกที่การ์ดผลงานเพื่อเปิดดูรูปใหญ่ (Lightbox Popup)
    // ==========================================
    const projectCards = document.querySelectorAll(".project-card");
    const lightbox = document.getElementById("lightbox");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");
    
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let currentImages = [];
    let currentImgIndex = 0;

    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h3").innerText;
            const desc = card.querySelector(".card-content p").innerText;
            
            const sliderItems = card.querySelectorAll(".slider-item");
            currentImages = [];
            
            sliderItems.forEach(img => {
                currentImages.push(img.src);
            });

            currentImgIndex = 0;
            
            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modalImg.src = currentImages[currentImgIndex];

            // ถ้ารูปภาพมีใบเดียว จะซ่อนปุ่มลูกศรในหน้าป๊อปอัพโดยอัตโนมัติ
            if (currentImages.length <= 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }

            lightbox.style.display = "flex";
        });
    });

    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        currentImgIndex++;
        if (currentImgIndex >= currentImages.length) {
            currentImgIndex = 0; 
        }
        modalImg.src = currentImages[currentImgIndex];
    });

    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentImgIndex--;
        if (currentImgIndex < 0) {
            currentImgIndex = currentImages.length - 1; 
        }
        modalImg.src = currentImages[currentImgIndex];
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // ==========================================
    // 3. ระบบสลับแท็บเมนูผลงาน (Tab Navigation)
    // ==========================================
    const tabBtns = document.querySelectorAll(".tab-btn");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-tab");

            projectCards.forEach(card => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});
