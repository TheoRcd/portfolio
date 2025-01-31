document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('nav li');
    const sections = document.querySelectorAll('main section');
    const scrollTopButton = document.querySelector('.scroll-top');

    // Navigation Switching
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items and sections
            navItems.forEach(n => n.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked nav item and corresponding section
            item.classList.add('active');
            const targetSection = document.getElementById(item.textContent.toLowerCase().replace(' ', '-'));
            targetSection.classList.add('active');
        });
    });

    // Scroll to Top
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});