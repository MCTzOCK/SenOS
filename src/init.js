// const { exec } = require('child_process');
// const fs                = require('fs');
// const { stdout, stderr } = require('process');
// const raw_app_cfg       = fs.readFileSync('./apps.json', 'utf-8');
// const app_cfg           = JSON.parse(raw_app_cfg);
// const reg_apps_lengt    = Object.keys(app_cfg.name).length;
// const raw_lan_cfg       = fs.readFileSync('./language/de-de.json', 'utf-8');
// const lan_cfg           = JSON.parse(raw_lan_cfg);

// const apps              = require('./modules/apps');
let forceOpen = true;
let fOApp = 'browser';

let service_started_time = false;

for(let i = 0; i < reg_apps_lengt; i++)
{
    // reg apps
    apps.registerApp(app_cfg['name'][i], i);
}

apps.logApps();

function initDesktop()
{
        // render desktop
        for(let i = 0; i < apps.getApps().length; i++)
        {
            if(apps.getApps()[i].desktop != false)
            {
                let iURL = '';
                if(fs.existsSync(path.join(__dirname, './' + apps.getApps()[i].icon))){
                    iURL = path.join(__dirname, './' + apps.getApps()[i].icon);
                }else {
                    iURL = path.join(__dirname, './img/initial/not-found.png');
                }
                document.write('<div id="icon" class="app_sec"><a href=\'javascript:openApp("' + apps.getApps()[i].name + '");\' onmousedown="return false"><img src="' + iURL + '" draggable="false" class="icnIMG"></a><br><center><span id="app_name" class="app_title">' + apps.getApps()[i].display + '</span></center></div>');
            }
        }

        // set language
        document.body.innerHTML = document.body.innerHTML.replace('<!-- {dialog.shutdown.title} -->', lan_cfg['dialog']['shutdown']['title']);
        document.body.innerHTML = document.body.innerHTML.replace('<!-- {dialog.shutdown.content} -->', lan_cfg['dialog']['shutdown']['content']);
        document.body.innerHTML = document.body.innerHTML.replace('<!-- {dialog.shutdown.buttons.yes} -->', lan_cfg['dialog']['shutdown']['buttons']['yes']);
        document.body.innerHTML = document.body.innerHTML.replace('<!-- {dialog.shutdown.buttons.no} -->', lan_cfg['dialog']['shutdown']['buttons']['no']);
        var isWin = process.platform === "win32";
        if(isWin) {
            // exec('taskkill /F /IM explorer.exe', (err, stdout, stderr) => {
            //     if(err) {
            //         return;
            //     }
            //     console.log(`stdout:${stdout}`)
            //     console.log(`stderr:${stderr}`)
            // })
        }
        let f = false;
        let ci = 100;
        /*setTimeout(() => {
            let id = setInterval(() => {
                if(!f){
                    ci--;
                    document.getElementById("cloudIMG").style.opacity = '' + ci + '%';
                }else {
                    clearInterval(id)
                }
            }, 10);
        }, 2000)*/
        if(forceOpen){
            openApp(fOApp);
        }
        // windows.openDialog('./dialogs/open.file/dialog.html'); // debug
}

function startService(name)
{
    console.log('[SERVICE] Trying to start Service ' + name + '...');
    let f = false;
    let e = false;
    if(name === 'time')
    {
        startTime();
        f = true;
    }else
    {
        f = false;
        e = true;
    }
    if(f)
    {
        if(e)
        {
            console.log('[SERVICE] Starting Service ' + name + ' failed!');
        }else
        {
            console.log('[SERVICE] The following Service was stared: ' + name);
        }
    }else
    {
        console.log('[SERVICE] The Service ' + name + ' wasn\'t found!');
    }
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = today.getDate() + '/' + (today.getUTCMonth() + 1) + '/' + today.getFullYear() + '<br>' + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function initApps(){
    let as = [];
    as = apps.getApps();
    for(let i = 0; i < apps.getApps().length; i++){
        let iframe = document.createElement('iframe');
        iframe.id = 'window_' + as[i].name;
        iframe.classList.add('appWindow');
        iframe.nodeintegration = true;
        iframe.style.fontSize = '50px';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.position = 'absoulute';
        iframe.style.display = 'none';
        iframe.style.border = 'none';
        iframe.setAttribute('src', path.join(__dirname, 'apps/' + as[i].name + '/index.html'));
        document.getElementById('windows').appendChild(iframe);
        // document.getElementById('current-window').innerHTML = '<webview style="font-size:50px; width:100%; height:100%; position: absoulute; display: inline-flex; border:none;" nodeintegration src="' + window_c +'/index.html"></webview>';
    }
}

function initStyle(){
    // apply system color
    var els = document.getElementsByClassName('icnIMG');
    Array.prototype.forEach.call(els, function(element) {
        element.style.backgroundColor = 'rgba(' + senos.system_color.r + ', ' + senos.system_color.g + ', ' + senos.system_color.b + ', ' + senos.system_color.a + ')'; 
    });
    // apply desktop settings
    let desktop = sysconfig.appearance.desktop;
    document.getElementById('deskIMG').setAttribute('src', path.join(__dirname, desktop.background));
}

// disable close
const oldWindowClose = window.close;
window.close = function(code){
    if(code === undefined){
        console.error('Diese Funktion ist leider nicht erlaubt!')
    }else if(code === 'IchWeißWasIchTue!'){
        oldWindowClose();
    }
}