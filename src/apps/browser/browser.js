let plScript = document.createElement('script');
plScript.src = 'https://cdn.senos.xyz/preload.js'

let engines = {};
let bookmarks = {
    bookmarks: []
};

const fs = require('fs');
const path = require('path');

engines = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/engines.json')))
bookmarks = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/marks.json')))

let urls = [];
let currentIndex = 1;
let save = true;

window.onload = function (){
    document.getElementById('content').contentWindow.window.location.assign(engines.engines[engines.current].home);
    document.getElementById('searchForm').addEventListener('keydown', (ev) => {
        if(ev.keyCode === 13){
            openURL();
        }
    })
    Object.keys(engines.engines).forEach(entry => {
        console.error(entry);
        let btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary')
        btn.setAttribute('onclick', 'selectSearchEngine("' + entry + '")');
        btn.innerText = entry;
        document.getElementById('searchEngineSelector').appendChild(btn);
    })
}

function p(){
    document.getElementById('content').contentWindow.window.parent = null
    document.getElementById('content').contentWindow.require = null
    document.getElementById('url').value = document.getElementById('content').contentWindow.window.location.href;
    if(save){
        currentIndex++;
        urls[currentIndex] = document.getElementById('content').contentWindow.location.href;
    }else {
        save = true;
    }
    if(window.frames[0].window.location.href === 'chrome-error://chromewebdata/'){
        document.getElementById("url").value = "Ein Fehler ist aufgetreten"
    }else {
        document.getElementById("url").value = document.getElementById('content').contentWindow.location.href;
    }
}

function openURL(){
    let u = document.getElementById('url').value;
    if(u.startsWith('http://') || u.startsWith('https://')){
        openURL0(u);
    }else {
        u = engines.engines[engines.current].search.replace('%s', u);
        openURL0(u)
    }
}

function openURL0(u){
    document.getElementById('content').setAttribute('src', u)
}

function f(){
    let c = currentIndex;
    if(urls[c] !== undefined){
        content.setAttribute('src', urls[c])
        save = false;
    }
}

function b(){
    let c = currentIndex - 1;
    if(urls[c] !== undefined){
        content.setAttribute('src', urls[c])
        save = false;
    }
}

function addCurrentPageToBookmarks(){
    if(!bookmarks.bookmarks.includes(document.getElementById('url').value)){
        bookmarks.bookmarks.push(document.getElementById('url').value);
        fs.writeFileSync(path.join(__dirname, 'config/marks.json'), JSON.stringify(bookmarks));
    }
    new bootstrap.Modal(document.getElementById('popup_saved'), {}).show();
}

function showBookmarks(){
    document.getElementById('marks').innerHTML = '';
    for(let i = 0; i < bookmarks.bookmarks.length; i++){
        let li = document.createElement('li');
        li.innerText = bookmarks.bookmarks[i];
        li.classList.add('text-primary')
        li.style.cursor = 'pointer';
        li.setAttribute('onclick', 'openURL0("' + bookmarks.bookmarks[i] + '")')
        li.setAttribute('data-bs-dismiss', 'modal')
        let delBtn = document.createElement('button');
        delBtn.innerText = 'Löschen'
        delBtn.classList.add('btn', 'btn-danger')
        delBtn.setAttribute('data-bs-dismiss', 'modal');
        delBtn.setAttribute('onclick', 'delBookmark("' + bookmarks.bookmarks[i] + '", false)');
        li.appendChild(delBtn);
        document.getElementById('marks').appendChild(li)
    }
    if(bookmarks.bookmarks.length === 0){
        let noMarks = document.createElement('p');
        noMarks.innerText = "Du hast noch keine Lesezeichen erstellt!"
        noMarks.classList.add('text-danger')
        document.getElementById('marks').appendChild(noMarks)
    }
    new bootstrap.Modal(document.getElementById('popup_marks'), {}).show();
}

function showSettings(){
    new bootstrap.Modal(document.getElementById('popup_settings'), {}).show();
}

function selectSearchEngine(engine){
    engines.current = engine;
    fs.writeFileSync(path.join(__dirname, 'config/engines.json'), JSON.stringify(engines));
    new bootstrap.Modal(document.getElementById('popup_settings'), {}).hide();
    new bootstrap.Modal(document.getElementById('popup_settings_saved'), {}).show();
}

function delBookmark(url, force){
    if(!force){
        document.getElementById('deleteConfirmBtn').setAttribute('onclick', 'delBookmark("' + url + '", true)')
        new bootstrap.Modal(document.getElementById('popup_delete_confirm'), {}).show();
    }else {
        bookmarks.bookmarks.splice(bookmarks.bookmarks.indexOf(url), 1);
        fs.writeFileSync(path.join(__dirname, 'config/marks.json'), JSON.stringify(bookmarks));
        showBookmarks();
    }
}