window.parent = null;
window.history = null;
parent = null;
history = null;
if(window.location.href.startsWith("chrome-error://")){
    let e = document.createElement("div");
    let c = document.createElement("center");
    c.style.fontSize = "larger";
    c.style.fontFamily = "sans-serif";
    let title = document.createElement("h1");
    title.style.color = "darkred";
    let descr = document.createElement("h3");
    title.innerText = "Es ist Fehler aufgetreten!";
    descr.innerText = "Auf der Website ist ein Fehler aufgetreten und sie ist abgestürtzt! Versuche es später erneut!";
    c.appendChild(title);
    c.appendChild(document.createElement("br"));
    c.appendChild(descr);
    e.appendChild(c);
    document.write(e.innerHTML);
}