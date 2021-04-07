var bearbeiten_schriftgröße_show = false;
var markierter_text = "";
var markiert;
var markiert_range;

function datei_open_dropdown() {
    document.getElementById("datei_dropdown").classList.toggle("datei_show");
}

function bearbeiten_open_dropdown() {
    document.getElementById("bearbeiten_dropdown").classList.toggle("bearbeiten_show");
}

function bearbeiten_schriftgröße_open_dropdown() {
    if(!bearbeiten_schriftgröße_show) {
        setTimeout(function() {
            document.getElementById("bearbeiten_schriftgröße_dropdown").classList.add("bearbeiten_show");
        }, 500);
    }
}

function bearbeiten_schriftgröße_open_dropdown_btn() {
    markiert = window.getSelection();
    markierter_text = (window.getSelection()).toString();
    markiert_range = markiert.getRangeAt(0);
    /*if(!bearbeiten_schriftgröße_show) {
        setTimeout(function() {
            document.getElementById("bearbeiten_schriftgröße_dropdown").classList.add("bearbeiten_show");
        }, 500);
    }*/
}

function bearbeiten_schriftgröße_close_dropdown() {
    if(!bearbeiten_schriftgröße_show) {
        setTimeout(function() {
            document.getElementById("bearbeiten_schriftgröße_dropdown").classList.remove("bearbeiten_show");
        }, 500);
    }
}

function bearbeiten_schriftgröße_open_dropdown_click() {
    bearbeiten_schriftgröße_show = true;
}

function ausrichten_open_dropdown() {
    document.getElementById("ausrichten_dropdown").classList.toggle("ausrichten_show");
}

window.onclick = function(event) {
    if (!event.target.matches('.datei_dropdown_btn')) {
        var dropdowns = document.getElementsByClassName("datei_dropdown_content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('datei_show')) {
                openDropdown.classList.remove('datei_show');
            }
        }
    }

    if (!event.target.matches('.bearbeiten_dropdown_btn') && !event.target.matches('.dummy')) {
        var dropdowns = document.getElementsByClassName("bearbeiten_dropdown_content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('bearbeiten_show')) {
                openDropdown.classList.remove('bearbeiten_show');
            }
        }
        bearbeiten_schriftgröße_show = false;
    }

    if (!event.target.matches('.ausrichten_dropdown_btn')) {
        var dropdowns = document.getElementsByClassName("ausrichten_dropdown_content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('ausrichten_show')) {
                openDropdown.classList.remove('ausrichten_show');
            }
        }
    }
}


function bearbeiten_bold() {
    var sel = window.getSelection();
    if (sel.rangeCount) {

        var e = document.createElement('span');
        e.contentEditable = true;
        e.style.userSelect = 'initial';
        e.style.fontWeight = 'bold';
        e.innerHTML = sel.toString();

        var e2 = document.createElement('span');
        e2.contentEditable = true;
        e2.style.userSelect = 'initial';
        e2.innerText = ' ';
  
        var range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(e2);
        range.insertNode(e);
    }
}

function bearbeiten_unterstreichen() {
    var sel = window.getSelection();
    if (sel.rangeCount) {

        var e = document.createElement('span');
        e.contentEditable = true;
        e.style.userSelect = 'initial';
        e.style.textDecoration = 'underline';
        e.innerHTML = sel.toString();

        var e2 = document.createElement('span');
        e2.contentEditable = true;
        e2.style.userSelect = 'initial';
        e2.innerText = ' ';
  
        var range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(e2);
        range.insertNode(e);
    }
}

function bearbeiten_kursiv() {
    var sel = window.getSelection();
    if (sel.rangeCount) {

        var e = document.createElement('span');
        e.contentEditable = true;
        e.style.userSelect = 'initial';
        e.style.fontStyle = 'italic';
        e.innerHTML = sel.toString();

        var e2 = document.createElement('span');
        e2.contentEditable = true;
        e2.style.userSelect = 'initial';
        e2.innerText = ' ';
  
        var range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(e2);
        range.insertNode(e);
    }
}

function bearbeiten_durchstreichen() {
    var sel = window.getSelection();
    if (sel.rangeCount) {

        var e = document.createElement('span');
        e.contentEditable = true;
        e.style.userSelect = 'initial';
        e.style.textDecoration = 'line-through';
        e.innerHTML = sel.toString();

        var e2 = document.createElement('span');
        e2.contentEditable = true;
        e2.style.userSelect = 'initial';
        e2.innerText = ' ';
  
        var range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(e2);
        range.insertNode(e);
    }
}

function bearbeiten_schriftgröße() {
    console.log(markiert);
    console.log(markierter_text);
    if(markiert.rangeCount){
        var e = document.createElement('span');
        e.contentEditable = true;
        e.style.userSelect = 'initial';
        e.style.fontSize = document.getElementById('bearbeiten_schriftgröße_input').value + "px";
        e.innerHTML = markierter_text;

        var e2 = document.createElement('span');
        e2.contentEditable = true;
        e2.style.userSelect = 'initial';
        e2.innerText = ' ';

        var range = markiert_range;
        range.deleteContents();
        range.insertNode(e2);
        range.insertNode(e);
    }
}

function ausrichten_left() {
    var sel = window.getSelection();
    if (sel.rangeCount) {

        var e = document.createElement('span');
        e.contentEditable = true;
        e.style.userSelect = 'initial';
        e.style.textAlign = 'left';
        e.style.width = '100%';
        e.style.position = 'absolute';
        e.innerHTML = sel.toString();

        var e2 = document.createElement('span');
        e2.contentEditable = true;
        e2.style.userSelect = 'initial';
        e2.innerText = ' ';
  
        var range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(e2);
        range.insertNode(e);
    }
}

function ausrichten_center() {
    var sel = window.getSelection();
    if (sel.rangeCount) {
        var e = document.createElement('span');
        e.contentEditable = true;
        e.style.userSelect = 'initial';
        e.style.textAlign = 'center';
        e.style.width = '100%';
        e.style.position = 'absolute';
        e.innerHTML = sel.toString();

        var e2 = document.createElement('span');
        e2.contentEditable = true;
        e2.style.userSelect = 'initial';
        e2.innerText = ' ';
  
        var range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(e2);
        range.insertNode(e);
    }
}

function ausrichten_right() {
    var sel = window.getSelection();
    if (sel.rangeCount) {
        var e = document.createElement('span');
        e.contentEditable = true;
        e.style.userSelect = 'initial';
        e.style.textAlign = 'right';
        e.style.width = '100%';
        e.style.position = 'absolute';
        e.innerHTML = sel.toString();

        var e2 = document.createElement('span');
        e2.contentEditable = true;
        e2.style.userSelect = 'initial';
        e2.innerText = ' ';
  
        var range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(e2);
        range.insertNode(e);
    }
}