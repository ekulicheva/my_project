// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navOverlay = document.querySelector('.nav-overlay');
const scrollTopButton = document.getElementById('scrollTop');

// Проверяем наличие элементов
if (!menuToggle || !mainNav || !scrollTopButton) {
    console.warn('Не найдены необходимые элементы');
}

// Функция открытия/закрытия меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Блокируем скролл при открытом меню
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

// Обработчики событий
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

if (navOverlay) {
    navOverlay.addEventListener('click', toggleMenu);
}

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        toggleMenu();
    }
});

// Закрытие меню при изменении размера окна (если перешли на десктоп)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        toggleMenu();
    }
});

// Кнопка "Наверх"
if (scrollTopButton) {
    // Показываем кнопку после скролла
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    // Прокрутка к началу страницы
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
