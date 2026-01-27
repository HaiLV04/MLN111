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

// Automatically set active nav link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const linkPage = linkPath.split('/').pop();
        
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Check if this link matches the current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
        
        // Handle chapter pages for dropdown
        if (currentPath.includes('/chapters/') && linkPath.includes('/chapters/')) {
            if (linkPage === currentPage) {
                link.classList.add('active');
                // Also highlight the parent dropdown
                const dropdown = link.closest('.dropdown');
                if (dropdown) {
                    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.style.color = 'var(--accent-highlight)';
                    }
                }
            }
        }
    });
}

// Call on page load
window.addEventListener('load', setActiveNavLink);

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

// ==================== BACK TO TOP BUTTON ====================
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-highlight);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Smooth scroll to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1) translateY(-5px)';
        backToTop.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1) translateY(0)';
        backToTop.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });
}

createBackToTopButton();

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
    const navbar = document.querySelector('.navbar');
    
    // Check if hamburger already exists
    if (document.querySelector('.hamburger')) {
        return;
    }
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Add styles for hamburger
    const style = document.createElement('style');
    style.textContent = `
        .hamburger {
            display: none;
            flex-direction: column;
            gap: 4px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 1001;
        }
        
        .hamburger span {
            width: 25px;
            height: 3px;
            background: var(--text-primary);
            transition: all 0.3s ease;
            border-radius: 3px;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Insert hamburger before nav menu
    navbar.appendChild(hamburger);
    
    // Toggle menu on click
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target) &&
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Initialize mobile menu on load
window.addEventListener('load', createMobileMenu);

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset menu state on resize
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
        
        if (window.innerWidth <= 768 && !hamburger) {
            createMobileMenu();
        }
    }, 250);
});

