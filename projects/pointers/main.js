let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

var range = 100;
var circle_area = Math.Pi * range * range;
var square_area = (2 * range) * (2 * range);
var ratio = circle_area / square_area;
var throws = 500;
let point_in = 0;
let point_out = 0;

async function main() {
    console.log(randomPoint ());

    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, 2 * range, 2 * range);


    ctx.beginPath();
    ctx.arc(range, range, range, 0, Math.PI * 2);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();
    

    for (let index = 0; index < throws; index++) {

        randomPoint ();
        await sleep(1);
    
    }

    console.log(4 * (point_in / throws));

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomPoint () {
    
}

function randomPoint () {
    var x = Math.random() * (range * 2);
    var y = Math.random() * (range * 2);
    
    
    var dx = x -100;
    var dy = y -100;

    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    if ((dx * dx) + (dy * dy) < range * range) {
        ctx.strokeStyle = 'green';
        point_in++;
    }
    else {
        ctx.strokeStyle = 'red';
        point_out++;
    }
    ctx.stroke();

}

window.addEventListener('load', main);