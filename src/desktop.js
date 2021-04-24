const fs = require('fs');
const path = require('path');
const senos = require('./modules/senos.js')
const apps = require('./modules/apps.js');

const APPS_PER_PAGE = 8;

let maxAppPage = 0;
let currentAppPage = 0;

let currentApp = '';

let animationWaitingTime = 0;
if(senos.animationLevel >= 1){
    animationWaitingTime = 1000;
}

window.onload = function() {
    if(senos.animationLevel === 0){
        let list = document.getElementsByClassName('animationDisable-1');
        for(let i = 0; i < list.length; i++){
            list.item(i).classList.forEach(classListEntry => {
                if(classListEntry.startsWith('animation')){
                    list.item(i).classList.remove(classListEntry)
                }
            })
        }
    }

    if(!senos.rawUser.enabled){
        document.getElementById('btn-logout').classList.add('d-none')
    }

    let needed_app_pages = parseInt(apps.getApps().length / APPS_PER_PAGE);
    maxAppPage = needed_app_pages;
    for(let i = 0; i < needed_app_pages + 1; i++){
        let app_page = document.createElement('div');
        app_page.id = 'apps_' + i;
        if(i !== 0){
            app_page.classList.add('d-none')
        }
        document.getElementById('app_pages').appendChild(app_page);
    }

    let currentPage = 0;
    let currentPageCounterI = 0;

    apps.getApps().forEach(app => {
        let windowFrame = document.createElement('iframe');
        windowFrame.id = 'window_' + app.name;
        windowFrame.classList.add('d-none');
        if(!app.name.startsWith("https://") && !app.name.startsWith("http://")){
            windowFrame.src = path.join(__dirname, 'apps/' + app.name + '/index.html');
        }else {
            windowFrame.src = app.name
        }
        windowFrame.nodeintegration = true;
        document.getElementById('windows').appendChild(windowFrame)

        if(app.desktop){
            if(currentPageCounterI === APPS_PER_PAGE){
                currentPageCounterI = 0;
                currentPage++;
            }
            console.log(currentPage)
            let card            = document.createElement('div');
            let cardImg         = document.createElement('img');
            let cardBody        = document.createElement('div');
            let cardTitle       = document.createElement('h2');

            card.style.width            = "18rem"
            card.style.borderRadius     = "24px"
            card.classList.add('card', 'c-grid', 'clickable')
            if(senos.animationLevel === 2){
                card.classList.add('animation', 'animation-medium', 'animation-rotate')
            }
            card.setAttribute('onclick', 'openApp("' + app.name + '")')
            cardImg.classList.add('card-img-top')
            cardImg.style.borderRadius = "24px"
            cardImg.style.borderBottomRightRadius = "0px"
            cardImg.style.borderBottomLeftRadius = "0px"
            cardBody.classList.add('card-body')
            cardTitle.classList.add('card-title')

            // cardImg.style.background = 'rgba(' + senos.system_color.r + ',' + senos.system_color.g + ',' + senos.system_color.b + ',' + senos.system_color.a + ')';
            cardImg.classList.add(senos.raw.appearance.iconBackgroundClass);

            let icon_path = '';
            if(fs.existsSync(path.join(__dirname, app.icon))){
                icon_path = path.join(__dirname, app.icon);
            }else {
                icon_path = path.join(__dirname, 'img/initial/not-found.png');
            }

            cardImg.src         = icon_path;
            cardTitle.innerText = app.display;
            cardBody.appendChild(cardTitle)
            card.appendChild(cardImg);
            card.appendChild(cardBody);
            document.getElementById('apps_' + currentPage).appendChild(card);
            currentPageCounterI++;
        }
    })
    switchPage(0)
}

function switchPage(index){
    document.getElementById('page_controls_left').classList.remove('d-none');
    document.getElementById('page_controls_right').classList.remove('d-none');
    if(index === -1 && currentAppPage > 0){
        currentAppPage--;
    }
    if(index === 1 && currentAppPage < maxAppPage){
        currentAppPage++;
    }

    if(currentAppPage === 0){
        document.getElementById('page_controls_left').classList.add('d-none');
    }else if(currentAppPage === maxAppPage - 1){
        document.getElementById('page_controls_right').classList.add('d-none');
    }

    (async () => {
        let lastAppPageElement = undefined;
        let nextAppPageElement = undefined;
        if(index === -1){
            lastAppPageElement = document.getElementById('apps_' + (currentAppPage + 1));
            nextAppPageElement = document.getElementById('apps_' + currentAppPage);
        }else {
            lastAppPageElement = document.getElementById('apps_' + (currentAppPage - 1));
            nextAppPageElement = document.getElementById('apps_' + currentAppPage);
        }
        if(lastAppPageElement !== null){
            lastAppPageElement.className = '';
            if(senos.animationLevel >= 1){
                lastAppPageElement.classList.add('animation', 'animation-fast');
                if(index === -1){
                    lastAppPageElement.classList.add('animation-fadeOut-right')
                }else {
                    lastAppPageElement.classList.add('animation-fadeOut-left')
                }
            }
            await setTimeout(()=>{
                lastAppPageElement.className = '';
                lastAppPageElement.classList.add('d-none')
                nextAppPageElement.className = '';
                if(senos.animationLevel >= 1) {
                    nextAppPageElement.classList.add('animation', 'animation-fast');
                    if(index === -1){
                        nextAppPageElement.classList.add('animation-fadeIn-left')
                    }else {
                        nextAppPageElement.classList.add('animation-fadeIn-right')
                    }
                }
            },animationWaitingTime)
        }
    })();
}

async function openApp(name){
    if(name !== '') {
        if(document.getElementById('window_' + name) !== null) {
            if(currentApp !== ''){
                let lastApp = document.getElementById('window_' + currentApp);
                let nextApp = document.getElementById('window_' + name);
                lastApp.className = '';
                nextApp.className = '';
                if(senos.animationLevel === 2){
                    lastApp.classList.add('animation', 'animation-fast', 'animation-fadeOut-bottom');
                    nextApp.classList.add('animation', 'animation-fast', 'animation-fadeIn-top');
                }
                setTimeout(() => {
                    lastApp.className = '';
                    lastApp.classList.add('d-none');
                }, animationWaitingTime)
            }else {
                let nextApp = document.getElementById('window_' + name);
                nextApp.className = '';
                if(senos.animationLevel === 2) {
                    nextApp.classList.add('animation', 'animation-fast', 'animation-fadeIn-top');
                }
            }
            currentApp = name;
        }else {
            console.warn("Could not open app " + name + ": The app was not preloaded!")
        }
    }else {
        if(currentApp !== ''){
            let lastApp = document.getElementById('window_' + currentApp);
            lastApp.className = '';
            if(senos.animationLevel === 2){
                lastApp.classList.add('animation', 'animation-fast', 'animation-fadeOut-bottom');
            }
            setTimeout(() => {
                lastApp.className = '';
                lastApp.classList.add('d-none');
            }, animationWaitingTime)
        }
        currentApp = '';
    }
}

function showDesktop(){
    openApp('');
}

function shutdown(){
    document.getElementById('exitConfirmInfo').innerHTML = 'Wenn du deinen PC ausschaltest gehen möglicherweise nicht gespeicherte <strong>Daten verloren!</strong>'
    document.getElementById('exitConfirmButton').setAttribute('onclick', 'window.close()')
    document.getElementById('exitConfirmButton').innerText = 'Trotzdem ausschalten'
    new bootstrap.Modal(document.getElementById('modalExitConfirm'), {}).show()
}

function reboot(){
    document.getElementById('exitConfirmInfo').innerHTML = 'Wenn du deinen PC neustartest gehen möglicherweise nicht gespeicherte <strong>Daten verloren!</strong>'
    document.getElementById('exitConfirmButton').setAttribute('onclick', 'window.location.reload()')
    document.getElementById('exitConfirmButton').innerText = 'Trotzdem neustarten'
    new bootstrap.Modal(document.getElementById('modalExitConfirm'), {}).show()
}

function logout(){
    document.getElementById('exitConfirmInfo').innerHTML = 'Wenn du dich abmeldest gehen möglicherweise nicht gespeicherte <strong>Daten verloren!</strong>'
    document.getElementById('exitConfirmButton').setAttribute('onclick', 'window.location.assign("login/login.html")')
    document.getElementById('exitConfirmButton').innerText = 'Trotzdem abmelden'
    new bootstrap.Modal(document.getElementById('modalExitConfirm'), {}).show()
}