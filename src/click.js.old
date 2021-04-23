// const shdown = require('shutdown-computer');
const {app} = require('electron');
const { hideDialog } = require('./modules/window');

async function click_start()
{
    document.getElementById("window_" + currentWindowName).className = '';
    document.getElementById("window_" + currentWindowName).classList.add('appWindow')
    document.getElementById("window_" + currentWindowName).classList.add('animation');
    document.getElementById("window_" + currentWindowName).classList.add('animation-medium');
    document.getElementById("window_" + currentWindowName).classList.add('animation-fadeOut-right');
    await setTimeout(() => {
        windows.setWindow('internal.desktop');
        document.getElementById("window_" + currentWindowName).className = '';
        document.getElementById("window_" + currentWindowName).classList.add('appWindow', 'animation', 'animation-medium', 'animation-fadeIn-right')
        hideDialog();
    }, 3000);
}