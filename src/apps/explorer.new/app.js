const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const root = path.join(__dirname, "./../../files/")
let bypassDeletedFilePolicy = false;
let bypassHiddenFilePolicy = false;
let mode = 'VIEW';
const { initAppearance } = require('../../modules/senos')
initAppearance()


let cfg = JSON.parse(fs.readFileSync(path.join(__dirname, "explorer.json")));
bypassDeletedFilePolicy = cfg.view.deletedFiles;
bypassHiddenFilePolicy = cfg.view.hiddenFiles;

const prefsWindow = new bootstrap.Offcanvas(document.getElementById('prefs'), {});
const renameWindow = new bootstrap.Modal(document.getElementById('renameDialog'), {});
const deleteWindow = new bootstrap.Modal(document.getElementById('deleteDialog'), {});
const settingsWindow = new bootstrap.Modal(document.getElementById('settingsDialog'), {});

let currentFolder = path.join(__dirname, root);
let disPath = 'Computer\\Speicher'

let tFolders    = [];
let tFiles      = [];

openPath(root)

function openPath(path0) {
    document.getElementById('loadingAnimation').classList.remove('d-none')
    let pTemp = path0.replace(root, '')
    disPath = 'Computer\\Speicher\\' + pTemp;
    currentFolder = path0
    try {
        prefsWindow.hide();
    }catch{}
    displayPath();
    displayPathContent();
    document.getElementById('loadingAnimation').classList.add('d-none')
}

function displayPath(){
    document.getElementById('pathDisplay').innerHTML = '';
    let args = disPath.split("\\")
    for(let i = 0; i < args.length; i++){
        let e = document.createElement('li');
        e.classList.add("breadcrumb-item")
        e.classList.add('text-secondary')
        e.innerText = args[i];
        document.getElementById('pathDisplay').appendChild(e);
    }
}

function displayPathContent(){
    document.getElementById('folderNoContent').classList.add("d-none")
    document.getElementById('folder_content').innerHTML = '';
    tFolders    = [];
    tFiles      = [];
    fs.readdirSync(currentFolder).forEach(file => {
        createNewCard(file);
    });
    for(let i = 0; i < tFolders.length; i++){
        document.getElementById('folder_content').appendChild(tFolders[i]);
    }
    for(let i = 0; i < tFiles.length; i++){
        document.getElementById('folder_content').appendChild(tFiles[i]);
    }
    if(tFolders.length === 0 && tFiles.length === 0){
        document.getElementById('folderNoContent').classList.remove("d-none")
    }
    tFolders    = [];
    tFiles      = [];
}

function createNewCard(file){
    let v = true;
    let normallyHidden = false;
    if(file.startsWith("$__SenOS")){
        normallyHidden = true;
    }
    if(file.startsWith("$__SenOS_DELETED__$") && !bypassDeletedFilePolicy){
        v = false;
    }
    if(file.startsWith("$__SenOS_HIDDEN__$") && !bypassHiddenFilePolicy){
        v = false;
    }
    if(v){
        let b               = fs.lstatSync(path.join(currentFolder, file)).isDirectory();
        let cMain           = document.createElement('div');
        let cBody           = document.createElement('div');
        let cTitle          = document.createElement('h5');
        let cTitleLink      = document.createElement('a');
        let cText           = document.createElement('p');
        cMain.classList.add('card');
        cMain.classList.add('c-grid');
        if(b){ cMain.classList.add('bg-primary') }
        if(normallyHidden){cMain.classList.add('bg-secondary')}
        cMain.style.width = '18rem';
        cMain.id = "file_" + file + "_main";
        cBody.classList.add('card-body');
        cBody.id = "file_" + file + "_body";
        cTitle.classList.add('card-title');
        cTitleLink.classList.add('card-title');
        if(b){ cTitleLink.classList.add('text-white') }
        cTitleLink.id = "file_" + file + "_title";
        if(mode === 'VIEW'){
            cTitleLink.setAttribute('data-bs-toggle', 'offcanvas');
            cTitleLink.setAttribute('onclick', 'showFilePrefs("' + file + '")');
            cTitleLink.href = '#filePrefs';
        }else {
            if(b){
                console.log(path.join(currentFolder, file));
                cTitleLink.setAttribute('onclick', 'openPath0("' + file + '")');
            }else {
                if(mode === 'SAVE'){
                    cTitleLink.setAttribute('onclick', 'document.getElementById("externalDialogFile").value = "' + file + '"');
                }else if(mode === 'OPEN'){
                    cTitleLink.setAttribute('onclick', 'document.getElementById("externalDialogFile").value = "' + file + '"');
                }
            }
        }
        let fileName = file.split('.')[0];
        if(fileName.includes("$__SenOS_")){
            fileName = fileName.replace("$__SenOS_DELETED__$", "");
            fileName = fileName.replace("$__SenOS_HIDDEN__$__", "");
        }
        cTitleLink.innerText = fileName;
        cText.classList.add('card-text');
        cText.id = 'file_' + file + '_desc';
        if(b){
            cText.innerText = "Ist ein Ordner";
            cText.classList.add('text-white')
        }else {
            cText.innerText = "Kann mit " + getAppByEnding(file.split('.')[1]) + ' geöffnet werden.';
            cText.classList.add('text-dark')
        }
        cTitle.appendChild(cTitleLink);
        cBody.appendChild(cTitle);
        cBody.appendChild(cText);
        cMain.appendChild(cBody);
        if(b){
            tFolders.push(cMain);
        }else {
            tFiles.push(cMain);
        }
    }
}

function getAppByEnding(end){
    if(end === 'txt' || end === 'html' || end === 'htm'){
        return "Notizen";
    }else if(end === 'jpg' || end === 'png' || end === 'jpeg'){
        return "Bilder";
    }else if(end === 'pdf'){
        return "PDF-Viewer";
    }
    return "Keine Angaben";
}

function showFilePrefs(file) {
    document.getElementById('prefs_file_name').innerText = file.split('.')[0];
    if (!fs.lstatSync(path.join(currentFolder, file)).isDirectory()) {
        document.getElementById('prefs_file_ending').innerText = file.split('.')[1];
        document.getElementById('prefs_file_type').innerText = "Datei";
    } else {
        document.getElementById('prefs_file_ending').innerText = "Keine Angaben";
        document.getElementById('prefs_file_type').innerText = "Ordner"
    }
    let stat = fs.lstatSync(path.join(currentFolder, file));
    document.getElementById('prefs_file_create').innerText = stat.atime.toLocaleDateString("de-de", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    let size = 0;
    let sizeType = '';
    if(stat.size > 1000){
        if(stat.size < 1000000){
            size = stat.size / 1000;
            sizeType = ' Kilobytes'
        }else {
            if(stat.size < 1073741824) {
                size = stat.size / 1000 / 1000;
                sizeType = ' Megabytes'
            }else {
                size = stat.size / 1000 / 1000 / 1000;
                sizeType = ' Gigabytes'
            }
        }
    }else {
        size = stat.size;
        sizeType = ' Bytes'
    }
    document.getElementById('prefs_file_size').innerText = size + sizeType;
    // buttons
    document.getElementById('prefs_open').setAttribute('onclick', 'openPath0("' + file + '")');
    document.getElementById('prefs_rename').setAttribute('onclick', 'renameFile("' + file + '")');
    document.getElementById('prefs_delete').setAttribute('onclick', 'deleteFile("' + file + '")');
    document.getElementById('prefs_hide').setAttribute('onclick', 'hideFile("' + file + '")');
}

function openPath0(fileName){
    if(fs.lstatSync(path.join(currentFolder, fileName)).isDirectory()){
        currentFolder = path.join(currentFolder, fileName)
        openPath(currentFolder);
    }else {
        openFileWithApp(fileName);
    }
}

function renameFile(file){
    document.getElementById('renameFileExists').classList.add('d-none')
    document.getElementById('renameOldName').value = file.split('.')[0];
    renameWindow.show();
    document.getElementById('renameFileFinal').setAttribute('onclick', "renameFileFinal('" + file + "')")
}

function deleteFile(file){
    document.getElementById('deleteFileFinal').setAttribute('onclick', 'deleteFileFinal("' + file + '")')
    deleteWindow.show();
}

function deleteFileFinal(file){
    if(file.startsWith("$__SenOS_")){
        rimraf(path.join(currentFolder, file), fs, () => {
            openPath(currentFolder);
            deleteWindow.hide();
        })
    }else {
        fs.renameSync(path.join(currentFolder, file), path.join(currentFolder, "$__SenOS_DELETED__$__" + file))
        openPath(currentFolder);
        deleteWindow.hide();
    }
}

function hideFile(file){
    if(file.startsWith("$__SenOS_HIDDEN__$__")) {
        fs.renameSync(path.join(currentFolder, file), path.join(currentFolder, file.split('$__SenOS_HIDDEN__$__')[1]))
    }else {
        fs.renameSync(path.join(currentFolder, file), path.join(currentFolder, "$__SenOS_HIDDEN__$__" + file))
    }
    openPath(currentFolder)
}


function renameFileFinal(file){
    let newFileName = document.getElementById('renameNewName').value;
    let ending = document.getElementById('renameFileEnding').value;
    if(ending === ''){
        ending = file.split('.')[file.split('.').length - 1];
    }
    if(fs.existsSync(path.join(currentFolder, newFileName + '.' + ending))){
        document.getElementById('renameFileExists').classList.remove('d-none')
    }else {
        fs.renameSync(path.join(currentFolder, file), path.join(currentFolder, newFileName + "." + ending))
        renameWindow.hide();
        openPath(currentFolder);
    }
}

function openFileWithApp(fileName){
    let app = getAppByEnding(fileName.split('.')[1]);
    if(app === 'Bilder'){
        window.parent.document.getElementById('window_pictures').contentWindow.openFile(path.join(currentFolder, fileName));
        window.parent.openApp('pictures')
    }else if(app === 'PDF-Viewer'){
        window.parent.document.getElementById('window_pdfviewer').contentWindow.openFile(path.join(currentFolder, fileName));
        window.parent.openApp('pdfviewer')
    }else if(app === 'Notizen'){
        window.parent.document.getElementById('window_notizen').contentWindow.openFileLow(path.join(currentFolder, fileName));
        window.parent.openApp("notizen");
    }
}

function goToTopPath(){
    if(currentFolder !== root){
        currentFolder = path.join(currentFolder, '..') + "\\";
        openPath(currentFolder)
    }
}

function openSettings(){
    document.getElementById('settingsHiddenFilesVisible').checked = cfg.view.hiddenFiles
    document.getElementById('settingsDeletedFilesVisible').checked = cfg.view.deletedFiles
    settingsWindow.show();
}

function applySettings() {
    let hiddenVisible = document.getElementById('settingsHiddenFilesVisible').checked;
    let deletedVisible = document.getElementById('settingsDeletedFilesVisible').checked;
    cfg.view.hiddenFiles = hiddenVisible;
    cfg.view.deletedFiles = deletedVisible;
    fs.writeFileSync(path.join(__dirname, 'explorer.json'), JSON.stringify(cfg));
    cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'explorer.json')))
    bypassDeletedFilePolicy = cfg.view.deletedFiles;
    bypassHiddenFilePolicy = cfg.view.hiddenFiles;
    currentFolder = path.join(currentFolder, '');
    openPath(currentFolder);
}

// External Dialogs

let returnApp = '';

let openCallback = undefined;
let saveCallback = undefined;

function registerExternalDialogCancelListener(){
    document.getElementById('externalDialogCancel').addEventListener('click', () => {window.parent.openApp(returnApp)});
}

function initDialog(){
    window.parent.openApp('explorer.new')
    registerExternalDialogCancelListener();
    showExternalDialogControls();
    openPath(root)
}

function switchToOpenDialog(lastApp, callback){
    returnApp = lastApp;
    openCallback = callback;
    mode = 'OPEN';
    initDialog();
    document.getElementById('externalDialogSubmit').addEventListener('click', () => {externalDialogSelectOpenFile()})
    document.getElementById('externalDialogFile').setAttribute('disabled', '');
}

function externalDialogSelectOpenFile(){
    let file = document.getElementById('externalDialogFile').value;
    if(file === ''){
        document.getElementById('externalDialogFile').placeholder = 'Bitte Datei wählen!';
        setTimeout(() => {
            document.getElementById('externalDialogFile').placeholder = 'Datei durch Klick wählen'
        }, 2000)
    }else {
        openCallback(path.join(currentFolder, file));
        switchToReturnApp();
    }
}

function switchToSaveDialog(lastApp, callback) {
    returnApp = lastApp;
    saveCallback = callback;
    mode = 'SAVE';
    initDialog();
    document.getElementById('externalDialogSubmit').addEventListener('click', () => {externalDialogSelectSaveFile()})
    document.getElementById('externalDialogFile').removeAttribute('disabled');
}

function externalDialogSelectSaveFile(){
    let file = document.getElementById('externalDialogFile').value;
    if(file === ''){
        document.getElementById('externalDialogFile').placeholder = 'Bitte Datei wählen!';
        setTimeout(() => {
            document.getElementById('externalDialogFile').placeholder = 'Datei durch Klick wählen'
        }, 2000)
        return;
    }else {
        saveCallback(path.join(currentFolder, file));
        switchToReturnApp();
    }
}

function switchToReturnApp(){
    window.parent.openApp(returnApp);
    hideExternalDialogControls();
    mode = 'VIEW';
    openPath(root)
}

function showExternalDialogControls(){
    if(mode === 'OPEN'){
        document.getElementById('externalDialogSubmit').innerText = 'Öffnen';
    }else if(mode === 'SAVE'){
        document.getElementById('externalDialogSubmit').innerText = 'Speichern';
    }
    document.getElementById('externalDialogControls').classList.remove("d-none")
}

function hideExternalDialogControls(){
    document.getElementById('externalDialogControls').classList.add("d-none")
}