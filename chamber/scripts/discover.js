import {items} from "../data/data.mjs";

console.log(items);

// Function to display visitor message based on localStorage
function displayVisitorMessage() {
    const visitorMessage = document.createElement('div');
    visitorMessage.className = 'visitor-message';
    
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    
    if (!lastVisit) {
        visitorMessage.innerHTML = '<p>Welcome! Let us know if you have any questions.</p>';
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            visitorMessage.innerHTML = '<p>Back so soon! Awesome!</p>';
        } else {
            const dayText = daysDifference === 1 ? 'day' : 'days';
            visitorMessage.innerHTML = `<p>You last visited ${daysDifference} ${dayText} ago.</p>`;
        }
    }
    
    // Insert visitor message after the main heading
    const main = document.querySelector('main');
    const heading = main.querySelector('h1');
    heading.parentNode.insertBefore(visitorMessage, heading.nextSibling);
    
    // Store current visit date
    localStorage.setItem('lastVisit', currentDate.toString());
}

function renderItems() {
    const itemContainer = document.getElementById("items");

    itemContainer.innerHTML = "";
    items.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "container";
        card.innerHTML = `
                <figure>
                    <img src="${item.photo_url}" alt="${item.name}" loading="lazy">
                </figure>
                <div class="card-content">
                  <h2>${item.name}</h2>
                  <address><span>${item.address}</span></address>
                  <p>${item.description}</p>
                  <h3 class="cost">${item.cost}</h3>
                  <button class="card-btn">Learn More</button>
                </div>
        `;

        itemContainer.appendChild(card);
    });
}

// Update footer with current year and last modified date
function updateFooter() {
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayVisitorMessage();
    renderItems();
    updateFooter();
});
