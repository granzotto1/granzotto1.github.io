const canvas = document.getElementById("canvas");
document.getElementById("zoom").value = "100"; 
const ctx = canvas.getContext("2d");

class Tartaruga {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angolo = 0;
        this.penna = true;
    }

    avanti(d) {
        let rad = this.angolo * Math.PI / 180;
        let nx = this.x + d * Math.cos(rad);
        let ny = this.y + d * Math.sin(rad);

        if (this.penna) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(nx, ny);
            ctx.stroke();
        }

        this.x = nx;
        this.y = ny;
    }

    destra(a) {
        this.angolo += a;
    }

    sinistra(a) {
        this.angolo -= a;
    }
}

function koch(t, livello, lunghezza) {
    if (livello === 0) {
        t.avanti(lunghezza);
    } else {
        lunghezza /= 3;
        koch(t, livello - 1, lunghezza);
        t.sinistra(60);
        koch(t, livello - 1, lunghezza);
        t.destra(120);
        koch(t, livello - 1, lunghezza);
        t.sinistra(60);
        koch(t, livello - 1, lunghezza);
    }
}

ctx.strokeStyle = "black";

let t = new Tartaruga(200, 300);
t.angolo = 0;
zoom.addEventListener("input", (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(document.getElementById("zoom").value); 
    for (let i = 0; i < 3; i++) {
        koch(t, 4, zoom.value * 4);
        t.destra(120);
    }
    
    
  });
  

