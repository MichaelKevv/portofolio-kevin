document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    const currentYear = new Date().getFullYear();
    document.getElementById('year').textContent = currentYear;
    const navbar = document.getElementById('navbar');
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            // Apply Glassmorphism
            navbar.classList.add('bg-[#030014]/80', 'backdrop-blur-xl', 'border-white/10', 'shadow-lg');
            navbar.classList.remove('border-transparent');
        } else {
            // Revert to transparent
            navbar.classList.remove('bg-[#030014]/80', 'backdrop-blur-xl', 'border-white/10', 'shadow-lg');
            navbar.classList.add('border-transparent');
        }
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        
        // Toggle Icon by resetting innerHTML
        if (isHidden) {
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            // Remove solid background if at top
            if (window.scrollY <= 20) {
                 navbar.classList.remove('bg-[#030014]');
            }
        } else {
            mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
            // Force solid background when menu is open
            navbar.classList.add('bg-[#030014]'); 
        }
        lucide.createIcons();
    });

    // Smooth Scroll & Auto Close Menu
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close menu
                    mobileMenu.classList.add('hidden');
                    // Reset icon
                    mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                    lucide.createIcons();
                    
                    // Scroll
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
