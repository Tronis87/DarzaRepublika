const translations = { lv: {}, en: {}, ru: {} };
let currentLang = 'lv';

async function loadTranslations(lang) {
    const response = await fetch(`/i18n/${lang}.json`); // ← ŠEIT LABOJUMS no /lang/ uz /i18n/
    const data = await response.json();
    translations[lang] = data;
    applyTranslations(lang);
    localStorage.setItem("lang", lang);
}

function applyTranslations(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const translation = translations[lang][key];
        if (translation) {
            el.innerHTML = translation;
        }
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    if (translations[lang] && Object.keys(translations[lang]).length > 0) {
        applyTranslations(lang);
    } else {
        loadTranslations(lang);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "lv";
    switchLanguage(savedLang);

    document.querySelectorAll('.flag-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            switchLanguage(icon.dataset.lang);
        });
    });

    // KARUSEĻA FUNKCIONALITĀTE IEKŠ DOMContentLoaded
    const projectImages = {
        'projekts1': [
            '/Images/Projects/projekts1/1.jpg',
            '/Images/Projects/projekts1/2.jpg',
            '/Images/Projects/projekts1/3.jpg'
        ],
        'projekts2': [
            '/Images/Projects/projekts2/1.jpg',
            '/Images/Projects/projekts2/2.jpg',
            '/Images/Projects/projekts2/3.jpg'
        ],
        'projekts3': [
            '/Images/Projects/projekts3/1.jpg',
            '/Images/Projects/projekts3/2.jpg',
            '/Images/Projects/projekts3/3.jpg'
        ]
    };

    let currentProject = '';
    let currentIndex = 0;

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('carouselImage');

    document.querySelectorAll('.carousel-trigger').forEach(img => {
        img.addEventListener('click', () => {
            currentProject = img.dataset.project;
            currentIndex = 0;
            openModal();
        });
    });

    function openModal() {
        modal.style.display = 'flex';
        modalImg.src = projectImages[currentProject][currentIndex];
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    document.querySelector('.close-button').addEventListener('click', closeModal);

    document.querySelector('.arrow.left').addEventListener('click', () => {
        const imgs = projectImages[currentProject];
        currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
        modalImg.src = imgs[currentIndex];
    });

    document.querySelector('.arrow.right').addEventListener('click', () => {
        const imgs = projectImages[currentProject];
        currentIndex = (currentIndex + 1) % imgs.length;
        modalImg.src = imgs[currentIndex];
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
