// Пишпекские хроники — Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Theme Management
    // ========================================
    
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButtons(savedTheme);
    };
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeButtons(theme);
    };
    
    const updateThemeButtons = (theme) => {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    };
    
    // Theme toggle buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTheme(btn.dataset.theme);
        });
    });
    
    initTheme();
    
    // ========================================
    // Font Size Control
    // ========================================
    
    const initFontSize = () => {
        const savedSize = localStorage.getItem('fontSize') || 'normal';
        setFontSize(savedSize);
    };
    
    const setFontSize = (size) => {
        const content = document.querySelector('.chapter-content');
        if (!content) return;
        
        content.classList.remove('font-small', 'font-large', 'font-xlarge');
        if (size !== 'normal') {
            content.classList.add(`font-${size}`);
        }
        localStorage.setItem('fontSize', size);
    };
    
    // Font size buttons
    document.querySelector('.font-decrease')?.addEventListener('click', () => {
        const sizes = ['small', 'normal', 'large', 'xlarge'];
        const current = localStorage.getItem('fontSize') || 'normal';
        const currentIndex = sizes.indexOf(current);
        if (currentIndex > 0) {
            setFontSize(sizes[currentIndex - 1]);
        }
    });
    
    document.querySelector('.font-increase')?.addEventListener('click', () => {
        const sizes = ['small', 'normal', 'large', 'xlarge'];
        const current = localStorage.getItem('fontSize') || 'normal';
        const currentIndex = sizes.indexOf(current);
        if (currentIndex < sizes.length - 1) {
            setFontSize(sizes[currentIndex + 1]);
        }
    });
    
    initFontSize();
    
    // ========================================
    // Mobile Navigation
    // ========================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (navToggle && navMobile) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMobile.classList.toggle('active');
        });
        
        navMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMobile.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMobile.classList.remove('active');
            }
        });
    }

    // ========================================
    // Smooth Scroll
    // ========================================
    
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

    // ========================================
    // Nav Effects
    // ========================================
    
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }
        });
    }

    // ========================================
    // Reading Progress
    // ========================================
    
    const updateReadingProgress = () => {
        const progressBar = document.querySelector('.reading-progress');
        const progressText = document.querySelector('.reading-progress-text');
        
        if (progressBar) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            
            if (progressText) {
                const percent = Math.round(progress);
                progressText.textContent = `Прочитано ${percent}%`;
            }
        }
    };
    
    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress();

    // ========================================
    // Intersection Observer
    // ========================================
    
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

    document.querySelectorAll('.timeline-item, .about-content, .quote, .detail-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========================================
    // Keyboard Navigation
    // ========================================
    
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const prevLink = document.querySelector('.chapter-nav-link.prev');
        const nextLink = document.querySelector('.chapter-nav-link.next');

        if (e.key === 'ArrowLeft' && prevLink) {
            window.location.href = prevLink.href;
        } else if (e.key === 'ArrowRight' && nextLink) {
            window.location.href = nextLink.href;
        }
    });

    // ========================================
    // Touch Swipe Navigation
    // ========================================
    
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    const chapterContent = document.querySelector('.chapter-content');
    
    if (chapterContent) {
        chapterContent.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        chapterContent.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 100;
        const diffX = touchStartX - touchEndX;
        const diffY = Math.abs(touchStartY - touchEndY);
        
        // Only swipe if horizontal movement is greater than vertical
        if (Math.abs(diffX) > swipeThreshold && diffY < 100) {
            const prevLink = document.querySelector('.chapter-nav-link.prev');
            const nextLink = document.querySelector('.chapter-nav-link.next');
            
            if (diffX > 0 && nextLink) {
                window.location.href = nextLink.href;
            } else if (diffX < 0 && prevLink) {
                window.location.href = prevLink.href;
            }
        }
    }

    // ========================================
    // Scroll to Top
    // ========================================
    
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // Console Easter Egg
    // ========================================
    
    console.log('%c📚 Пишпекские хроники', 'font-size: 24px; font-weight: bold;');
    console.log('%cДетективные романы о Бишкеке XIX века', 'font-size: 14px; color: #666;');
    console.log('%c→ bishkek.github.io', 'font-size: 12px; color: #e63946;');
    console.log('%c⌨️ Навигация: ← → для переключения глав', 'font-size: 11px; color: #999;');
});

// ========================================
// Utility Functions
// ========================================

function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateReadingTime };
}
