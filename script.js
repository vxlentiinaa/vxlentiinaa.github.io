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
      text += Math.random() > 0.5 ? '0' : '1';
    }
    text += '\n';
  }

  matrix.textContent = text;
}

generateMatrix();
window.addEventListener('resize', generateMatrix);
