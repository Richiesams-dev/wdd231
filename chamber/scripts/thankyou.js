// Function to display application data
function displayApplicationData() {
    const urlParams = new URLSearchParams(window.location.search);
    const applicationData = document.getElementById('application-data');
    
    // Get and format the data
    const firstName = urlParams.get('fname') || 'Not provided';
    const lastName = urlParams.get('lname') || 'Not provided';
    const email = urlParams.get('email') || 'Not provided';
    const mobile = urlParams.get('mobile') || 'Not provided';
    const organization = urlParams.get('organization-name') || 'Not provided';
    
    // Format timestamp
    let timestamp = 'Not provided';
    const timestampParam = urlParams.get('timestamp');
    if (timestampParam) {
        const date = new Date(timestampParam);
        timestamp = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Format membership level
    const membershipLevel = urlParams.get('membership-level') || 'Not selected';
    let membershipText = 'Not selected';
    
    switch(membershipLevel) {
        case 'np':
            membershipText = 'NP Membership (Non-Profit) - Free';
            break;
        case 'bronze':
            membershipText = 'Bronze Membership - $250/year';
            break;
        case 'silver':
            membershipText = 'Silver Membership - $500/year';
            break;
        case 'gold':
            membershipText = 'Gold Membership - $1,000/year';
            break;
        default:
            membershipText = membershipLevel;
    }
    
    // Create the HTML for application data
    applicationData.innerHTML = `
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">First Name</span>
                <span class="detail-value">${firstName}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Last Name</span>
                <span class="detail-value">${lastName}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Email Address</span>
                <span class="detail-value">${email}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Mobile Phone</span>
                <span class="detail-value">${mobile}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Business/Organization</span>
                <span class="detail-value">${organization}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Application Date & Time</span>
                <span class="detail-value">${timestamp}</span>
            </div>
            <div class="detail-item" style="grid-column: 1 / -1;">
                <span class="detail-label">Selected Membership Level</span>
                <span class="detail-value">${membershipText}</span>
            </div>
        </div>
    `;
}

// Function to update footer information
function updateFooterInfo() {
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
}

// Function to enhance accessibility
function enhanceAccessibility() {
    // Add focus management for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid #3498db';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayApplicationData();
    updateFooterInfo();
    enhanceAccessibility();
    
    // Mobile menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('change', function() {
            navMenu.style.display = this.checked ? 'flex' : 'none';
        });
    }
});