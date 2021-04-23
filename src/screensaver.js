let timer, currSeconds = 0;
let animateTimerId = 0;

function resetTimer() {
    hideScreenSaver();
    clearInterval(timer);
    currSeconds = 0;
    timer = setInterval(startIdleTimer, 1000);
}
window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;

let screenSaverActive = false;

function startIdleTimer() {
    currSeconds++;
    if(currSeconds > 128 && !screenSaverActive) {
        showScreenSaver();
        screenSaverActive = true;
    }
}

function showScreenSaver(){
    let canvas = document.getElementById('screenSaver')
    canvas.style.display = 'block';
    canvas.style.width = document.body.clientWidth + "px";
    canvas.style.height = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ) + "px";
    canvas.style.background = '#000';
    document.getElementById('screenSaverSenOSLogo').setAttribute('width', (document.body.clientWidth / 4) + "px");
    document.getElementById('screenSaverSenOSLogo').setAttribute('height', (Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ) / 4) + "px");
    let lastTop = random(50, 250);
    let lastLeft = random(50, 250);
    animateTimerId = setInterval(() => {animate()}, 10)
}

let lastTop = 50.0;
let lastLeft = 50.0;


let negateTop = false;
let negateLeft = false;

function animate(){
    let img = document.getElementById('screenSaverSenOSLogo');
    img.style.top = lastTop + "px"
    img.style.left = lastLeft + "px";
    if(negateTop){
        lastTop--;
    }else {
        lastTop++;
    }
    if(negateLeft){
        lastLeft--;
    }else {
        lastLeft++;
    }
    if((lastTop + (parseInt(img.height))) > getMaxHeight()){
        negateTop = true;
    }
    if(lastTop < 0){
        negateTop = false;
    }
    if(lastLeft > document.body.clientWidth - img.width){
        negateLeft = true;
    }
    if(lastLeft < 0){
        negateLeft = false;
    }

}

function getMaxHeight(){
    return Math.max(
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    )
}

function hideScreenSaver(){
    let canvas = document.getElementById('screenSaver')
    canvas.style.display = 'none';
    clearInterval(animateTimerId)
    screenSaverActive = false
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}