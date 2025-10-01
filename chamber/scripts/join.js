// Membership data
const members = [
    {
        level: "NP Membership",
        cost: "Free for Non-Profit Organizations",
        benefits: "Basic membership benefits for non-profit organizations",
        link: "#",
        modal: "np-modal",
        class: "np"
    },
    {
        level: "Bronze Membership",
        cost: "$250/year",
        benefits: "Entry-level benefits for small businesses",
        link: "#",
        modal: "bronze-modal",
        class: "bronze"
    },
    {
        level: "Silver Membership",
        cost: "$500/year",
        benefits: "Enhanced benefits for growing businesses",
        link: "#",
        modal: "silver-modal",
        class: "silver"
    },
    {
        level: "Gold Membership",
        cost: "$1,000/year",
        benefits: "Premium benefits for established businesses",
        link: "#",
        modal: "gold-modal",
        class: "gold"
    }
];

// Track currently open modal for keyboard navigation
let currentModal = null;
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

// Function to display membership levels
function displayMembershipLevels() {
    const cardContainer = document.getElementById('card-container');
    let cardsHTML = '';
    
    members.forEach((member, index) => {
        cardsHTML += `
            <div class="membership-card ${member.class}" tabindex="0">
                <h3>${member.level}</h3>
                <p><strong>Cost:</strong> ${member.cost}</p>
                <p>${member.benefits}</p>
                <a href="${member.link}" class="benefits-link" data-modal="${member.modal}" aria-haspopup="dialog">
                    View Benefits <span class="sr-only">for ${member.level}</span>
                </a>
            </div>
        `;
    });
    
    cardContainer.innerHTML = cardsHTML;
    
    // Add event listeners after creating the cards
    addModalEventListeners();
    setupCardKeyboardNavigation();
}

// Keyboard navigation for cards
function setupCardKeyboardNavigation() {
    const cards = document.querySelectorAll('.membership-card');
    
    cards.forEach((card, index) => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.benefits-link');
                if (link) {
                    const modalId = link.getAttribute('data-modal');
                    openModal(modalId);
                }
            }
            
            // Arrow key navigation between cards
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextCard = cards[index + 1] || cards[0];
                nextCard.focus();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevCard = cards[index - 1] || cards[cards.length - 1];
                prevCard.focus();
            }
        });
    });
}

// Form accessibility setup
function setupFormAccessibility() {
    const form = document.getElementById('join-form');
    const fields = form.querySelectorAll('input, select, textarea');
    
    // Set logical tab sequence
    setupTabSequence(fields);
    
    // Add ARIA attributes and validation
    fields.forEach((field) => {
        enhanceFieldAccessibility(field);
    });
    
    setupProgressiveDisclosure();
    
    setupSmartBehaviors();
    
    setupFormSubmission();
}

function setupTabSequence(fields) {
    fields.forEach((field, index) => {
        field.setAttribute('tabindex', index + 1);
    });
}

function enhanceFieldAccessibility(field) {
    if (field.required) {
        field.setAttribute('aria-required', 'true');
    }
    
    field.addEventListener('blur', function() {
        validateField(this);
        updateFieldState(this);
    });
    
    field.addEventListener('input', function() {
        clearFieldError(this);
        handleSmartBehavior(this);
    });
    
    // Enter key to move to next field
    if (field.type !== 'textarea' && field.type !== 'submit') {
        field.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                moveToNextField(this);
            }
        });
    }
}

function validateField(field) {
    const errorElement = document.getElementById(field.id + '-error');
    if (!errorElement) return;
    
    if (!field.validity.valid) {
        let message = '';
        if (field.validity.valueMissing) {
            message = 'This field is required';
        } else if (field.validity.typeMismatch) {
            message = 'Please enter a valid ' + field.type;
        } else if (field.validity.patternMismatch) {
            message = 'Please match the requested format';
        } else if (field.validity.tooShort) {
            message = `Please enter at least ${field.minLength} characters`;
        }
        
        errorElement.textContent = message;
        field.setAttribute('aria-invalid', 'true');
        field.closest('.form-group').classList.add('invalid');
    } else {
        errorElement.textContent = '';
        field.setAttribute('aria-invalid', 'false');
        field.closest('.form-group').classList.remove('invalid');
    }
}

function updateFieldState(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('valid', 'invalid');
    
    if (field.value.trim() && field.validity.valid) {
        formGroup.classList.add('valid');
    } else if (!field.validity.valid) {
        formGroup.classList.add('invalid');
    }
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.setAttribute('aria-invalid', 'false');
    field.closest('.form-group').classList.remove('invalid');
}

function moveToNextField(currentField) {
    const form = document.getElementById('join-form');
    const fields = Array.from(form.querySelectorAll('input, select, textarea'));
    const currentIndex = fields.indexOf(currentField);
    const nextField = fields[currentIndex + 1];
    
    if (nextField) {
        nextField.focus();
    }
}

function handleSmartBehavior(field) {
    // Auto-advance on field completion
    if (field.dataset.length && field.value.length >= parseInt(field.dataset.length)) {
        moveToNextField(field);
    }
    
    // Auto-capitalization for organization name
    if (field.dataset.autoCapitalize === 'true') {
        // Use setTimeout to ensure the value is updated after user input
        setTimeout(() => {
            field.value = field.value.replace(/\b\w/g, l => l.toUpperCase());
        }, 0);
    }
}

function setupProgressiveDisclosure() {
    const membershipSelect = document.getElementById('member-level');
    const conditionalFields = document.querySelectorAll('.conditional-field');
    
    if (membershipSelect) {
        membershipSelect.addEventListener('change', function() {
            conditionalFields.forEach(field => {
                const shouldShow = field.dataset.showValue === this.value;
                
                if (shouldShow) {
                    field.classList.add('visible');
                } else {
                    field.classList.remove('visible');
                }
            });
        });
    }
}

function setupSmartBehaviors() {
    // Phone number formatting
    const phoneField = document.getElementById('mobile');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '(' + value;
                if (value.length > 4) {
                    value = value.slice(0, 4) + ') ' + value.slice(4);
                }
                if (value.length > 9) {
                    value = value.slice(0, 9) + '-' + value.slice(9, 13);
                }
            }
            
            e.target.value = value;
        });
    }
}

function setupFormSubmission() {
    const form = document.getElementById('join-form');
    const submitBtn = form?.querySelector('.submit-btn');
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields before submission
        const fields = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        let firstInvalidField = null;
        
        fields.forEach(field => {
            validateField(field);
            if (!field.validity.valid && !firstInvalidField) {
                isValid = false;
                firstInvalidField = field;
            }
        });
        
        if (isValid) {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate processing delay
            setTimeout(() => {
                form.submit();
            }, 1500);
        } else {
            // Focus on first invalid field
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });
}

// Modal functions
function getFocusableElements(modal) {
    return modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
}

function trapFocus(event) {
    if (!currentModal) return;

    if (event.key === 'Tab') {
        if (event.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                event.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    
    currentModal = modal;
    focusableElements = getFocusableElements(modal);
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    // Focus first element
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
    
    document.addEventListener('keydown', trapFocus);
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    
    document.removeEventListener('keydown', trapFocus);
    document.body.style.overflow = 'auto';
    currentModal = null;
    
    // Focus the button that opened the modal
    const opener = document.querySelector(`[data-modal="${modal.id}"]`);
    if (opener) {
        opener.focus();
    }
}

function addModalEventListeners() {
    // Benefits link click handlers
    document.querySelectorAll('.benefits-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
        
        // Add keyboard support for links
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal');
                openModal(modalId);
            }
        });
    });
    
    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });
    
    // Close modal when clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentModal) {
            closeModal(currentModal);
        }
    });
}

// Utility function for screen reader only text
function createScreenReaderText(text) {
    const element = document.createElement('span');
    element.className = 'sr-only';
    element.textContent = text;
    return element;
}

// Mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                navMenu.style.display = 'flex';
                navMenu.setAttribute('aria-expanded', 'true');
            } else {
                navMenu.style.display = 'none';
                navMenu.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Keyboard navigation for menu
        navMenu.addEventListener('keydown', function(e) {
            const menuItems = this.querySelectorAll('a');
            const currentIndex = Array.from(menuItems).indexOf(document.activeElement);
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % menuItems.length;
                menuItems[nextIndex].focus();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
                menuItems[prevIndex].focus();
            } else if (e.key === 'Escape') {
                menuToggle.checked = false;
                this.style.display = 'none';
                this.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            } else if (e.key === 'Home') {
                e.preventDefault();
                menuItems[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                menuItems[menuItems.length - 1].focus();
            }
        });
        
        // Close menu when clicking on a link (for touch devices)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.checked = false;
                navMenu.style.display = 'none';
                navMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
    
    // Update footer information
    const copyrightYear = document.getElementById('copyright-year');
    const lastModified = document.getElementById('last-modified');
    
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
    
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
    
    // Initialize main functionality
    displayMembershipLevels();
    setupFormAccessibility();
    setupMobileMenu();
    
    // Add reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01s');
    }
});

// Error handling for better robustness
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});