// Initialize AOS
AOS.init({
    duration: 1200,
    once: true,
    easing: 'ease'
});

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    // Video Modal Handling
    handleVideoModal();
    
    // Contact Form Handling
    handleContactForm();
    
    // Scroll to Top Button
    handleScrollToTop();
});

// Video Modal Functionality
function handleVideoModal() {
    const modalEl = document.getElementById("videoModal");
    const videoEl = document.getElementById("projectVideo");
    
    if (!modalEl || !videoEl) return;
    
    document.querySelectorAll(".project-video").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const src = btn.dataset.video;
            if (src) {
                videoEl.src = src;
                
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
                
                // Ensure autoplay works after modal is visible
                modalEl.addEventListener("shown.bs.modal", () => {
                    videoEl.play().catch(e => console.log("Autoplay prevented:", e));
                }, { once: true });
            }
        });
    });
    
    // Stop video when modal closes
    modalEl.addEventListener("hidden.bs.modal", () => {
        videoEl.pause();
        videoEl.currentTime = 0;
        videoEl.src = "";
    });
}

// Contact Form Handling
function handleContactForm() {
    const form = document.getElementById("contact-form");
    const alertBox = document.getElementById("form-alert");
    
    if (!form || !alertBox) return;
    
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        
        const data = new FormData(form);
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data
            });
            
            const result = await response.json();
            
            if (result.success) {
                alertBox.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> Message sent successfully!
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                form.reset();
            } else {
                alertBox.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> Something went wrong. Please try again.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
            }
        } catch (error) {
            console.error("Form submission error:", error);
            alertBox.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> Network error. Please check your connection.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Scroll to Top Functionality
function handleScrollToTop() {
    const scrollTopBtn = document.querySelector(".scroll-top");
    
    if (!scrollTopBtn) return;
    
    // Show/hide scroll button based on scroll position
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}