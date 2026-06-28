document.addEventListener("DOMContentLoaded", () => {
    // --- ระบบเลื่อนภาพอัตโนมัติ 4 วินาที (แก้บั๊กห้ามเจอหน้าขาวเด็ดขาด) ---
    const sliders = document.querySelectorAll(".card-image.inline-slider");

    sliders.forEach(slider => {
        const wrapper = slider.querySelector(".slider-wrapper");
        const items = slider.querySelectorAll(".slider-item");
        const totalItems = items.length; // นับเฉพาะรูปที่มีอยู่จริงเท่านั้น
        let currentIndex = 0;

        // บล็อกไว้เลย: ถ้าผลงานชิ้นนั้นมีแค่ 1 รูป ไม่ต้องสั่งให้มันทำอะไรทั่งนั้น อยู่เฉยๆ โชว์รูปเดิมวนไป
        if (totalItems <= 1) return; 

        // ถ้ามีหลายรูป ให้รันฟังก์ชันเลื่อนอัตโนมัติทุกๆ 4 วินาที
        setInterval(() => {
            currentIndex++;
            
            // ถ้าเลื่อนจนเกินรูปสุดท้ายที่มีอยู่จริง ให้ดีดกลับมารูปแรก (หน้าปก) ทันที โดยไม่ผ่านหน้าว่าง
            if (currentIndex >= totalItems) {
                currentIndex = 0; 
            }
            
            const offset = currentIndex * -100;
            wrapper.style.transform = `translateX(${offset}%)`;
        }, 4000);
    });

    // --- ส่วนของระบบ Tab Navigation และ Lightbox Popups เดิมที่เสถียรอยู่แล้ว ---
    const tabBtns = document.querySelectorAll(".tab-btn");
    const projectCards = document.querySelectorAll(".project-card");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
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
