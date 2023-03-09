const stiliukas = document.createElement("style");
document.getElementsByTagName("head")[0].appendChild(stiliukas);
var myCanvas = document.createElement("canvas");
document.getElementsByTagName("body")[0].appendChild(myCanvas);


const cX = 300;
const cY = 100;

myCanvas.style.position = "absolute";
myCanvas.style.left = cX + 'px';
myCanvas.style.top = cY + 'px';
myCanvas.style.zIndex = "100";

myCanvas.height = 220;
myCanvas.width = 359;
myCanvas.addEventListener("mousedown", mouseDown, false);
myCanvas.addEventListener('mousemove', onmousemove, false);

var ctx = myCanvas.getContext("2d");

var brokenCubes = [false, false, false, false];

var cubeImg0 = document.getElementById('cube0');
var cubeImg1 = document.getElementById('cube1');
var cubeImg2 = document.getElementById('cube2');
var cubeImg3 = document.getElementById('cube3');
var cubeImg4 = document.getElementById('cube4');

var penguinImg1 = document.getElementById('penguin1');
var penguinImg2 = document.getElementById('penguin2');
var penguinImg3 = document.getElementById('penguin3');
var penguinImg4 = document.getElementById('penguin4');

var fruitImg1 = document.getElementById('fruit1');
var fruitImg2 = document.getElementById('fruit2');
var fruitImg3 = document.getElementById('fruit3');
var fruitImg4 = document.getElementById('fruit4');

var hammerImg = document.getElementById('HammerImage');
var backgroundImg = document.getElementById('BGImage');

let cursorX = 0; let cursorY = 0;

const myCss = `
canvas {
    border:1px solid #055500;
    display: block;
    margin: 0 auto;
    image-rendering: high-quality        ;
  }
`;

const addStyles = (stylesheet, cssRules) => {
    if (stylesheet.styleSheet) {
        stylesheet.styleSheet.cssText = cssRules;
    } else {
        stylesheet.appendChild(document.createTextNode(cssRules));
    }
};


addStyles(stiliukas, myCss);
start();


////////// game loop:

var now,
    dt = 0,
    last = timestamp(),
    step = 1 / 60;

function frame() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while (dt > step) {
        dt = dt - step;
        //update(step);
    }

    clearScreen();
    drawBackground();
    drawCubes();
    drawFruit();
    drawPenguins();
    drawFruit();
    drawHammer();

    last = now;

    requestAnimationFrame(frame);
}

/////////// Functions:


function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function start() {
    requestAnimationFrame(frame);
}
// mouse callback functions:

function onmousemove(event) {
    cursorX = event.pageX - cX;
    cursorY = event.pageY - cY;
}

function mouseDown(event) {

    let clickX = event.pageX - cX;
    let clickY = event.pageY - cY;

    if (didWeClickOnObject(3, clickX, clickY)) { objectWasClicked(3); }
    else if (didWeClickOnObject(2, clickX, clickY)) { objectWasClicked(2); }
    else if (didWeClickOnObject(1, clickX, clickY)) { objectWasClicked(1); }
    else if (didWeClickOnObject(0, clickX, clickY)) { objectWasClicked(0); }
}

function didWeClickOnObject(i, clickX, clickY) {
    let _x1, _y1, _x2, _y2;
    _x1 = getTopLeft(i)[0];
    _y1 = getTopLeft(i)[1];

    _x2 = getBottomRight(i)[0];
    _y2 = getBottomRight(i)[1];

    if (brokenCubes[i] == false && clickX > _x1 && clickY > _y1 && clickX < _x2 && clickY < _y2) { return true; }
    return false;
}

///// identify clicked area functions:

let clickAreas = [[], [], [], []];
function setClickArea(i, _x, _y, _width, _height) {
    clickAreas[i] = [_x, _y, _x + _width, _y + _height]
}

function getTopLeft(i) {
    let topLeft = [clickAreas[i][0], clickAreas[i][1]];
    return topLeft;
}
function getBottomRight(i) {
    let topRight = [clickAreas[i][2], clickAreas[i][3]];
    return topRight;
}

////// when object is clicked functions:

function objectWasClicked(i) {
    brokenCubes[i] = true;
}


/////// Draw functions:

function clearScreen() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

function drawHammer() {
    if (hammerImg != null)
        ctx.drawImage(hammerImg, cursorX, cursorY);
}

function drawBackground() {
    if (backgroundImg != null)
        ctx.drawImage(backgroundImg, 0, 0, myCanvas.width, myCanvas.height);
}

function drawCubes() {
    let _x, _y, _width, _height;
    let scale = 0.78;
    let startX, startY

    startX = myCanvas.width * 0.4;
    startY = myCanvas.height * 0.22;

    _width = cubeImg1.width * scale;
    _height = cubeImg1.height * scale;
    _x = startX;
    _y = startY;
    if (brokenCubes[0] == false)
        ctx.drawImage(cubeImg1, _x, _y, _width, _height);
    setClickArea(0, _x, _y, _width, _height);

    _width = cubeImg2.width * scale;
    _height = cubeImg2.height * scale;
    _x = startX + (_width) * 0.63;
    _y = startY + (_height) * 0.1;
    if (brokenCubes[1] == false)
        ctx.drawImage(cubeImg2, _x, _y, _width, _height);
    setClickArea(1, _x, _y, _width, _height);

    _width = cubeImg3.width * scale;
    _height = cubeImg3.height * scale;
    _x = startX + (_width) * 0.21;
    _y = startY - (_height) * 0.51;
    if (brokenCubes[2] == false)
        ctx.drawImage(cubeImg3, _x, _y, _width, _height);
    setClickArea(2, _x, _y, _width, _height);

    _width = cubeImg4.width * scale;
    _height = cubeImg4.height * scale;
    _x = startX + (_width) * 0.80;
    _y = startY - (_height) * 0.39;
    if (brokenCubes[3] == false)
        ctx.drawImage(cubeImg4, _x, _y, _width, _height);
    setClickArea(3, _x, _y, _width, _height);
}

function drawPenguins() {
    let _x, _y, _width, _height;
    let scale = 0.58;
    _x = myCanvas.width * 0.23;
    _y = myCanvas.height * 0.28;
    _width = penguinImg1.width * scale;
    _height = penguinImg1.height * scale;
    ctx.drawImage(penguinImg1, _x, _y, _width, _height);

    _x = myCanvas.width * 0.11;
    _y = myCanvas.height * 0.47;
    _width = penguinImg1.width * scale;
    _height = penguinImg1.height * scale;
    ctx.drawImage(penguinImg2, _x, _y, _width, _height);

    _x = myCanvas.width * 0.25;
    _y = myCanvas.height * 0.51;
    _width = penguinImg1.width * scale;
    _height = penguinImg1.height * scale;
    ctx.drawImage(penguinImg3, _x, _y, _width, _height);

    _x = myCanvas.width * 0.32;
    _y = myCanvas.height * 0.63;
    _width = penguinImg1.width * scale;
    _height = penguinImg1.height * scale;
    ctx.drawImage(penguinImg4, _x, _y, _width, _height);
}


function drawFruit() {
    let _x, _y, _width, _height;
    let scale = 0.35;
    _x = myCanvas.width * 0.23;
    _y = myCanvas.height * 0.32;
    _width = fruitImg1.width * scale;
    _height = fruitImg1.height * scale;
    if (brokenCubes[0] == true)
        ctx.drawImage(fruitImg1, _x, _y, _width, _height);

    _x = myCanvas.width * 0.11;
    _y = myCanvas.height * 0.47;
    _width = fruitImg2.width * scale;
    _height = fruitImg2.height * scale;
    if (brokenCubes[1] == true)
        ctx.drawImage(fruitImg2, _x, _y, _width, _height);

    _x = myCanvas.width * 0.25;
    _y = myCanvas.height * 0.51;
    _width = fruitImg3.width * scale;
    _height = fruitImg3.height * scale;
    if (brokenCubes[2] == true)
        ctx.drawImage(fruitImg3, _x, _y, _width, _height);

    _x = myCanvas.width * 0.32;
    _y = myCanvas.height * 0.63;
    _width = fruitImg4.width * scale;
    _height = fruitImg4.height * scale;
    if (brokenCubes[3] == true)
        ctx.drawImage(fruitImg4, _x, _y, _width, _height);
}
