window.addEventListener("load", function () {

  // =============================================
  // SPARKLES
  // =============================================
  const container = document.getElementById("sparkles-container");
  if (container) {
    for (let i = 0; i < 60; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.top = Math.random() * 100 + "vh";
      s.style.left = Math.random() * 100 + "vw";
      s.style.animationDuration = (6 + Math.random() * 8) + "s";
      s.style.animationDelay = (Math.random() * 5) + "s";
      container.appendChild(s);
    }
  }

  // =============================================
  // MENÚ LATERAL
  // =============================================
  const menu = document.getElementById("side-menu");
  const closeBtn = document.getElementById("close-menu");

  // Cerrar con la X
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  }

  // Abrir clickeando esquina superior izquierda
  document.addEventListener("pointerdown", (e) => {
    const isInsideMenu = e.target.closest("#side-menu");
    if (isInsideMenu) return;
    if (e.clientX < 100 && e.clientY < 100) {
      menu.classList.toggle("open");
    }
  }, true);

  // Cerrar menú al hacer click fuera de él
  document.addEventListener("pointerdown", (e) => {
    if (menu.classList.contains("open")) {
      const isInsideMenu = e.target.closest("#side-menu");
      if (!isInsideMenu) {
        // Solo cerrar si el click NO es en la esquina (para no conflicto con abrir)
        if (!(e.clientX < 100 && e.clientY < 100)) {
          menu.classList.remove("open");
        }
      }
    }
  });

  // =============================================
  // SUBMENU PROJECTS
  // =============================================
  const projectsToggle = document.getElementById("projects-toggle");
  const submenu = document.getElementById("projects-submenu");

  if (projectsToggle && submenu) {
    projectsToggle.addEventListener("click", () => {
      submenu.classList.toggle("open");
      projectsToggle.classList.toggle("open");
    });
  }

  // Cerrar menú al navegar a sección
  const submenuLinks = document.querySelectorAll("#projects-submenu a");
  submenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });

  // =============================================
  // ANIMACIÓN DE ENTRADA — PROYECTOS
  // =============================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".project-block").forEach(block => {
    block.style.opacity = "0";
    block.style.transform = "translateY(40px)";
    block.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    observer.observe(block);
  });

  // =============================================
  // CURSOR PERSONALIZADO (opcional)
  // =============================================
  // El cursor crosshair ya está definido en CSS.
  // Si quieres añadir un cursor personalizado con canvas,
  // puedes hacerlo aquí.

// VISUALIZACIÓN ATRAPAME SI PUEDES
new p5(function(p) {
  let fondo, hada, x = 0, y = 0, particulas = [];

  p.preload = function() {
    fondo = p.loadImage("assets/AtrapameSiPuedes/fondo.gif");
    hada  = p.loadImage("assets/AtrapameSiPuedes/janisEstatica.gif");
  };

  p.setup = function() {
  let contenedor = document.getElementById("AtrapameSiPuedes-canvas");
  let canvas = p.createCanvas(contenedor.offsetWidth, contenedor.offsetWidth * 0.625);
  canvas.parent("AtrapameSiPuedes-canvas");
  p.noCursor();
};

  p.draw = function() {
    p.image(fondo, 0, 0, p.width, p.height);
    x = p.lerp(x, p.mouseX, 0.1);
    y = p.lerp(y, p.mouseY, 0.1);
    let tamaño = 200;
    particulas.push(new Particula(p, x, y));
    for (let i = particulas.length - 1; i >= 0; i--) {
      particulas[i].update();
      particulas[i].show();
      if (particulas[i].alpha <= 0) particulas.splice(i, 1);
    }
    p.image(hada, x - tamaño / 2, y - tamaño / 2, tamaño, tamaño);
  };

  class Particula {
    constructor(p, x, y) {
      this.p = p; this.x = x; this.y = y;
      this.vx = p.random(-0.5, 0.5);
      this.vy = p.random(-1, -0.2);
      this.alpha = 255;
      this.size = p.random(4, 10);
    }
    update() { this.x += this.vx; this.y += this.vy; this.alpha -= 1; }
    show() {
      this.p.noStroke();
      this.p.fill(255, 29, 158, this.alpha);
      this.p.circle(this.x, this.y, this.size);
    }
  }
}, "AtrapameSiPuedes-canvas");

// VISUALIZACIÓN sPIral
new p5(function(p) {
  let poema = "Noche de otoño… Se marchita el corazón, un espejo en la mano.";
  let autor = "--- Tōshi Akao";
  let letrasDibujadas = [];
  let index = 0;
  let angulo = 0;
  let radio = 8;
  let pasoAngulo = 0.4;
  let pasoRadio = 0.6;
  let fase = 0;
  let ultimoTiempo = 0;

  p.setup = function() {
    let canvas = p.createCanvas(300, 300);
    canvas.parent('sPIral-canvas');
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
  };

  p.draw = function() {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);

    for (let l of letrasDibujadas) {
      p.push();
      p.translate(l.x, l.y);
      p.rotate(l.angulo);
      p.fill(255);
      p.text(l.char, 0, 0);
      p.pop();
    }

    if (p.millis() - ultimoTiempo > 80) {
      agregarLetra();
      ultimoTiempo = p.millis();
    }
  };

  function agregarLetra() {
    let textoActual = fase === 0 ? poema : autor;

    if (index < textoActual.length) {
      let c = textoActual.charAt(index);
      let x = p.cos(angulo) * radio;
      let y = p.sin(angulo) * radio;
      letrasDibujadas.push({ x, y, angulo, char: c });
      angulo += pasoAngulo;
      radio += pasoRadio;
      index++;
    } else {
      if (fase === 0) {
        fase = 1;
        index = 0;
        ultimoTiempo = p.millis() + 800;
      } else {
        fase = 0;
        index = 0;
        letrasDibujadas = [];
        angulo = 0;
        radio = 8;
        ultimoTiempo = p.millis() + 800;
      }
    }
  }

  p.windowResized = function() {
  p.resizeCanvas(300, 300);
};

}, 'sPIral-canvas');
  
});


