const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'todo.json')));
let lists = [];
init();

function init(){
    for (var list in config.lists){
        lists[lists.length] = list;
    }
}

function initLists(){
    for(let i = 0; i< lists.length; i++){
        let li = document.createElement('a');
        li.href = 'javascript:openList("' + lists[i] + '");';
        li.classList.add('link');
        li.innerText = config.lists[lists[i]].display;
        document.getElementById('lists').appendChild(li);
    }
}

function openList(name){
    const e = config.lists[name];
    console.log("Displaying list " + e.display);
    document.getElementById('listTitle').innerText = e.display;
    document.getElementById('listTitle').classList.remove('notVisible');
    document.getElementById('information_no_selected').classList.add('notVisible');
    console.log('Displaying tasks...');
    let tasks_names = [];
    let tasks_finis = [];
    for(var task in config.lists[name].tasks){
        console.log('Creating task ' + config.lists[name].tasks[task] + '...');
        tasks_names[tasks_names.length] = config.lists[name].tasks[task].name;
        tasks_finis[tasks_finis.length] = config.lists[name].tasks[task].finished;
    }
    for(let i = 0; i < tasks_names.length; i++){
        let task_e = document.createElement('p');
        task_e.textContent = tasks_names[i] + ', ' + tasks_finis[i];
        task_e.classList.add('task');
        document.getElementById('tasks').appendChild(task_e);
    }
    document.getElementById('tasks').classList.remove('notVisible');
}