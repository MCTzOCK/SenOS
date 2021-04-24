const { resolveTxt } = require('dns');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mimetype = require('./mimetype.js');
const pathRoot = document.getElementById('path');
const folderRoot = document.getElementById('folder-root');
const fileRoot = document.getElementById('file-root');
const root = './../../../../../files/';
let currentFolder = path.join(__dirname, root);

if(!fs.existsSync(currentFolder)){
    fs.mkdirSync(currentFolder);
}
let displayFolder = '/';


// ui creation

{
    function displayPath(){
        // clear
        document.getElementById('file-root').innerHTML = '';
        // displayFolder = currentFolder;
        document.getElementById('path-string').innerText = displayFolder;
        displayFolderRoot();
        displayFileRoot();
        console.log('CF: ' + currentFolder);
    }
    
    function displayFolderRoot(){
    
    }
    
    function displayFileRoot(){
        let s = '';
        let id = 0;
        // .. folder
    
        if(!currentFolder.endsWith('\\files\\')){
            let iU = path.join(__dirname, '../../img/mime/folder.png');
            let div = document.createElement('div');
            let aIMG = document.createElement('a');
            let aNAME = document.createElement('span');
            let IMG = document.createElement('img');
            let NAME = document.createElement('span');
            let br = document.createElement('br');
            aIMG.href = "javascript:openFolder(0)";
            IMG.classList.add('file-mimetype-icon');
            IMG.setAttribute('src', iU);
            NAME.innerText = 'Zurück';
            IMG.setAttribute('senos-folder-id', '' + id + '');
            IMG.id = 'img_id-' + id;
            NAME.id = 'link-' + id;
            NAME.classList.add('text');
            IMG.classList.add('folder-ico');
            IMG.classList.add('parent-folder');
            aIMG.appendChild(IMG);
            aNAME.appendChild(NAME);
            div.appendChild(aIMG);
            div.appendChild(br);
            div.appendChild(aNAME);
            div.classList.add('file');
            document.getElementById('file-root').innerHTML += div.outerHTML;
        }
        id++;
        //Folder
        fs.readdirSync(currentFolder).forEach(file => {
            if(fs.lstatSync(currentFolder + file).isDirectory()){
                let iU = path.join(__dirname, '../../img/mime/folder.png');
                let div = document.createElement('div');
                let aIMG = document.createElement('a');
                let aNAME = document.createElement('a');
                let IMG = document.createElement('img');
                let NAME = document.createElement('span');
                let br = document.createElement('br');
                aIMG.href = "javascript:openFolder(" + id + ")";
                // aNAME.href = "javascript:changeFolderName(" + id + ")";
                aNAME.href = 'javascript:contextClick(4, "img_id-' + id + '");'
                IMG.classList.add('file-mimetype-icon');
                IMG.setAttribute('src', iU);
                NAME.innerText = file;
                IMG.setAttribute('senos-folder-id', '' + id + '');
                IMG.id = 'img_id-' + id;
                NAME.id = 'link_id-' + id;
                NAME.classList.add('text');
                IMG.classList.add('folder-ico');
                IMG.classList.add('clickable-element');
                aIMG.appendChild(IMG);
                aNAME.appendChild(NAME);
                div.appendChild(aIMG);
                div.appendChild(br);
                div.appendChild(aNAME);
                div.classList.add('file');
                document.getElementById('file-root').innerHTML += div.outerHTML;
                id++;
            }
        });
        //File
        fs.readdirSync(currentFolder).forEach(file => {
            if(!fs.lstatSync(currentFolder + file).isDirectory()){
                let t = [];
                let ex = '';
                let e = '';
                let iU = path.join(__dirname, '../../img/mime/file.png');
                for(let i = 0; i < file.length; i++){
                    t[i] = file.charAt(file.length - i - 1);
                }
                if(file.indexOf('.') > 0){
                    for(let i = 0; i < t.length; i++){
                        if(t[i] == '.'){
                            break;
                        }else {
                            e += t[i];
                        }
                    }
                }else {
                    e = 'DATEI';
                }
                let t0 = [];
                for(let i = 0; i < e.length; i++){
                    t0[i] = e.charAt(e.length - i - 1);
                }
                e = '';
                for(let i = 0; i < t0.length; i++){
                    e += t0[i];
                }
                ex = e;
                if(mimetype.exitsMimeType(e)){
                    e = mimetype.getMimeTypeName(e);
                    iU = mimetype.getMimeTypeIcon(ex);
                }else {
                    if(e !== 'DATEI'){
                        e += '-DATEI';
                    }
                }
                // console.log(e);
                // console.log(iU);
                let div = document.createElement('div');
                let aIMG = document.createElement('a');
                let aNAME = document.createElement('a');
                let IMG = document.createElement('img');
                let NAME = document.createElement('span');
                let br = document.createElement('br');
                // aIMG.href = "javascript:openFile(this)";
                aIMG.href = 'javascript:contextClick(0, "img_id-' + id + '");';
                // aNAME.href = "javascript:changeFileName(this)";
                aNAME.href = 'javascript:contextClick(4, "img_id-' + id + '");'
                IMG.classList.add('file-mimetype-icon');
                IMG.setAttribute('src', iU);
                IMG.setAttribute('senos-file-extension', ex);
                NAME.innerText = file.replace('.' + ex, '');
                NAME.classList.add('text');
                IMG.id = 'img_id-' + id;
                NAME.id = 'link_id-' + id;
                IMG.classList.add('file-ico');
                IMG.classList.add('clickable-element');
                aIMG.appendChild(IMG);
                aNAME.appendChild(NAME);
                div.appendChild(aIMG);
                div.appendChild(br);
                div.appendChild(aNAME);
                div.classList.add('file');
                document.getElementById('file-root').innerHTML += div.outerHTML;
                id++;
            }
        })
    }
    
}

// context menu

{
    document.addEventListener('click', function(e){
        toggleMenuOn(true);
    })
    
    document.getElementById('file-root').addEventListener('contextmenu', function(e) {
        toggleMenuOn(false);
        positionMenu(e);
        initMenu(e);
    }, false)
    
    let CMO = false;
    var menuPosition;
    var menuPositionX;
    var menuPositionY;
    var menu = document.getElementById('context');
    
    // Menu ID Config:
    // 0: Open
    // 1: Delete
    // 2: New File
    // 3: New Folder
    // 4: Rename

    function initMenu(e){
        menu.innerHTML = '';
        const clicked = document.getElementById(e.target.id);
    
        // default
        if(clicked.classList.contains('clickable-element')){
            let open                = document.createElement('div');
            let remove              = document.createElement('div');
            let rename              = document.createElement('div');
            let ClickOpen           = document.createElement('a');
            let ClickRemove         = document.createElement('a');
            let ClickRename         = document.createElement('a');
            open.classList.add('contextClick');
            remove.classList.add('contextClick');
            rename.classList.add('contextClick');
            ClickOpen.href = 'javascript:contextClick(0, "' + e.target.id + '")';
            ClickOpen.innerText = 'Öffnen';
            ClickRemove.href = 'javascript:contextClick(1, "' + e.target.id + '")';
            ClickRemove.innerText = 'Löschen';
            ClickRename.href = 'javascript:contextClick(4, "' + e.target.id + '")';
            ClickRename.innerText = 'Umbenennen';
            open.appendChild(ClickOpen);
            remove.appendChild(ClickRemove);
            rename.appendChild(ClickRename);
            menu.appendChild(open);
            menu.appendChild(remove);
            menu.appendChild(rename);
        }else if(clicked.classList.contains('parent-folder')){
            let open                = document.createElement('div');
            let ClickOpen           = document.createElement('a');
            open.classList.add('contextClick');
            ClickOpen.href = 'javascript:contextClick(0, "' + e.target.id + '")';
            ClickOpen.innerText = 'Öffnen';
            open.appendChild(ClickOpen);
            menu.appendChild(open);
        }else {
            let createFile              = document.createElement('div');
            let createFolder            = document.createElement('div');
            let ClickCreateFile         = document.createElement('a');
            let ClickCreateFolder       = document.createElement('a');
            ClickCreateFile.href        = 'javascript:contextClick(2, "' + e.target.id + '")';
            ClickCreateFile.innerText   = 'Neue Datei';
            ClickCreateFolder.href      = 'javascript:contextClick(3, "' + e.target.id + '")';
            ClickCreateFolder.innerText = 'Neuen Ordner';
            createFile.classList.add('contextClick');
            createFile.appendChild(ClickCreateFile);
            createFolder.classList.add('contextClick');
            createFolder.appendChild(ClickCreateFolder);
            menu.appendChild(createFile);
            menu.appendChild(createFolder);
        }
    
        if(clicked.classList.contains('file-ico')){
            
        }else if(clicked.classList.contains('folder-ico')) {
    
        }
    }
    
    function toggleMenuOn(h){
        menu.hidden = h;
    }
    
    function positionMenu(e) {
        clickCoords = getPosition(e);
        clickCoordsX = clickCoords.x;
        clickCoordsY = clickCoords.y;
      
        menuWidth = menu.offsetWidth + 4;
        menuHeight = menu.offsetHeight + 4;
      
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
      
        if ( (windowWidth - clickCoordsX) < menuWidth ) {
          menu.style.left = windowWidth - menuWidth + "px";
        } else {
          menu.style.left = clickCoordsX + "px";
        }
      
        if ( (windowHeight - clickCoordsY) < menuHeight ) {
          menu.style.top = windowHeight - menuHeight + "px";
        } else {
          menu.style.top = clickCoordsY + "px";
        }
    }
    
    function getPosition(e) {
        var posx = 0;
        var posy = 0;
      
        if (!e) var e = window.event;
      
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        } else if (e.clientX || e.clientY) {
          posx = e.clientX + document.body.scrollLeft + 
                             document.documentElement.scrollLeft;
          posy = e.clientY + document.body.scrollTop + 
                             document.documentElement.scrollTop;
        }
      
        return {
          x: posx,
          y: posy
        }
    }

    function contextClick(id, docID){
        // console.log('cock');
        const clicked = document.getElementById(docID);
        // console.log('Doc-ID: ' + docID)
        if(id === 0){
            if(clicked.classList.contains('folder-ico')){
                const fID = clicked.getAttribute('senos-folder-id');
                let i = '';
                let fSection = false;
                for(let c = 0; c < fID.length; c++){
                    if(fID[c] === '-'){
                        fSection = true;
                    }
                    if(fSection){
                        i += fID[c];
                    }
                }
                openFolder(fID);
            }else if(clicked.classList.contains('file-ico')){
                const ex = document.getElementById(docID).getAttribute('senos-file-extension');
                var useExternal = true;
                // done: jpg, png, ico, jpeg, tif, tiff, mp4, txt, html, js, json, css, xml, sh, wav, ogg, oga, mp3, mpeg, ogv, webm, ts
                
                if(ex === 'jpg' || ex === 'png' || ex === 'ico' || ex === 'jpeg' || ex === 'tif' || ex === 'tiff'){
                    useExternal = false;
                    docID = docID.replace('img', 'link');
                    const fName = document.getElementById(docID);
                    let f = currentFolder + fName.innerText + '.' + ex;
                    openImage(f);
                }
                if(ex === 'mp4' || ex === 'ogv' || ex === 'webm' || ex === 'ts'){
                    useExternal = false;
                    docID = docID.replace('img', 'link');
                    const fName = document.getElementById(docID);
                    let f = currentFolder + fName.innerText + '.' + ex;
                    openVideo(f);
                }
                if(ex === 'txt' || ex === 'html' || ex === 'js' || ex === 'json' || ex === 'css' || ex === 'xml' || ex === 'sh'){
                    useExternal = false;
                    docID = docID.replace('img', 'link');
                    const fName = document.getElementById(docID);
                    let f = currentFolder + fName.innerText + '.' + ex;
                    openTextFile(f);
                }
                if(ex === 'wav' || ex === 'ogg' || ex === 'oga' || ex === 'mp3' || ex === 'mpeg'){
                    useExternal = false;
                    docID = docID.replace('img', 'link');
                    const fName = document.getElementById(docID);
                    let f = currentFolder + fName.innerText + '.' + ex;
                    openAudio(f);
                }
                if(ex === 'pdf'){
                    useExternal = false;
                    docID = docID.replace('img', 'link');
                    const fName = document.getElementById(docID);
                    let f = currentFolder + fName.innerText + '.' + ex;
                    openPDF(f);
                }
                if(useExternal){
                    const program = mimetype.getProgramToOpen(ex);
                    if(program !== undefined){
                        var t = docID.replace('img', 'link');
                        var p = currentFolder + "\\" + document.getElementById(t).innerText + '.' + ex;
                        window.parent.frames['window_' + program].contentWindow.openDocument(p);
                    }else {
                        document.getElementById('errorMessage').innerText = 'Für diese Datei hast du leider keine App installiert!';
                        document.getElementById('errorDialogButton').innerText = 'Im Store suchen!';
                        document.getElementById('dialog').style.display = 'block';
                        document.getElementById('errorDialog').style.display = 'block';
                        document.getElementById('popup_close').style.display = 'block';
                    }
                }
                // // window.parent.document.getElementById('window_' + program).contetnWindow.openDocument('123');
            }
        }else if(id === 1){
            const folder = clicked.classList.contains('folder-ico');
            docID = docID.replace('img', 'link');
            const fName = document.getElementById(docID);
            let f = currentFolder + fName.innerText;
            showDeleteDialog(fName.innerText, f, docID, folder);
        }else if(id === 2){
            document.getElementById('senos-create-meta').setAttribute('type', 'file');
            showCreateDialog(0);
        }else if(id === 3){
            document.getElementById('senos-create-meta').setAttribute('type', 'folder');
            showCreateDialog(1);
        }else if(id === 4){
            docID = docID.replace('img', 'link');
            f = document.getElementById(docID).innerText + '.' + document.getElementById(docID.replace('link', 'img')).getAttribute('senos-file-extension');
            document.getElementById('senos-rename-meta').setAttribute('path', currentFolder + "\\" + f)
            document.getElementById('senos-rename-meta').setAttribute('file', f)
            document.getElementById('senos-rename-meta').setAttribute('extension', document.getElementById(docID.replace('link', 'img')).getAttribute('senos-file-extension'));
            document.getElementById('renameFileName').value = document.getElementById(docID).innerText;
            docID = docID.replace('link', 'img');
            if(document.getElementById(docID).classList.contains('folder-ico')){
                document.getElementById('renameFileButton').innerText = document.getElementById('renameFileButton').innerText.replace('Datei', 'Ordner');
            }else {
                document.getElementById('renameFileButton').innerText = document.getElementById('renameFileButton').innerText.replace('Ordner', 'Datei');
            }
            document.getElementById('renameDialog').style.display = 'block';
            document.getElementById('popup_close').style.display = 'block';
            document.getElementById('dialog').style.display = 'block';
        }
    }
}

// show dialogs

{
    function showDeleteDialog(file, path, docID, isFolder){
        // console.log(isFolder);
        docID = docID.replace('link', 'img');
        var ex;
        if(!isFolder){
            ex = document.getElementById(docID).getAttribute('senos-file-extension');
            path = path + '.' + ex;
        }
        if(isFolder){
            document.getElementById('delDiaTxt').textContent = document.getElementById('delDiaTxt').textContent.replace('die Datei', 'den Ordner');
            // console.log('1');
        }else {
            document.getElementById('delDiaTxt').textContent = document.getElementById('delDiaTxt').textContent.replace('den Ordner', 'die Datei');
            // console.log('2');
        }
        document.getElementById('senos-delete-meta').setAttribute('file-name', file);
        document.getElementById('senos-delete-meta').setAttribute('path', path);
        document.getElementById('senos-delete-meta').setAttribute('element-id', docID);
        // document.getElementById('delDiaInf').innerText = file;
        document.getElementById('delDiaInf').textContent = file;
        document.getElementById('dialog').style.display = 'block';
        document.getElementById('dialog-content').style.display = 'block';
        document.getElementById('popup_close').style.display = 'block';
    }
    
    function showCreateDialog(i){
        if(i > 0){
            document.getElementById('createFileName').setAttribute('placeholder', 'Ordnername');
            document.getElementById('createFileButton').innerText = 'Ordner erstellen';
        }else {
            document.getElementById('createFileName').setAttribute('placeholder', 'Dateiname');
            document.getElementById('createFileButton').innerText = 'Datei erstellen';
        }
        document.getElementById('dialog').style.display = 'block';
        document.getElementById('createDialog').style.display = 'block';
        document.getElementById('popup_close').style.display = 'block';
    }
}

// additional functions

{
    function deleteF(path) {
        // delete using rimrif
        rimraf(path, function(){});
        // remove from screen
        document.getElementById('file-root').removeChild(document.getElementById(document.getElementById('senos-delete-meta').getAttribute('element-id')).parentElement.parentElement);
    }
    
    function delDialogAccepted(){
        document.getElementById('delDiaInf').innerText = document.getElementById('delDiaInf').innerText.replace(document.getElementById('senos-delete-meta').getAttribute('file-name'), '%name%');
        esc();
        deleteF(document.getElementById('senos-delete-meta').getAttribute('path'));
    }
    
    function createDialogAccepted(){
        if(document.getElementById('senos-create-meta').getAttribute('type') === 'file'){
            fs.appendFile(currentFolder + "\\" + document.getElementById('createFileName').value + '.txt', '', function(err){});
        }else {
            fs.mkdirSync(currentFolder + "\\" + document.getElementById('createFileName').value);
        }
        document.getElementById('createFileName').value = '';
        esc();
        displayPath();
    }

    function openFolder(id) {
        const i = document.getElementById('img_id-' + id);
        const a = document.getElementById('link_id-' + id);
        if(id !== 0 && id !== '0'){
            currentFolder = path.join(currentFolder, a.innerText, '\\');
            displayFolder += '/' +a.innerText;
        }else {
            currentFolder = path.join(currentFolder, '\\..\\');
            if(displayFolder !== '/'){
                let p = displayFolder;
                let l = 0;
                let t = '';
                for(let c = 0; c < p.length; c++){
                    if(p[c] === '/'){
                        l = c;
                    }
                }
                for(let d = 0; d < l; d++){
                    t += p[d];
                }
                displayFolder = t;
            }
        }
        displayPath();
    }

    function openFile(){
        
    }

    function errorDialogButton(){
        // TODO: Open Store Page
    }

    function openImage(path){
        document.getElementById('imgView').setAttribute('src', path);
        document.getElementById('imageViewer').style.display = 'block';
        document.getElementById('popup_close').style.display = 'block';
        document.getElementById('dialog').style.display = 'block';
    }
    
    function openVideo(path){
        document.getElementById('videoSource').setAttribute('src', path);
        document.getElementById('videoViewer').style.display = 'block';
        document.getElementById('popup_close').style.display = 'block';
        document.getElementById('dialog').style.display = 'block';
    }

    function openAudio(path){
        document.getElementById('audioSource').setAttribute('src', path);
        document.getElementById('audioViewer').style.display = 'block';
        document.getElementById('popup_close').style.display = 'block';
        document.getElementById('dialog').style.display = 'block';
    }

    function openTextFile(path){
        const content = fs.readFileSync(path);
        document.getElementById('textEditorContent').innerText = content;
        document.getElementById('textEditor').style.display = 'block';
        // document.getElementById('popup_close').style.display = 'block';
        document.getElementById('dialog').style.display = 'block';
    }

    function openPDF(path){
        document.getElementById('pdfContent').setAttribute('src', 'file://' + __dirname + '/../../pdf/web/viewer.html?file=' + path)
        document.getElementById('pdfViewer').style.display = 'block';
        document.getElementById('popup_close').style.display = 'block';
        // document.getElementById('popup_close').style.display = 'block';
        document.getElementById('dialog').style.display = 'block';
    }

    function renameDialogAccepted(){
        var p = document.getElementById('senos-rename-meta').getAttribute('path');
        var nP = p.replace(document.getElementById('senos-rename-meta').getAttribute('file'), document.getElementById('renameFileName').value) + '.' + document.getElementById('senos-rename-meta').getAttribute('extension');
        fs.renameSync(p, nP)
        document.getElementById('renameDialog').style.display = 'none';
        document.getElementById('popup_close').style.display = 'none';
        document.getElementById('dialog').style.display = 'none';
        displayPath();
    }
    
    function textEditSaveFile(){
        const content = document.getElementById('textEditorContent').innerText;
        document.getElementById('textEditorContent').innerText = '';
        fs.writeFileSync(document.getElementById('senos-edit-meta').getAttribute('path'), content); // TODO: Fix
        esc();
    }
}

// listeners

{
    document.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 229) {
          return;
        }
        if(event.key === 'Escape'){
            // document.getElementById('display').style.visibility = 'hidden';
            document.getElementById('dialog').style.display = 'none';
            document.getElementById('dialog-content').style.display = 'none';
            document.getElementById('errorDialog').style.display = 'none';
            document.getElementById('createDialog').style.display = 'none';
            document.getElementById('imageViewer').style.display = 'none';
            document.getElementById('renameDialog').style.display = 'none';
            document.getElementById('popup_close').style.display = 'none';
            document.getElementById('videoViewer').style.display = 'none';
            document.getElementById('audioViewer').style.display = 'none';
            document.getElementById('textEditor').style.display = 'none';
            document.getElementById('pdfViewer').style.display = 'none';
            document.getElementById('videoSource').setAttribute('src', '');
            document.getElementById('audioSource').setAttribute('src', '');
        }
        if(event.key === 's' && event.ctrlKey){
            saveConfig();
        }
    });
    
    function esc(){
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                keyCode: 27
            })
        )
    }

    // window.onerror = function (msg, url, lineNo, columnNo, error) {
    //     // ... handle error ...
    //     location.reload();
    //     console.log('123');
    // }
}

displayPath();