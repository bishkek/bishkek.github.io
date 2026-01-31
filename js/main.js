// Пишпекские хроники — Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (navToggle && navMobile) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMobile.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMobile.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMobile.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 60;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Nav background on scroll
    const nav = document.querySelector('.nav');
    if (nav) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            // Add shadow when scrolled
            if (currentScroll > 50) {
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }
            
            // Hide/show nav on scroll (optional - uncomment to enable)
            /*
            if (currentScroll > lastScroll && currentScroll > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
            */
        });
    }

    // Reading progress indicator
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .about-content, .quote, .detail-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Keyboard navigation for chapters
    document.addEventListener('keydown', (e) => {
        const prevLink = document.querySelector('.chapter-nav .prev');
        const nextLink = document.querySelector('.chapter-nav .next');

        if (e.key === 'ArrowLeft' && prevLink) {
            window.location.href = prevLink.href;
        } else if (e.key === 'ArrowRight' && nextLink) {
            window.location.href = nextLink.href;
        }
    });

    // Touch swipe navigation for chapters (mobile)
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 100;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const prevLink = document.querySelector('.chapter-nav .prev');
            const nextLink = document.querySelector('.chapter-nav .next');
            
            if (diff > 0 && nextLink) {
                // Swipe left - next chapter
                window.location.href = nextLink.href;
            } else if (diff < 0 && prevLink) {
                // Swipe right - previous chapter
                window.location.href = prevLink.href;
            }
        }
    }

    // Prevent zoom on double-tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // Console easter egg
    console.log('%c📚 Пишпекские хроники', 'font-size: 24px; font-weight: bold;');
    console.log('%cДетективные романы о Бишкеке XIX века', 'font-size: 14px; color: #666;');
    console.log('%c→ bishkek.github.io', 'font-size: 12px; color: #e63946;');
});

// Utility function to format reading time
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateReadingTime };
}
