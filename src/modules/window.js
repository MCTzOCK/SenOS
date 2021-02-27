const fs = require('fs');

let window_c = "";
let isWindowOpen = false;

exports.isWindowOpen = function() {
    return isWindowOpen;
}

exports.currentWindow = function() {
    return window_c;
}

exports.setWindow = function(newWindow) {
    window_c = newWindow;
    console.log("Set the window to " + window_c);
    renderWindow();
}

exports.openDialog = function(path){
    var d = document.getElementById('dialog_nonsys');
    if(document.getElementById('dialog_nonsys') !== undefined){
        d = document.getElementById('dialog_nonsys');
    }else {
        d = window.parent.getElementById('dialog_nonsys');
    }
    d.innerHTML = '<webview nodeintegration src="' + path + '"</webview>';
    d.style.display = 'block';
    d.style.visibility = 'visible';
}

exports.hideDialog = function() {
    var d = document.getElementById('dialog_nonsys');
    if(document.getElementById('dialog_nonsys') !== undefined){
        d = document.getElementById('dialog_nonsys');
    }else {
        d = window.parent.getElementById('dialog_nonsys');
    }
    d.innerHTML = '';
    d.style.display = 'none';
    d.style.visibility = 'hidden';
}

renderWindow = function() {
    if(window_c == "")
    {
        return;
    }else
    {
        if(window_c.startsWith('internal'))
        {
            if(window_c === 'internal.desktop')
            {
                isWindowOpen = false;
                document.getElementById('background-img').style.visibility  = 'visible';
                // document.getElementById('current-window').style.visibility  = 'hidden';
                // document.getElementById('current-window').style.display     = 'none';
                let as = apps.getApps();
                for(let i = 0; i < apps.getApps().length; i++){
                    document.getElementById('window_' + as[i].name).style.display = 'none';
                }
                // document.getElementById('windows').style.visibility  = 'hidden';
                // document.getElementById('windows').style.display     = 'none';
            }
        }else
        {
            isWindowOpen = true;
            if(!window_c.startsWith('http://') && !window_c.startsWith('https://'))
            {
                document.getElementById('window_' + window_c).style.display = 'block';
                document.getElementById('windows').style.visibility  = 'visible';
                document.getElementById('windows').style.display     = 'block';
                // document.getElementById('current-window').innerHTML = '<webview style="font-size:50px; width:100%; height:100%; position: absoulute; display: inline-flex; border:none;" nodeintegration src="' + window_c +'/index.html"></webview>';
                // document.getElementById('current-window').innerHTML = "<iframe src='apps/" + window + "/index.html' width='100%' height='100%' frameborder='0'></iframe>"; // removed : old
            }
            // else
            // {
            //     // document.getElementById('current-window').innerHTML = "<iframe src='" + window + "' width='100%' height='100%' frameborder='0'></iframe>"; // removed : old
            //     document.getElementById('current-window').innerHTML = '<webview src="' + window_c +'"></webview>';
            // }
        }
    }
}
