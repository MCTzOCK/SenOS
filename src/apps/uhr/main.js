var stoppuhr_sekunden = 0;
var stoppuhr_minuten = 0;
var stoppuhr_stunden = 0;
var stoppuhr_läuft;

var timer_sekunden = 0;
var timer_minuten = 0;
var timer_stunden = 0;
var timer_tage = 0;
var timer_läuft;


wecker_input_value();

wecker_visible();
stoppuhr_invisible();
timer_invisible();

function wecker_btn() {
    stoppuhr_invisible();
    timer_invisible();
    wecker_visible();
}

function stoppuhr_btn() {
    wecker_invisible();
    timer_invisible();
    stoppuhr_visible();
}

function timer_btn() {
    wecker_invisible();
    stoppuhr_invisible();
    timer_visible();
}

//Wecker
function wecker_input_value() {
    document.getElementById('wecker_tage').value = new Date().getDate();
    document.getElementById('wecker_stunden').value = new Date().getHours();
    document.getElementById('wecker_minuten').value = new Date().getMinutes();
    document.getElementById('wecker_sekunden').value = new Date().getSeconds();
    document.getElementById('wecker_jahr').value = new Date().getFullYear();
    document.getElementById('wecker_jahr').setAttribute('min', new Date().getFullYear());
    
    switch (new Date().getMonth()) {
        case 0:
            document.getElementById('wecker_Monate_Januar').setAttribute('selected', 'true');
            break;
        case 1:
            document.getElementById('wecker_Monate_Februar').setAttribute('selected', 'true');
            break;
        case 2:
            document.getElementById('wecker_Monate_März').setAttribute('selected', 'true');
            break;
        case 3:
            document.getElementById('wecker_Monate_April').setAttribute('selected', 'true');
            break;
        case 4:
            document.getElementById('wecker_Monate_Mai').setAttribute('selected', 'true');
            break;
        case 5:
            document.getElementById('wecker_Monate_Juni').setAttribute('selected', 'true');
            break;
        case 6:
            document.getElementById('wecker_Monate_Juli').setAttribute('selected', 'true');
            break;
        case 7:
            document.getElementById('wecker_Monate_August').setAttribute('selected', 'true');
            break;
        case 8:
            document.getElementById('wecker_Monate_September').setAttribute('selected', 'true');
            break;
        case 9:
            document.getElementById('wecker_Monate_Oktober').setAttribute('selected', 'true');
            break;
        case 10:
            document.getElementById('wecker_Monate_November').setAttribute('selected', 'true');
            break;
        case 11:
            document.getElementById('wecker_Monate_Dezember').setAttribute('selected', 'true');
            break;
    }
    wecker_Monate_max();
}

function wecker_Monate_max() {
    switch (document.getElementById('wecker_Monate').value) {
        case "Januar":
            document.getElementById('wecker_tage').setAttribute('max', "31");
            break;
        case "Februar":
            if((document.getElementById('wecker_jahr').value % 4) === 0) {
                document.getElementById('wecker_tage').setAttribute('max', "29");
            }
            document.getElementById('wecker_tage').setAttribute('max', "28");
            break;
        case "März":
            document.getElementById('wecker_tage').setAttribute('max', "31");
            break;
        case "April":
            document.getElementById('wecker_tage').setAttribute('max', "30");
            break;
        case "Mai":
            document.getElementById('wecker_tage').setAttribute('max', "31");
            break;
        case "Juni":
            document.getElementById('wecker_tage').setAttribute('max', "30");
            break;
        case "Juli":
            document.getElementById('wecker_tage').setAttribute('max', "31");
            break;
        case "August":
            document.getElementById('wecker_tage').setAttribute('max', "31");
            break;
        case "September":
            document.getElementById('wecker_tage').setAttribute('max', "30");
            break;
        case "Oktober":
            document.getElementById('wecker_tage').setAttribute('max', "31");
            break;
        case "November":
            document.getElementById('wecker_tage').setAttribute('max', "30");
            break;
        case "Dezember":
            document.getElementById('wecker_tage').setAttribute('max', "31");
            break;
    }
}


function wecker_start(){
    switch (document.getElementById('wecker_Monate').value) {
        case "Januar":
            countDownDate = new Date("Jan " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime();    
        case "Februar":
            countDownDate = new Date("Feb " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime(); 
        case "März":
            countDownDate = new Date("Mar " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime(); 
        case "April":
            countDownDate = new Date("Apr " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime(); 
        case "Mai":
            countDownDate = new Date("May " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime();    
        case "Juni":
            countDownDate = new Date("Jun " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime(); 
        case "Juli":
            countDownDate = new Date("Jul " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime();    
        case "August":
            countDownDate = new Date("Aug " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime(); 
        case "September":
            countDownDate = new Date("Sep " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime();   
        case "Oktober":
            countDownDate = new Date("Oct " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime(); 
        case "November":
            countDownDate = new Date("Nov " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime(); 
        case "Dezember":
            countDownDate = new Date("Dec " + document.getElementById('wecker_tage').value + ", " + document.getElementById('wecker_jahr').value + " " +document.getElementById('wecker_stunden').value + ":" + document.getElementById('wecker_minuten').value + ":" + document.getElementById('wecker_sekunden').value).getTime(); 
    }
    wecker();
}


function wecker() {
    var x = setInterval(function() {
        var now = new Date().getTime();
          
        var distance = countDownDate - now;
          
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
        document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
          
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("demo").innerHTML = "ABGELAUFEN";
        }
      }, 1000);
}

function wecker_visible() {
    document.getElementById('wecker').style.visibility = 'visible';
    document.getElementById('wecker').style.display = 'block';
}

function wecker_invisible() {
    document.getElementById('wecker').style.visibility = 'hidden';
    document.getElementById('wecker').style.display = 'none';
}

//Stoppuhr
function stoppuhr() {
    stoppuhr_sekunden++;
    if(stoppuhr_sekunden % 59 == 0){
        stoppuhr_minuten = stoppuhr_minuten + (stoppuhr_sekunden / 59);
        stoppuhr_sekunden = 0;
    }
    if(stoppuhr_minuten % 59 == 0){
        stoppuhr_stunden = stoppuhr_stunden + (stoppuhr_minuten / 59);
        stoppuhr_minuten = 0;
    }

    document.getElementById('stoppuhr_display').innerText = stoppuhr_stunden + " d " + stoppuhr_minuten + " m " + stoppuhr_sekunden + " s ";
    if(stoppuhr_läuft) {
        var timeout = window.setTimeout('stoppuhr()', 1000);
    }
}

function stoppuhr_neustart() {
    stoppuhr_läuft = true;
    stoppuhr_sekunden = 0;
    stoppuhr_minuten = 0;
    stoppuhr_stunden = 0;

    stoppuhr();
}

function stoppuhr_weiter() {
    stoppuhr_läuft = true;
    stoppuhr();
}

function stoppuhr_stopp() {
    stoppuhr_läuft = false;
}

function stoppuhr_visible() {
    document.getElementById('stoppuhr').style.visibility = 'visible';
    document.getElementById('stoppuhr').style.display = 'block';
}

function stoppuhr_invisible() {
    document.getElementById('stoppuhr').style.visibility = 'hidden';
    document.getElementById('stoppuhr').style.display = 'none';
}


function timer() {
    if (timer_sekunden > 0 || timer_minuten > 0 || timer_stunden > 0 || timer_tage > 0) {
        if(timer_läuft) {
            if(timer_sekunden > 0) {
                timer_sekunden--;
            }
            if(timer_sekunden === 0) {
                if(timer_minuten > 0) {
                    timer_minuten--;
                    timer_sekunden = 59;
                }else if(timer_stunden > 0) {
                    timer_stunden--;
                    timer_minuten = 59;
                    timer_sekunden = 59;
                }else if(timer_stunden > 0) {
                    timer_stunden--;
                    timer_stunden = 59;
                    timer_minuten = 59;
                    timer_sekunden = 59;
                }
            }
        }
        document.getElementById('timer_display').innerText = timer_tage + 'd ' + timer_stunden + 'h ' + timer_minuten + 'm ' + timer_sekunden + 's ';
        var timeout = window.setTimeout('timer()', 1000);
    } else {
        document.getElementById('timer_display').innerText = 'ABGELAUFEN';
        timer_läuft = false;
    }
}

function timer_start() {
    timer_sekunden = document.getElementById('timer_input_sekunden').value;
    timer_minuten = document.getElementById('timer_input_minuten').value;
    timer_stunden = document.getElementById('timer_input_stunden').value;
    timer_tage = document.getElementById('timer_input_tage').value;

    if(document.getElementById('timer_input_sekunden').value == "") {
        timer_sekunden = 0;
    }
    if(document.getElementById('timer_input_minuten').value == "") {
        timer_minuten = 0;
    }
    if(document.getElementById('timer_input_stunden').value == "") {
        timer_stunden = 0;
    }
    if(document.getElementById('timer_input_tage').value == "") {
        timer_tage = 0;
    }
    timer_läuft = true;

    timer();
}

function timer_input_abbrechen() {
    document.getElementById('timer_input_sekunden').value = "";
    document.getElementById('timer_input_minuten').value = "";
    document.getElementById('timer_input_stunden').value = "";
    document.getElementById('timer_input_tage').value = "";

    timer_läuft = false;
}

function timer_visible() {
    document.getElementById('timer').style.visibility = 'visible';
    document.getElementById('timer').style.display = 'block';
}

function timer_invisible() {
    document.getElementById('timer').style.visibility = 'hidden';
    document.getElementById('timer').style.display = 'none';
}
