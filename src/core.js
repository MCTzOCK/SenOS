const ipc = require('electron').ipcRenderer;
const path = require('path');
const explorer = require(path.join(__dirname, './modules/explorer.js'));
const windows = require(path.join(__dirname, './modules/window.js'))
const senos = require(path.join(__dirname, './modules/senos.js'));

const fs                = require('fs');
const raw_app_cfg       = fs.readFileSync(path.join(__dirname, './apps.json'), 'utf-8');
const app_cfg           = JSON.parse(raw_app_cfg);
const reg_apps_lengt    = Object.keys(app_cfg.name).length;
const raw_lan_cfg       = fs.readFileSync(path.join(__dirname, './language/de-de.json'), 'utf-8');
const lan_cfg           = JSON.parse(raw_lan_cfg);
const apps              = require(path.join(__dirname, './modules/apps'));

const sysconfig = JSON.parse(fs.readFileSync(path.join(__dirname, './config.json')));

let currentWindowName = '';

window.addEventListener('keydown', (e) => {
    const {key, altKey} = e;
    if(key === 'F4' && altKey)
    {
        if(!debug) {
            e.preventDefault();
        }
    }else if(e.which == 9 && altKey)
    {
        e.preventDefault();
    }
});

function shutdown()
{

}

function hideDialogs()
{
    document.getElementById('shutdown-dialog').style.visibility = 'hidden';
    document.getElementById('shutdown-dialog').style.display = 'none';
}

function openApp(name)
{
    console.log('Showing App ' + name + '...')
    // let cnt = fs.readFileSync('src/apps/' + name + '/index.html', 'utf-8'); // removed : performance
    
    /* !old! */
    // document.getElementById('current-window').innerHTML             = "<iframe src='apps/" + name + "/index.html' width='100%' height='100%' frameborder='0' style='font-size:50px;'></iframe>";
    // document.getElementById('current-window').style.visibility      = 'visible';
    // document.getElementById('current-window').style.display         = 'block';

    // hide old window
    console.log('Trying to hide old app ' + currentWindowName + '...')
    try {
        document.getElementById('window_' + currentWindowName).style.display = 'none';
        console.log('Succcess')
    }catch {
        console.log('Could not hide old app.')
    }

    //document.getElementById("window_" + name).style.opacity = '100%'
    currentWindowName = name;
    // document.getElementById('window_' + name).classList.add("wind_an_open")
    document.getElementById('window_' + name).style.display   = 'block';
    // document.getElementById('icon').className                       = 'hidden';
    // document.getElementById('icon').className                       = 'shown';
}

function setAndRenderWindow(name)
{
    windows.setWindow(name);
}

function sendNotification(title, msg)
{
    console.log(title + "," + msg);
}

function stringToHash(string) { 
                  
    var hash = 0; 
      
    if (string.length == 0) return hash; 
      
    for (i = 0; i < string.length; i++) { 
        char = string.charCodeAt(i); 
        hash = ((hash << 5) - hash) + char; 
        hash = hash & hash; 
    } 
      
    return hash; 
}