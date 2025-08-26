document.querySelector('[data-btn-scroll-down]').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollBy({
    top: 650,
    left: 0,
    behavior: 'smooth'
  });
});