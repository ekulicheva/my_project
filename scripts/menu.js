const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navOverlay = document.querySelector('.nav-overlay');
const scrollTopButton = document.getElementById('scrollTop');

if (!menuToggle || !mainNav || !scrollTopButton) {
    console.warn('Не найдены необходимые элементы');
}

function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

if (navOverlay) {
    navOverlay.addEventListener('click', toggleMenu);
}

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        toggleMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        toggleMenu();
    }
});

if (scrollTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
