const fs = require('fs');
const path = require('path');

let step = 1;
const max = 6;
const accountSec = 4;
let enablePasswordSection = false;

next_step = function(){
    step++;
    // verify input
    if((step - 1) === accountSec){
        let e = false;
        
        if(document.getElementById('accountName').value === '') {
            e = true;
        }
        // check pwd
        if(document.getElementById('wantPasswordEnabled').checked){
            const password = document.getElementById('password').value;
            const passwordVerify = document.getElementById('passwordVerify').value;
            if(password != passwordVerify) {
                document.getElementById('error').innerText = 'Entweder die Passwörter stimmen nicht überein, oder du hast keinen Namen angegeben!'
                e = true;
            }
        }
        if(e) {
            document.getElementById('error').classList.remove('notVisible');
            step--;
        }
    }else {
        document.getElementById('error').classList.add('notVisible');
    }
    document.getElementById('sec' + step).style.visibility = 'visible';
    document.getElementById('sec' + step).style.display = 'block';
    document.getElementById('sec' + (step - 1)).style.visibility = 'hidden';
    document.getElementById('sec' + (step - 1)).style.display = 'none';

    document.getElementById('sec' + (step) + '_mBarSec').classList.remove('noActive');
    document.getElementById('sec' + (step) + '_mBarSec').classList.add('active');
    document.getElementById('sec' + (step - 1) + '_mBarSec').classList.remove('active');
    document.getElementById('sec' + (step - 1) + '_mBarSec').classList.add('noActive');
    if(step > 1) {
        document.getElementById('backButton').classList.remove('notVisible');
    }
    if(step === max){
        document.getElementById('continueButtonA').innerText = "Abschließen";
        document.getElementById('continueButtonA').href = "javascript:finish();";
    }
}

last_step = function(){
    step--;
    document.getElementById('sec' + step).style.visibility = 'visible';
    document.getElementById('sec' + step).style.display = 'block';
    document.getElementById('sec' + (step + 1)).style.visibility = 'hidden';
    document.getElementById('sec' + (step + 1)).style.display = 'none';

    document.getElementById('sec' + (step) + '_mBarSec').classList.remove('noActive');
    document.getElementById('sec' + (step) + '_mBarSec').classList.add('active');
    document.getElementById('sec' + (step + 1) + '_mBarSec').classList.remove('active');
    document.getElementById('sec' + (step + 1) + '_mBarSec').classList.add('noActive');
    if(step === 1) {
        document.getElementById('backButton').classList.add('notVisible');
    }

    document.getElementById('continueButtonA').innerText = "Nächster Schritt ->";
    document.getElementById('continueButtonA').href = "javascript:next_step();";
}

checkboxChange_password = function(){
    if(enablePasswordSection){
        enablePasswordSection = false;
        document.getElementById('pwdHidden').classList.add('notVisible');
    }else {
        enablePasswordSection = true;
        document.getElementById('pwdHidden').classList.remove('notVisible');
    }
}

finish = function(){
    document.getElementById('please_wait_to_complete').classList.remove('notVisible');
    document.getElementById('continueButton').classList.add('notVisible');
    document.getElementById('backButton').classList.add('notVisible');
    const uConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../user.json')));
    const sConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json')));
    const privacy_accept = document.getElementById('privacy_accept').checked;
    const accountName = document.getElementById('accountName').value;
    const use_password = document.getElementById('wantPasswordEnabled').checked;
    const password = document.getElementById('password').value;
    const passwordVerify = document.getElementById('passwordVerify').value;
    
    if(use_password){
        uConfig.password = password;
        uConfig.enabled = true;
    }
    uConfig.name = accountName;

    sConfig.privacy.crashResports.send = privacy_accept;
    fs.writeFileSync(path.join(__dirname, '../config.json'), JSON.stringify(sConfig))
    fs.writeFileSync(path.join(__dirname, '../user.json'), JSON.stringify(uConfig))

    fs.writeFileSync('INSTALLED', 'Welcome! This is an internal config file. If you want to delete all data and install senos again, just delete this file! ATTENTION: There is no way to get the old data back!');
    const {ipcRenderer} = require('electron');
    ipcRenderer.send('relaunch');
}