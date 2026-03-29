document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isVisible = mobileNav.style.display === 'flex';
            mobileNav.style.display = isVisible ? 'none' : 'flex';
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link, .mobile-nav-btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.style.display = 'none';
            });
        });
    }

    // 2. Form Submission via Fetch API (JSON POST)
    const form = document.getElementById('dmRaoForm');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('formSpinner');

    // Replace this Webhook URL with the user's provided link
    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx99-hSVTXJke3qZsgcRDcpDjzuLUOZsDSHI68-TzCgzNGSy2NXB5jRYjxlykPxsmyX-Q/exec';

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // UI state: loading
            submitBtn.disabled = true;
            if (spinner) {
                submitBtn.querySelector('span').style.opacity = '0';
                spinner.classList.remove('d-none');
            }

            // Gather Data
            const formData = new FormData(form);

            try {
                // Formatting payload as x-www-form-urlencoded is required by Google Apps Script doPost parameters 
                await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    body: new URLSearchParams(formData),
                    mode: 'no-cors'
                });

                // Show SweetAlert on success
                swal("Success", "Form submitted successfully!", "success");
                form.reset();
            } catch (error) {
                console.error('Submission error:', error);
                // Show SweetAlert on error
                swal("Error", "Something went wrong. Please try again.", "error");
            } finally {
                // Restore Button UI
                submitBtn.disabled = false;
                if (spinner) {
                    submitBtn.querySelector('span').style.opacity = '1';
                    spinner.classList.add('d-none');
                }
            }
        });
    }

    // 3. Testimonials Slider
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && dotsContainer && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cards = Array.from(track.children);
        const cardCount = cards.length;

        // Determine how many cards to show
        const getVisibleCards = () => window.innerWidth < 768 ? 1 : 3;

        const updateDots = () => {
            dotsContainer.innerHTML = '';
            const visibleCards = getVisibleCards();
            // Max index is total cards minus those currently visible
            const maxIndex = cardCount - visibleCards;

            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlider();
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        };

        const updateSlider = () => {
            const isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                // Mobile Stack Animation
                cards.forEach((card, index) => {
                    card.classList.remove('active', 'next', 'next-next', 'prev');
                    
                    if (index === currentIndex) {
                        card.classList.add('active');
                    } else if (index === (currentIndex + 1) % cardCount) {
                        card.classList.add('next');
                    } else if (index === (currentIndex + 2) % cardCount) {
                        card.classList.add('next-next');
                    } else if (index === (currentIndex - 1 + cardCount) % cardCount) {
                        card.classList.add('prev');
                    }
                });
                track.style.transform = 'none';
            } else {
                // Desktop Horizontal Slider
                cards.forEach(card => card.classList.remove('active', 'next', 'next-next', 'prev'));
                const visibleCards = getVisibleCards();
                const cardWidth = track.parentElement.offsetWidth / visibleCards;
                track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }

            // Update dots active state
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        const nextSlide = () => {
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
                currentIndex = (currentIndex + 1) % cardCount;
            } else {
                const visibleCards = getVisibleCards();
                if (currentIndex < cardCount - visibleCards) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // Loop back
                }
            }
            updateSlider();
        };

        const prevSlide = () => {
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
                currentIndex = (currentIndex - 1 + cardCount) % cardCount;
            } else {
                const visibleCards = getVisibleCards();
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = cardCount - visibleCards; // Loop to end
                }
            }
            updateSlider();
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        // Touch events for swiping on mobile
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        const handleSwipe = () => {
            const threshold = 50; // minimum distance for swipe
            if (touchEndX < touchStartX - threshold) {
                nextSlide(); // left swipe
                resetAutoSlide();
            }
            if (touchEndX > touchStartX + threshold) {
                prevSlide(); // right swipe
                resetAutoSlide();
            }
        };

        // Auto slide every 4 seconds
        let autoSlideInterval = setInterval(nextSlide, 4000);

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 4000);
        };

        // Resize handling
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                currentIndex = 0;
                updateDots();
                updateSlider();
            }, 200);
        });

        // Initialize
        updateDots();
        updateSlider();

        // Pause auto-slide on hover
        track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        track.addEventListener('mouseleave', () => resetAutoSlide());
    }

    // 4. About Section Image Slideshow
    const aboutSlides = document.querySelectorAll('.slideshow .about-display-img');
    if (aboutSlides.length > 0) {
        let aboutCurrentIndex = 0;
        const totalAboutSlides = aboutSlides.length;

        setInterval(() => {
            // Remove active class from current slide
            aboutSlides[aboutCurrentIndex].classList.remove('active');
            
            // Increment index
            aboutCurrentIndex = (aboutCurrentIndex + 1) % totalAboutSlides;
            
            // Add active class to new slide
            aboutSlides[aboutCurrentIndex].classList.add('active');
        }, 2000); // Change every 5 seconds
    }
});
