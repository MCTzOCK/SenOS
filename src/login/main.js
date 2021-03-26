const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../user.json")))

document.getElementById("sen_replace_user_name").value = document.getElementById("sen_replace_user_name").value.replace("${sen.replace.user.name}", config['name'])

function checkPwd(){
    let pw_ = stringToHash(document.getElementById("pw_").value);
    let errorDi = new bootstrap.Modal(document.getElementById("errorDialog"), {})
    if(pw_ == config['password']){
        window.location.assign("../index.html")
    }else {
        errorDi.show();
    }
}

function stringToHash(string) {
    let hash = 0;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}
