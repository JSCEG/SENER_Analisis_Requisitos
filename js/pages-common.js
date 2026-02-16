document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle Mobile Menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Toggle Dropdowns on Mobile (and Desktop click if needed)
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth < 992) { // Only prevent default on mobile or if we want click-to-open on desktop too
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('open');

                const dropdownMenu = parent.querySelector('.nav-dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.toggle('active');
                }
            }
        });
    });
});
