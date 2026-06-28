document.addEventListener("DOMContentLoaded", () => {
    // --- ระบบเลื่อนภาพอัตโนมัติ 4 วินาที (วนขวาแบบต่อเนื่อง ไร้หน้าขาว 100%) ---
    const sliders = document.querySelectorAll(".card-image.inline-slider");

    sliders.forEach(slider => {
        const wrapper = slider.querySelector(".slider-wrapper");
        const items = slider.querySelectorAll(".slider-item");
        const totalItems = items.length; 
        let currentIndex = 0;

        // ถ้าชิ้นไหนมีแค่ 1 รูป ให้ระบบอยู่เฉยๆ ล็อกรูปเดิมไว้ ไม่ต้องขยับไปไหนเลย ป้องกันบั๊กหน้าขาว
        if (totalItems <= 1) return; 

        setInterval(() => {
            // เลื่อนไปทางขวาเรื่อยๆ (+1)
            currentIndex++;
            
            // ป้องกันหน้าขาว: ถ้าดัชนีวิ่งเกินจำนวนรูปจริง ให้เด้งกลับมารูปแรก (index 0) ทันที
            if (currentIndex >= totalItems) {
                currentIndex = 0; 
            }
            
            // คำนวณระยะการเลื่อนซ้าย-ขวา
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
