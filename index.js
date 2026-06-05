function initSmartNavbar() {
  const navbar = document.querySelector('.hd-sec.sticky-menu');
  if (!navbar) return;

  let lastScrollTop = 0;
  let scrollTimeout;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < lastScrollTop) {
      navbar.style.top = '0';
    }
    else if (scrollTop > 150) {
      navbar.style.top = '-150px';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, false);
}

function initContactForm() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn ? submitBtn.textContent : '';
    const name = form.querySelector('input[name="name"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const subject = form.querySelector('input[name="subject"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    const mailSubject = subject || `Contact request from ${name}`;
    const mailBody = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      '',
      'Message:',
      message
    ].join('\r\n');

    const mailtoLink = `mailto:adnksharp@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Abriendo correo...';
    }

    window.location.href = mailtoLink;

    if (submitBtn) {
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1200);
    }
  });
}

function initAboutTabs() {
  const tabList = document.querySelector('#pills-tab');
  const tabPanes = document.querySelectorAll('#pills-tabContent .tab-pane');

  if (!tabList || tabPanes.length === 0) return;

  const tabs = tabList.querySelectorAll('.nav-link');

  function activateTab(targetId) {
    tabs.forEach((tab) => {
      const isActive = tab.getAttribute('data-bs-target') === `#${targetId}`;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    tabPanes.forEach((pane) => {
      const isActive = pane.id === targetId;
      pane.classList.toggle('show', isActive);
      pane.classList.toggle('active', isActive);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = tab.getAttribute('data-bs-target')?.replace('#', '');

      if (targetId) {
        activateTab(targetId);
      }
    });
  });

  const activeTab = tabList.querySelector('.nav-link.active');
  const initialTarget = activeTab?.getAttribute('data-bs-target')?.replace('#', '') || tabPanes[0].id;
  activateTab(initialTarget);
}

document.addEventListener('DOMContentLoaded', function() {
  initSmartNavbar();
  initContactForm();
  initAboutTabs();
  const config = {
    autoplay: true,
    autoplayInterval: 8000,
    transitionDuration: 800,
    enableKeyboard: true
  };

  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const slides = document.querySelectorAll('.swiper-slide');
  const prevBtn = document.querySelector('.swiper-nav-buttons .previous');
  const nextBtn = document.querySelector('.swiper-nav-buttons .next');
  const swiper = document.querySelector('.swiper');

  if (!swiperWrapper || slides.length === 0) {
    console.warn('Carousel elements not found');
    return;
  }

  let currentIndex = 0;
  let isTransitioning = false;
  let autoplayInterval = null;

  function updateCarousel() {
    if (isTransitioning) return;

    isTransitioning = true;
    const offset = -(currentIndex * 100);
    
    swiperWrapper.style.transition = `transform ${config.transitionDuration}ms ease-in-out`;
    swiperWrapper.style.transform = `translateX(${offset}vw)`;

    updateActiveSlide();

    setTimeout(() => {
      isTransitioning = false;
    }, config.transitionDuration);
  }

  function updateActiveSlide() {
    slides.forEach((slide, index) => {
      slide.classList.remove('swiper-slide-active');
      if (index === currentIndex) {
        slide.classList.add('swiper-slide-active');
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
    resetAutoplay();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoplay();
  }

  function goToSlide(index) {
    currentIndex = index % slides.length;
    updateCarousel();
    resetAutoplay();
  }

  function startAutoplay() {
    if (config.autoplay) {
      autoplayInterval = setInterval(() => {
        nextSlide();
      }, config.autoplayInterval);
    }
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  if (config.enableKeyboard) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
  }

  swiper.addEventListener('mouseenter', stopAutoplay);
  
  swiper.addEventListener('mouseleave', startAutoplay);

  updateCarousel();
  startAutoplay();

  console.log('Carousel initialized successfully');
});
