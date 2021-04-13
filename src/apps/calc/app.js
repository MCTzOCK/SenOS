window.onload = function (){
    document.getElementById('challange').value = ''
}

function addChar(c){
    document.getElementById('challange').value = document.getElementById('challange').value + c
}

function calc() {
    document.getElementById('challange').value = eval(document.getElementById('challange').value)
}