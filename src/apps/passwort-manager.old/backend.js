const fs = require('fs');
const path = require('path');
let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'passwords.json')));

function reloadData(){
    data = JSON.parse(fs.readFileSync(path.join(__dirname, 'passwords.json')));
}

function saveData(apps, passwörter){
    data = {};
    for(let i = 0; i < apps.length; i++){
        let a = apps[i];
        a = a.replace('app_', '');
        data[a] = passwörter[i];
    }
    fs.writeFileSync(path.join(__dirname, 'passwords.json'), JSON.stringify(data));
    console.log('2')
}

function initUI() {
    for(let i = 0; i < Object.keys(data).length; i++){
        new_password(data[Object.keys(data)[i]], Object.keys(data)[i]);
    }
}

function gen() {
    // new_password_input_password
    let allowedChars = '';
    allowedChars+='@#$%!&?+-:,.;=§';
    allowedChars+='123456789';
    allowedChars+='abcdefghijklmnopqrstuvwxyz';
    allowedChars+='abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    var result           = '';
    var charactersLength = allowedChars.length;
    for ( var i = 0; i < 16; i++ ) {
        result += allowedChars.charAt(Math.floor(Math.random() * charactersLength));
    }
    document.getElementById('new_password_input_password').value = result;
}