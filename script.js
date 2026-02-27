document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".project-item");

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;

            items.forEach(item => {
                if (filter === "all" || item.dataset.category === filter) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });
});

// Video Modal
AOS.init({ duration: 1000, once: true });

document.querySelectorAll(".project-video").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const src = btn.dataset.video;
        const video = document.getElementById("projectVideo");
        video.src = src;
        new bootstrap.Modal(document.getElementById("videoModal")).show();
    });
});