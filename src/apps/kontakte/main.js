const modal = new bootstrap.Modal(document.getElementById('new_knt'), {});

var kontakte = {
    kontakte: [

    ]
}

var b = false;
var b2 = false;

window.onload = function(){
    let sheepyOptions = {
        open: ['FIRST_START'],
        steps: [
            {
                title: "Kontakt erstellen (1)",
                content: "Um einen Kontakt zu erstellen genügt es auf den Knopf unten Links mit der Beschriftung 'Kontakt hinzufügen' mit der linken Maustaste zu klicken."
            },
            {
                title: "Kontakt erstellen (2)",
                content: "Danach erscheint eine weiße Fläche, in der du die Daten des Kontaktes eingeben kannst."
            },
            {
                title: "Kontakt erstellen (3)",
                content: "Abschließen musst du noch einmal auf den blauen Knopf 'Hinzufügen' klicken. Nun siehst du deinen Kontakt als Karte angezeigt!"
            },
            {
                title: "Kontakt bearbeiten (1)",
                content: ""
            }
        ]
    }
    sheepyInit(sheepyOptions)
}

function add() {
    b = false;
    kontakte.kontakte.forEach(element => {
        if(document.getElementById('new_knt_name').value == element.name && document.getElementById('new_knt_number').value == element.number && document.getElementById('new_knt_email').value == element.email && document.getElementById('new_knt_adress').value == element.adress) {
            document.getElementById('no_name').classList.add('hidden');
            document.getElementById('already_knt').classList.remove('hidden');
            b = true;
        }
    });
    
    if(document.getElementById('new_knt_name').value == '') {
        document.getElementById('already_knt').classList.add('hidden');
        document.getElementById('no_name').classList.remove('hidden');
    } else if(!b) {
        modal.hide();

        kontakte.kontakte[kontakte.kontakte.length] = {
            name: document.getElementById('new_knt_name').value,
            number: document.getElementById('new_knt_number').value,
            email: document.getElementById('new_knt_email').value,
            adress: document.getElementById('new_knt_adress').value
        }

        document.getElementById('no_cards').classList.add('hidden');

        document.getElementById('new_knt_name').value = '';
        document.getElementById('new_knt_number').value = '';
        document.getElementById('new_knt_email').value = '';
        document.getElementById('new_knt_adress').value = '';

        kontakte.kontakte.sort(function(a, b) {
            return a.name > b.name;
        });

        document.getElementById('cards').innerHTML = '';

        kontakte.kontakte.forEach(element => {
            add_card((kontakte.kontakte.indexOf(element)) + 1);
        });
        document.getElementById('already_knt').classList.add('hidden');
        document.getElementById('no_name').classList.add('hidden');
    }
}

function add_card(card_number) {
    var card = document.createElement('div');
    card.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_'  + kontakte.kontakte[card_number - 1].email + '_'  + kontakte.kontakte[card_number - 1].adress;
    card.classList.add('c-grid');
    card.classList.add('card');
    card.style.width = "18rem";

    var img = document.createElement('img');
    img.src = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
    img.classList.add('card-img-top');

    var card_body = document.createElement('div');
    card_body.classList.add('card-body');

    var name = document.createElement('h5');
    name.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_name';
    name.classList.add("card-title");
    name.innerText = kontakte.kontakte[card_number - 1].name;

    var name_input = document.createElement('input');
    name_input.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_name_input';
    name_input.classList.add('card-title');
    name_input.placeholder = 'Name';
    name_input.classList.add('hidden');
    name_input.style.userSelect = 'text';
    
    var text = document.createElement('p');
    text.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_text';
    text.classList.add('card-text');
    text.innerHTML = "Telefonnummer: " + kontakte.kontakte[card_number - 1].number + "<br>" + "E-Mail: " + kontakte.kontakte[card_number - 1].email + "<br>" + 'Adresse: ' + kontakte.kontakte[card_number - 1].adress;
    
    var text_input = document.createElement('div');
    text_input.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_text_input';
    text_input.classList.add('card-text');
    text_input.classList.add('hidden');
    
    var number_input = document.createElement('input');
    number_input.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_number_input';
    number_input.placeholder = 'Telefonnummer';
    number_input.style.userSelect = 'text';
    var email_input = document.createElement('input');
    email_input.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_email_input';
    email_input.placeholder = 'E-Mail';
    email_input.style.userSelect = 'text';
    email_input.style.marginTop = '0.5%';
    var adresse_input = document.createElement('input');
    adresse_input.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_adresse_input';
    adresse_input.placeholder = 'Adresse';
    adresse_input.style.userSelect = 'text';
    adresse_input.style.marginTop = '0.5%';

    text_input.appendChild(number_input);
    text_input.appendChild(email_input);
    text_input.appendChild(adresse_input);

    var existing = document.createElement('p');
    existing.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_existing';
    existing.classList.add('hidden');
    existing.classList.add('error_card');
    existing.innerText = 'Dieser Kontakt ist schon vorhanden!';

    var missing_name = document.createElement('p');
    missing_name.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_missing_name';
    missing_name.classList.add('hidden');
    missing_name.classList.add('error_card');
    missing_name.innerText = 'Füllen Sie das Feld für den Namen aus!';

    var btn_edit = document.createElement('a');
    btn_edit.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_btn_edit';
    btn_edit.href = 'javascript:edit("' + card_number + '")';
    btn_edit.classList.add('btn');
    btn_edit.classList.add('btn-primary');
    btn_edit.style.marginTop = '2%';
    btn_edit.innerText = 'Bearbeiten';

    var btn_finish = document.createElement('a');
    btn_finish.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_btn_finish';
    btn_finish.href = 'javascript:finish("' + card_number + '")';
    btn_finish.classList.add('hidden');
    btn_finish.classList.add('btn');
    btn_finish.classList.add('btn-primary');
    btn_finish.style.marginTop = '2%';
    btn_finish.innerText = 'Fertig';

    var btn_delete = document.createElement('a');
    btn_delete.id = kontakte.kontakte[card_number - 1].name + '_' + kontakte.kontakte[card_number - 1].number + '_' + kontakte.kontakte[card_number - 1].email + '_' + kontakte.kontakte[card_number - 1].adress + '_btn_delete';
    btn_delete.href = 'javascript:delete_card("' + card_number + '")';
    btn_delete.classList.add('btn');
    btn_delete.classList.add('btn-primary');
    btn_delete.style.position = 'absolute';
    btn_delete.style.right = '5%';
    btn_delete.style.marginTop = '2%';
    btn_delete.innerText = 'Löschen';

    card_body.appendChild(name);
    card_body.appendChild(name_input);
    card_body.appendChild(text);
    card_body.appendChild(text_input);
    card_body.appendChild(existing);
    card_body.appendChild(missing_name);
    card_body.appendChild(btn_edit);
    card_body.appendChild(btn_finish);
    card_body.appendChild(btn_delete);
    card.appendChild(img);
    card.appendChild(card_body);
    document.getElementById('cards').appendChild(card);
}

function edit(card) {
    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_name').classList.add('hidden');
    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_text').classList.add('hidden');
    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_btn_edit').classList.add('hidden');

    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_name_input').classList.remove('hidden');
    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_text_input').classList.remove('hidden');
    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_btn_finish').classList.remove('hidden');

    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_name_input').value = kontakte.kontakte[card - 1].name;
    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_number_input').value = kontakte.kontakte[card - 1].number;
    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_email_input').value = kontakte.kontakte[card - 1].email;
    document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress + '_adresse_input').value = kontakte.kontakte[card - 1].adress;
}

function finish(card) {
    b2 = false;
    var s = kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress;

    kontakte.kontakte.forEach(element => {
        if(document.getElementById(s + '_name_input').value == element.name && document.getElementById(s + '_number_input').value == element.number && document.getElementById(s + '_email_input').value == element.email && document.getElementById(s + '_adresse_input').value == element.adress && (card - 1) !== kontakte.kontakte.indexOf(element)) {
            document.getElementById(s + '_existing').classList.remove('hidden');
            document.getElementById(s + '_missing_name').classList.add('hidden');
            b2 = true;
        }
    });

    if(document.getElementById(s + '_name_input').value == '') {
        document.getElementById(s + '_existing').classList.add('hidden');
        document.getElementById(s + '_missing_name').classList.remove('hidden');
    } else if(!b2) {
        var s2 = document.getElementById(s + '_name_input').value + '_' + document.getElementById(s + '_number_input').value + '_' + document.getElementById(s + '_email_input').value + '_' + document.getElementById(s + '_adresse_input').value;

        kontakte.kontakte[card - 1] = {
            name: document.getElementById(s + '_name_input').value,
            number: document.getElementById(s + '_number_input').value,
            email: document.getElementById(s + '_email_input').value,
            adress: document.getElementById(s + '_adresse_input').value
        }

        document.getElementById(s).id = s2;
        document.getElementById(s + '_name').id = s2 + '_name';
        document.getElementById(s + '_text').id = s2 + '_text';
        document.getElementById(s + '_text_input').id = s2 + '_text_input';
        document.getElementById(s + '_btn_edit').id = s2 + '_btn_edit';
        document.getElementById(s + '_btn_finish').id = s2 + '_btn_finish';
        document.getElementById(s + '_btn_delete').id = s2 + '_btn_delete';
        document.getElementById(s + '_name_input').id = s2 + '_name_input';
        document.getElementById(s + '_number_input').id = s2 + '_number_input';
        document.getElementById(s + '_email_input').id = s2 + '_email_input';
        document.getElementById(s + '_adresse_input').id = s2 + '_adresse_input';
        document.getElementById(s + '_existing').id = s2 + '_existing';
        document.getElementById(s + '_missing_name').id = s2 + '_missing_name';

        document.getElementById(s2 + '_name').classList.remove('hidden');
        document.getElementById(s2 + '_text').classList.remove('hidden');
        document.getElementById(s2 + '_btn_edit').classList.remove('hidden');

        document.getElementById(s2  + '_name_input').classList.add('hidden');
        document.getElementById(s2  + '_text_input').classList.add('hidden');
        document.getElementById(s2  + '_btn_finish').classList.add('hidden');

        document.getElementById(s2  + '_name').innerText = kontakte.kontakte[card - 1].name;
        document.getElementById(s2  + '_text').innerHTML = "Telefonnummer: " + kontakte.kontakte[card - 1].number + "<br>" + "E-Mail: " + kontakte.kontakte[card - 1].email + "<br>" + 'Adresse: ' + kontakte.kontakte[card - 1].adress;
        
        document.getElementById(s2 + '_existing').classList.add('hidden');
        document.getElementById(s2 + '_missing_name').classList.add('hidden');
    }
}

function delete_card(card) {
    document.getElementById('cards').removeChild(document.getElementById(kontakte.kontakte[card - 1].name + '_' + kontakte.kontakte[card - 1].number + '_' + kontakte.kontakte[card - 1].email + '_' + kontakte.kontakte[card - 1].adress));
    kontakte.kontakte.splice(card - 1, 1);
    kontakte.kontakte.forEach(element => {
        document.getElementById(element.name + '_' + element.number + '_' + element.email + '_' + element.adress + '_btn_edit').href = 'javascript:edit("' + (kontakte.kontakte.indexOf(element) + 1) + '")';
        document.getElementById(element.name + '_' + element.number + '_' + element.email + '_' + element.adress + '_btn_finish').href = 'javascript:finish("' + (kontakte.kontakte.indexOf(element) + 1) + '")';
        document.getElementById(element.name + '_' + element.number + '_' + element.email + '_' + element.adress + '_btn_delete').href = 'javascript:delete_card("' + (kontakte.kontakte.indexOf(element) + 1) + '")';
    });
    
    if(kontakte.kontakte.length == 0) {
        document.getElementById('no_cards').classList.remove('hidden');
    }
}

function show_add_popup() {
    modal.toggle();
}