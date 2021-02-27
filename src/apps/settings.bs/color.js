let blood_red = {
    r: 215,
    g: 10,
    b: 18,
    a: 1
}
let ocean_blue = {
    r: 10,
    g: 93,
    b: 215,
    a: 1
}
let grass_green = {
    r: 66,
    g: 215,
    b: 10,
    a: 1
}
let sun_yellow = {
    r: 232,
    g: 247,
    b: 1,
    a: 1
}
const fs = require('fs');
const path = require('path');
const successModal = new bootstrap.Modal(document.getElementById("successDialog"), {})
let config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config.json")))


function setColor(name){
    if(name === 'red'){
        config['appearance']['color'] = blood_red;
    }
    if(name === 'blue'){
        config['appearance']['color'] = ocean_blue;
    }
    if(name === 'green'){
        config['appearance']['color'] = grass_green;
    }
    if(name === 'yellow'){
        config['appearance']['color'] = sun_yellow;
    }
    fs.writeFileSync(path.join(__dirname, "../../config.json"), JSON.stringify(config))
    successModal.show();
}