App_öffnen_invisible();
Dateienmanager_invisible();
Taschenrechner_invisible();
Kalender_invisible();
Einstellungen_invisible();
Kontakte_invisible();
Aufgabenplanung_invisible();
Radio_invisible();
E_Mail_invisible();
Uhr_invisible();
Internet_invisible();
Hilfe_invisible();
herunterfahren_invisible();
Startbildschirm_invisible();
Hilfe();

function App_öffnen() {
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    App_öffnen_visible();
}
function App_öffnen_visible() {
    document.getElementById('App_öffnen').style.visibility = true;
    document.getElementById('App_öffnen').style.display = 'block';
    document.getElementById('Seitenleiste_App_öffnen').style.fontWeight = "bold";
}
function App_öffnen_invisible() {
    document.getElementById('App_öffnen').style.visibility = false;
    document.getElementById('App_öffnen').style.display = 'none';
    document.getElementById('Seitenleiste_App_öffnen').style.fontWeight =  "normal";
}

function herunterfahren() {
    App_öffnen_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    herunterfahren_visible();
}
function herunterfahren_visible() {
    document.getElementById('herunterfahren').style.visibility = true;
    document.getElementById('herunterfahren').style.display = 'block';
    document.getElementById('Seitenleiste_herunterfahren').style.fontWeight = "bold";
}
function herunterfahren_invisible() {
    document.getElementById('herunterfahren').style.visibility = false;
    document.getElementById('herunterfahren').style.display = 'none';
    document.getElementById('Seitenleiste_herunterfahren').style.fontWeight =  "normal";
}

function Startbildschirm() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    Startbildschirm_visible();
}
function Startbildschirm_visible() {
    document.getElementById('Startbildschirm').style.visibility = true;
    document.getElementById('Startbildschirm').style.display = 'block';
    document.getElementById('Seitenleiste_Startbildschirm').style.fontWeight = "bold";
}
function Startbildschirm_invisible() {
    document.getElementById('Startbildschirm').style.visibility = false;
    document.getElementById('Startbildschirm').style.display = 'none';
    document.getElementById('Seitenleiste_Startbildschirm').style.fontWeight =  "normal";
}

function Dateienmanager() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    Dateienmanager_visible();
}
function Dateienmanager_visible() {
    document.getElementById('Dateienmanager').style.visibility = true;
    document.getElementById('Dateienmanager').style.display = 'block';
    document.getElementById('Seitenleiste_Dateienmanager').style.fontWeight = "bold";
}
function Dateienmanager_invisible() {
    document.getElementById('Dateienmanager').style.visibility = false;
    document.getElementById('Dateienmanager').style.display = 'none';
    document.getElementById('Seitenleiste_Dateienmanager').style.fontWeight =  "normal";
}

function Taschenrechner() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    Taschenrechner_visible();
}
function Taschenrechner_visible() {
    document.getElementById('Taschenrechner').style.visibility = true;
    document.getElementById('Taschenrechner').style.display = 'block';
    document.getElementById('Seitenleiste_Taschenrechner').style.fontWeight = "bold";
}
function Taschenrechner_invisible() {
    document.getElementById('Taschenrechner').style.visibility = false;
    document.getElementById('Taschenrechner').style.display = 'none';
    document.getElementById('Seitenleiste_Taschenrechner').style.fontWeight =  "normal";
}

function Kalender() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    Kalender_visible();
}
function Kalender_visible() {
    document.getElementById('Kalender').style.visibility = true;
    document.getElementById('Kalender').style.display = 'block';
    document.getElementById('Seitenleiste_Kalender').style.fontWeight = "bold";
}
function Kalender_invisible() {
    document.getElementById('Kalender').style.visibility = false;
    document.getElementById('Kalender').style.display = 'none';
    document.getElementById('Seitenleiste_Kalender').style.fontWeight =  "normal";
}

function Einstellungen() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    Einstellungen_visible();
}
function Einstellungen_visible() {
    document.getElementById('Einstellungen').style.visibility = true;
    document.getElementById('Einstellungen').style.display = 'block';
    document.getElementById('Seitenleiste_Einstellungen').style.fontWeight = "bold";
}
function Einstellungen_invisible() {
    document.getElementById('Einstellungen').style.visibility = false;
    document.getElementById('Einstellungen').style.display = 'none';
    document.getElementById('Seitenleiste_Einstellungen').style.fontWeight =  "normal";
}

function Kontakte() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    Kontakte_visible();
}
function Kontakte_visible() {
    document.getElementById('Kontakte').style.visibility = true;
    document.getElementById('Kontakte').style.display = 'block';
    document.getElementById('Seitenleiste_Kontakte').style.fontWeight = "bold";
}
function Kontakte_invisible() {
    document.getElementById('Kontakte').style.visibility = false;
    document.getElementById('Kontakte').style.display = 'none';
    document.getElementById('Seitenleiste_Kontakte').style.fontWeight =  "normal";
}

function Aufgabenplanung() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    Aufgabenplanung_visible();
}
function Aufgabenplanung_visible() {
    document.getElementById('Aufgabenplanung').style.visibility = true;
    document.getElementById('Aufgabenplanung').style.display = 'block';
    document.getElementById('Seitenleiste_Aufgabenplanung').style.fontWeight = "bold";
}
function Aufgabenplanung_invisible() {
    document.getElementById('Aufgabenplanung').style.visibility = false;
    document.getElementById('Aufgabenplanung').style.display = 'none';
    document.getElementById('Seitenleiste_Aufgabenplanung').style.fontWeight =  "normal";
}

function Radio() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    Radio_visible();
}
function Radio_visible() {
    document.getElementById('Radio').style.visibility = true;
    document.getElementById('Radio').style.display = 'block';
    document.getElementById('Seitenleiste_Radio').style.fontWeight = "bold";
}
function Radio_invisible() {
    document.getElementById('Radio').style.visibility = false;
    document.getElementById('Radio').style.display = 'none';
    document.getElementById('Seitenleiste_Radio').style.fontWeight =  "normal";
}

function E_Mail() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_invisible();
    E_Mail_visible();
}
function E_Mail_visible() {
    document.getElementById('E_Mail').style.visibility = true;
    document.getElementById('E_Mail').style.display = 'block';
    document.getElementById('Seitenleiste_E_Mail').style.fontWeight = "bold";
}
function E_Mail_invisible() {
    document.getElementById('E_Mail').style.visibility = false;
    document.getElementById('E_Mail').style.display = 'none';
    document.getElementById('Seitenleiste_E_Mail').style.fontWeight =  "normal";
}

function Uhr() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Internet_invisible();
    Hilfe_invisible();
    Uhr_visible();
}
function Uhr_visible() {
    document.getElementById('Uhr').style.visibility = true;
    document.getElementById('Uhr').style.display = 'block';
    document.getElementById('Seitenleiste_Uhr').style.fontWeight = "bold";
}
function Uhr_invisible() {
    document.getElementById('Uhr').style.visibility = false;
    document.getElementById('Uhr').style.display = 'none';
    document.getElementById('Seitenleiste_Uhr').style.fontWeight =  "normal";
}

function Internet() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Hilfe_invisible();
    Internet_visible();
}
function Internet_visible() {
    document.getElementById('Internet').style.visibility = true;
    document.getElementById('Internet').style.display = 'block';
    document.getElementById('Seitenleiste_Internet').style.fontWeight = "bold";
}
function Internet_invisible() {
    document.getElementById('Internet').style.visibility = false;
    document.getElementById('Internet').style.display = 'none';
    document.getElementById('Seitenleiste_Internet').style.fontWeight =  "normal";
}

function Hilfe() {
    App_öffnen_invisible();
    herunterfahren_invisible();
    Startbildschirm_invisible();
    Dateienmanager_invisible();
    Taschenrechner_invisible();
    Kalender_invisible();
    Einstellungen_invisible();
    Kontakte_invisible();
    Aufgabenplanung_invisible();
    Radio_invisible();
    E_Mail_invisible();
    Uhr_invisible();
    Internet_invisible();
    Hilfe_visible();
}
function Hilfe_visible() {
    document.getElementById('Hilfe').style.visibility = true;
    document.getElementById('Hilfe').style.display = 'block';
    document.getElementById('Seitenleiste_Hilfe').style.fontWeight = "bold";
}
function Hilfe_invisible() {
    document.getElementById('Hilfe').style.visibility = false;
    document.getElementById('Hilfe').style.display = 'none';
    document.getElementById('Seitenleiste_Hilfe').style.fontWeight =  "normal";
}