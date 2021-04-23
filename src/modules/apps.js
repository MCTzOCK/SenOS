const fs = require('fs');
const path = require('path');

let apps = [];

(function() {
    loadApps()
})();

function loadApps(){
    let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../apps.json'), 'utf-8'));
    for(let i = 0; i < config.apps.length; i++){
        apps.push(config.apps[i]);
    }
}

function getApps() {
    return apps;
}

function getAppByName(name){
    apps.forEach(entry => {
        if(entry.name === name){
            return entry;
        }
    })
    return null;
}

module.exports = {getApps, getAppByName, openApp}