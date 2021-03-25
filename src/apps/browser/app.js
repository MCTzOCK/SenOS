const path = require('path');
const fs = require('fs');

const content = document.getElementById('content');
const iframe = document.querySelector('iframe');
let urls = [];
let currentIndex = -1;
let save = true;
const defaultSearchEngineUrl = "https://bing.com/search?q=%s";

function search(){
    let url = document.getElementById("url-input").value;
    let finalUrl = "";
    if(url.startsWith("https://") || url.startsWith("http://")){
        finalUrl = url;
    }else {
        finalUrl = defaultSearchEngineUrl.replace("%s", url);
    }
    document.getElementById("content").src = finalUrl;
    /*
    let url = document.getElementById('url-input').value;
    document.getElementById('content').src = url;
     */
}
function goBack(){
    let c = currentIndex - 1;
    console.log(c);
    if(urls[c] !== undefined){
        content.setAttribute('src', urls[c])
        save = false;
    }
}

function goForward(){
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
    // frame.contentWindow.getDocument.getElementsByTagName("head")[0].prepend(saveScript);
    /*
    console.log(src);
    var sE = document.createElement("script");
    sE.src = "http://cloud.mctzock.de/senos/default/browser/browser.js";
    // document.getElementsByTagName("body").item(0).appendChild(sE);
    if(!src.startsWith('https://') && !src.startsWith('file:///')){
        iframe.src = "./error/SSL-CERTIFICATE-ERROR-V1.html";
        // iframe.setAttribute('sandbox', 'allow-forms allow-scripts');
    }else{
        document.getElementById('url-input').value = src;
        // iframe.setAttribute('sandbox', 'allow-forms');
    }
    console.log("[BROWSER] Loadet " + src*/
}

document.querySelector("iframe[id='content']").addEventListener("load", function (){
    if(save){
        currentIndex++;
        urls[currentIndex] = this.contentWindow.location.href;
        console.log(urls);
    }else {
        save = true;
    }
    if(window.frames[0].window.location.href === 'chrome-error://chromewebdata/'){
        document.getElementById("url-input").value ="Ein Fehler ist aufgetreten"
    }else {
        document.getElementById("url-input").value = this.contentWindow.location.href;
    }
})

window.onerror = function(){
    console.log('error!')
}

document.getElementById("url-input").addEventListener("keydown",(event) => {
    if(event.keyCode === 13) {
        search();
    }
})