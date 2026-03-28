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
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    // Replace this Webhook URL with the user's provided link
    const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx99-hSVTXJke3qZsgcRDcpDjzuLUOZsDSHI68-TzCgzNGSy2NXB5jRYjxlykPxsmyX-Q/exec';

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Hide previous messages
            formSuccess.classList.add('d-none');
            formError.classList.add('d-none');
            
            // UI state: loading
            submitBtn.disabled = true;
            submitBtn.querySelector('span').style.opacity = '0';
            spinner.classList.remove('d-none');

            // Gather Data
            const formData = new FormData(form);
            const dataObj = {};
            formData.forEach((value, key) => {
                dataObj[key] = value;
            });

            try {
                // Post JSON to Google Script
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // Send as stringified JSON
                    body: JSON.stringify(dataObj)
                });

                // With no-cors, response is opaque so we assume success if no error thrown
                // UI state: Success
                formSuccess.classList.remove('d-none');
                form.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                // UI state: Error
                formError.classList.remove('d-none');
            } finally {
                // Restore Button UI
                submitBtn.disabled = false;
                submitBtn.querySelector('span').style.opacity = '1';
                spinner.classList.add('d-none');
            }
        });
    }
});
