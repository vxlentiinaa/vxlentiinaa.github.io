document.addEventListener("DOMContentLoaded", () => {

  // ABOUT SCROLL
  const aboutSection = document.querySelector('.about-section');

  window.addEventListener('scroll', () => {
    const trigger = window.innerHeight * 0.8;
    const top = aboutSection.getBoundingClientRect().top;

    if (top < trigger) {
      aboutSection.classList.add('visible');
    }
  });

  // MATRIX
  const matrix = document.querySelector('.matrix-bg');

function generateMatrix() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const columns = Math.floor(width / 10);
  const rows = Math.floor(height / 14);

  let text = '';

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {

      // micro variación visual
      const random = Math.random();

      if (random > 0.98) {
        text += '<span class="bright">1</span>';
      } else if (random > 0.96) {
        text += '<span class="dim">0</span>';
      } else {
        text += Math.random() > 0.5 ? '0' : '1';
      }

    }
    text += '<br>';
  }

  matrix.innerHTML = text;
});
