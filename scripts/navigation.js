const menuBtn = document.getElementById("menu");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    
    // Transform hamburger to X and back
    if (open) {
        menuBtn.innerHTML = "✕"; // Change to X
        menuBtn.classList.add("open");
    } else {
        menuBtn.innerHTML = "☰"; // Change back to hamburger
        menuBtn.classList.remove("open");
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnMenuBtn = menuBtn.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnMenuBtn && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = "☰"; // Change back to hamburger
        menuBtn.classList.remove("open");
    }
});