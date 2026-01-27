// ==================== DARK MODE TOGGLE ====================
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save theme preference
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ==================== REVEAL ON SCROLL ANIMATION ====================
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Initial check on page load
window.addEventListener('load', reveal);

// Check on scroll
window.addEventListener('scroll', reveal);

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolling
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-highlight)';
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==================== PARALLAX EFFECT FOR INTRO ====================
const introSection = document.querySelector('.intro-section');
const introContent = document.querySelector('.intro-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    if (introContent) {
        introContent.style.transform = `translateY(${rate}px)`;
        introContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ==================== TYPING EFFECT FOR MAIN TITLE ====================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const mainTitle = document.querySelector('.main-title');
//     if (mainTitle) {
//         const originalText = mainTitle.textContent;
//         typeWriter(mainTitle, originalText, 80);
//     }
// });

// ==================== CARD HOVER EFFECTS ====================
const cards = document.querySelectorAll('.card, .method-card, .case-study');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==================== SCROLL PROGRESS INDICATOR ====================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #3498db, #2ecc71);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// ==================== INTERSECTION OBSERVER FOR BETTER PERFORMANCE ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// ==================== NUMBER COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Optional: Add counters if you want to display statistics
// Example usage:
// animateCounter(document.querySelector('.stat-number'), 100);

// ==================== LAZY LOAD IMAGES ====================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==================== SMOOTH REVEAL FOR TIMELINE ====================
const timelineSteps = document.querySelectorAll('.timeline-step');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

timelineSteps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-50px)';
    step.style.transition = 'all 0.6s ease';
    timelineObserver.observe(step);
});

// ==================== CASE STUDY ACCORDION (OPTIONAL) ====================
const caseHeaders = document.querySelectorAll('.case-header');

caseHeaders.forEach(header => {
    header.style.cursor = 'pointer';
    
    header.addEventListener('click', function() {
        const caseStudy = this.closest('.case-study');
        const caseContent = caseStudy.querySelector('.case-content');
        
        // Toggle active state
        caseStudy.classList.toggle('expanded');
        
        // Optional: collapse other case studies
        // document.querySelectorAll('.case-study').forEach(cs => {
        //     if (cs !== caseStudy) {
        //         cs.classList.remove('expanded');
        //     }
        // });
    });
});

// ==================== QUOTE ANIMATION ====================
const quotes = document.querySelectorAll('.quote-text');

quotes.forEach(quote => {
    const text = quote.textContent;
    quote.textContent = '';
    
    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let i = 0;
                const interval = setInterval(() => {
                    if (i < text.length) {
                        quote.textContent += text[i];
                        i++;
                    } else {
                        clearInterval(interval);
                    }
                }, 30);
                quoteObserver.unobserve(quote);
            }
        });
    }, { threshold: 0.5 });
    
    quoteObserver.observe(quote);
});

// ==================== EASTER EGG: KONAMI CODE ====================
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedReveal = debounce(reveal, 10);
const debouncedNavUpdate = debounce(updateActiveNavLink, 10);

window.addEventListener('scroll', debouncedReveal);
window.addEventListener('scroll', debouncedNavUpdate);

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in content
    const introContent = document.querySelector('.intro-content');
    if (introContent) {
        setTimeout(() => {
            introContent.style.opacity = '1';
            introContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🎓 Học Triết không khó - khó vì học sai cách', 'font-size: 20px; font-weight: bold; color: #3498db;');
console.log('%cDự án được xây dựng với tư duy triết học: Từ thực tiễn đến lý thuyết, từ hiện tượng đến bản chất.', 'font-size: 14px; color: #666;');
console.log('%cChúc bạn học tốt môn Triết! 📚', 'font-size: 16px; color: #27ae60; font-weight: bold;');

// ==================== MOBILE MENU TOGGLE (IF NEEDED) ====================
function createMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if screen is mobile
    if (window.innerWidth <= 768) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = `
            display: block;
            font-size: 2rem;
            background: none;
            border: none;
            color: var(--text-primary);
            cursor: pointer;
        `;
        
        const navbar = document.querySelector('.navbar');
        navbar.insertBefore(hamburger, navMenu);
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Add mobile menu styles
        if (navMenu.classList.contains('active')) {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
    }
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reload on significant resize
        if (window.innerWidth <= 768) {
            createMobileMenu();
        }
    }, 250);
});
