const fs = require('fs');
const path = require('path');
const http = require('https');
const rimraf = require('rimraf');
const AdmZip = require('adm-zip');

let data = {
    apps: [
        {
            name: "Decryptor",
            logo: "https://mctzock.de/assets/images/decryptor-900x900.jpg",
            short_description: "Short Description",
            long_description: "Long Description",
            pckDownload: "https://craftions.net/senos/pkg/decryptor/latest.zip"
        },
        {
            name: "SenOS",
            logo: "https://avatars.githubusercontent.com/u/69637254?s=200&v=4",
            short_description: "The easy way to go",
            long_description: "",
            pckDownload: ""
        }
    ]
};

for(let i = 0; i < data.apps.length; i++) {
    let card = document.createElement("div");
    let img = document.createElement("img");
    let cardbody = document.createElement("div");
    let title = document.createElement("h2");
    let text = document.createElement("p");
    let view = document.createElement("button");

    card.classList.add("c-grid")
    card.classList.add("card")
    card.style.width = "18rem"
    img.src = data.apps[i].logo
    img.classList.add("card-img-top")
    cardbody.classList.add("card-body")
    title.classList.add("card-title")
    title.innerText = data.apps[i].name
    text.classList.add("card-text")
    text.innerText = data.apps[i].short_description
    view.classList.add("btn")
    view.classList.add("btn-primary")
    view.innerText = "App ansehen."
    view.setAttribute("onclick", "showAppDetails(" + i + ")")
    cardbody.appendChild(title)
    cardbody.appendChild(text)
    cardbody.appendChild(view)
    card.appendChild(img)
    card.appendChild(cardbody)

    document.getElementById("apps").appendChild(card);
}

function showAppDetails(index){
    document.getElementById("sen-replace-app-name").innerText = data.apps[index].name;
    document.getElementById("sen-replace-app-description").innerHTML = data.apps[index].long_description; // change to "innerText" to disable HTML Tags
    let installed = false;
    if(fs.existsSync(path.join(__dirname, "../" + data.apps[index].name))){installed = true}
    if(installed){
        document.getElementById("sen-replace-app-installed").innerText = "App deinstallieren"
        document.getElementById("sen-replace-app-installed").setAttribute('onclick', 'deleteApp(' + index + ', false)');
        document.getElementById("sen-replace-app-installed").classList.add("btn-danger")
    }else {
        document.getElementById("sen-replace-app-installed").innerText = "App installieren"
        document.getElementById("sen-replace-app-installed").setAttribute('onclick', 'installApp(' + index + ')');
        document.getElementById("sen-replace-app-installed").classList.add("btn-primary")
    }

    let modal = new bootstrap.Modal(document.getElementById("app-details-page"), {})
    modal.show();
}

function installApp(index){
    let app_name = data.apps[index].name;
    // mkdir
    fs.mkdirSync(path.join(__dirname, "../" + app_name));
    // download
    const file = fs.createWriteStream(path.join(__dirname, "../" + app_name + "/temp.zip"));
    const r = http.get(data.apps[index].pckDownload, function (response) {
        response.pipe(file);
        response.on("end", function() {
            let app_root = path.join(__dirname, "../" + app_name + "/");
            let zip = new AdmZip(path.join(__dirname, "../" + app_name + "/temp.zip"), {});
            let entries = zip.getEntries();
            entries.forEach(function(entry) {
                console.log(entry)
                if(entry.isDirectory){
                    if(entry.entryName.indexOf("/") > 0){
                        let s = entry.entryName.split("/");
                        for(let i = 0; i < s.length; i++) {
                            let a_p = "";
                            if(i > 0){
                                a_p=s[i-1]+"/"+s[i];
                            }else {
                                a_p=s[i];
                            }
                            fs.mkdirSync(path.join(app_root, a_p));
                        }
                    }else {
                        console.log(entry.entryName);
                        fs.mkdirSync(path.join(app_root, entry.entryName));
                    }
                }else {
                    fs.writeFileSync(path.join(app_root, entry.entryName), entry.getData().toString());
                }
            })
            fs.unlinkSync(app_root + "temp.zip");
            addToAppConfig(index);
        })
    });
}

function deleteApp(index, confirm){
    if(confirm){
        rimraf.sync(path.join(__dirname, "../" + data.apps[index].name));
        removeFromAppConfig(index);
        window.location.reload();
    }else {
        let modal = new bootstrap.Modal(document.getElementById("info-page"), {});
        document.getElementById("sen-replace-info-title").innerText = data.apps[index].name + " deinstallieren?"
        document.getElementById("sen-replace-info-text").innerText = "Wenn du auf \"Ok\" klickst, wird " + data.apps[index].name + " unwiederuflich gelöscht! Hierbei können Daten verloren gehen!"
        document.getElementById("app-uninstall-force").setAttribute("onclick", "deleteApp(" + index + ", true)");
        modal.show();
    }
}

function addToAppConfig(index){
    let current = JSON.parse(fs.readFileSync(path.join(__dirname, "../../apps.json")));
    current.reg_apps_cfg[current.reg_apps_cfg.length] =
        {
            "name": data.apps[index].name,
            "display": data.apps[index].name,
            "version": 1.0,
            "author": "SenOS Development Team",
            "icon": "apps/" + data.apps[index].name + "/icon.png",
            "description": data.apps[index].short_description,
            "uninstall": true,
            "desktop": true
        };
    current.name.push(data.apps[index].name);
    fs.writeFileSync(path.join(__dirname, "../../apps.json"), JSON.stringify(current));
}

function removeFromAppConfig(index){
    let current = JSON.parse(fs.readFileSync(path.join(__dirname, "../../apps.json")));
    let cI = 0;
    for(let i = 0; i < current.reg_apps_cfg.length; i++){
        if(current.reg_apps_cfg[i].name === data.apps[index].name){
            cI = i;
            break;
        }
    }/*
    delete current.reg_apps_cfg[cI];
    delete current.name[cI];*/
    current.reg_apps_cfg.splice(cI, 1);
    current.name.splice(cI, 1);
    fs.writeFileSync(path.join(__dirname, "../../apps.json"), JSON.stringify(current));
}