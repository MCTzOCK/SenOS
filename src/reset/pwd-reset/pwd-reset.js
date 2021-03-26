const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../safety.json")));
const uConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "../../user.json")));
const correctAnswer = config['answer'];

document.getElementById("qu").innerText = config['question'];

function updatePwd(){
    let p = document.getElementById("pw").value;
    let p_ = document.getElementById("pw_").value;
    let a = document.getElementById("an").value;
    let errorDi = new bootstrap.Modal(document.getElementById("errorDialog"), {});
    let successDi = new bootstrap.Modal(document.getElementById("successDialog"), {});
    if(p == p_){
        if(a == correctAnswer){
            uConfig['password'] = stringToHash(p);
            fs.writeFileSync(path.join(__dirname, "../../user.json"), JSON.stringify(uConfig));
            successDi.show();
        }else {
            errorDi.show();
        }
    }else {
        errorDi.show();
    }
}

function stringToHash(string) {
    var hash = 0;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}
