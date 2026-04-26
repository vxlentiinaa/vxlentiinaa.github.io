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

});
