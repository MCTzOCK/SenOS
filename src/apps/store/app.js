const fs = require('fs');
const path = require('path');
const raw_data = fs.readFileSync(path.join(__dirname, './store.json'), 'utf-8');
const p = JSON.parse(raw_data);
const l = Object.keys(p._REG_APPS).length;
const raw_json = fs.readFileSync(path.join(__dirname, '../../apps.json'), 'utf-8');
const parse = JSON.parse(raw_json);
const http = require('http');
const zip = require('zlib');

// apps
let apps = [];

registerApp = function(name, value) {
    apps[apps.length] = new App(name, parse.reg_apps_cfg[value]['display'], parse.reg_apps_cfg[value]['version'], parse.reg_apps_cfg[value]['icon'], parse.reg_apps_cfg[value]['description'], parse.reg_apps_cfg[value]['uninstall'], parse.reg_apps_cfg[value]['desktop'], parse.reg_apps_cfg[value]['author']);
}

logApps = function() {
    console.log('Apps:')
    for(let i = 0; i < apps.length; i++)
    {
        console.log('---------------------------------------');
        console.log('Name: '          + apps[i].name);
        console.log('Display: '       + apps[i].display);
        console.log('Version: '       + apps[i].version);
        console.log('Author: '        + apps[i].author);
        console.log('Icon: '          + apps[i].icon);
        console.log('Description: '   + apps[i].description);
        console.log('Uninstall: '     + apps[i].uninstall);
        console.log('Desktop: '       + apps[i].desktop);
        console.log('---------------------------------------');
    }
}

getApps = function() {
    return apps;
}

isAppInstalled = function(name) {
    let b = false;
    for(let i = 0; i < apps.length; i++)
    {
        if(apps[i].name === name)
        {
            b = true;
            break;
        }
    }
    return b;
}

getAppByName = function(name) {
    for(let i = 0; i < apps.length; i++)
    {
        if(apps[i].name === name)
        {
            return apps[i];
        }
    }
    return false;
}
class App {
    constructor(name, display, version, icon, description, uninstall, desktop, author)
    {
        this.name = name;
        this.display = display;
        this.version = version;
        this.icon = icon;
        this.description = description;
        this.uninstall = uninstall;
        this.desktop = desktop;
        this.author = author;
    }
}

// register
for(let i = 0; i < Object.keys(parse.name).length; i++)
{
    // reg apps
    registerApp(parse['name'][i], i);
}

init = function()
{
    for(let i = 0; i < p.apps.length; i++)
    {   
        var btn_text = 'Installieren';
        let as = apps;
        for (let j = 0; j < as.length; j++) {
            const element = as[j];
            if(element.name == p.apps[i].name)
            {
                btn_text = 'Deinstallieren';
                if(!apps[j]['uninstall']) {
                    btn_text = 'Kann nicht deinstalliert werden';
                }
            }   
        }
        var cnt = `
        <div class="border">
            <div class="product-title">
                <center>
                    <h1>
                        ${p.apps[i].display}
                    </h1>
                </center>
                <p class="product-description">
                    ${p.apps[i]['description-short']}
                </p>
                <center>
                    <a href="javascript:install('${p.apps[i].name}', ${i}, '${btn_text}');" class="btn-get">${btn_text}</a>
                </center>
            </div>
        </div>`;
        document.write(cnt);
    }
}  

init();

install = function(name, value, btn_text) {
    if(btn_text === 'Installieren')
    {
        // instl
        const tmp = fs.createWriteStream("./tmp-dl.zip");
        console.log(p.apps[value].name);
        const request = http.get(p.apps[value].binaryDownload, function(response) { 
            response.pipe(tmp);
        });

    }else if(btn_text === 'Deinstallieren')
    {
        // uninstl
    }
}