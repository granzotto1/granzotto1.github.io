const colorBox    = document.getElementById("random-color");
const colorText   = document.getElementById("color-value");
const countText   = document.getElementById("count");
const predictText = document.getElementById("prediction");
const historyList = document.getElementById("color-list");

let currentHex = "";
let dati = [];

function caricaDati() {
    dati = [];
    for (let i = 0; i < localStorage.length; i++) {
        let chiave = localStorage.key(i);
        let valore = localStorage.getItem(chiave);
        if (valore === "warm" || valore === "cold") {
            dati.push({ rgb: chiave, tipo: valore });
        }
    }
    aggiornaConteggio();
    aggiornaPredizione();
    mostraStorico();
}

function coloreCasuale() {
    let hex = "#";
    const chars = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
        hex += chars[Math.floor(Math.random() * 16)];
    }
    return hex;
}

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex[0]+hex[0] + hex[1]+hex[1] + hex[2]+hex[2];
    }
    const r = parseInt(hex.substr(0,2), 16);
    const g = parseInt(hex.substr(2,2), 16);
    const b = parseInt(hex.substr(4,2), 16);
    return `${r}, ${g}, ${b}`;
}

function mostraColore() {
    currentHex = coloreCasuale();
    colorBox.style.backgroundColor = currentHex;
    colorText.textContent = currentHex + "   rgb(" + hexToRgb(currentHex) + ")";
}

function previsioneSemplice() {
    if (dati.length < 5) return "—";

    let warm = 0;
    let cold = 0;
    for (let item of dati) {
        if (item.tipo === "warm") warm++;
        else if (item.tipo === "cold") cold++;
    }

    if (warm > cold) return "warm";
    if (cold > warm) return "cold";
    return "?";
}

function aggiornaConteggio() {
    countText.textContent = dati.length;
}

function aggiornaPredizione() {
    predictText.textContent = previsioneSemplice().toUpperCase();
}

function mostraStorico() {
    historyList.innerHTML = "";
    let ultimi = dati.slice(-8).reverse();

    for (let item of ultimi) {
        let div = document.createElement("div");
        div.innerHTML = `
            ${item.rgb.padEnd(15)}
            <span style="color: ${item.tipo === 'warm' ? '#ffaa77' : '#77aaff'}">
                ${item.tipo.toUpperCase()}
            </span>
        `;
        historyList.appendChild(div);
    }
}

function coldColor() {
    let rgb = hexToRgb(currentHex);
    localStorage.setItem(rgb, "cold");
    dati.push({ rgb: rgb, tipo: "cold" });
    mostraColore();
    aggiornaConteggio();
    aggiornaPredizione();
    mostraStorico();
}

function warmColor() {
    let rgb = hexToRgb(currentHex);
    localStorage.setItem(rgb, "warm");
    dati.push({ rgb: rgb, tipo: "warm" });
    mostraColore();
    aggiornaConteggio();
    aggiornaPredizione();
    mostraStorico();
}

// Avvio
caricaDati();
mostraColore();