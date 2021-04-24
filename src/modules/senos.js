const fs = require('fs');
const path = require('path');
let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json')))
let userConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../user.json')))

exports.system_color = {
    r: config.appearance.color.r,
    b: config.appearance.color.b,
    g: config.appearance.color.g,
    a: config.appearance.color.a,
};

exports.animationLevel = parseInt(config.appearance.animationStrength);

exports.initAppearance = function() {
    document.body.classList.add(config.appearance.backgroundClass);
}

exports.raw = config;

exports.saveConfig = function (){
    fs.writeFileSync(path.join(__dirname, '../config.json'), JSON.stringify(config));
}

exports.saveUserConfig = function (){
    fs.writeFileSync(path.join(__dirname, '../user.json'), JSON.stringify(userConfig));
}

exports.rawUser = userConfig;