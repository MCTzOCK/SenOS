const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../user.json')))
const pwd_active = config['enabled'];
const user_name = config['name'];

const { initAppearance } = require('../../modules/senos')

initAppearance();

function showSettingsPage(name){
    window.location.assign("settings_" + name + ".html");
}

function setPlaceHolders() {
    if(pwd_active){
        document.getElementById("sen_replace_pwd_active").innerText = "Ja";
        document.getElementById("sen_replace_pwd_active").className = "text-success";
        document.getElementById("sen_replace_pwd_active_negate").innerText = "Deaktivieren";
    }
    else {
        document.getElementById("sen_replace_pwd_active").innerText = "Nein";
        document.getElementById("sen_replace_pwd_active").className = "text-danger";
        document.getElementById("sen_replace_pwd_active_negate").innerText = "Aktivieren";
    }
}

function updatePassword(){
    let p_ = document.getElementById("pwd_").value
    let p_new = document.getElementById("pwd_new").value
    let errorModal = new bootstrap.Modal(document.getElementById('errorDialog'), {})
    let successModal = new bootstrap.Modal(document.getElementById("successDialog"), {})
    if(p_ == config['password']){
        if(p_ === p_new){
            if(pwd_active){
                config['enabled'] = false;
                document.getElementById("sen_mod_replace_pwd_active").innerText = "deaktivert";
                document.getElementById("sen_mod_replace_pwd_active").className = 'text-danger';
            }else {
                config['enabled'] = true;
                document.getElementById("sen_mod_replace_pwd_active").innerText = "aktiviert";
                document.getElementById("sen_mod_replace_pwd_active").className = 'text-success';
            }
            fs.writeFileSync(path.join(__dirname, "../../user.json"), JSON.stringify(config));
            successModal.show();
        }else {
            console.log(p_)
            console.log(p_new)
            errorModal.show();
        }
    }else {
        if(!pwd_active){
            if(p_ === p_new){
                config['enabled'] = true;
                config['password'] = p_;
                document.getElementById("sen_mod_replace_pwd_active").innerText = "aktiviert";
                document.getElementById("sen_mod_replace_pwd_active").className = 'text-success';
                fs.writeFileSync(path.join(__dirname, "../../user.json"), JSON.stringify(config));
                successModal.show();
            }else {
                console.log(p_)
                console.log(p_new)
                errorModal.show();
            }
        }else {
            errorModal.show();
        }
    }
}

function resetPwd(){
    window.parent.location.assign(path.join(__dirname, "../../reset/pwd-reset/pwd-reset.html"))
}