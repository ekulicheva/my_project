// ========================================
// МОБИЛЬНОЕ МЕНЮ И ИНТЕРАКТИВНОСТЬ
// ========================================

// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const body = document.body;

// Создаем оверлей для затемнения фона
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// ========================================
// ФУНКЦИЯ ОТКРЫТИЯ/ЗАКРЫТИЯ МЕНЮ
// ========================================

function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Блокируем скролл при открытом меню
    if (mainNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
        body.classList.add('menu-open');
    } else {
        body.style.overflow = '';
        body.classList.remove('menu-open');
    }
}

// ========================================
// ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ МЕНЮ
// ========================================

// Клик по кнопке гамбургера
menuToggle.addEventListener('click', toggleMenu);

// Клик по затемнённому фону
navOverlay.addEventListener('click', toggleMenu);

// Закрытие меню при клике на ссылку (только на мобильных)
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
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
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            toggleMenu();
        }
    }, 250);
});

// ========================================
// ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Игнорируем пустые якоря
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 70; // Отступ от шапки
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// КНОПКА "НАВЕРХ"
// ========================================

const scrollTopButton = document.getElementById('scrollTop');

// Показываем/скрываем кнопку при прокрутке
let scrollTimer;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    }, 100);
}, { passive: true });

// Прокрутка к началу страницы
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Даём фокус на первый элемент для доступности
    setTimeout(() => {
        document.querySelector('h1').focus();
    }, 500);
});

// ========================================
// УЛУЧШЕНИЕ ВИЗУАЛЬНОГО ФИДБЕКА ДЛЯ КНОПОК
// ========================================

// Добавляем визуальный фидбек при касании для всех кнопок
const allButtons = document.querySelectorAll('button, .card__button, .combo__card__button, .giftset__buy');

allButtons.forEach(button => {
    // Эффект "рипл" при нажатии (Material Design)
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// CSS для эффекта ripple (добавляем динамически)
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button, .card__button, .combo__card__button, .giftset__buy {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ
// ========================================

// Подсветка активной секции при прокрутке
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav__link');

function highlightNavigation() {
    let scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Вызываем при прокрутке (с throttle для производительности)
let navScrollTimer;
window.addEventListener('scroll', () => {
    clearTimeout(navScrollTimer);
    navScrollTimer = setTimeout(highlightNavigation, 100);
}, { passive: true });

// Начальная подсветка
highlightNavigation();

// ========================================
// УЛУЧШЕНИЕ ПРОИЗВОДИТЕЛЬНОСТИ
// ========================================

// Lazy loading для изображений (если браузер не поддерживает нативно)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
} else {
    // Полифилл для старых браузеров
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// ОТЛАДКА (можно удалить в продакшене)
// ========================================

// Логирование для проверки работы скриптов
console.log('✅ Мобильное меню инициализировано');
console.log('✅ Кнопка "Наверх" готова к работе');
console.log('✅ Плавная прокрутка активирована');
console.log('✅ Визуальный фидбек для кнопок подключен');

// Информация о текущем viewport
console.log(`📱 Текущая ширина экрана: ${window.innerWidth}px`);
window.addEventListener('resize', () => {
    console.log(`📱 Размер изменён: ${window.innerWidth}px`);
});