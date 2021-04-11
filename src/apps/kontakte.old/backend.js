// Copyright (c) 2020 Ben Siebert. All rights reserved.

const fs = require('fs');
const path = require('path');
function saveContacts(){
    let data = {contacts: {}};
    for(let i = 0; i < Kontakt_Array_Name.length; i++){
        data.contacts[i] = data.contacts[i] || {};
        data.contacts[i].name = Kontakt_Array_Name[i];
        data.contacts[i].phone = Kontakt_Array_Telefonnummner[i];
        data.contacts[i].mail = Kontakt_Array_E_Mail[i];
        data.contacts[i].address = Kontakt_Array_Adresse[i];
    }
    console.log('Saved config.')
    fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(data));
}

function loadContacts(){
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, './data.json')));
    Object.entries(data.contacts).forEach(([key, value]) => {
        Kontakte_Kontakt_hinzufügen(value.name, value.phone, value.mail, value.address, false);
    });
    Kontakte_einrichten();
}

function initContacts(){
    loadContacts();
}