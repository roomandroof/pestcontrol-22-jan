// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners for slider controls
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideshow();
            currentSlide = index;
            showSlide(currentSlide);
            startSlideshow();
        });
    });

    // Start automatic slideshow
    if (slides.length > 0) {
        startSlideshow();

        // Pause slideshow on hover
        const heroSlider = document.querySelector('.hero-slider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', stopSlideshow);
            heroSlider.addEventListener('mouseleave', startSlideshow);
        }
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form container and success message
            const formContainer = document.getElementById('formContainer');
            const successMessage = document.getElementById('successMessage');
            
            // Hide form and show success message
            if (formContainer && successMessage) {
                formContainer.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // After 5 seconds, show form again and hide success message
                setTimeout(function() {
                    formContainer.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Active Navigation Link Highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards, testimonials, blog cards
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .plan-card, .trust-card, .blog-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
});