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
  let container = document.getElementById('AtrapameSiPuedes-canvas');
  let canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('AtrapameSiPuedes-canvas');
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
  let container = document.getElementById('sPIral-canvas');
  let canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
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
  let container = document.getElementById('sPIral-canvas');
  p.resizeCanvas(container.offsetWidth, container.offsetHeight);
};

}, 'sPIral-canvas');

// VISUALIZACIÓN AND-Y RUNNER
  new p5(function(p) {
  let andy;
  let gravedad = 0.9;
  let velocidadY = 0;
  let sueloY;
  let sparkles = [];
  let obstaculos = [];
  let frameSpawn = 0;
  let andyGif;
  let musica;
  let musicaIniciada = false;
  let score = 0;
  let juegoIniciado = false;
  let speed = 6;
  let gameOver = false;

  p.preload = function() {
    andyGif = p.loadImage("assets/And-y/andyy.gif");
    musica = p.loadSound("assets/And-y/musica.mp3");
  };

  p.setup = function() {
    let container = document.getElementById('andy-canvas');
    let canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('andy-canvas');
    p.userStartAudio();
    sueloY = p.height - 100;
    andy = { x: 100, y: sueloY, size: 60, enSuelo: true };
    for (let i = 0; i < 60; i++) sparkles.push(new Sparkle());
  };

  p.draw = function() {
    p.background(255, 240, 120);

    if (!juegoIniciado) {
      for (let s of sparkles) { s.update(); s.show(); }
      p.textAlign(p.CENTER);
      p.fill(255, 29, 158);
      p.textSize(14);
      p.text("Press ENTER to start", p.width / 2, p.height / 2);
      return;
    }

    for (let s of sparkles) { s.update(); s.show(); }

    if (musicaIniciada && musica.isPlaying()) musica.rate(1);

    if (gameOver) {
      p.textAlign(p.CENTER);
      p.fill(255);
      p.textSize(20);
      p.text("Game Over!!", p.width / 2, p.height / 2 - 40);
      p.fill(255, 29, 158);
      p.textSize(14);
      p.text("Score: " + p.floor(score), p.width / 2, p.height / 2);
      p.fill(255);
      p.text("Press SPACE to restart", p.width / 2, p.height / 2 + 40);
      return;
    }

    p.stroke(255);
    p.line(0, sueloY + 30, p.width, sueloY + 30);

    velocidadY += gravedad;
    andy.y += velocidadY;
    if (andy.y >= sueloY) {
      andy.y = sueloY;
      velocidadY = 0;
      andy.enSuelo = true;
    }

    p.image(andyGif, andy.x, andy.y - 80, 40, 94);

    score += 0.05;
    speed = 6 + score * 0.01;
    p.textAlign(p.LEFT);
    p.fill(255);
    p.textSize(14);
    p.text("Score: " + p.floor(score), 20, 30);

    let intervaloSpawn = p.max(30, 90 - score * 0.5);
    frameSpawn++;
    if (frameSpawn > intervaloSpawn) {
      obstaculos.push(new Obstaculo());
      frameSpawn = 0;
    }

    for (let i = obstaculos.length - 1; i >= 0; i--) {
      obstaculos[i].update();
      obstaculos[i].show();
      if (
        andy.x < obstaculos[i].x + obstaculos[i].w &&
        andy.x + andy.size > obstaculos[i].x &&
        andy.y > sueloY - obstaculos[i].h
      ) {
        gameOver = true;
      }
      if (obstaculos[i].x < -100) obstaculos.splice(i, 1);
    }
  };

  p.keyPressed = function() {
    if (!juegoIniciado) {
      juegoIniciado = true;
      if (!musicaIniciada) {
        if (!musica.isPlaying()) musica.loop();
        musica.setVolume(0.3);
        musicaIniciada = true;
      }
      return;
    }

    if (p.key === " ") {
      if (gameOver) {
        gameOver = false;
        score = 0;
        speed = 6;
        obstaculos = [];
        frameSpawn = 0;
        andy.y = sueloY;
        velocidadY = 0;
        andy.enSuelo = true;
        if (!musica.isPlaying()) musica.loop();
        musicaIniciada = true;
      } else if (andy.enSuelo) {
        velocidadY = -15;
        andy.enSuelo = false;
      }
    }
  };

  class Obstaculo {
    constructor() {
      this.w = 40;
      this.h = 30;
      this.x = p.width;
      this.y = sueloY;
    }
    update() { this.x -= speed; }
    show() {
      p.fill(255, 29, 158);
      p.noStroke();
      p.rect(this.x, this.y - this.h, this.w, this.h);
    }
  }

  class Sparkle {
    constructor() {
      this.x = p.random(p.width);
      this.y = p.random(p.height);
      this.size = p.random(10, 20);
      this.speed = p.random(0.2, 0.8);
      this.alpha = p.random(100, 255);
    }
    update() {
      this.y -= this.speed;
      if (this.y < 0) { this.y = p.height; this.x = p.random(p.width); }
    }
    show() {
      p.fill(255, 29, 158, this.alpha);
      p.noStroke();
      p.textSize(this.size);
      p.text("₊⊹", this.x, this.y);
    }
  }

}, 'andy-canvas');
  
});


