let canvas = undefined;

window.onload = function(){
    // sheepy
    let sheepyOptions = {
        open: ['FIRST_START'],
        steps: [
            {
                title: "Bingo",
                content: "In dieser Anwendung kannst du Bingo spielen!"
            },
            {
                title: "Starten",
                content: "Um das Spiel zu starten klicke auf den Knopf in der Mitte mit der Beschriftung 'Start'"
            },
            {
                title: "Spielen (1)",
                content: "Nachdem du das Spiel gestartet hast, siehst du in der Mitte des Bildschirmes deine Bingo Tafel."
            },
            {
                title: "Spielen (2)",
                content: "Oben links wird alle 6 Sekunden eine neue Bingokugel erscheinen. Wenn die Zahl auf der Bingokugel auf deiner Tafel steht, kannst du sie anklicken (auf deiner Tafel)!"
            },
            {
                title: "Hinweis!",
                content: "Es kommen alle Zahlen zwischen 0 und 100 genau einmal vor! Wenn du die Zahl nicht schnell genug auf deiner Tafel anklickst, kannst du sie im ganzen Spiel nicht mehr anklicken!"
            },
            {
                title: "Viel Spaß",
                content: "Und jetzt viel Spaß beim Bingo spielen!"
            }
        ]
    }
    sheepyInit(sheepyOptions)

    canvas = document.getElementById('bingoBullet');
    createPlayerPad();
    createBullet(0)
    clearBullet()
}

let currentBulletNumber = -1;

const ROWS = 5;
const COLS = 5;
const MAX_NUMBER = 99;

let field_data = {}

let used_numbers = [];

function createPlayerPad(){
    let takenNumbers = [];
    for(let i = 0; i < ROWS; i++){ // 5 -> ROWS
        let rowElement = document.createElement('div');
        rowElement.classList.add('row', 'justify-content-center');
        rowElement.id = "bingo_row_" + getRandomUUID();
        for(let j = 0; j < COLS; j++){ // 5 -> COLS
            let col = document.createElement('div');
            col.classList.add('col', 'col-1');
            let h1 = document.createElement('h1')
            h1.classList.add('text-center', 'playerpad-number');
            random(1, MAX_NUMBER); // call method first time to prevent that the method returns it self
            let n = 0;
            let f = false;
            while (!f){
                let t = random(1, MAX_NUMBER);
                if(!takenNumbers.includes(t)){
                    f = true;
                    n = t;
                    takenNumbers.push(n);
                }
            }
            h1.innerText = n;
            h1.id = 'playerpad_number_' + n;
            field_data[i + '_' + j] = h1.id;
            h1.setAttribute('onclick', 'clickPadNumber(' + n + ')');
            col.appendChild(h1);
            rowElement.appendChild(col);
        }
        document.getElementById('bingoField').appendChild(rowElement);
        $('#' + rowElement.id).hide(0).delay(100 * i).fadeIn(500 * i)
    }
    $('#btnNextBullet').hide(0).delay(100).fadeIn(1500)
}

function startGame(){
    document.getElementById('btnNextBullet').classList.add('d-none')
    document.getElementById('numbersLeft').classList.remove('visually-hidden')
    document.getElementById('bingoField').classList.remove('visually-hidden')
    showNextBullet();
    setInterval(() => {
        showNextBullet();
    }, 6000);
}

function showNextBullet(){
    if(used_numbers.length === MAX_NUMBER - 1){
        loose();
    }else {
        let fn = -1;
        let f = false;
        while(!f){
            let r = random(1, MAX_NUMBER);
            console.log(r);
            if(!used_numbers.includes(r)){
                fn = r;
                f = true;
                used_numbers.push(r)
            }
        }
        document.getElementById('numbersLeft').innerText = 'Verbleibende Zahlen: ' + (MAX_NUMBER - used_numbers.length + 1)
        console.log(used_numbers)
        createBullet(fn)
    }
}

function createBullet(number){
    currentBulletNumber = number;
    clearBullet();
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = getRandomColor();
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
    context.fillStyle = 'black';
    context.font = "60px monospace";
    context.textBaseline = 'middle';
    context.textAlign = "center";
    context.fillText(number.toString(), canvas.width / 2, canvas.height / 2);
}

function clearBullet(){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function clickPadNumber(n){
    let e = document.getElementById('playerpad_number_' + n);
    if(!e.classList.contains('playerpad-number-checked') && n === currentBulletNumber){
        e.classList.add('playerpad-number-checked');
        checkBingo();
    }
}

function checkBingo() {
    // horizontal

    for(let r = 0; r < ROWS; r++){
        let checkCount = 0;
        for(let c = 0; c < COLS; c++){
            if(document.getElementById(field_data[r + "_" + c]).classList.contains('playerpad-number-checked')){
                checkCount++;
            }
        }
        if(checkCount === COLS){
            win()
        }
    }

    // vertical

    for(let c = 0; c < COLS; c++){
        let checkCount = 0;
        for(let r = 0; r < ROWS; r++){
            if(document.getElementById(field_data[r + "_" + c]).classList.contains('playerpad-number-checked')){
                checkCount++;
            }
        }
        if(checkCount === ROWS){
            win()
        }
    }

    let __current_col0 = 0;
    let __current_cc0 = 0
    for(let r = 0; r < ROWS; r++){
        if(document.getElementById(field_data[r + '_' + __current_col0]).classList.contains('playerpad-number-checked')){
            __current_cc0++;
        }
        __current_col0++;
    }
    if(__current_cc0 === COLS){
        win()
    }

    let __current_col1 = COLS - 1;
    let __current_cc1 = 0;
    for(let r = 0; r < ROWS; r++){
        if(document.getElementById(field_data[r + '_' + __current_col1]).classList.contains('playerpad-number-checked')){
            __current_cc1++;
        }
        __current_col1--;
    }
    if(__current_cc1 === COLS){
        win()
    }

    /*
    // horizontal
    for(let r = 0; r < ROWS; r++){
        let checkCount = 0;
        for(let c = 0; c < COLS; c++){
            console.log(c + ' ' + r);
            console.log('h: ' + document.getElementById(field_data[r + '_' + c]).id)
            if(document.getElementById(field_data[r + '_' + c]).classList.contains('playerpad-number-checked')){
                checkCount++;
            }
            console.log('hcc: ' + checkCount)
        }
        if(checkCount === COLS){
            win()
            break;
        }
    }
    // vertical
    for(let r = 0; r < ROWS; r++){
        let checkCount = 0;
        for(let c = 0; c < ROWS; c++){
            console.log('v: ' + document.getElementById(field_data[r + '_0']).id)
            if(document.getElementById(field_data[r + '_0']).classList.contains('playerpad-number-checked')){
                checkCount++;
            }
            console.log('vcc: ' + checkCount)
        }
        if(checkCount === COLS){
            win();
            break;
        }
    }*/
    /*
    // diagonal (left-start)
    for(let r = 0; r < ROWS; r++) {
        let checkCount = 0;
        let currentCol = 0;
        for(let c = 0; c < COLS; c++){
            if(document.getElementById(field_data[r + '_' + currentCol]).classList.contains('playerpad-number-checked')){
                checkCount++;
            }
            currentCol++;
        }
        if(checkCount === COLS){
            win();
        }
    }
    // diagonal (right-start)
    for(let r = 0; r < ROWS; r++) {
        let checkCount = 0;
        let currentCol = COLS - 1;
        for(let c = 0; c < COLS; c++){
            if(document.getElementById(field_data[r + '_' + currentCol]).classList.contains('playerpad-number-checked')){
                checkCount++;
            }
            currentCol--;
        }
        if(checkCount === COLS){
            win();
        }
    }*/
}

function win(){
    window.location.assign('end.html?title=Gewonnen')
    alert('you won!')
}

function loose(){
    window.location.assign('end.html?title=Game Over')
    alert('you loose!')
}

function getRandomColor(){
    let colors = ['#e63009', '#e6a009', '#8ce609', '#09e613', '#09c5e6', '#be09e6', '#0960e6'];
    return colors[random(0, colors.length)]
}

function random(min, max){
    return random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
}

function getRandomUUID(){
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){let r=Math.random()*16|0,v=c=="x"?r:r&3|8;return v.toString(16)})
}