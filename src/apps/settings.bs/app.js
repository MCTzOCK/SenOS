const fs = require('fs');
const path = require('path')
const senos = require('../../modules/senos')

let currentMenu = '';

window.onload = function (){
    senos.initAppearance();
    $('span.dot').tooltip();
    document.getElementById('pwd-prot-enabled').checked = senos.rawUser.enabled;
    let a=['Keine','Normal','Viele'];
    document.getElementById('animationStrengthRange').value = parseInt(senos.raw.appearance.animationStrength);
    document.querySelector('#animationStrengthRangeOutput').value = a[parseInt(senos.raw.appearance.animationStrength)];

    document.getElementById('currentUserName').value = senos.rawUser.name;
    document.getElementById('senos-version').innerText = senos.raw.system.version;
}

function returnToMain() {
    if(currentMenu !== ''){
        document.getElementById('menu_' + currentMenu).classList.add('d-none');
        document.getElementById('main_menu').classList.remove('d-none');
        currentMenu = '';
    }
}

function switchMenu(new_menu){
    document.getElementById('main_menu').classList.add('d-none');
    document.getElementById('menu_' + new_menu).classList.remove('d-none');
    currentMenu = new_menu;
}

function setSystemColor(color){
    senos.raw.appearance.backgroundClass = 'bg-' + color;
    senos.saveConfig();
    new bootstrap.Modal(document.getElementById('modalRestart'), {}).show()
}

function setAppColor(color){
    senos.raw.appearance.iconBackgroundClass = 'bg-' + color;
    senos.saveConfig();
    new bootstrap.Modal(document.getElementById('modalRestart'), {}).show()
}

function changePasswordProperty(value){
    senos.rawUser.enabled = value;
    senos.saveUserConfig();
    new bootstrap.Modal(document.getElementById('modalRestart'), {}).show()
}

function saveUserName(){
    senos.rawUser.name = document.getElementById('newUserName').value;
    senos.saveUserConfig();
    new bootstrap.Modal(document.getElementById('modalRestart'), {}).show()
}