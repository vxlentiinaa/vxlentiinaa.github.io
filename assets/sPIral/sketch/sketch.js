// sPIral
// hecho por: @VXLENTIINAA
let poema = "Noche de otoño… Se marchita el corazón, un espejo en la mano.";
let autor = "--- Tōshi Akao";

let letrasDibujadas = [];
let index = 0;

let angulo = 0;
let radio = 8;

let pasoAngulo = 0.4;
let pasoRadio = 0.6;

let fase = 0; // 0 poema, 1 autor
let ultimoTiempo = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(14);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  // ✦ dibujar letras acumuladas
  for (let l of letrasDibujadas) {
    push();
    translate(l.x, l.y);
    rotate(l.angulo);
    fill(255);
    text(l.char, 0, 0);
    pop();
  }

  // ✦ control tipo delay
  if (millis() - ultimoTiempo > 80) {
    agregarLetra();
    ultimoTiempo = millis();
  }
}

function agregarLetra() {
  let textoActual;

  if (fase === 0) {
    textoActual = poema;
  } else if (fase === 1) {
    textoActual = autor;
  }

  if (index < textoActual.length) {
    let c = textoActual.charAt(index);

    let x = cos(angulo) * radio;
    let y = sin(angulo) * radio;

    letrasDibujadas.push({
      x: x,
      y: y,
      angulo: angulo,
      char: c
    });

    angulo += pasoAngulo;
    radio += pasoRadio;
    index++;
  } else {
    // ✦ cambiar de fase
    if (fase === 0) {
      fase = 1;
      index = 0;
      ultimoTiempo = millis() + 800; // pausa
    } else {
      // ✦ reinicio total
      fase = 0;
      index = 0;
      letrasDibujadas = [];
      angulo = 0;
      radio = 8;
      ultimoTiempo = millis() + 800;
    }
  }
}