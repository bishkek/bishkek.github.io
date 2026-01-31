// Пишпекские хроники — Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Nav background on scroll
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .about-content, .quote').forEach(el => {
        observer.observe(el);
    });

    // Reading progress indicator (for chapter pages)
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

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

    // Dark mode toggle (if implemented)
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Check saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

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
