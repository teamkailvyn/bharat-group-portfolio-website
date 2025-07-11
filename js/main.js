// Main JavaScript file for Bharat Health Care Services

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavbar();
    initializeScrollEffects();
    initializeForms();
    initializeAnimations();
    initializeCarousel();
});

// Navbar Functions
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking on link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarNav.classList.remove('show');
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Skip if href is just '#' or empty
            if (!href || href === '#' || href.length <= 1) {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'btn btn-primary scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        border: none;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form Handling
function initializeForms() {
    // Lab Booking Form
    const labBookingForm = document.getElementById('labBookingForm');
    if (labBookingForm) {
        labBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLabBooking(this);
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm(this);
        });
    }
}

// Lab Booking Form Handler
function handleLabBooking(form) {
    const formData = new FormData(form);
    const bookingData = {
        name: formData.get('name') || form.querySelector('input[type="text"]').value,
        email: formData.get('email') || form.querySelector('input[type="email"]').value,
        phone: formData.get('phone') || form.querySelector('input[type="tel"]').value,
        zipCode: formData.get('zipCode') || form.querySelector('input[placeholder*="Zip"]').value,
        city: formData.get('city') || form.querySelector('input[placeholder*="City"]').value,
        prescription: formData.get('prescription'),
        timestamp: new Date().toISOString()
    };
    
    // Validate form
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.city) {
        showAlert('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }
    
    // Phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(bookingData.phone.replace(/\D/g, '').slice(-10))) {
        showAlert('Please enter a valid 10-digit phone number.', 'error');
        return;
    }
    
    // Store booking data
    saveBookingData(bookingData);
    
    // Show success message
    showAlert('Your lab test booking has been submitted successfully! We will contact you soon.', 'success');
    
    // Reset form
    form.reset();
}

// Contact Form Handler
function handleContactForm(form) {
    const formData = new FormData(form);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Validate form
    if (!contactData.name || !contactData.email || !contactData.message) {
        showAlert('Please fill in all required fields.', 'error');
        return;
    }
    
    // Store contact data
    saveContactData(contactData);
    
    // Show success message
    showAlert('Your message has been sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    form.reset();
}

// Newsletter Form Handler
function handleNewsletterForm(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    
    if (!email) {
        showAlert('Please enter your email address.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }
    
    // Store newsletter subscription
    saveNewsletterSubscription(email);
    
    showAlert('Thank you for subscribing to our newsletter!', 'success');
    form.reset();
}

// Data Storage Functions
function saveBookingData(data) {
    try {
        const bookings = JSON.parse(localStorage.getItem('labBookings') || '[]');
        bookings.push(data);
        localStorage.setItem('labBookings', JSON.stringify(bookings));
    } catch (error) {
        console.error('Error saving booking data:', error);
    }
}

function saveContactData(data) {
    try {
        const contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        contacts.push(data);
        localStorage.setItem('contactMessages', JSON.stringify(contacts));
    } catch (error) {
        console.error('Error saving contact data:', error);
    }
}

function saveNewsletterSubscription(email) {
    try {
        const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
        if (!subscriptions.includes(email)) {
            subscriptions.push(email);
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        }
    } catch (error) {
        console.error('Error saving newsletter subscription:', error);
    }
}

// Alert System
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .speciality-card, .hospital-card, .home-care-card, .ambulance-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Carousel Functions
function initializeCarousel() {
    // Hero carousel (if implemented)
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        // Add carousel navigation if needed
        const prevBtn = heroCarousel.querySelector('.carousel-prev');
        const nextBtn = heroCarousel.querySelector('.carousel-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                // Implement previous slide logic
            });
            
            nextBtn.addEventListener('click', () => {
                // Implement next slide logic
            });
        }
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Loading states
function showLoading(element) {
    if (element) {
        element.disabled = true;
        element.innerHTML = '<span class="loading"></span> Loading...';
    }
}

function hideLoading(element, originalText) {
    if (element) {
        element.disabled = false;
        element.innerHTML = originalText;
    }
}

// WhatsApp Integration
function openWhatsApp(phoneNumber = '+919876543210', message = 'Hello! I need healthcare assistance.') {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Phone Call Integration
function makePhoneCall(phoneNumber = '+919876543210') {
    window.location.href = `tel:${phoneNumber}`;
}

// Export functions for global use
window.BharatHealthCare = {
    openWhatsApp,
    makePhoneCall,
    showAlert,
    handleLabBooking,
    handleContactForm
};