// Dr. Lusine Barseghyan Website - Main JavaScript
// Handles: Language switching, mobile navigation, form submission, smooth scrolling

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLanguageSwitcher();
    initMobileMenu();
    initSmoothScrolling();
    initAppointmentForm();
    initDatePicker();
    initHeaderScroll();
});

// ============================================
// LANGUAGE SWITCHER
// ============================================
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';

    // Set initial language
    setLanguage(savedLang);

    // Add click handlers to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('preferredLanguage', lang);
        });
    });
}

function setLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
    });

    // Apply translations
    if (typeof translations !== 'undefined' && translations[lang]) {
        applyTranslations(translations[lang]);
    }
}

function applyTranslations(langData) {
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (langData[key]) {
            element.placeholder = langData[key];
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// DATE PICKER
// ============================================
function initDatePicker() {
    const dateInput = document.querySelector('#preferred-date');
    if (!dateInput) return;

    // Set minimum date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;

    // Set maximum date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxYyyy = maxDate.getFullYear();
    const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
    const maxDd = String(maxDate.getDate()).padStart(2, '0');
    dateInput.max = `${maxYyyy}-${maxMm}-${maxDd}`;
}

// ============================================
// APPOINTMENT FORM
// ============================================
function initAppointmentForm() {
    const form = document.querySelector('#appointment-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form before submitting
        if (!validateForm(form)) {
            return false;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const formData = new FormData(form);

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success modal
                showSuccessModal();
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorModal();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

function showSuccessModal() {
    const currentLang = document.documentElement.lang || 'en';

    const messages = {
        en: {
            title: 'Request Submitted',
            text: 'Thank you for your appointment request. Our staff will contact you within 1-2 business days to confirm your appointment.',
            button: 'Close'
        },
        hy: {
            title: 'Հարdelays delays delays',
            text: 'delays delays delays delays delays delays delays delays delays delays 1-2 delays delays delays delays.',
            button: 'Փdelays'
        },
        ru: {
            title: 'Запрос отправлен',
            text: 'Спасибо за ваш запрос на приём. Наш персонал свяжется с вами в течение 1-2 рабочих дней для подтверждения записи.',
            button: 'Закрыть'
        }
    };

    const msg = messages[currentLang] || messages.en;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            </div>
            <h3>${msg.title}</h3>
            <p>${msg.text}</p>
            <button class="btn btn-primary modal-close">${msg.button}</button>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal on button click or overlay click
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    // Animate in
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

function showErrorModal() {
    const currentLang = document.documentElement.lang || 'en';

    const messages = {
        en: {
            title: 'Something went wrong',
            text: 'We could not send your request. Please try again or call us directly at +374 10 510451.',
            button: 'Close'
        },
        hy: {
            title: 'Delays delays delays',
            text: 'Delays delays delays delays. Delays delays delays delays +374 10 510451.',
            button: 'Փdelays'
        },
        ru: {
            title: 'Что-то пошло не так',
            text: 'Мы не смогли отправить ваш запрос. Попробуйте ещё раз или позвоните нам: +374 10 510451.',
            button: 'Закрыть'
        }
    };

    const msg = messages[currentLang] || messages.en;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            </div>
            <h3>${msg.title}</h3>
            <p>${msg.text}</p>
            <button class="btn btn-primary modal-close">${msg.button}</button>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => modal.remove(), 300);
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'This field is required');
        } else {
            clearFieldError(field);
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            }
        }

        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid phone number');
            }
        }
    });

    // Consent checkbox
    const consent = form.querySelector('#consent');
    if (consent && !consent.checked) {
        isValid = false;
        showFieldError(consent, 'Please accept the terms to continue');
    }

    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');

    const errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    errorEl.style.cssText = 'color: #C75B5B; font-size: 0.875rem; margin-top: 0.25rem; display: block;';

    field.parentNode.appendChild(errorEl);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showFormSuccess(form) {
    const currentLang = document.documentElement.lang || 'en';

    const messages = {
        en: {
            title: 'Request Submitted',
            text: 'Thank you for your appointment request. Our staff will contact you within 1-2 business days to confirm your appointment.'
        },
        hy: {
            title: 'Հարdelays delays delays',
            text: 'delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays delays.'
        },
        ru: {
            title: 'Запрос отправлен',
            text: 'Спасибо за ваш запрос на прием. Наш персонал свяжется с вами в течение 1-2 рабочих дней для подтверждения записи.'
        }
    };

    const msg = messages[currentLang] || messages.en;

    form.innerHTML = `
        <div class="form-success">
            <div class="form-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            </div>
            <h3>${msg.title}</h3>
            <p>${msg.text}</p>
        </div>
    `;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
