const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Sfondo scuro
ctx.fillStyle = "#0a1a0f";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Impostazioni linee
ctx.strokeStyle = "#999";
ctx.lineWidth = 2;

const tartaruga = {
    pen: true,
    x: canvas.width / 2,
    y: canvas.height - 80,
    angle: -90, // 0° = destra, -90° = in alto

    forward(distanza) {
        const rad = this.angle * Math.PI / 180;
        const newX = this.x + distanza * Math.cos(rad);
        const newY = this.y + distanza * Math.sin(rad);

        if (this.pen) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(newX, newY);
            ctx.stroke();
        }

        this.x = newX;
        this.y = newY;
    },

    turn(gradi) {
        this.angle += gradi;
    }
};

function disegnaAlbero(t, lunghezza, livello, maxLivelli) {
    if (livello > maxLivelli) return;

    t.forward(lunghezza);

    // Foglie / fine ramo
    if (livello === maxLivelli) {
        return;
    }


    const xPrecedente = t.x;
    const yPrecedente = t.y;
    const angoloPrecedente = t.angle;

    // Ramo destro
    t.turn(30);
    disegnaAlbero(t, lunghezza * 0.67, livello + 1, maxLivelli);

    // Ripristino stato
    t.x = xPrecedente;
    t.y = yPrecedente;
    t.angle = angoloPrecedente;

    // Ramo sinistro
    t.turn(-30);
    disegnaAlbero(t, lunghezza * 0.67, livello + 1, maxLivelli);
}

// Avvio
const lunghezzaIniziale = 200;
const maxProfondita = 15;

disegnaAlbero(tartaruga, lunghezzaIniziale, 0, maxProfondita);