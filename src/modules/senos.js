const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json')))

exports.system_color = {
    r: config.appearance.color.r,
    b: config.appearance.color.b,
    g: config.appearance.color.g,
    a: config.appearance.color.a,
};

exports.animationLevel = parseInt(config.appearance.animationStrength);