let forceOpen = false;
let fOApp = 'browser';

let service_started_time = false;

for (let i = 0; i < reg_apps_lengt; i++) {
    // reg apps
    apps.registerApp(app_cfg['name'][i], i);
}

apps.logApps();

function initDesktop() {

    // render desktop
    for (let i = 0; i < apps.getApps().length; i++) {
        if (apps.getApps()[i].desktop !== false) {
            let iURL = '';
            if (fs.existsSync(path.join(__dirname, './' + apps.getApps()[i].icon))) {
                iURL = path.join(__dirname, './' + apps.getApps()[i].icon);
            } else {
                iURL = path.join(__dirname, './img/initial/not-found.png');
            }
            let card = document.createElement('div')
            card.classList.add('card', 'c-grid');
            card.style.width = "18rem";
            card.style.borderRadius = "16px"
            card.style.cursor = 'pointer';
            card.addEventListener('click', (ev) => {
                openApp(apps.getApps()[i].name);
            })
            let cardimg = document.createElement('img')
            cardimg.classList.add('card-img-top')
            cardimg.src = iURL;
            cardimg.style.background = "rgba(" + senos.system_color.r + "," + senos.system_color.g + "," + senos.system_color.b + "," + senos.system_color.a + ")";
            cardimg.style.borderRadius = "16px"
            let cardbody = document.createElement('div');
            cardbody.classList.add('card-body');
            let cardtitle = document.createElement('h2');
            cardtitle.classList.add('card-title')
            cardtitle.innerText = apps.getApps()[i].display;
            cardimg.classList.add('animation', 'animation-medium', 'animation-rotate')
            cardtitle.classList.add('animation', 'animation-fast', 'animation-fadeIn-right')

            cardbody.appendChild(cardtitle)
            card.appendChild(cardimg)
            card.appendChild(cardbody)
            document.getElementById('appicons').appendChild(card);
        }
    }
    let f = false;
    let ci = 100;
    if (forceOpen) {
        openApp(fOApp);
    }
}

function startService(name) {
    console.log('[SERVICE] Trying to start Service ' + name + '...');
    let f = false;
    let e = false;
    if (name === 'time') {
        startTime();
        f = true;
    } else {
        f = false;
        e = true;
    }
    if (f) {
        if (e) {
            console.log('[SERVICE] Starting Service ' + name + ' failed!');
        } else {
            console.log('[SERVICE] The following Service was stared: ' + name);
        }
    } else {
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
    // document.getElementById('time').innerHTML = today.getDate() + '/' + (today.getUTCMonth() + 1) + '/' + today.getFullYear() + '<br>' + h + ":" + m + ":" + s;
    document.getElementById('time').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    ;  // add zero in front of numbers < 10
    return i;
}

function initApps() {
    let as = [];
    as = apps.getApps();
    for (let i = 0; i < apps.getApps().length; i++) {
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
        iframe.classList.add('animation', 'animation-medium', 'animation-fadeIn-right')
        iframe.setAttribute('src', path.join(__dirname, 'apps/' + as[i].name + '/index.html'));
        document.getElementById('windows').appendChild(iframe);
        // document.getElementById('current-window').innerHTML = '<webview style="font-size:50px; width:100%; height:100%; position: absoulute; display: inline-flex; border:none;" nodeintegration src="' + window_c +'/index.html"></webview>';
    }
}

function initStyle() {
    // apply system color
    var els = document.getElementsByClassName('icnIMG');
    Array.prototype.forEach.call(els, function (element) {
        element.style.backgroundColor = 'rgba(' + senos.system_color.r + ', ' + senos.system_color.g + ', ' + senos.system_color.b + ', ' + senos.system_color.a + ')';
    });
    // apply desktop settings
    let desktop = sysconfig.appearance.desktop;
    document.getElementById('deskIMG').setAttribute('src', path.join(__dirname, desktop.background));
}

// disable close
const oldWindowClose = window.close;
window.close = function (code) {
    if (code === undefined) {
        console.error('Diese Funktion ist leider nicht erlaubt!')
    } else if (code === 'IchWeißWasIchTue!') {
        oldWindowClose();
    }
}


window.addEventListener('load', () => {
    /*document.getElementById('controls').classList.add('animation', 'animation-medium', 'animation-fadeIn-left', 'd-inline-block')
    document.getElementById('controls').classList.remove('d-none')*/
    document.getElementById('appicons').style.display = 'block'
    document.getElementById('appicons').classList.add('animation', 'animation-medium', 'animation-fadeIn-bottom')
})
