import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';

const XL_BREAKPOINT = 1280; // Tailwind xl breakpoint

document.addEventListener('DOMContentLoaded', () => {
  const swiperElements = document.querySelectorAll('.swiper');

  swiperElements.forEach((element) => {
    // Equalize slideshow content heights
    const contentDivs = element.querySelectorAll('.slideshow-content');
    if (contentDivs.length > 0) {
      equalizeHeights(contentDivs);

      // Re-equalize on window resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          equalizeHeights(contentDivs);
        }, 100);
      });
    }

    new Swiper(element, {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-btn',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });
});

function equalizeHeights(elements) {
  // Reset heights first
  elements.forEach(el => el.style.height = 'auto');

  // Only equalize heights below xl breakpoint (1280px)
  if (window.innerWidth < XL_BREAKPOINT) {
    // Find the tallest
    let maxHeight = 0;
    elements.forEach(el => {
      const height = el.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    // Apply max height to all
    elements.forEach(el => {
      el.style.height = `${maxHeight}px`;
    });
  }
}
