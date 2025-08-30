// Enhanced AOS (Animate On Scroll) Configuration
AOS.init({
    duration: 1200,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 100,
    anchorPlacement: 'top-bottom'
});

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const bookingForm = document.getElementById('bookingForm');
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Simple Image Loading Test
function testImageLoading() {
    const images = document.querySelectorAll('img');
    console.log('Testing image loading for', images.length, 'images');
    
    images.forEach((img, index) => {
        console.log(`Image ${index + 1}:`, img.src);
        
        img.addEventListener('load', function() {
            console.log(`✅ Image loaded successfully:`, this.src);
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.log(`❌ Image failed to load:`, this.src);
            this.style.opacity = '0.5';
            this.style.border = '2px solid red';
        });
    });
}

// Test image loading when page loads
document.addEventListener('DOMContentLoaded', testImageLoading);

// Enhanced Image Loading System
function enhanceImageQuality() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        const container = img.parentElement;
        if (container) {
            container.classList.add('image-container');
        }
        
        // Enhanced image loading
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            this.classList.add('hd-image');
            
            // Remove shimmer effect
            const shimmer = this.parentElement.querySelector('::before');
            if (shimmer) {
                shimmer.style.display = 'none';
            }
        });
        
        // Handle image errors with fallback
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 15px;
                    color: #666;
                    font-size: 0.9rem;
                    text-align: center;
                    padding: 20px;
                ">
                    <div>
                        <i class="fas fa-image" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
                        <br>
                        Image Loading...
                    </div>
                </div>
            `;
            this.parentElement.appendChild(fallback);
        });
    });
}

// Enhanced Mobile Navigation Toggle with Smooth Animation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Enhanced hamburger animation
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) {
                bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
                bar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            if (index === 1) {
                bar.style.opacity = '0';
                bar.style.transform = 'translateX(-20px)';
            }
            if (index === 2) {
                bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                bar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
            bar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
});

// Enhanced Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
        
        // Restore body scroll on mobile
        if (window.innerWidth <= 768) {
            document.body.style.overflow = '';
        }
    });
});

// Enhanced mobile touch handling
if ('ontouchstart' in window) {
    // Add touch-specific event listeners for mobile
    navToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        navToggle.style.transform = 'scale(0.95)';
    });
    
    navToggle.addEventListener('touchend', () => {
        navToggle.style.transform = 'scale(1)';
    });
    
    // Improve touch scrolling on mobile
    document.addEventListener('touchmove', (e) => {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Enhanced Navbar scroll effect with smooth transitions
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 8px 32px rgba(44, 24, 16, 0.12)';
        navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 4px 20px rgba(44, 24, 16, 0.08)';
        navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.1)';
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Enhanced Smooth scrolling for navigation links with easing
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Mobile-specific offset adjustments
            const isMobile = window.innerWidth <= 768;
            const offsetTop = targetSection.offsetTop - (isMobile ? 70 : 80);
            
            // Enhanced smooth scroll with easing
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = isMobile ? 800 : 1000; // Faster on mobile
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Enhanced Form submission handling with better UX
if (bookingForm) {
    // Set minimum date to today for mobile date picker
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const bookingData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            date: formData.get('date'),
            time: formData.get('time'),
            message: formData.get('message')
        };
        
        // Enhanced form validation
        if (validateBookingForm(bookingData)) {
            // Show enhanced success message
            showEnhancedNotification('Appointment request submitted successfully! We will contact you soon.', 'success');
            
            // Reset form with animation
            const formElements = bookingForm.querySelectorAll('input, select, textarea');
            formElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        element.style.transform = 'scale(1)';
                    }, 150);
                }, index * 100);
            });
            
            bookingForm.reset();
            
            // Simulate form submission (in real implementation, send to server)
            console.log('Booking Data:', bookingData);
            
            // Send WhatsApp message
            sendWhatsAppMessage(bookingData);
        }
    });
    
    // Mobile-specific form improvements
    if (window.innerWidth <= 768) {
        const formInputs = bookingForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            // Add mobile-specific focus handling
            input.addEventListener('focus', () => {
                // Scroll to input on mobile
                setTimeout(() => {
                    input.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center',
                        inline: 'nearest'
                    });
                }, 300);
            });
            
            // Add mobile-specific validation feedback
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = '#f44336';
                    input.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.2)';
                } else {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                }
            });
        });
    }
}

// Enhanced Form validation with better feedback
function validateBookingForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name (minimum 2 characters)');
    }
    
    if (!data.phone || !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.service) {
        errors.push('Please select a service');
    }
    
    if (!data.date) {
        errors.push('Please select a date');
    }
    
    if (!data.time) {
        errors.push('Please select a time');
    }
    
    if (errors.length > 0) {
        showEnhancedNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Enhanced WhatsApp message function
function sendWhatsAppMessage(bookingData) {
    const message = `Hello! I would like to book an appointment at Sunia Hassan Makeover Lounge.

Service: ${bookingData.service}
Date: ${bookingData.date}
Time: ${bookingData.time}
Name: ${bookingData.name}
Phone: ${bookingData.phone}
${bookingData.message ? `Message: ${bookingData.message}` : ''}

Please contact me to confirm my appointment. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923101129666?text=${encodedMessage}`;
    
    // Open WhatsApp with animation
    setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    }, 1000);
}

// Enhanced Notification system with better animations
function showEnhancedNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon ${getNotificationIcon(type)}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 500);
    });
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        default: return 'fas fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'linear-gradient(135deg, #4CAF50, #45a049)';
        case 'error': return 'linear-gradient(135deg, #f44336, #d32f2f)';
        case 'warning': return 'linear-gradient(135deg, #ff9800, #f57c00)';
        default: return 'linear-gradient(135deg, #2196F3, #1976D2)';
    }
}

// Enhanced Lightbox functionality
function openLightbox(imageSrc, title, description) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${imageSrc}" alt="${title}" class="lightbox-image">
            <div class="lightbox-info">
            <h3>${title}</h3>
            <p>${description}</p>
            </div>
        </div>
    `;
    
    // Add enhanced styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    const overlay = lightbox.querySelector('.lightbox-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1;
        transition: all 0.3s ease;
    `;
    
    const image = lightbox.querySelector('.lightbox-image');
    image.style.cssText = `
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: cover;
    `;
    
    const info = lightbox.querySelector('.lightbox-info');
    info.style.cssText = `
        padding: 20px;
        text-align: center;
    `;
    
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close functionality
    function closeLightbox() {
        lightbox.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => lightbox.remove(), 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    
    // Enhanced keyboard support
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Enhanced Gallery click handlers
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent || 'Gallery Image';
            const description = item.querySelector('p')?.textContent || 'Beautiful work from our salon';
            
            openLightbox(img.src, title, description);
        });
    });
    
    // Initialize image enhancement
    enhanceImageQuality();
});

// Enhanced Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
    });
});

// Enhanced Loading animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('loaded');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-features');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Enhanced Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Enhanced Service card hover effects with mobile optimization
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Only add hover effects on non-touch devices
        if (!('ontouchstart' in window)) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) rotateX(10deg)';
                card.style.boxShadow = '0 25px 60px rgba(44, 24, 16, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
                card.style.boxShadow = '0 8px 32px rgba(44, 24, 16, 0.08)';
            });
        }
        
        // Add touch-specific interactions for mobile
        if ('ontouchstart' in window) {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
                card.style.transition = 'transform 0.1s ease';
            });
            
            card.addEventListener('touchend', () => {
                card.style.transform = 'scale(1)';
                card.style.transition = 'transform 0.2s ease';
            });
        }
    });
});

// Enhanced Gallery hover effects with mobile optimization
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Only add hover effects on non-touch devices
        if (!('ontouchstart' in window)) {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-10px) scale(1.05)';
                item.style.boxShadow = '0 20px 60px rgba(44, 24, 16, 0.2)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = '0 8px 32px rgba(44, 24, 16, 0.08)';
            });
        }
        
        // Add touch-specific interactions for mobile
        if ('ontouchstart' in window) {
            item.addEventListener('touchstart', () => {
                item.style.transform = 'scale(0.98)';
                item.style.transition = 'transform 0.1s ease';
            });
            
            item.addEventListener('touchend', () => {
                item.style.transform = 'scale(1)';
                item.style.transition = 'transform 0.2s ease';
            });
        }
    });
});

// Enhanced Contact form animations
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Enhanced Social media hover effects
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
            link.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
            link.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
    });
});

// Enhanced Scroll to top functionality
function createScrollToTop() {
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
        background: linear-gradient(135deg, #d4af37, #f4d03f);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
`;

    document.body.appendChild(scrollToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
    } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
    }
});

    scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
    
    scrollToTop.addEventListener('mouseenter', () => {
        scrollToTop.style.transform = 'scale(1.1)';
        scrollToTop.style.boxShadow = '0 12px 35px rgba(212, 175, 55, 0.4)';
    });
    
    scrollToTop.addEventListener('mouseleave', () => {
        scrollToTop.style.transform = 'scale(1)';
        scrollToTop.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3)';
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', createScrollToTop);

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
                img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

    images.forEach(img => imageObserver.observe(img));
    }

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add mobile-optimized floating contact button
const floatingContactBtn = document.createElement('div');
floatingContactBtn.className = 'floating-contact';
floatingContactBtn.innerHTML = `
    <div class="floating-contact-content">
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
        <span class="floating-text">Book Now</span>
    </div>
`;
floatingContactBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    background: #25d366;
    color: white;
    padding: 15px 20px;
    border-radius: 50px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    min-height: 48px;
    min-width: 48px;
    touch-action: manipulation;
`;

document.body.appendChild(floatingContactBtn);

// Mobile-optimized floating contact button functionality
floatingContactBtn.addEventListener('click', () => {
    const phone = '923101129666';
    const message = 'Hi! I would like to book an appointment at Sunia Hassan Makeover Lounge.';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    // Check if it's a mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // For mobile, try to open WhatsApp app directly
        window.location.href = whatsappUrl;
    } else {
        // For desktop, open in new tab
        window.open(whatsappUrl, '_blank');
    }
});

// Mobile-specific responsive behavior for floating button
function updateFloatingButtonPosition() {
    if (window.innerWidth <= 768) {
        // Mobile layout
        floatingContactBtn.style.bottom = '20px';
        floatingContactBtn.style.right = '20px';
        floatingContactBtn.style.padding = '12px 16px';
        
        // Hide text on very small screens
        const floatingText = floatingContactBtn.querySelector('.floating-text');
        if (window.innerWidth <= 480) {
            floatingText.style.display = 'none';
            floatingContactBtn.style.padding = '15px';
            floatingContactBtn.style.borderRadius = '50%';
        } else {
            floatingText.style.display = 'inline';
            floatingContactBtn.style.borderRadius = '50px';
        }
    } else {
        // Desktop layout
        floatingContactBtn.style.bottom = '30px';
        floatingContactBtn.style.right = '30px';
        floatingContactBtn.style.padding = '15px 20px';
        floatingContactBtn.style.borderRadius = '50px';
        const floatingText = floatingContactBtn.querySelector('.floating-text');
        floatingText.style.display = 'inline';
    }
}

// Update button position on resize and load
window.addEventListener('resize', updateFloatingButtonPosition);
window.addEventListener('load', updateFloatingButtonPosition);
updateFloatingButtonPosition();

floatingContactBtn.addEventListener('mouseenter', () => {
    floatingContactBtn.style.transform = 'scale(1.1)';
    floatingContactBtn.style.boxShadow = '0 6px 30px rgba(37, 211, 102, 0.4)';
});

floatingContactBtn.addEventListener('mouseleave', () => {
    floatingContactBtn.style.transform = 'scale(1)';
    floatingContactBtn.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.3)';
});

// Mobile-specific performance optimizations
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .contact-item');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform';
        });
        
        // Optimize scroll performance
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Reduce parallax effect on mobile for better performance
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = 'none';
        }
    }
}

// Initialize mobile optimizations
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// Mobile detection utility
const isMobile = {
    Android: () => /Android/i.test(navigator.userAgent),
    BlackBerry: () => /BlackBerry/i.test(navigator.userAgent),
    iOS: () => /iPhone|iPad|iPod/i.test(navigator.userAgent),
    Opera: () => /Opera Mini/i.test(navigator.userAgent),
    Windows: () => /IEMobile/i.test(navigator.userAgent),
    any: () => (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
};

// Apply mobile-specific optimizations
if (isMobile.any()) {
    // Disable hover effects on mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .service-card:hover,
            .gallery-item:hover,
            .contact-item:hover {
                transform: none !important;
                box-shadow: var(--shadow-soft) !important;
            }
        }
    `;
    document.head.appendChild(style);
}

console.log('Sunia Hassan Makeover Lounge website loaded successfully!');
console.log('Mobile optimized:', isMobile.any()); 