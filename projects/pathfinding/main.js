const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const RANGE = 100;
const POINTS_COUNT = 10;
const delay = 10;

let points = [];
let distanceMatrix = [];


async function main() {
    drawBox();
    initDistanceMatrix();

    for (let i = 0; i < POINTS_COUNT; i++) {
        
        await sleep(delay);

        let p = randomPoint();
        points.push(p);
        updateDistanceMatrix(i);
    }

    console.table(distanceMatrix);

    for (let i = 0; i < POINTS_COUNT; i++) {
        for (let j = 0; j < POINTS_COUNT; j++) {
            await sleep(delay);
            console.log(i, j)
            console.log(Math.sqrt(distanceMatrix[i][j]));
            drawLine(points[i], points[j]);

        }
    }
    let random1 = points[Math.floor(Math.random() * 5) -1];
    let random2 = points[Math.floor(Math.random() * 5) -1];

    drawPoint(random1, 'red');
}

function initDistanceMatrix() {
    for (let i = 0; i < POINTS_COUNT; i++) {
        distanceMatrix[i] = [];
        for (let j = 0; j < POINTS_COUNT; j++) {
            distanceMatrix[i][j] = 0;
        }
    }
}

function updateDistanceMatrix(index) {
    for (let i = 0; i < index; i++) {
        let dist = distanceSquared(points[i], points[index]);
        distanceMatrix[i][index] = dist;
        distanceMatrix[index][i] = dist;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function distanceSquared(p1, p2) {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    return dx * dx + dy * dy;
}

function drawBox() {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, RANGE * 2, RANGE * 2);
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(p1, p2) {
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function randomPoint() {
    const point = {
        x: Math.random() * RANGE * 2,
        y: Math.random() * RANGE * 2
    };

    drawPoint(point.x, point.y);
    return point;
}

window.addEventListener('load', main);
