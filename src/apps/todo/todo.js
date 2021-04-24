let lists = {
    "Liste 1": {
        tasks: [
            {
                name: "Test",
                status: "progress"
            },
            {
                name: "Test2",
                status: "progress"
            }
        ]
    }
}

const fs = require('fs');
const path = require('path')
const { initAppearance } = require('../../modules/senos')

function save(){
    fs.writeFileSync(path.join(__dirname, 'lists.json'), JSON.stringify(lists))
}

function load(){
    lists = JSON.parse(fs.readFileSync(path.join(__dirname, 'lists.json')))
}

let currentViewingList = '';
let tmp__currentList = '';
let tmp__currentTask = '';

window.onload = function(){
    initAppearance();
    let sheepyOptions = {
        open: ['FIRST_START'],
        step: [
            {

            }
        ]
    };
    sheepyInit(sheepyOptions);
    load();
    repaintLists()
    $('#lists').hide(0).delay(100).fadeIn(1500)
}

function repaintLists(){
    document.getElementById('lists').innerHTML = '';
    Object.keys(lists).forEach(key => {
        let card = document.createElement('div');
        card.classList.add('card')
        card.style.width = '18rem'
        card.style.margin = '2vh'
        let cb = document.createElement('div');
        cb.classList.add('card-body')
        let title = document.createElement('h5');
        title.classList.add('card-title', 'fw-bold')
        title.innerText = key;
        let tasks = document.createElement('p')
        tasks.classList.add('card-title')
        let a = '';
        let tasks2Do = 0;
        for(let i = 0; i < lists[key].tasks.length; i++){
            if(lists[key].tasks[i].status !== 'done'){
                tasks2Do++;
            }
        }
        if(tasks2Do === 0){
            a = 'Keine Aufgaben'
        }else {
            if(tasks2Do > 1){
                a = tasks2Do + ' Aufgaben';
            }else {
                a = tasks2Do + ' Aufgabe';
            }
        }
        tasks.innerText = a;

        let viewBtn = document.createElement('button');
        let delBtn = document.createElement('button');
        let editBtn = document.createElement('button')
        editBtn.classList.add('btn', 'btn-primary', 'bi', 'bi-pencil')
        editBtn.setAttribute('onclick', 'tmp__currentList = "' + key + '";new bootstrap.Modal(document.getElementById("editListPopup"), {}).show()')

        viewBtn.classList.add('btn', 'btn-primary')
        delBtn.classList.add('btn', 'btn-danger')
        viewBtn.innerText = 'Ansehen'
        delBtn.innerText = 'Löschen'
        viewBtn.style.margin = '0.5vh'
        delBtn.style.margin = '0.5vh'
        viewBtn.setAttribute('onclick', 'viewList("' + key + '")');
        delBtn.setAttribute('onclick', 'deleteList("' + key + '", false)');

        cb.appendChild(title);
        cb.appendChild(tasks)
        cb.appendChild(viewBtn)
        cb.appendChild(editBtn)
        cb.appendChild(delBtn)
        card.style.display = 'inline-block'
        card.appendChild(cb);
        document.getElementById('lists').appendChild(card)
    })
}

function viewList(list){
    currentViewingList = list;
    repaintEvents(list)
    new bootstrap.Modal(document.getElementById('listView'), {}).show()
}

function repaintEvents(list){
    document.getElementById('toDoBody').innerHTML = '';
    document.getElementById('progressBody').innerHTML = '';
    document.getElementById('listViewTitle').innerText = list;
    let tasks2Do = 0;
    for(let i = 0; i < lists[list].tasks.length; i++){
        if(lists[list].tasks[i].status !== 'done'){
            tasks2Do++;
        }
    }
    if(tasks2Do === 0){
        let tr = document.createElement('tr');
        let th0 = document.createElement('th')
        let td0 = document.createElement('td')
        let td1 = document.createElement('td')
        th0.scope = 'row'
        th0.innerText = '0'
        td0.innerText = 'Noch Keine Aufgabe erstellt'
        td1.innerText = 'K/A'
        tr.appendChild(th0)
        tr.appendChild(td0)
        tr.appendChild(td1)
        document.getElementById('toDoBody').appendChild(tr);
    }else {
        let currentIndex = 1;
        Object.values(lists[list].tasks).forEach(task => {
            if(task.status !== 'done'){
                let tr = document.createElement('tr');
                let th0 = document.createElement('th')
                let td0 = document.createElement('td')
                let td1 = document.createElement('td')
                th0.scope = 'row'
                th0.innerText = currentIndex.toString();
                td0.innerText = task.name

                let checkBtn = document.createElement('button')
                let deleteBtn = document.createElement('button')
                let editBtn = document.createElement('button')
                checkBtn.classList.add('btn', 'btn-success', 'bi', 'bi-check')
                editBtn.classList.add('btn', 'btn-primary', 'bi', 'bi-pencil')
                deleteBtn.classList.add('btn', 'btn-danger', 'bi', 'bi-trash')

                editBtn.setAttribute('data-bs-dismiss', 'modal');
                editBtn.setAttribute('onclick', 'tmp__currentTask = "' + task.name + '"; $("#viewList").modal("hide"); new bootstrap.Modal(document.getElementById("editTaskPopup"), {}).show();')
                checkBtn.setAttribute('onclick', 'doTask("' + list + '", ' + lists[list].tasks.indexOf(task) + ')');
                deleteBtn.setAttribute('data-bs-dismiss', 'modal');
                deleteBtn.setAttribute('onclick', 'deleteTask("' + list + '", ' + lists[list].tasks.indexOf(task) + ', false)')

                td1.appendChild(checkBtn)
                td1.appendChild(editBtn)
                td1.appendChild(deleteBtn)

                tr.appendChild(th0)
                tr.appendChild(td0)
                tr.appendChild(td1)
                document.getElementById('toDoBody').appendChild(tr);
                currentIndex++;
            }
        })
    }

    let pCurrentIndex = 1;
    let doneTasks = 0;
    Object.values(lists[list].tasks).forEach(task => {
        if(task.status === 'done'){
            doneTasks++;
        }
    })
    if(doneTasks === 0){
        let tr = document.createElement('tr');
        let th0 = document.createElement('th')
        let td0 = document.createElement('td')
        let td1 = document.createElement('td')
        th0.scope = 'row'
        th0.innerText = '0'
        td0.innerText = 'Noch Keine Aufgabe abgeschlossen'
        td1.innerText = 'K/A'
        tr.appendChild(th0)
        tr.appendChild(td0)
        tr.appendChild(td1)
        document.getElementById('progressBody').appendChild(tr);
    }
    Object.values(lists[list].tasks).forEach(task => {
        if(task.status === 'done') {
            let tr = document.createElement('tr');
            let th0 = document.createElement('th')
            let td0 = document.createElement('td')
            let td1 = document.createElement('td')
            th0.scope = 'row'
            th0.innerText = pCurrentIndex.toString();
            td0.innerText = task.name

            let checkBtn = document.createElement('button')
            let deleteBtn = document.createElement('button')
            let editBtn = document.createElement('button')
            checkBtn.classList.add('btn', 'btn-danger', 'bi', 'bi-x')
            editBtn.classList.add('btn', 'btn-primary', 'bi', 'bi-pencil')
            deleteBtn.classList.add('btn', 'btn-danger', 'bi', 'bi-trash')

            editBtn.setAttribute('data-bs-dismiss', 'modal');
            editBtn.setAttribute('onclick', 'tmp__currentTask = "' + task.name + '"; $("#viewList").modal("hide"); new bootstrap.Modal(document.getElementById("editTaskPopup"), {}).show();')

            checkBtn.setAttribute('onclick', 'undoTask("' + list + '", ' + lists[list].tasks.indexOf(task) +  ')')
            deleteBtn.setAttribute('data-bs-dismiss', 'modal');
            deleteBtn.setAttribute('onclick', 'deleteTask("' + list + '", ' + lists[list].tasks.indexOf(task) + ', false)')

            td1.appendChild(checkBtn)
            td1.appendChild(editBtn)
            td1.appendChild(deleteBtn)

            tr.appendChild(th0)
            tr.appendChild(td0)
            tr.appendChild(td1)
            document.getElementById('progressBody').appendChild(tr);
            pCurrentIndex++
        }
    })
}

function deleteTask(list, index, force){
    if(force){
        lists[list].tasks.splice(index, 1);
        repaintLists();
        viewList(list);
    }else {
        document.getElementById('continueTitle').innerText = 'Aufgabe Löschen?';
        document.getElementById('continueContent').innerHTML = '';
        document.getElementById('continueContent').innerText = 'Willst du die Aufgabe "' + lists[list].tasks[index].name + '" wirklich unwiderruflich löschen?';
        document.getElementById('continueFinal').setAttribute('onclick', 'deleteTask("' + list + '", ' + index + ', true)')
        document.getElementById('continueFinal').innerText = 'Löschen'
        new bootstrap.Modal(document.getElementById('continuePopup'), {}).show();
    }
    save()
}

function deleteList(list, force){
    if(force){
        delete lists[list];
        repaintLists()
        new bootstrap.Modal(document.getElementById('successPopup'), {}).show();
    }else {
        document.getElementById('continueTitle').innerText = 'Liste Löschen?';
        document.getElementById('continueContent').innerHTML = '';
        document.getElementById('continueContent').innerText = 'Willst du die Liste "' + list + '" wirklich unwiderruflich löschen?';
        document.getElementById('continueFinal').setAttribute('onclick', 'deleteList("' + list + '", true)')
        document.getElementById('continueFinal').innerText = 'Löschen'
        new bootstrap.Modal(document.getElementById('continuePopup'), {}).show();
    }
    save()
}

function addTask(){
    let name = document.getElementById('addTaskName').value;
    let b = true;
    Object.values(lists[currentViewingList].tasks).forEach(task => {
        if(task.name === name){
            b = false;
        }
    })
    if(!b){
        document.getElementById('addTaskAlreadyExists').classList.remove('d-none')
    }else {
        lists[currentViewingList].tasks.push({
            name: name,
            status: "progress"
        })
        repaintLists();
        $("#addTaskPopup").modal('hide');
        new bootstrap.Modal(document.getElementById('successPopup'), {}).show();
        document.getElementById('addTaskAlreadyExists').classList.add('d-none')
    }
    save()
}

function addList(){
    let name = document.getElementById('addListName').value;
    if(name === '' || lists[name] !== undefined){
        document.getElementById('addListAlreadyExists').classList.remove('d-none')
    }else {
        lists[name] = {tasks:[]};
        repaintLists();
        $("#addListPopup").modal('hide');
        new bootstrap.Modal(document.getElementById('successPopup'), {}).show();
        document.getElementById('addListAlreadyExists').classList.add('d-none')
    }
    save()
}

function doTask(list, index){
    lists[list].tasks[index].status = 'done';
    repaintEvents(currentViewingList)
    save()
}

function undoTask(list, index){
    lists[list].tasks[index].status = 'progress';
    repaintEvents(currentViewingList)
    save()
}

function editTask(){
    let name = document.getElementById('editTaskName').value;
    let b = true;
    Object.values(lists[currentViewingList].tasks).forEach(task => {
        if(task.name === name){
            b = false;
        }
    })
    if(!b){
        document.getElementById('editTaskAlreadyExists').classList.remove('d-none')
    }else {
        Object.values(lists[currentViewingList].tasks).forEach(task => {
            if(task.name === tmp__currentTask){
                task.name = name;
            }
        })
        repaintLists();
        repaintEvents(currentViewingList)
        $("#editTaskPopup").modal('hide');
        new bootstrap.Modal(document.getElementById('successPopup'), {}).show();
        document.getElementById('editTaskAlreadyExists').classList.add('d-none')
    }
    save()
}

function editList(){
    let name = document.getElementById('editListName').value;
    let b = true;
    if(lists[name] !== undefined){
        b = false;
    }
    if(!b){
        document.getElementById('editListAlreadyExists').classList.remove('d-none')
    }else {
        lists[name] = lists[tmp__currentList];
        delete lists[tmp__currentList];
        repaintLists();
        $("#editListPopup").modal('hide');
        new bootstrap.Modal(document.getElementById('successPopup'), {}).show();
        document.getElementById('editListAlreadyExists').classList.add('d-none')
    }
    save()
}