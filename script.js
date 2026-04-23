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
