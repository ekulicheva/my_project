document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем меню...');
    
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const scrollTopButton = document.getElementById('scrollTop');
    
    console.log('Элементы найдены:', { menuToggle, mainNav, scrollTopButton });
    
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
    console.log('Оверлей создан');

    if (window.innerWidth <= 768) {
        mainNav.classList.add('mobile-nav');
    }
    
    function toggleMenu() {
        console.log('toggleMenu вызвана');
        
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
            console.log('Меню открыто');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            console.log('Меню закрыто');
        }
    }
    
    menuToggle.addEventListener('click', function(e) {
        console.log('Клик по бургеру');
        e.stopPropagation();
        toggleMenu();
    });
    
    navOverlay.addEventListener('click', function(e) {
        console.log('Клик по оверлею');
        e.stopPropagation();
        toggleMenu();
    });

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                console.log('Клик по ссылке меню на мобильном');
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', function() {
        console.log('Размер окна изменен:', window.innerWidth);
        
        if (window.innerWidth <= 768) {
            mainNav.classList.add('mobile-nav');
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        } else {
            mainNav.classList.remove('mobile-nav', 'active');
            menuToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('Меню инициализировано');
});