const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../user.json")))

document.getElementById("sen_replace_user_name").value = document.getElementById("sen_replace_user_name").value.replace("${sen.replace.user.name}", config['name'])

function checkPwd(){
    let pw_ = document.getElementById("pw_").value;
    let errorDi = new bootstrap.Modal(document.getElementById("errorDialog"), {})
    if(pw_ == config['password']){
        window.location.assign("../index.html")
    }else {
        errorDi.show();
    }
}