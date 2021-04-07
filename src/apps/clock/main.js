// clock time

setInterval(updateClock, 1000)

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
        }
        if(timerSeconds === 0){
            timerSeconds = 60;
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
}, 1000)

function stopTimer() {
    timerActive = false;
    timerSeconds = 0;
    timerMinutes = 0;
    timerHours = 0;
}


function finishTimer(){
    timerActive = false;
    timerSeconds = 0;
    timerMinutes = 0;
    timerHours = 0;
    updateTimer()
    finishedTimer.show();
}

function startTimer(){
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