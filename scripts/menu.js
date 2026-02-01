// Бургер-меню
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// Создаём оверлей
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function toggleMenu() {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  mainNav.classList.toggle('active');
  navOverlay.classList.toggle('active');

  document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Закрываем меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav_link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 1024) {
      toggleMenu();
    }
  });
});

// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopButton.classList.add('visible');
  } else {
    scrollTopButton.classList.remove('visible');
  }
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});