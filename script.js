// ==========================================================================
// Логика переключения тем (Светлая / Тёмная) и подсветки навигации
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-toggle-text');

    // Функция определения темы при первом запуске
    function getInitialTheme() {
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Применение темы
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme');
            if (themeText) themeText.textContent = 'Светлая тема';
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.classList.remove('dark-theme');
            if (themeText) themeText.textContent = 'Тёмная тема';
        }
        localStorage.setItem('app-theme', theme);
    }

    // Инициализация темы при загрузке страницы
    const currentTheme = getInitialTheme();
    applyTheme(currentTheme);

    // Обработчик клика по кнопке
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || document.body.classList.contains('dark-theme');
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    // Подсветка активного раздела в меню при скролле
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const sections = Array.from(navLinks)
        .map(link => {
            const id = link.getAttribute('href').substring(1);
            return document.getElementById(id);
        })
        .filter(sec => sec !== null);

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 120;
        let activeSectionId = '';

        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop <= scrollPosition) {
                activeSectionId = sections[i].id;
                break;
            }
        }

        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + activeSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
});
