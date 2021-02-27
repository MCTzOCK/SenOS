const fs = require('fs');
const path = require('path');

let apps = [];

exports.registerApp = function(name, value) {
    let raw_json = fs.readFileSync(path.join(__dirname, '../apps.json'), 'utf-8');
    let parse = JSON.parse(raw_json);
    apps[apps.length] = new App(name, parse.reg_apps_cfg[value]['display'], parse.reg_apps_cfg[value]['version'], parse.reg_apps_cfg[value]['icon'], parse.reg_apps_cfg[value]['description'], parse.reg_apps_cfg[value]['uninstall'], parse.reg_apps_cfg[value]['desktop'], parse.reg_apps_cfg[value]['author'], parse.reg_apps_cfg[value]['taskbar']);
}

exports.logApps = function() {
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
        console.log('Taskbar: '       + apps[i].taskbar);
        console.log('---------------------------------------');
    }
}

exports.getApps = function() {
    return apps;
}

exports.isAppInstalled = function(name) {
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
    constructor(name, display, version, icon, description, uninstall, desktop, author, taskbar)
    {
        this.name = name;
        this.display = display;
        this.version = version;
        this.icon = icon;
        this.description = description;
        this.uninstall = uninstall;
        this.desktop = desktop;
        this.author = author;
        this.taskbar = taskbar;
    }
}