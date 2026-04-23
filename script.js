function activarSistema() {
    alert(">> Sistema de contacto iniciado...");
}

const aboutSection = document.querySelector('.about-section');

window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.8;
  const top = aboutSection.getBoundingClientRect().top;

  if (top < trigger) {
    aboutSection.classList.add('visible');
  }
});

<script>
const matrix = document.querySelector('.matrix-bg');

let text = '';
for (let i = 0; i < 5000; i++) {
  text += Math.random() > 0.5 ? '0' : '1';
  if (i % 100 === 0) text += '\n';
}

matrix.textContent = text;
</script>
