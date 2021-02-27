// const shdown = require('shutdown-computer');
const {app} = require('electron');
const { hideDialog } = require('./modules/window');

function click_start()
{
    document.getElementById("window_" + currentWindowName).classList.remove("wind_an_open");
    // document.getElementById("window_" + currentWindowName).classList.add("wind_an_close");
    hideDialog();
    windows.setWindow('internal.desktop');
}