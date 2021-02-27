const { desktopCapturer } = require('electron');
const fs = require('fs');
const path = require('path');
const rootDir = path.join(__dirname, '../../files/notizen/');

if(!fs.existsSync(rootDir)){
    fs.mkdirSync(rootDir);
}

function openFile(){
    document.getElementById('backendOpenDialog').style.display = 'block';
    document.getElementById('backendOpenDialog').innerHTML = '';
    fs.readdirSync(rootDir).forEach(n => {
        let e = document.createElement('span'); e.className = 'backendOpenDialogEntry';
        let a = document.createElement('a'); a.href = 'javascript:acceptOpenDialog("' + n + '");'; a.innerText = n;
        e.appendChild(a);
        document.getElementById('backendOpenDialog').appendChild(e);
    })
}

function acceptOpenDialog(name){
    document.getElementById('backendOpenDialog').style.display = 'none';
    let c = fs.readFileSync(path.join(rootDir, name));
    document.getElementById('textarea').innerHTML = c;
}

function saveFile() {
    document.getElementById('dialogTitle').innerText = 'Datei Speichern';
    document.getElementById('dialogAction').setAttribute('href', 'javascript:acceptDialog();');
    document.getElementById('dialogAction').innerText = 'Speichern';
    document.getElementById('backendDialog').style.display = 'block';
}

function acceptDialog(){
    let content = document.getElementById('textarea').innerHTML;
    let dName = document.getElementById('dialogEntered').value;
    fs.writeFileSync(path.join(rootDir, '/' + dName + '.txt'), content);
        document.getElementById('backendDialog').style.display = 'none';
}