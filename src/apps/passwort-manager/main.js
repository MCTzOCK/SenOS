const modal = new bootstrap.Modal(document.getElementById('new_password'), {});

const { initAppearance } = require('../../modules/senos')

initAppearance();

var password = {
    password: [

    ]
}

var b = false;
var b2 = false;
var deleting_card;

function add() {
    b = false;
    password.password.forEach(element => {
        if(document.getElementById('new_password_app_url').value == element.app_url && document.getElementById('new_password_username').value == element.username && document.getElementById('new_password_password').value == element.password) {
            document.getElementById('no_app_url').classList.add('hidden');
            document.getElementById('already_password').classList.remove('hidden');
            b = true;
        }
    });
    
    if(document.getElementById('new_password_app_url').value == '') {
        document.getElementById('already_password').classList.add('hidden');
        document.getElementById('no_app_url').classList.remove('hidden');
    } else if(!b) {
        modal.hide();

        password.password[password.password.length] = {
            app_url: document.getElementById('new_password_app_url').value,
            username: document.getElementById('new_password_username').value,
            password: document.getElementById('new_password_password').value
        }

        document.getElementById('no_cards').classList.add('hidden');

        document.getElementById('new_password_app_url').value = '';
        document.getElementById('new_password_username').value = '';
        document.getElementById('new_password_password').value = '';

        password.password.sort(function(a, b) {
            return a.name > b.name;
        });

        document.getElementById('cards').innerHTML = '';

        password.password.forEach(element => {
            add_card((password.password.indexOf(element)) + 1);
        });
        document.getElementById('already_password').classList.add('hidden');
        document.getElementById('no_app_url').classList.add('hidden');
    }
}

function add_card(card_number) {
    var card = document.createElement('div');
    card.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_'  + password.password[card_number - 1].password;
    card.classList.add('c-grid');
    card.classList.add('card');
    card.style.width = "18rem";

    var card_body = document.createElement('div');
    card_body.classList.add('card-body');

    var app_url = document.createElement('h5');
    app_url.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_app_url';
    app_url.classList.add("card-title");
    app_url.innerText = password.password[card_number - 1].app_url;

    var app_url_div = document.createElement('div');
    app_url_div.classList.add('input-group');
    app_url_div.classList.add('card-title');

    var app_url_span = document.createElement('span');
    app_url_span.classList.add('input-group-text');
    app_url_span.classList.add('col-sm-3s');
    app_url_span.innerText = 'App/URL';

    var app_url_input = document.createElement('input');
    app_url_input.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_app_url_input';
    app_url_input.classList.add('form-control');
    app_url_input.placeholder = 'App/URL';
    app_url_input.classList.add('hidden');
    app_url_input.style.userSelect = 'text';

    app_url_div.appendChild(app_url_span);
    app_url_div.appendChild(app_url_input);
    
    var text = document.createElement('p');
    text.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_text';
    text.classList.add('card-text');
    text.innerHTML = "Benutzername: " + password.password[card_number - 1].username + "<br>" + "Passwort: " + password.password[card_number - 1].password;

    var text_input = document.createElement('div');
    text_input.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_text_input';
    text_input.classList.add('card-text');
    text_input.classList.add('hidden');

    var username_div = document.createElement('div');
    username_div.classList.add('input-group');

    var username_span = document.createElement('span');
    username_span.classList.add('input-group-text');
    username_span.classList.add('col-sm-3s');
    username_span.innerText = 'Benutzername';
    
    var username_input = document.createElement('input');
    username_input.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_username_input';
    username_input.classList.add('form-control');
    username_input.placeholder = 'Benutzername';
    username_input.style.userSelect = 'text';

    username_div.appendChild(username_span);
    username_div.appendChild(username_input);

    
    var password_div = document.createElement('div');
    password_div.classList.add('input-group');

    var password_span = document.createElement('span');
    password_span.classList.add('input-group-text');
    password_span.classList.add('col-sm-3s');
    password_span.innerText = 'Passwort';

    var password_input = document.createElement('input');
    password_input.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_password_input';
    password_input.classList.add('form-control');
    password_input.placeholder = 'Passwort';
    password_input.style.userSelect = 'text';
    password_input.style.marginTop = '0.5%';
    password_input.type = 'password';
    
    var eye = document.createElement('i');
    eye.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_eye';
    eye.classList.add('bi');
    eye.classList.add('bi-eye-slash-fill');
    eye.classList.add('input-group-text');
    eye.setAttribute('onclick', 'javascript:show_password("' + password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '")');

    password_div.appendChild(password_span);
    password_div.appendChild(password_input);
    password_div.appendChild(eye);

    text_input.appendChild(app_url_div);
    text_input.appendChild(username_div);
    text_input.appendChild(password_div);

    var existing = document.createElement('p');
    existing.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_existing';
    existing.classList.add('hidden');
    existing.classList.add('error_card');
    existing.innerText = 'Dieses Passwort ist schon vorhanden!';

    var missing_app_url = document.createElement('p');
    missing_app_url.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_missing_app_url';
    missing_app_url.classList.add('hidden');
    missing_app_url.classList.add('error_card');
    missing_app_url.innerText = 'Füllen Sie das Feld für die App bzw. URL aus!';

    var btn_edit = document.createElement('a');
    btn_edit.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_btn_edit';
    btn_edit.href = 'javascript:edit("' + card_number + '")';
    btn_edit.classList.add('btn');
    btn_edit.classList.add('btn-primary');
    btn_edit.style.marginTop = '2%';
    btn_edit.innerText = 'Bearbeiten';

    var btn_finish = document.createElement('a');
    btn_finish.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_btn_finish';
    btn_finish.href = 'javascript:finish("' + card_number + '")';
    btn_finish.classList.add('hidden');
    btn_finish.classList.add('btn');
    btn_finish.classList.add('btn-primary');
    btn_finish.style.marginTop = '2%';
    btn_finish.innerText = 'Fertig';

    var btn_delete = document.createElement('a');
    btn_delete.id = password.password[card_number - 1].app_url + '_' + password.password[card_number - 1].username + '_' + password.password[card_number - 1].password + '_btn_delete';
    btn_delete.setAttribute('onclick', 'new bootstrap.Modal(document.getElementById("deleteCardPopup"), {}).show(); deleting_card = ' + card_number);
    btn_delete.classList.add('btn');
    btn_delete.classList.add('btn-primary');
    btn_delete.style.position = 'absolute';
    btn_delete.style.right = '5%';
    btn_delete.style.marginTop = '2%';
    btn_delete.innerText = 'Löschen';

    card_body.appendChild(app_url);
    card_body.appendChild(text);
    card_body.appendChild(text_input);
    card_body.appendChild(existing);
    card_body.appendChild(missing_app_url);
    card_body.appendChild(btn_edit);
    card_body.appendChild(btn_finish);
    card_body.appendChild(btn_delete);
    card.appendChild(card_body);
    document.getElementById('cards').appendChild(card);
}

function edit(card) {
    document.getElementById(password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password + '_app_url').classList.add('hidden');
    document.getElementById(password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password + '_text').classList.add('hidden');
    document.getElementById(password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password + '_btn_edit').classList.add('hidden');

    document.getElementById(password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password + '_app_url_input').classList.remove('hidden');
    document.getElementById(password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password + '_text_input').classList.remove('hidden');
    document.getElementById(password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password + '_btn_finish').classList.remove('hidden');

    document.getElementById(password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password + '_app_url_input').value = password.password[card - 1].app_url;
    document.getElementById(password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password + '_username_input').value = password.password[card - 1].username;
    document.getElementById(password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password + '_password_input').value = password.password[card - 1].password;
}

function finish(card) {
    b2 = false;
    var s = password.password[card - 1].app_url + '_' + password.password[card - 1].username + '_' + password.password[card - 1].password;

    password.password.forEach(element => {
        if(document.getElementById(s + '_app_url_input').value == element.app_url && document.getElementById(s + '_username_input').value == element.username && document.getElementById(s + '_password_input').value == element.password && (card - 1) !== password.password.indexOf(element)) {
            document.getElementById(s + '_existing').classList.remove('hidden');
            document.getElementById(s + '_missing_app_url').classList.add('hidden');
            b2 = true;
        }
    });

    if(document.getElementById(s + '_app_url_input').value == '') {
        document.getElementById(s + '_existing').classList.add('hidden');
        document.getElementById(s + '_missing_app_url').classList.remove('hidden');
    } else if(!b2) {
        var s2 = document.getElementById(s + '_app_url_input').value + '_' + document.getElementById(s + '_username_input').value + '_' + document.getElementById(s + '_password_input').value;

        password.password[card - 1] = {
            app_url: document.getElementById(s + '_app_url_input').value,
            username: document.getElementById(s + '_username_input').value,
            password: document.getElementById(s + '_password_input').value
        }

        document.getElementById(s).id = s2;
        document.getElementById(s + '_app_url').id = s2 + '_app_url';
        document.getElementById(s + '_text').id = s2 + '_text';
        document.getElementById(s + '_text_input').id = s2 + '_text_input';
        document.getElementById(s + '_btn_edit').id = s2 + '_btn_edit';
        document.getElementById(s + '_btn_finish').id = s2 + '_btn_finish';
        document.getElementById(s + '_btn_delete').id = s2 + '_btn_delete';
        document.getElementById(s + '_app_url_input').id = s2 + '_app_url_input';
        document.getElementById(s + '_username_input').id = s2 + '_username_input';
        document.getElementById(s + '_password_input').id = s2 + '_password_input';
        document.getElementById(s + '_existing').id = s2 + '_existing';
        document.getElementById(s + '_missing_app_url').id = s2 + '_missing_app_url';

        document.getElementById(s2 + '_app_url').classList.remove('hidden');
        document.getElementById(s2 + '_text').classList.remove('hidden');
        document.getElementById(s2 + '_btn_edit').classList.remove('hidden');

        document.getElementById(s2  + '_app_url_input').classList.add('hidden');
        document.getElementById(s2  + '_text_input').classList.add('hidden');
        document.getElementById(s2  + '_btn_finish').classList.add('hidden');

        document.getElementById(s2  + '_app_url').innerText = password.password[card - 1].app_url;
        document.getElementById(s2  + '_text').innerHTML = "Benutzername: " + password.password[card - 1].username + "<br>" + "Passwort: " + password.password[card - 1].password;
        
        document.getElementById(s2 + '_existing').classList.add('hidden');
        document.getElementById(s2 + '_missing_app_url').classList.add('hidden');
    }
}

function delete_card() {
    document.getElementById('cards').removeChild(document.getElementById(password.password[deleting_card - 1].app_url + '_' + password.password[deleting_card - 1].username + '_' + password.password[deleting_card - 1].password));
    password.password.splice(deleting_card - 1, 1);
    password.password.forEach(element => {
        document.getElementById(element.app_url + '_' + element.username + '_' + element.password + '_btn_edit').href = 'javascript:edit("' + (password.password.indexOf(element) + 1) + '")';
        document.getElementById(element.app_url + '_' + element.username + '_' + element.password + '_btn_finish').href = 'javascript:finish("' + (password.password.indexOf(element) + 1) + '")';
        document.getElementById(element.app_url + '_' + element.username + '_' + element.password + '_btn_delete').href = 'new bootstrap.Modal(document.getElementById("deleteCardPopup"), {}).show(); deleting_card = ' + (password.password.indexOf(element) + 1);
    });
    
    if(password.password.length == 0) {
        document.getElementById('no_cards').classList.remove('hidden');
    }
}

function show_add_popup() {
    modal.toggle();
}

function gen(){
    let allowedChars = '';
    let lenght = 8;
        
    allowedChars+='@#$%!&?+-:,.;=§';
    allowedChars+='123456789';
    allowedChars+='abcdefghijklmnopqrstuvwxyz';
    allowedChars+='abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    allowedChars+='{}[]()/\\\'`´|><*~';

    var result = '';
    var charactersLength = allowedChars.length;
    for ( var i = 0; i < lenght; i++ ) {
        result += allowedChars.charAt(Math.floor(Math.random() * charactersLength));
    }
    document.getElementById('new_password_password').value = result;
}

function show_password_popup() {
    if(document.getElementById('popup_eye').classList.contains('bi-eye-fill')) {
        document.getElementById('popup_eye').classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
        document.getElementById('new_password_password').setAttribute('type', 'password');
    } else {
        document.getElementById('popup_eye').classList.replace('bi-eye-slash-fill', 'bi-eye-fill');  
        document.getElementById('new_password_password').setAttribute('type', 'text');
    }
}

function show_password(id) {
    if(document.getElementById(id + '_eye').classList.contains('bi-eye-fill')) {
        document.getElementById(id + '_eye').classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
        document.getElementById(id + '_password_input').setAttribute('type', 'password');
    } else {
        document.getElementById(id + '_eye').classList.replace('bi-eye-slash-fill', 'bi-eye-fill');  
        document.getElementById(id + '_password_input').setAttribute('type', 'text');
    }
}