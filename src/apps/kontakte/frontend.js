var Dialog_visible = false;
var Namen_eintragen_visible = false;
var Namen_verändern_visible = false;
var bearbeiten = false;
var Kontakt_Anzahl = 0;
var Kontakt_Array_Name = [];
var Kontakt_Array_Name_unsortiert = [];
var Kontakt_Array_Telefonnummner = [];
var Kontakt_Array_Telefonnummner_unsortiert = [];
var Kontakt_Array_E_Mail = [];
var Kontakt_Array_E_Mail_unsortiert = [];
var Kontakt_Array_Adresse = [];
var Kontakt_Array_Adresse_unsortiert = [];
var gelöschter_Kontakt_Name = '';
var gelöschter_Kontakt_Telefonnummer = '';
var gelöschter_Kontakt_E_Mail = '';
var gelöschter_Kontakt_Adresse = '';

function toggle_visibility_keine_Kontakte(){
    document.getElementById('keine_Kontakte').innerText = Kontakt_Array_Name.length.toString() + ' Kontakt(e)';
}

function toggle_visibility_Dialog(){
    if(!Dialog_visible){
        document.getElementById('Dialog').style.visibility = 'visible';
        document.getElementById('Dialog').style.display = 'block';
        document.getElementById('InputName').value = '';
        document.getElementById('InputTelefonnummer').value = '';
        document.getElementById('InputE_Mail').value = '';
        document.getElementById('InputAdresse').value = '';
        Namen_eintragen_visible = true;
        Namen_verändern_visible = true;
	bearbeiten = false;
        toggle_visibility_Name_eintragen();
        toggle_visibility_anderer_Name();
        Dialog_visible = true;
    }else if(Dialog_visible){
        document.getElementById('Dialog').style.visibility = 'hidden';
        document.getElementById('Dialog').style.display = 'none';
        Dialog_visible = false;
    }
}

function toggle_visibility_Name_eintragen(){
    if(!Namen_eintragen_visible){
        document.getElementById('kein_Name').style.visibility = 'visible';
        document.getElementById('kein_Name').style.display = 'block';
        Namen_eintragen_visible = true;
    }else if(Namen_eintragen_visible){
        document.getElementById('kein_Name').style.visibility = 'hidden';
        document.getElementById('kein_Name').style.display = 'none';
        Namen_eintragen_visible = false;
    }
}

function toggle_visibility_anderer_Name(){
    if(!Namen_verändern_visible){
        document.getElementById('gleicher_Name').style.visibility = 'visible';
        document.getElementById('gleicher_Name').style.display = 'block';
        Namen_verändern_visible = true;
    }else if(Namen_verändern_visible){
        document.getElementById('gleicher_Name').style.visibility = 'hidden';
        document.getElementById('gleicher_Name').style.display = 'none';
        Namen_verändern_visible = false;
    }
}

function kontakt_hinzufügen(){
    if(document.getElementById('InputName').value !== '') {
        if(Kontakt_Array_Name.indexOf(document.getElementById('InputName').value) < 0) {
            Namen_eintragen_visible = true;
            Namen_verändern_visible = true;
            toggle_visibility_Name_eintragen();
            toggle_visibility_anderer_Name();

            if(bearbeiten){
                Kontakte_Kontakt_hinzufügen(gelöschter_Kontakt_Name, gelöschter_Kontakt_Telefonnummer, gelöschter_Kontakt_E_Mail, gelöschter_Kontakt_Adresse, true);
            }else{
                Kontakte_Kontakt_hinzufügen(document.getElementById('InputName').value, document.getElementById('InputTelefonnummer').value, document.getElementById('InputE_Mail').value, document.getElementById('InputAdresse').value, true);
            }
            Kontakte_einrichten();

	    visible_Dialog = true;
            toggle_visibility_Dialog();
        } else {
            Namen_eintragen_visible = true;
            toggle_visibility_Name_eintragen();
            Namen_verändern_visible = false;
            toggle_visibility_anderer_Name();
        }
    } else {
        Namen_verändern_visible = true;
        toggle_visibility_anderer_Name();
        Namen_eintragen_visible = false;
        toggle_visibility_Name_eintragen();
    }
}

function kontakt_abbrechen(){
    Dialog_visible = true;
    toggle_visibility_Dialog();
}

function Kontakte_Kontakt_hinzufügen(Name, Telefonnummer, E_Mail, Adresse, save) {
    E_Mail = E_Mail.replace('ä', 'ae');
    E_Mail = E_Mail.replace('ö', 'oe');
    E_Mail = E_Mail.replace('ü', 'ue');
    E_Mail = E_Mail.replace('Ä', 'Ae');
    E_Mail = E_Mail.replace('Ö', 'Oe');
    E_Mail = E_Mail.replace('Ü', 'Ue');
    
    Kontakt_Array_Name.push(Name);
    Kontakt_Array_Name_unsortiert.push(Name);
    Kontakt_Array_Telefonnummner_unsortiert.push(Telefonnummer);
    Kontakt_Array_E_Mail_unsortiert.push(E_Mail);
    Kontakt_Array_Adresse_unsortiert.push(Adresse);

    Kontakt_Array_Name.sort();

    for(var i = 0; i < Kontakt_Array_Name.length; i++){
        Kontakt_Array_Telefonnummner[i] = Kontakt_Array_Telefonnummner_unsortiert[Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[i])];
        Kontakt_Array_E_Mail[i] = Kontakt_Array_E_Mail_unsortiert[Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[i])];
        Kontakt_Array_Adresse[i] = Kontakt_Array_Adresse_unsortiert[Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[i])];
    }

    toggle_visibility_keine_Kontakte();
    
    if(save){
        saveContacts();
    }
}

function Kontakte_einrichten() {

    document.getElementById('Tabelle_Body').innerHTML = '';

    for(var i = 0; i < Kontakt_Array_Name.length; i++){
        var Kontakt = document.createElement('tr');
        var Kontakt_Zahl = document.createElement('td');
        var Kontakt_Name = document.createElement('td');
        var Kontakt_Telefonnummer =  document.createElement('td');
        var Kontakt_E_Mail = document.createElement('td');
        var Kontakt_Adresse = document.createElement('td');
        var Kontakt_Bearbeiten = document.createElement('td');
        var Kontakt_Bearbeiten_btn = document.createElement('button');
        var Kontakt_Löschen_btn = document.createElement('button');

        Kontakt_Zahl.innerText = i + 1;
        Kontakt_Zahl.style.textAlign = 'center';
        Kontakt_Zahl.classList.add('tabelleZelle');

        Kontakt_Name.innerText = Kontakt_Array_Name[i];
        Kontakt_Name.classList.add('tabelleZelle');

        Kontakt_Telefonnummer.innerText = Kontakt_Array_Telefonnummner[i];
        Kontakt_Telefonnummer.classList.add('tabelleZelle');

        Kontakt_E_Mail.innerText = Kontakt_Array_E_Mail[i];
        Kontakt_E_Mail.classList.add('tabelleZelle');

        Kontakt_Adresse.innerText = Kontakt_Array_Adresse[i];
        Kontakt_Adresse.classList.add('tabelleZelle');

        Kontakt_Bearbeiten_btn.classList.add('btn_Kontakt_bearbeiten');
        Kontakt_Bearbeiten_btn.textContent = 'Kontakt bearbeiten';
        Kontakt_Bearbeiten_btn.setAttribute("onClick", "Kontakt_bearbeiten(" + i.toString() + ")");

        Kontakt_Bearbeiten.classList.add('tabelleZelle');
        Kontakt_Bearbeiten.appendChild(Kontakt_Bearbeiten_btn);
        
        Kontakt_Löschen_btn.classList.add('btn_Kontakt_bearbeiten');
        Kontakt_Löschen_btn.textContent = 'Kontakt löschen';
        Kontakt_Löschen_btn.style.backgroundColor = 'red';
        Kontakt_Löschen_btn.style.border = '1px solid red';
        Kontakt_Löschen_btn.style.left = '10%';
        Kontakt_Löschen_btn.style.width = '30%';
        Kontakt_Löschen_btn.setAttribute("onClick", "Kontakt_löschen(" + i.toString() + ")");
        Kontakt_Bearbeiten.appendChild(Kontakt_Löschen_btn);


        Kontakt.appendChild(Kontakt_Zahl);
        Kontakt.appendChild(Kontakt_Name);
        Kontakt.appendChild(Kontakt_Telefonnummer);
        Kontakt.appendChild(Kontakt_E_Mail);
        Kontakt.appendChild(Kontakt_Adresse);
        Kontakt.appendChild(Kontakt_Bearbeiten);
        
        document.getElementById('Tabelle_Body').appendChild(Kontakt);
    }
}

function Kontakt_bearbeiten(Kontakt) {
    bearbeiten_Dialog(Kontakt);

    Kontakt_Array_Telefonnummner_unsortiert[Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[Kontakt])].innerText = document.getElementById('InputTelefonnummer');
    Kontakt_Array_E_Mail_unsortiert[Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[Kontakt])].innerText = document.getElementById('InputE_Mail');
    Kontakt_Array_Adresse_unsortiert[Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[Kontakt])].innerText = document.getElementById('InputAdresse');
    Kontakt_Array_Name_unsortiert[Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[Kontakt])].innerText = document.getElementById('InputName');

    gelöschter_Kontakt_Name = document.getElementById('InputName').value;
    gelöschter_Kontakt_Telefonnummer = document.getElementById('InputTelefonnummer').value;
    gelöschter_Kontakt_E_Mail = document.getElementById('InputE_Mail').value;
    gelöschter_Kontakt_Adresse = document.getElementById('InputAdresse').value;

    Kontakt_löschen(Kontakt);
}

function bearbeiten_Dialog(Kontakt) {
    Dialog_visible = false;
    toggle_visibility_Dialog();

    document.getElementById('DialogTitel').innerText = (Kontakt + 1).toString() + '. Kontakt';
    document.getElementById('InputName').value = Kontakt_Array_Name[Kontakt];
    document.getElementById('InputTelefonnummer').value = Kontakt_Array_Telefonnummner[Kontakt];
    document.getElementById('InputE_Mail').value = Kontakt_Array_E_Mail[Kontakt];
    document.getElementById('InputAdresse').value = Kontakt_Array_Adresse[Kontakt];

    gelöschter_Kontakt_Name = document.getElementById('InputName').value;
    gelöschter_Kontakt_Telefonnummer = document.getElementById('InputTelefonnummer').value;
    gelöschter_Kontakt_E_Mail = document.getElementById('InputE_Mail').value;
    gelöschter_Kontakt_Adresse = document.getElementById('InputAdresse').value;

    document.getElementById('Hinzufügen_btn').innerText = 'OK';
    document.getElementById('Hinzufügen_btn').style.left = '85%';

    document.getElementById('Abbrechen_btn').setAttribute("onClick", "Kontakt_bearbeiten_abbrechen()");
}

function Kontakt_bearbeiten_abbrechen(){
    bearbeiten = true;
    kontakt_hinzufügen();
}

function Kontakt_löschen(Kontakt) {
    Kontakt_Array_Telefonnummner_unsortiert.splice(Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[Kontakt]), 1);
    Kontakt_Array_E_Mail_unsortiert.splice(Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[Kontakt]), 1);
    Kontakt_Array_Adresse_unsortiert.splice(Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[Kontakt]), 1);
    Kontakt_Array_Name_unsortiert.splice(Kontakt_Array_Name_unsortiert.indexOf(Kontakt_Array_Name[Kontakt]), 1);

    Kontakt_Array_Name.splice(Kontakt, 1);
    Kontakt_Array_Telefonnummner.splice(Kontakt, 1);
    Kontakt_Array_E_Mail.splice(Kontakt, 1);
    Kontakt_Array_Adresse.splice(Kontakt, 1);

    toggle_visibility_keine_Kontakte();
    Kontakte_einrichten();
    saveContacts();
}