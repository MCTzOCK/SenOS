const path = require('path');
const fs = require('fs');

const content = document.getElementById('content');
const iframe = document.querySelector('iframe');
let current_session_history = {url: []}
let urls = [];
let currentIndex = -1;
let save = true;
let engines = JSON.parse(fs.readFileSync(path.join(__dirname, "config/engines.json")));
let bookmarks = JSON.parse(fs.readFileSync(path.join(__dirname, "config/bookmarks.json")));

document.getElementById("content").src = engines.searchEngines[engines.searchEngine].startPage;

function search(){
    let url = document.getElementById("url-input").value;
    let finalUrl = "";
    if(url.startsWith("https://") || url.startsWith("http://")){
        finalUrl = url;
    }else {
        finalUrl = engines.searchEngines[engines.searchEngine].searchUrl.replace("%s", url);
    }
    document.getElementById("content").src = finalUrl;
}

function goBack(){
    console.log(document.getElementById("content").history)
    // document.getElementById("content").window.history.back();
    // window.frames[0].window.history.back();
    let c = currentIndex - 1;
    console.log(c);
    if(urls[c] !== undefined){
        content.setAttribute('src', urls[c])
        save = false;
    }
}

function goForward(){
    // document.getElementById("content").contentWindow.history.forward();
    let c = currentIndex;
    console.log(c);
    if(urls[c] !== undefined){
        content.setAttribute('src', urls[c])
        save = false;
    }
}

function initFrame(frame){
    let saveScript = document.createElement("script");
    saveScript.innerText = fs.readFileSync(path.join(__dirname, "preload.js"));
    window.frames[0].document.getElementsByTagName("head")[0].appendChild(saveScript);
}

document.querySelector("iframe[id='content']").addEventListener("load", function (){
    if(save){
        // current_session_history.url.push(this.contentWindow.location.href);
        currentIndex++;
        urls[currentIndex] = this.contentWindow.location.href;
        console.log(urls);
    }else {
        save = true;
    }
    if(window.frames[0].window.location.href === 'chrome-error://chromewebdata/'){
        document.getElementById("url-input").value = "Ein Fehler ist aufgetreten"
    }else {
        document.getElementById("url-input").value = this.contentWindow.location.href;
    }
})

document.getElementById("url-input").addEventListener("keydown",(event) => {
    if(event.keyCode === 13) {
        search();
    }
})

function toggleSettings(){
    if(document.getElementById('popup_settings').style.display === 'block'){
        document.getElementById('popup_settings').style.display = 'none';
    }else {
        document.getElementById('popup_settings').style.display = 'block';
    }
}

function updateSearchEngine(){
    let sel = document.getElementById("search_engine_sel");
    engines.searchEngine = sel.options[sel.selectedIndex].value;
    fs.writeFileSync(path.join(__dirname, "config/engines.json"), JSON.stringify(engines))
}

function toggleBookmarks(){
    if(document.getElementById('popup_bookmarks').style.display === 'block'){
        document.getElementById('popup_bookmarks').style.display = 'none';
    }else {
        document.getElementById('bookmarks').innerHTML = '';
        for(let i = 0; i < bookmarks.bookmarks.length; i++){
            let a = document.createElement("a");
            let br = document.createElement("br");
            let br0 = document.createElement("br");
            a.classList.add('txt');
            a.innerText = bookmarks.bookmarks[i];
            a.href = "javascript:navigate('" + bookmarks.bookmarks[i] + "')";
            document.getElementById('bookmarks').appendChild(a);
            document.getElementById('bookmarks').appendChild(br);
            document.getElementById('bookmarks').appendChild(br0);
        }
        document.getElementById('popup_bookmarks').style.display = 'block';
    }
}

function navigate(url){
    document.getElementById("content").src = url;
}

function addCurrentPageToBookmarks(){
    bookmarks.bookmarks.push(document.getElementById('url-input').value);
    fs.writeFileSync(path.join(__dirname, 'config/bookmarks.json'), JSON.stringify(bookmarks));
}