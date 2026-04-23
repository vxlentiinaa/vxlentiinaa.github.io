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
  const charWidth = 8;
  const charHeight = 14;

  const columns = Math.ceil(window.innerWidth / charWidth);
  const rows = Math.ceil(window.innerHeight / charHeight);

  let text = '';

  for (let i = 0; i < rows; i++) {
    let line = '';
    for (let j = 0; j < columns; j++) {
      line += Math.random() > 0.5 ? '0' : '1';
    }
    text += line + '\n';
  }

  matrix.textContent = text;
  }
  
  window.addEventListener("resize", generateMatrix);
}

  // IMPORTANTE: ejecutar una vez al cargar
  generateMatrix();

  // micro movimiento
  setInterval(generateMatrix, 400);

});
