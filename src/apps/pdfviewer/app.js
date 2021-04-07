const path = require('path');

function openFile(file){
    document.getElementById('pdfView').setAttribute('src', path.join(__dirname, "../../../pdf/web/viewer.html") + "?file=" + file);
}