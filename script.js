document.addEventListener("DOMContentLoaded", () => {

  // ABOUT SCROLL
  const aboutSection = document.querySelector('.about-section');

  if (aboutSection) {
    window.addEventListener('scroll', () => {
      const trigger = window.innerHeight * 0.8;
      const top = aboutSection.getBoundingClientRect().top;

      if (top < trigger) {
        aboutSection.classList.add('visible');
      }
    });
  }

  // MATRIX
  const matrix = document.querySelector('.matrix-bg');

  function generateMatrix() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const columns = Math.floor(width / 12);
    const rows = Math.floor(height / 18);

    let text = '';

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        text += Math.random() > 0.5 ? '0' : '1';
      }
      text += '\n';
    }

    matrix.textContent = text;
  }

  // IMPORTANTE: ejecutar una vez al cargar
  generateMatrix();

  // micro movimiento
  setInterval(generateMatrix, 400);

});
