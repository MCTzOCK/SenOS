reloadData(); // Backend Method call to load passwords

var passwöter = [];
var apps = [];
var active_app;

function show_password() {
    if(document.getElementById('show_hidden_password').innerText === 'Anzeigen') {
        document.getElementById('password_input_text').value = document.getElementById('password_input').value;
        document.getElementById('password_input').style.visibility = 'hidden';
        document.getElementById('password_input').style.display = 'none';
        document.getElementById('password_input_text').style.visibility = 'visible';
        document.getElementById('password_input_text').style.display = 'block';
        document.getElementById('show_hidden_password').innerText = 'Verstecken';
    } else if(document.getElementById('show_hidden_password').innerText === 'Verstecken') {
        document.getElementById('password_input').value = document.getElementById('password_input_text').value;
        document.getElementById('password_input').style.visibility = 'visible';
        document.getElementById('password_input').style.display = 'block';
        document.getElementById('password_input_text').style.visibility = 'hidden';
        document.getElementById('password_input_text').style.display = 'none';
        document.getElementById('show_hidden_password').innerText = 'Anzeigen';
    }
}

function open_app(app) {
    apps.forEach(element => {
        document.getElementById(element).style.backgroundColor = "lightgrey";
    });
    document.getElementById(apps[apps.indexOf("app_" + app)]).style.backgroundColor = "rgb(148, 148, 148)";
    document.getElementById('password_input').value = passwöter[apps.indexOf("app_" + app)];
    document.getElementById('password_input_text').value = passwöter[apps.indexOf("app_" + app)];
    active_app = app;
}

function save_password(input) {
    passwöter[apps.indexOf("app_" + active_app)] = document.getElementById(input).value;
    document.getElementById('password_input').value = document.getElementById(input).value;
    document.getElementById('password_input_text').value = document.getElementById(input).value;
}

function new_password_show() {
    document.getElementById('Passwort').style.visibility = "hidden";
    document.getElementById('Passwort').style.display = 'none';
    document.getElementById('new_password').style.visibility = "visible";
    document.getElementById('new_password').style.display = "block";
    document.getElementById('new_password_input_app').value = "";
    document.getElementById('new_password_input_password').value = '';
}

function new_password(Passwort, App) {
    new_password_hidden();
    passwöter.push(Passwort);
    apps.push("app_" + App);

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var app = App;

    document.getElementById('keinePasswörter').style.visibility = 'hidden';
    document.getElementById('keinePasswörter').style.display = 'none';
    document.getElementById('keinPasswort').style.visibility = 'hidden';
    document.getElementById('keinPasswort').style.display = 'none';

    td.classList.add("apps");

    td.onclick = function() {
        open_app(app);
    }

    td.innerText = App;
    td.id = "app_" + App;

    tr.appendChild(td);
    document.getElementById('apps_list').appendChild(tr);
    open_app(app);
    saveData(apps, passwöter); // Backend Method call to save passwords
}

function new_password_hidden() {
    document.getElementById('Passwort').style.visibility = "visible";
    document.getElementById('Passwort').style.display = 'block';
    document.getElementById('new_password').style.visibility = "hidden";
    document.getElementById('new_password').style.display = "none";
}

function delete_password() {
    passwöter.splice(apps.indexOf("app_" + active_app), 1);
    apps.splice(apps.indexOf("app_" + active_app), 1);
    document.getElementById('apps_list').innerHTML = "<tr> <td style=" + "'border-bottom: solid black 0.2vw;'" + ">App/URL/Website</td> </tr> <tr> <td id=" + "keinePasswörter" + " class=" + "apps"  + " style=" + "'font-size: 1.5vw; text-align: center;'" + ">--Noch keine Passwörter vorhanden.--</td> </tr>";

    if(apps.length === 0) {
        document.getElementById('keinePasswörter').style.visibility = "visible";
        document.getElementById('keinePasswörter').style.display = "block";
        document.getElementById('keinPasswort').style.visibility = "visible";
        document.getElementById('keinPasswort').style.display = "block";
        document.getElementById('password_input').value = "";
        document.getElementById('password_input_text').value = "";
    } else {
        document.getElementById('keinePasswörter').style.visibility = "hidden";
        document.getElementById('keinePasswörter').style.display = "none";
        document.getElementById('keinPasswort').style.visibility = "hidden";
        document.getElementById('keinPasswort').style.display = "none";
        apps.forEach(element => {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            var app = element;

            td.classList.add("apps");

            td.onclick = function() {
                open_app(app.replace("app_", ""));
            }

            td.innerText = element.replace("app_", "");
            td.id = element;

            tr.appendChild(td);
            document.getElementById('apps_list').appendChild(tr);
        });
    }

    saveData(apps, passwöter); // Backend Method call to save passwords
}
initUI(); // Backend Method call to load passwords