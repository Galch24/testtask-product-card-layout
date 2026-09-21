import '@styles/style.scss';

function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Получаем ID таба из атрибута data-tab
      const tabId = this.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      this.classList.add('active');

      const activeContent = document.getElementById(tabId);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

function lightboxImage()  {
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const productImages = document.querySelectorAll('.product-image img');

  /**
   * Функция открытия лайтбокса
   * @param {string} imageSrc - путь к изображению
   */
  function openLightbox(imageSrc) {
    lightboxImage.src = imageSrc;
    lightboxOverlay.classList.add('active');
    // Запрещаем прокрутку страницы
    document.body.style.overflow = 'hidden';
  }

  /**
   * Функция закрытия лайтбокса
   */
  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    // Восстанавливаем прокрутку страницы
    document.body.style.overflow = 'auto';
  }

  // ==========================================
  // ОБРАБОТЧИКИ СОБЫТИЙ
  // ==========================================

  // Клик на изображение - открытие лайтбокса
  productImages.forEach(img => {
    img.addEventListener('click', function() {
      openLightbox(this.src);
    });
  });

  // Клик на кнопку закрытия
  lightboxClose.addEventListener('click', function(e) {
    e.stopPropagation(); // Останавливаем распространение события
    closeLightbox();
  });

  // Клик на затемнённый фон - закрытие лайтбокса
  lightboxOverlay.addEventListener('click', function(e) {
    // Закрываем только если клик именно на overlay, а не на контент
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });

  // Закрытие по нажатию клавиши Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
      closeLightbox();
    }
  });
}

async function initApp() {
  initTabs();
  lightboxImage();
}

document.addEventListener('DOMContentLoaded', function() {
  initApp();
});
