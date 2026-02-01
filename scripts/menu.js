// Адаптивное меню для мобильных устройств

// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const scrollTopButton = document.getElementById('scrollTop');

// Создаем оверлей для меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// Функция открытия/закрытия меню
function toggleMenu() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  
  // Переключаем состояния
  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  mainNav.classList.toggle('active');
  navOverlay.classList.toggle('active');
  
  // Блокируем скролл при открытом меню
  if (mainNav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
  } else {
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  }
}

// Обработчики событий
menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});

// Закрытие меню при изменении размера окна (если перешли на десктоп)
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
    toggleMenu();
  }
});

// Кнопка "Наверх" - показываем после скролла
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

// Добавляем визуальный feedback для кнопок
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('touchstart', function() {
    this.classList.add('active');
  });
  
  button.addEventListener('touchend', function() {
    setTimeout(() => {
      this.classList.remove('active');
    }, 150);
  });
  
  button.addEventListener('click', function() {
    this.classList.add('active');
    setTimeout(() => {
      this.classList.remove('active');
    }, 150);
  });
});