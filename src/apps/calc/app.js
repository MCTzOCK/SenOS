const { initAppearance } = require('../../modules/senos')

window.onload = function (){
    initAppearance();
    document.getElementById('challange').value = ''
    let sheepyOptions = {
        open: ['FIRST_START'],
        steps: [
            {
                title: "Einleitung",
                content: "In dieser Anwendung kannst du rechenen!"
            },
            {
                title: "Rechnen",
                content: "Zunächst musst du die zu lösende Aufgabe in den Taschenrechner eingeben, indem du auf die entsprechenden Knöpfe klickst. Zum ausrechnen genügt ein Klick auf den '=' Kopf!"
            }
        ]
    }
    sheepyInit(sheepyOptions);
}

function addChar(c){
    document.getElementById('challange').value = document.getElementById('challange').value + c
}

function calc() {
    document.getElementById('challange').value = eval(document.getElementById('challange').value)
}