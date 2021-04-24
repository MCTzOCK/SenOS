const fs            = require('fs');
const path          = require('path');

const words         = JSON.parse(fs.readFileSync(path.join(__dirname, "words.json")))

let cI              = 1;

const { initAppearance } = require('../../modules/senos')

initAppearance();

let sheepyOptions = {
    open: ['FIRST_START'],
    steps: [
        {
            title: "Einleitung",
            content: "Diese Anwendung soll dir dabei helfen die Abkürzungen von Kindern und Jugendlichen zu verstehen."
        },
        {
            title: "Suchen",
            content: "Du kannst nach einer Abkürzung oder einer Bedeutung suchen, indem du in das Textfeld oben klickst, deinen Suchebgriff eintippst und anschließend auf Suchen klickst oder mit der Entertaste bestätigst."
        }
    ]
}
sheepyInit(sheepyOptions)

words.words.forEach(entry => {
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    let td0 = document.createElement('td');
    let td1 = document.createElement('td');
    th.innerText = cI;
    th.id = entry.short + "-id";
    td0.id = entry.short + "-short";
    td1.id = entry.short + "-long";
    td0.innerText = entry.short;
    td1.innerText = entry.long;
    tr.appendChild(th);
    tr.appendChild(td0);
    tr.appendChild(td1);
    document.getElementById('wordList').appendChild(tr);
    cI++;
})

function search(){
    let term = document.getElementById('keywords').value;
    term = term.toLowerCase();
    let matching_words = [];
    words.words.forEach(entry => {
        if(entry.short.toLowerCase().includes(term) || entry.long.toLowerCase().includes(term)){
            matching_words.push(entry.short);
        }
    });
    document.getElementById('searchResultList').innerHTML = '';
    if(matching_words.length === 0){
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        let td0 = document.createElement('td');
        let td1 = document.createElement('td');
        th.innerText = "0";
        td0.innerText = "K/A";
        td1.innerText = "Es wurden keine Ergebnisse gefunden";
        tr.appendChild(th);
        tr.appendChild(td0);
        tr.appendChild(td1);
        document.getElementById('searchResultList').appendChild(tr);
    }else {
        for(let i = 0; i < matching_words.length; i++){
            let tr = document.createElement('tr');
            let th = document.createElement('th');
            let td0 = document.createElement('td');
            let td1 = document.createElement('td');
            th.innerText = document.getElementById(matching_words[i] + '-id').innerText;
            td0.innerText = document.getElementById(matching_words[i] + '-short').innerText;
            td1.innerText = document.getElementById(matching_words[i] + '-long').innerText;
            tr.appendChild(th);
            tr.appendChild(td0);
            tr.appendChild(td1);
            document.getElementById('searchResultList').appendChild(tr);
        }
    }
    let m = new bootstrap.Modal(document.getElementById('searchResults'), {});
    m.show();

    document.getElementById('keywords').value = '';
}

document.getElementById('search').addEventListener('keydown', (ev) => {
    if(ev.keyCode === 13){
        search();
    }
})