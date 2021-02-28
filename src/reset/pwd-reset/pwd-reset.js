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
            uConfig['password'] = p;
            fs.writeFileSync(path.join(__dirname, "../../user.json"), JSON.stringify(uConfig));
            successDi.show();
        }else {
            errorDi.show();
        }
    }else {
        errorDi.show();
    }
}