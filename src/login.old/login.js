const fs = require('fs');
const path = require('path');
const account_r = fs.readFileSync(path.join(__dirname, '../user.json'));
const account = JSON.parse(account_r);
let showed = false;

init = function() {
    document.getElementById('u_name').innerHTML = document.getElementById('u_name').innerHTML.replace('{user.name}', account.name);
}
login = function() {
    var password = account.password;
    if(password === document.getElementById('pwd').value) {
        window.location.assign('../index.html')
    }else {
        document.getElementById('err').style.visibility = 'visible'
    }
}
show = function() {
    if(showed) {
        document.getElementById('pwd').type = 'password'
        document.getElementById('show_pwd_btn').innerText = 'Password anzeigen'
        showed = false;
    }else {
        document.getElementById('pwd').type = 'text'
        document.getElementById('show_pwd_btn').innerText = 'Password verstecken'
        showed = true;
    }
}

resetPassword = function() {
    
}