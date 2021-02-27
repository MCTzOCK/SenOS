const path = require('path');
const mimeTypes = 
{
    "pdf": "application/pdf",
    "txt": "text/plain",
    "js": "text/javascript",
    "html": "text/html",
    "css": "text/css",
    "json": "application/json",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "ico": "image/vnd.microsoft.icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "mp3": "audio/mpeg",
    "mpeg": "audio/mpeg",
    "mp4": "audio/mp4",
    "odt": "application/vnd.oasis.opendocument.text",
    "oga": "audio/ogg",
    "ogv": "video/ogg",
    "ppt": "application/vnd.ms-powerpoint",
    "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "rar": "application/vnd.rar",
    "rtf": "application/rtf",
    "sh": "application/x-sh",
    "tar": "application/x-tar",
    "tif": "image/tiff",
    "tiff": "image/tiff",
    "ts": "video/m2pt",
    "wav": "audio/wav",
    "webm": "video/webm",
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "xml": "application/xml",
    "zip": "application/zip"
}

const mimeName = 
{
    "pdf": "PDF Dokument",
    "txt": "Text Datei",
    "js": "JavaScript Datei",
    "html": "HyperTextMarkupLanguge Datei",
    "css": "Cascading Style Sheets Datei",
    "json": "JavaScript Object Notation Datei",
    "doc": "Word Dokument",
    "docx": "Word Dokument",
    "ico": "Symbol Datei",
    "jpeg": "JPEG Bild",
    "jpg": "JPEG Bild",
    "png": "PNG Bild",
    "mp3": "MP3 Audio Datei",
    "mpeg": "MPEG Audio Datei",
    "mp4": "MP4 Video Datei",
    "odt": "OpenDocument Datei",
    "oga": "OGG Audio Datei",
    "ogv": "OGG Video Datei",
    "ppt": "PowerPoint Präsentation",
    "pptx": "PowerPoint Präsentation",
    "rar": "RAR Archiv",
    "rtf": "RichTextFormat Datai",
    "sh": "Bash Skript",
    "tar": "TAR Archiv",
    "tif": "Tagged Image File Format Datei",
    "tiff": "Tagged Image File Format Datei",
    "ts": "TS Video Datei",
    "wav": "RIFF WAVE Audio Datei",
    "webm": "WEBM Video Datei",
    "xls": "Excel Tabellen Datei",
    "xlsx": "Excel Tabellen Datei",
    "xml": "Extensible Markup Language Datei",
    "zip": "ZIP Archiv"
}

const mimeOpen = 
{
    "pdf": "docviewer",
    "txt": "codeedit",
    "js": "codeedit",
    "html": "codeedit",
    "css": "codeedit",
    "json": "codeedit",
    "doc": "docviewer",
    "docx": "docviewer",
    "ico": "imageviewer",
    "jpeg": "imageviewer",
    "jpg": "imageviewer",
    "png": "imageviewer",
    "mp3": "audioplayer",
    "mpeg": "audioplayer",
    "mp4": "videoplayer",
    "odt": "docviewer",
    "oga": "audioplayer",
    "ogv": "videoplayer",
    "ppt": "docviewer",
    "pptx": "docviewer",
    "rar": "archiver",
    "rtf": "docviewer",
    "sh": "codeedit",
    "tar": "archiver",
    "tif": "imageviewer",
    "tiff": "imageviewer",
    "ts": "videoplayer",
    "wav": "audioplayer",
    "webm": "videoplayer",
    "xls": "docviewer",
    "xlsx": "docviewer",
    "xml": "codeedit",
    "zip": "archiver"
}

const mimeIcon = 
{
    "pdf": "pdf.png",
    "txt": "txt.png",
    "js": "js.png",
    "html": "html.png",
    "css": "css.png",
    "json": "json.png",
    "doc": "doc.png",
    "docx": "docx.png",
    "ico": "ico.png",
    "jpeg": "jpeg.png",
    "jpg": "jpeg.png",
    "png": "png.png",
    "mp3": "mpeg.png",
    "mpeg": "mpeg.png",
    "mp4": "mp4.png",
    "odt": "odt.png",
    "oga": "oga.png",
    "ogv": "ogg.png",
    "ppt": "ppt.png",
    "pptx": "pptx.png",
    "rar": "rar.png",
    "rtf": "rtf.png",
    "sh": "sh.png",
    "tar": "tar.png",
    "tif": "tif.png",
    "tiff": "tiff.png",
    "ts": "ts.png",
    "wav": "wav.png",
    "webm": "webm.png",
    "xls": "xlx.png",
    "xlsx": "xlxs.png",
    "xml": "xml.png",
    "zip": "zip.png"
}

exports.getMimeType = function(extension){
    return mimeTypes[extension];
}

exports.exitsMimeType = function(extension) {
    return mimeTypes[extension] !== undefined;
}

exports.getMimeTypeName = function(extension){
    return mimeName[extension];
}

exports.getProgramToOpen = function(extension){
    return mimeOpen[extension];
}

exports.getMimeTypeIcon = function(extension) {
    let u = path.join(__dirname, '../../img/mime/' + mimeIcon[extension]);
    return u;
}