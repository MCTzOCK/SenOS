const content = document.getElementById('content');
const iframe = document.querySelector('iframe');
let urls = [];
let currentIndex = -1;
let save = true;

function search(){
    let url = document.getElementById('url-input').value;
    document.getElementById('content').src = url;
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

function checkSource(src){
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
    console.log("[BROWSER] Loadet " + src);
}

document.querySelector("iframe[id='content']").addEventListener("load", function (){
    if(save){
        currentIndex++;
        urls[currentIndex] = this.contentWindow.location.href;
        console.log(urls);
    }else {
        save = true;
    }
    document.getElementById("url-input").value = this.contentWindow.location.href;
})

window.onerror = function(){
    console.log('error!')
}