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

document.addEventListener('DOMContentLoaded', function() {
  initSmartNavbar();
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
