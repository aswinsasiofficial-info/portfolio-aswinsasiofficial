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