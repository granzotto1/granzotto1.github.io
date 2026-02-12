const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const statusEl = document.getElementById('pathLength');
const pointsInput = document.getElementById('pointsCount');
const delayInput = document.getElementById('delayMs');
const btnRegenerate = document.getElementById('btnRegenerate');
const btnClearRun = document.getElementById('btnClearAndRun');

let RANGE = 400;
let POINTS_COUNT = 100;
let delay = 10;

let points = [];
let distanceMatrix = [];

async function generateAndDraw() {
    ctx.clearRect(0, 0, RANGE, RANGE);

    drawBox();
    initDistanceMatrix();

    for (let i = 0; i < POINTS_COUNT; i++) {
        await sleep(delay);
        const p = randomPoint();
        points.push(p);
        updateDistanceMatrix(i);
    }

    let start = Math.floor(Math.random() * POINTS_COUNT);
    let end = Math.floor(Math.random() * POINTS_COUNT);
    
    while (end === start) {
        end = Math.floor(Math.random() * POINTS_COUNT);
    }

    const path = dijkstra(start, end);


    for (let i = 0; i < path.length - 1; i++) {
        drawLine(points[path[i]], points[path[i + 1]], '#60a0ff');
    }


    if (statusEl) {
        statusEl.textContent = `${path.length - 1} segmenti`;
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

function randomPoint() {
    const point = {x: Math.random() * RANGE,y: Math.random() * RANGE};
    drawPoint(point.x, point.y, '#ffffff');
    return point;
}

function drawBox() {
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, RANGE, RANGE);
}

function drawPoint(x, y, color = '#ffffff') {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(p1, p2, color = '#60a0ff') {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function initDistanceMatrix() {
    for (let i = 0; i < POINTS_COUNT; i++) {
        distanceMatrix[i] = [];
        for (let j = 0; j < POINTS_COUNT; j++) {
            distanceMatrix[i][j] = 0;
        }
    }
}

function updateDistanceMatrix(newIndex) {
    for (let i = 0; i < newIndex; i++) {
        let dist = distanceSquared(points[i], points[newIndex]);
        distanceMatrix[i][newIndex] = dist;
        distanceMatrix[newIndex][i] = dist;
    }
}

function dijkstra(startIndex, endIndex) {
    let n = POINTS_COUNT;
    let dist = Array(n).fill(Infinity);
    let visited = Array(n).fill(false);
    let prev = Array(n).fill(null);
    let path = [];

    dist[startIndex] = 0;

    for (let count = 0; count < n; count++) {
        let u = -1;

        for (let i = 0; i < n; i++) {
            if (!visited[i] && (u === -1 || dist[i] < dist[u])) {
                u = i;
            }
        }

        if (u !== -1) {
            visited[u] = true;

            for (let v = 0; v < n; v++) {
                let w = distanceMatrix[u][v];
                if (!visited[v] && w > 0 && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    prev[v] = u;
                }
            }
        }
    }

    for (let at = endIndex; at !== null; at = prev[at]) {
        path.push(at);
    }

    return path;
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pointsCountValue').textContent = POINTS_COUNT;
    document.getElementById('delayMsValue').textContent = delay;

    pointsInput?.addEventListener('input', e => {
        POINTS_COUNT = +e.target.value;
        document.getElementById('pointsCountValue').textContent = POINTS_COUNT;
    });

    delayInput?.addEventListener('input', e => {
        delay = + e.target.value;
        document.getElementById('delayMsValue').textContent = delay;
    });

    btnRegenerate?.addEventListener('click', generateAndDraw);
    btnClearRun?.addEventListener('click', generateAndDraw);

    generateAndDraw();
});
