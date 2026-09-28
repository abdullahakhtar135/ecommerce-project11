// Lab 1: simple "Add to Cart" feedback (real cart comes in Lab 5)
document.querySelectorAll('.product button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    btn.textContent = 'Added ✓';
    btn.classList.add('added');
    setTimeout(function () {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }, 1200);
  });
});
