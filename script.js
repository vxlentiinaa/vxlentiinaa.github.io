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

function generarMatrix() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const fontSize = 14;
  const cols = Math.floor(width / fontSize);
  const rows = Math.floor(height / fontSize);

  let output = "";

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      output += Math.random() > 0.5 ? "1" : "0";
    }
    output += "\n";
  }

  matrix.textContent = output;
}

// ejecutar al cargar
generarMatrix();

// importante: recalcular si cambias tamaño pantalla
window.addEventListener("resize", generarMatrix);

  // micro movimiento
  setInterval(generateMatrix, 400);

});
