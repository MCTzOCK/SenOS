let selectMonthDropDown;

let events = {

}

let currentYear = 2021;
let currentMonth = 0;

const fs = require('fs');
const path = require('path');

function load(){
    events = JSON.parse(fs.readFileSync(path.join(__dirname, 'events.json')));
}
function save(){
    fs.writeFileSync(path.join(__dirname, 'events.json'), JSON.stringify(events));
}


window.onload = function () {
    load();
    document.getElementById('yearInput').value = new Date().getFullYear();
    selectMonthDropDown = document.getElementById('selectMonthDropDrown')
    currentMonth = new Date().getMonth()
    drawMonth(new Date().getMonth(), 2021)
}

function drawMonth(){
    let months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'Semptember', 'Oktober', 'November', 'Dezember']
    document.getElementById('month').innerHTML = months[currentMonth];
    document.getElementById('year').innerText = currentYear;
    let tmpDate = new Date(currentYear, currentMonth, 0);
    let num = daysInMonth(currentMonth, currentYear);
    let dayOfWeek = tmpDate.getDay();
    let root = document.getElementById('days_f');
    root.innerText = '';
    let row1 = getEmptyRow();
    root.appendChild(row1);
    let currentRow = row1;
    let currentColCount = 0;
    for(let i = 0; i < dayOfWeek; i++){
        currentRow.appendChild(getEmptyCol())
        currentColCount++;
    }
    for(let i = 0; i < num; i++){
        if(currentColCount % 7 === 0 && currentColCount > 7){
            currentRow = getEmptyRow();
            root.appendChild(currentRow)
        }
        let b = false;
        Object.keys(events).forEach(entry => {
            if(new Date(entry).getMonth() === currentMonth && new Date(entry).getDate() === i + 1){
                b = true;
            }
        })
        currentRow.appendChild(getEmptyDayCol(i + 1, b))
        currentColCount++;
    }
}

function daysInMonth(month, year)
{
    let d = new Date(year, month+1, 0);
    return d.getDate();
}

function getEmptyRow(){
    let row = document.createElement('div');
    row.classList.add('row', 'seven-cols');
    return row;
}

function getEmptyCol(){
    let col = document.createElement('div');
    col.classList.add('col', 'col-md-1');
    return col;
}

function getEmptyDayCol(d, hasEvent){
    let day = document.createElement('div');
    day.classList.add('day', 'text', 'text-light')
    day.id = 'day-' + d;
    day.innerText = d;
    if(hasEvent){
        day.classList.add('text-danger')
        day.classList.remove('text-light')
    }
    let c = getEmptyCol();
    c.appendChild(day);
    c.setAttribute('onclick', 'showDayDetails(' + d + ')');
    c.style.cursor = 'pointer'
    return c;
}

function getMonthSelection(){
    let e = document.createElement('span');
    e.classList.add('bi', 'bi-chevron-down');
    e.id = "monthSelector";
    e.style.cursor = 'pointer'
    return e;
}

function showDayDetails(d){
    document.getElementById('dayDetailsTitle').innerText = new Date(currentYear, currentMonth, d).toLocaleDateString("de-de", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    document.getElementById('addEventFinal').setAttribute('onclick', 'addEvent(' + d + ')');
    drawEventList(d)
    new bootstrap.Modal(document.getElementById('dayDetails'), {}).toggle();
}

function addEvent(d){
    let time = document.getElementById('addEventTime').value;
    let event = document.getElementById('addEventEvent').value;
    let f = getDate(d);
    if(!events[f]){
        events[f] = []
    }
    events[f].push({time: time, description: event})
    drawEventList(d);
    drawMonth();
}

function drawEventList(d){
    save();
    load();
    document.getElementById('tableContent').innerHTML = ''
    let b = false;
    try {
        Object.keys(events).forEach(entry => {
            if (new Date(entry).getMonth() === currentMonth && new Date(entry).getDate() === d) {
                b = true;
            }
        })
    }catch {}
    if(b){
        let id = 1;
        let e = events[getDate(d)];
        document.getElementById('tableColActions').classList.remove('d-none')
        for(let i = 0; i < e.length; i++){
            let tr = document.createElement('tr');
            let th0 = document.createElement('th');
            let td0 = document.createElement('td');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            tr.id = "evnt_" + d + "_" + i
            th0.scope = 'row';
            th0.classList.add('text');
            th0.innerText = id.toString();
            td0.classList.add('text');
            td0.innerText = e[i].time;
            td1.classList.add('text');
            td1.innerText = e[i].description;
            td2.classList.add('text');

            let deleteBtn = document.createElement('button');
            let editBtn = document.createElement('button');
            editBtn.classList.add('btn', 'btn-primary', 'text');
            editBtn.innerText = 'Bearbeiten'
            deleteBtn.classList.add('btn', 'btn-danger', 'text');
            deleteBtn.innerText = 'Löschen'
            deleteBtn.setAttribute('onclick', 'confirmDelete("evnt_' + d + '_' + i + '", false)');
            editBtn.setAttribute('onclick', 'confirmEdit("evnt_' + d + '_' + i + '", false)');

            td2.appendChild(editBtn);
            td2.appendChild(deleteBtn);

            tr.appendChild(th0)
            tr.appendChild(td0)
            tr.appendChild(td1)
            tr.appendChild(td2)
            document.getElementById('tableContent').appendChild(tr)
            id++;
        }
    }else {
        let tr = document.createElement('tr');
        let th0 = document.createElement('th');
        let td0 = document.createElement('td');
        let td1 = document.createElement('td');
        th0.scope = 'row';
        th0.classList.add('text');
        th0.innerText = '0';
        td0.classList.add('text');
        td0.innerText = 'K/A';
        td1.classList.add('text');
        td1.innerText = 'Du hast noch keine Ereignisse!'
        tr.appendChild(th0)
        tr.appendChild(td0)
        tr.appendChild(td1)
        document.getElementById('tableContent').appendChild(tr)
        document.getElementById('tableColActions').classList.add('d-none')
    }
}

function confirmDelete(event, force){
    if(!force){
        document.getElementById('deleteConfirmConfirm').setAttribute('onclick', 'confirmDelete("' + event + '", true)');
        new bootstrap.Modal(document.getElementById('deleteConfirm'), {}).show();
    }else {
        events[getDate(event.split('_')[1])].splice(event.split('_')[2], 1)
        if(events[getDate(event.split('_')[1])].length === 0){
            delete events[getDate(event.split('_')[1])]
        }
        drawEventList(event.split('_')[1])
        drawMonth();
    }
}

function confirmEdit(event, force){
    if(!force){
        document.getElementById('editConfirm').setAttribute('onclick', 'confirmEdit("' + event + '", true)');
        new bootstrap.Modal(document.getElementById('edit'), {}).show();
    }else {
        events[getDate(event.split('_')[1])][event.split('_')[2]].time = document.getElementById('editEventTime').value
        events[getDate(event.split('_')[1])][event.split('_')[2]].description = document.getElementById('editEventEvent').value
        new bootstrap.Modal(document.getElementById('edit'), {}).hide();
        drawEventList(parseInt(event.split('_')[1]))
        drawMonth();
    }
}

function getDate(d){
    return new Date(currentYear, currentMonth, d).toDateString();
}