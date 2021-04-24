const { initAppearance } = require('../../modules/senos')

window.onload = function(){
    initAppearance();
    let sheepyOptions = {
        open: ['FIRST_START'],
        steps: [
            {
                title: "Einleitung",
                content: "Mit dieser Anwendung kannst du die Uhrzeit sehen, einen Timer stellen und eine Stoppuhr starten"
            },
            {
                title: "Uhrzeit",
                content: "Um die Uhrzeit zu sehen, musst du nur oben auf den blauen Text 'Uhrzeit' klicken"
            },
            {
                title: "Timer aufrufen",
                content: "Den Timer rufst du durch einen simplen Klick auf den obigen blauen Text 'Timer' auf"
            },
            {
                title: "Timer einstellen (1)",
                content: "Um den Timer einzustellen, musst du ihn zunächst aufrufen und dann auf den Stift in der Mitte deines Bildschirms klicken."
            },
            {
                title: "Timer einstellen (2)",
                content: "Nachdem sich ein Dialog Fenster geöffnet hat, kannst du hier n un die Zeit eingeben. Dieser Vorgang ist für Stunden, Minuten und Sekunden gleich. Klicke in das Textfeld unter dem Wert den du verändern willst ('Stunden', 'Minuten' oder 'Sekunden') und gebe anschließend die gewünschte Zahl ein."
            },
            {
                title: "Timer einstellen (3)",
                content: "Abschließen musst du nur noch auf den Knopf 'Speichern klicken'"
            },
            {
                title: "Timer starten",
                content: "Nachdem du den Timer eingestellt hast, musst du nur noch auf den Knopf 'Starten' links neben dem Stiff klicken und dein Timer läuft ab!"
            },
            {
                title: "Timer stoppen",
                content: "Wenn du den Timer vorzeitig beenden willst, kannst du einfach auf den roten Knopf 'Stoppen' rechts neben dem Stifft klicken."
            },
            {
                title: 'Stoppuhr aufrufen',
                content: "Die Stoppuhr rufst du über einen Klick auf den blauen Text 'Stoppuhr' am oberen Bildschirmrand auf."
            },
            {
                title: "Stoppuhr starten",
                content: "Um die Stoppuhr zu starten genügt es, wenn du auf den Knopf 'Starten' in der Mitte deines Bildschirms klickst"
            },
            {
                title: "Stoppuhr stoppen",
                content: "Um die Stoppuhr zu stoppen genügt es, wenn du auf den Knopf 'Stoppen' in der Mitte deines Bildschirms klickst"
            },
            {
                title: "Stoppuhr zurücksetzen",
                content: "Wenn du die Stoppuhr zurück auf 0 setzen willst, musst du lediglich den mittleren grauen Knopf einmal anklicken."
            }
        ]
    }
    sheepyInit(sheepyOptions);
}

// clock time

setInterval(updateClock, 100)

function updateClock(){
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let se = d.getSeconds();
    let s = '';
    if(h.toString().length < 2){
        s += '0';
    }
    s += h.toString() + ':';
    if(m.toString().length < 2){
        s += '0';
    }
    s += m.toString() + ':';
    if(se.toString().length < 2){
        s += '0';
    }
    s += se.toString();
    document.getElementById("current_date").innerText = s;
}

// timer
const setTimer = new bootstrap.Modal(document.getElementById('timer_set_time'), {})
const finishedTimer = new bootstrap.Modal(document.getElementById('timer_finished'),{});
let timerActive = false;
let timerSeconds = 0;
let timerMinutes = 0;
let timerHours = 0;

setInterval(() => {
    for(let i = 0; i < 1; i++){
        timerSeconds++;
        timerSeconds--;
        timerMinutes++;
        timerMinutes--;
        timerHours++;
        timerHours--;
        if(timerActive){
            timerSeconds--;
            if(timerSeconds === 0 && timerMinutes === 0 && timerHours === 0){
                finishTimer()
                break;
            }
            if(timerSeconds === 0){
                timerSeconds = 59;
                if(timerMinutes > 0){
                    timerMinutes--;
                }
                if(timerMinutes === 0){
                    if(timerHours > 0){
                        timerHours--;
                    }
                    timerMinutes = 0;
                }
            }
            updateTimer();
        }
    }
}, 1000)

function stopTimer() {
    timerActive = false;
    timerSeconds = 0;
    timerMinutes = 0;
    timerHours = 0;
    updateTimer();
}


function finishTimer(){
    stopTimer();
    window.parent.openApp('clock')
    finishedTimer.show();
}

function startTimer(){
    if(timerSeconds == 0){
        timerSeconds = 1;
    }
    timerActive = true;
}

function editTimer(){
    setTimer.show();
}

function setTimerTime(){
    timerSeconds = document.getElementById('timer_second_input').value
    timerMinutes = document.getElementById('timer_minute_input').value
    timerHours = document.getElementById('timer_hour_input').value
    updateTimer();
}

function updateTimer(){
    let s = '';
    if(timerHours.toString().length < 2){
        s += '0';
    }
    s += timerHours.toString() + ':';
    if(timerMinutes.toString().length < 2){
        s += '0';
    }
    s += timerMinutes.toString() + ':';
    if(timerSeconds.toString().length < 2){
        s += '0';
    }
    s += timerSeconds.toString();
    document.getElementById('current_timer').innerText = s;
}

// stop watch
let stopWatchActive = false;
let stopWatchSeconds = 0;
let stopWatchMinutes = 0;
let stopWatchHours = 0;

setInterval(() => {
    if(stopWatchActive){
        stopWatchSeconds++;
        if(stopWatchSeconds === 60){
            stopWatchSeconds = 0;
            stopWatchMinutes++;
            if(stopWatchMinutes === 60){
                stopWatchHours++;
                stopWatchMinutes = 0;
            }
        }
        updateStopWatch();
    }
}, 1000)

function startStopWatch(){
    stopWatchActive = true;
}

function resetStopWatch(){
    stopWatchActive = false;
    stopWatchSeconds = 0;
    stopWatchMinutes = 0;
    stopWatchHours = 0;
    updateStopWatch();
}

function stopStopWatch(){
    stopWatchActive = false;
    updateStopWatch();
}

function updateStopWatch(){
    let s = '';
    if(stopWatchHours.toString().length < 2){
        s += '0';
    }
    s += stopWatchHours.toString() + ':';
    if(stopWatchMinutes.toString().length < 2){
        s += '0';
    }
    s += stopWatchMinutes.toString() + ':';
    if(stopWatchSeconds.toString().length < 2){
        s += '0';
    }
    s += stopWatchSeconds.toString();
    document.getElementById('current_stopwatch').innerText = s;
}