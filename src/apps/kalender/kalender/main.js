// modules
const { log } = require('console');
const fs = require('fs');
const path = require('path')
// fs.writeFileSync('./event1.json', '123');
let config = JSON.parse(fs.readFileSync(path.join(__dirname, 'events.json')));
const content = document.getElementById('content');

let disable_click = false;

// days 
{
    var weekday = new Array(7);
    weekday[0] = "Sonntag";
    weekday[1] = "Montag";
    weekday[2] = "Dienstag";
    weekday[3] = "Mittwoch";
    weekday[4] = "Donnerstag";
    weekday[5] = "Freitag";
    weekday[6] = "Samstag";

    var months_en = new Array(12);
    months_en[0] = 'January';
    months_en[1] = 'February';
    months_en[2] = 'March';
    months_en[3] = 'April';
    months_en[4] = 'May';
    months_en[5] = 'June';
    months_en[6] = 'July';
    months_en[7] = 'August';
    months_en[8] = 'September';
    months_en[9] = 'October';
    months_en[10] = 'November';
    months_en[11] = 'December';

    var months_de = new Array(12);
    months_de[0] = 'Januar';
    months_de[1] = 'Februar';
    months_de[2] = 'März';
    months_de[3] = 'April';
    months_de[4] = 'Mai';
    months_de[5] = 'Juni';
    months_de[6] = 'Juli';
    months_de[7] = 'August';
    months_de[8] = 'September';
    months_de[9] = 'Oktober';
    months_de[10] = 'November';
    months_de[11] = 'Dezember';
}

var i = 1;
var tage = 1;
var AnzahlTage = 1;

create();

function create(){
    for(var i1 = 1; i1 <= 4; i1++){
        for(var i2 = 1; i2 <= 3; i2++){
            let ButtonMonate = document.createElement('a');
            ButtonMonate.className = "ButtonMonate";
            ButtonMonate.text = i.toString();
            ButtonMonate.style.top = (i1 * 17).toString() + "%";
            ButtonMonate.style.left = (i2 * 21.5).toString() + "%";
            document.getElementById("content").appendChild(ButtonMonate);

            let Monate = document.createElement('a');
            Monate.className = "Monate";
            switch(i){
                case 1:
                    Monate.text = "Januar";
                    AnzahlTage = 31;
                    break;
                
                case 2:
                    Monate.text = "Februar";
                    AnzahlTage = 28;
                    break;

                case 3:
                    Monate.text = "März";
                    AnzahlTage = 31;
                    break;

                case 4:
                    Monate.text = "April";
                    AnzahlTage = 30;
                    break;
                        
                case 5:
                    Monate.text = "Mai";
                    AnzahlTage = 31;
                    break;

                case 6:
                    Monate.text = "Juni";
                    AnzahlTage = 30;
                    break;
                
                case 7:
                    Monate.text = "Juli";
                    AnzahlTage = 31;
                    break;

                case 8:
                    Monate.text = "August";
                    AnzahlTage = 31;
                    break;

                case 9:
                    Monate.text = "September";
                    AnzahlTage = 30;
                    break;
                        
                case 10:
                    Monate.text = "Oktober";
                    AnzahlTage = 31;
                    break;

                case 11:
                    Monate.text = "November";
                    AnzahlTage = 30;
                    break;

                case 12:
                    Monate.text = "Dezember";
                    AnzahlTage = 31;
                    break;
            }
            i++;
            Monate.style.top = (i1 * 17).toString() + "%";
            Monate.style.left = ((i2 * 21.5) + 5).toString() + "%";
            document.getElementById("content").appendChild(Monate);

            for(var i3 = 1; i3 <= 5; i3++){
                for(var i4 = 0; i4 < 7; i4++){
                    let ButtonTage = document.createElement('a');
                    ButtonTage.className = "ButtonTage";
                    ButtonTage.text = tage.toString();
                    ButtonTage.href = "javascript:click_day(" + (i - 1) + ", " + tage + ")";
                    ButtonTage.style.top = ((i1 * 17) + (i3 * 2.3) + 0.5).toString() + "%";
                    ButtonTage.style.left = ((i2 * 21.5) + (i4 * 2.3) + 0.2).toString() + "%";
                    document.getElementById("content").appendChild(ButtonTage);
                    
                    if(AnzahlTage == tage){
                        break;
                    }
                    tage++;
                }
            }
            tage = 1;
        }
    }
}

function click_day(month, day){
    if(document.getElementById('popup').style.visibility === 'visible'){
        document.getElementById('popup').style.visibility = 'hidden';
        document.getElementById('popup').style.display = 'none';
        disable_click = false;
    }else {
        document.getElementById('popup').style.visibility = 'visible';
        document.getElementById('popup').style.display = 'block';
        document.getElementById('popup_title').innerText = day + "." + month + ".2020";
        let d = months_en[month - 1] + ' ' + day + ', 2020';
        var date = new Date(d);
        document.getElementById('popup_meta_week_day').innerText = weekday[date.getDay()] + ", " + day + ". " + months_de[month - 1] + ", 2020";
        disable_click = true;
    }
}

// events
{
    function reloadEvents(){
        config = JSON.parse(fs.readFileSync(path.join(__dirname, 'events.json')));
        console.log('[KALENDER] Reloaded Event config.')
    }
    
    function saveEvent(name, month, day, time, notes){
    }
    
    function deleteEvent(name, month, day, time){
        config[month][day][time] = {};
        saveConfig();
    }
    
    function saveConfig(){
        fs.writeFileSync(path.join(__dirname, 'events.json'), JSON.stringify(config));
        console.log('[KALENDER] Saved Event config.')
    }
}

// listeners
{
    document.getElementById('content').addEventListener('click', (e) => {
        if(disable_click){
            e.preventDefault();
        }
    });
    
    document.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 229) {
          return;
        }
        if(event.key === 'Escape'){
            document.getElementById('popup').style.visibility = 'hidden';
            document.getElementById('popup').style.display = 'none';
            disable_click = false;
        }
        if(event.key === 's' && event.ctrlKey){
            saveConfig();
        }
    });
    
    function esc(){
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                keyCode: 27
            })
        )
    }
    
}

function changeDivToCreate() {
    document.getElementById('div_create').visibility = false;
    document.getElementById('div_create').display = 'none';
}