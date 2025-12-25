// Lightbox functionality
(function() {
    'use strict';

    let lightbox = null;
    let currentImages = [];
    let currentIndex = 0;

    function createLightbox() {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <span class="lightbox-nav lightbox-prev">&#10094;</span>
            <span class="lightbox-nav lightbox-next">&#10095;</span>
            <div class="lightbox-content">
                <img src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    function showImage(index) {
        if (!currentImages[index]) return;
        
        const img = lightbox.querySelector('.lightbox-content img');
        const caption = lightbox.querySelector('.lightbox-caption');
        
        img.src = currentImages[index].src;
        caption.textContent = currentImages[index].caption || '';
        currentIndex = index;
        
        // Show/hide navigation arrows
        const prev = lightbox.querySelector('.lightbox-prev');
        const next = lightbox.querySelector('.lightbox-next');
        prev.style.display = currentImages.length > 1 ? 'block' : 'none';
        next.style.display = currentImages.length > 1 ? 'block' : 'none';
    }

    function openLightbox(brickId, startIndex) {
        // Collect all images for this brick
        const links = document.querySelectorAll(`.lightbox-link[data-brick="${brickId}"]`);
        currentImages = Array.from(links).map(link => ({
            src: link.href,
            caption: link.dataset.caption || ''
        }));
        
        lightbox.classList.add('active');
        showImage(startIndex);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function nextImage() {
        const nextIndex = (currentIndex + 1) % currentImages.length;
        showImage(nextIndex);
    }

    function prevImage() {
        const prevIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(prevIndex);
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        lightbox = createLightbox();
        
        // Close button
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        
        // Navigation
        lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
        lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
        
        // Click outside to close
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });
        
        // Attach click handlers to all lightbox links
        document.addEventListener('click', function(e) {
            const link = e.target.closest('.lightbox-link');
            if (!link) return;
            
            e.preventDefault();
            const brickId = link.dataset.brick;
            const startIndex = parseInt(link.dataset.index || 0);
            openLightbox(brickId, startIndex);
        });
    });
})();
