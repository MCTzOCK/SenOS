const modal = new bootstrap.Modal(document.getElementById('new_list'), {});
const modal2 = new bootstrap.Modal(document.getElementById('new_event'), {});

var lists_top = 2.5;
var lists = {
    lists: [

    ]
}

// MCTzOCK - Start
const fs = require('fs');
const path = require('path');
__load();
repaint_lists()
function __load(){
    lists = JSON.parse(fs.readFileSync(path.join(__dirname, 'lists.json')));
    lists.lists.forEach(_list => {
        let r = document.createElement('div');
        let p = document.createElement('p');
        let c = document.createElement('div');
        let b = document.createElement('a');
        r.id = _list.name + "_content";
        r.classList.add('list_content', 'hidden')
        p.classList.add('list_content_title');
        p.innerText = _list.name;
        c.style.display = 'flex';
        c.style.justifyContent = 'right';
        c.style.alignItems = 'flex-end';
        c.style.position = 'absoulute';
        c.style.height = '98%';
        c.style.width = '98%';
        b.classList.add('btn', 'btn-primary');
        b.setAttribute('href', 'javascript:show_add_event_popup()');
        b.style.cursor = 'pointer';
        b.innerText = 'Aufgabe hinzufügen';
        c.appendChild(b)
        r.appendChild(p)
        r.appendChild(c)
        document.getElementById('list_content_list').appendChild(r);
    })
    if(lists.lists.length > 0){
        document.getElementById('no_lists').classList.add('hidden');
    }
}

function __save(){
    fs.writeFileSync(path.join(__dirname, 'lists.json'), JSON.stringify(lists));
}

// MCTzOCK - End

var boolean = false;
var b = false;
var b2 = false;
var s = "";
var selected_list;
var list_content_top = 5;

function open_add_list_popup() {
    document.getElementById('popup_name_list_input').value = '';
    modal.toggle();
}

function add_list() {
    lists.lists.forEach(element => {
        if(document.getElementById('popup_name_list_input').value == element.name) {
            boolean = true;
        }
    });
    if(!boolean) {
        lists.lists.push({
            name: document.getElementById('popup_name_list_input').value,
            task: {
                done:[],
                progress:[]
            }
        });

        repaint_lists();

        var list_content_title = document.createElement('p');
        list_content_title.innerText = document.getElementById('popup_name_list_input').value;
        list_content_title.classList.add('list_content_title');

        var list_content_add_event_btn_div = document.createElement('div');
        list_content_add_event_btn_div.style.display = 'flex';
        list_content_add_event_btn_div.style.justifyContent = 'right';
        list_content_add_event_btn_div.style.alignItems = 'flex-end';
        list_content_add_event_btn_div.style.position = 'absolute';
        list_content_add_event_btn_div.style.height = '98%';
        list_content_add_event_btn_div.style.width = '98%';

        var list_content_add_event_btn = document.createElement('button');
        list_content_add_event_btn.innerText = 'Aufgabe hinzufügen';
        list_content_add_event_btn.classList.add('btn');
        list_content_add_event_btn.classList.add('btn-primary');
        list_content_add_event_btn.setAttribute('onclick', 'show_add_event_popup()');
        list_content_add_event_btn.style.cursor = 'pointer';

        list_content_add_event_btn_div.appendChild(list_content_add_event_btn);
        
        var list_content = document.createElement('div');
        list_content.id = document.getElementById('popup_name_list_input').value + '_content';
        list_content.classList.add('list_content');
        list_content.classList.add('hidden');

        list_content.appendChild(list_content_title);
        list_content.appendChild(list_content_add_event_btn_div);
        document.getElementById('list_content_list').appendChild(list_content);

        select_list(document.getElementById('popup_name_list_input').value);
        document.getElementById('no_lists').classList.add('hidden');
        document.getElementById('already_existing').classList.add('hidden');
        modal2.hide();
        document.getElementById('popup_name_list_input').value = '';
    } else {
        document.getElementById('already_existing').classList.remove('hidden');
    }
    boolean = false;
    // MCTzOCK - Start
    __save();
    // MCTzOCK - End
}

function repaint_lists() {
    lists_top = 2.5;
    document.getElementById('list_content').innerHTML = '';

    lists.lists.forEach(element => {
        lists_top += 7.5;
        var list = document.createElement('button');
        list.style.top = lists_top + '%';
        list.innerText = element.name;
        list.id = element.name;
        list.classList.add('lists_list');
        list.setAttribute('onclick', 'select_list("' + element.name + '")');
        list.style.cursor = 'pointer';

        var a2 = document.createElement('a');
        var img = document.createElement('img');
        img.src = 'trash.png';
        img.style.width = '100%';
        img.style.height = '100%';
        a2.style.width = '12%';
        a2.style.height = '6%';
        a2.style.position = 'absolute';
        a2.style.left = '85%';
        a2.style.top = (lists_top + 0.5) + '%';
        a2.href = 'javascript:delete_list("' + lists.lists.indexOf(element) + '")';
        a2.appendChild(img);

        document.getElementById('list_content').appendChild(list);
        document.getElementById('list_content').appendChild(a2);
    });
}

function select_list(list) {
    document.getElementById('no_list_selected').classList.add('hidden');

    lists.lists.forEach(element => {
        if(list == element.name) {
            document.getElementById(element.name).style.backgroundColor = 'rgb(180, 180, 180)';
            document.getElementById(element.name + '_content').classList.remove('hidden');
        } else {
            document.getElementById(element.name).style.backgroundColor = 'lightgrey';
            document.getElementById(element.name + '_content').classList.add('hidden');
        }
    });

    lists.lists.forEach(element => {
        if(element.name == list) {
            selected_list = lists.lists.indexOf(element);
        }
    });

    if(lists.lists[selected_list].task.progress.length == 0 && lists.lists[selected_list].task.done.length == 0) {
        document.getElementById('no_events').classList.remove('hidden');
    }

    modal2.hide();
    modal.hide();
}

function show_add_event_popup() {
    console.log('1')
    document.getElementById('popup_add_event_input').value = '';
    modal2.toggle();
}

function add_event() {
    lists.lists[selected_list].task.progress.push(document.getElementById('popup_add_event_input').value);

    repaint_events();

    modal2.hide();
    if(lists.lists[selected_list].task.progress.length > 0 || lists.lists[selected_list].task.done.length > 0) {
        document.getElementById('no_events').classList.add('hidden');
    }
}

function repaint_events() {
    document.getElementById('list_events').innerHTML = '';

    var no_events = document.createElement('p');
    no_events.id = 'no_events';
    no_events.classList.add('nothing_selected');
    no_events.classList.add('hidden');
    document.getElementById('list').appendChild(no_events);

    list_content_top = 0;

    lists.lists[selected_list].task.progress.forEach(element => {
        var list_event_div = document.createElement('div');
        list_event_div.classList.add('list_event_div');
        list_event_div.style.top = list_content_top + '%';
        list_event_div.innerText = element;

        var a = document.createElement('a');
        var list_event_done_img = document.createElement('img');
        list_event_done_img.src = 'icon.png';
        list_event_done_img.style.width = '50px';
        list_event_done_img.style.height = '50px';
        a.style.width = '50px';
        a.style.height = '50px';
        a.style.position = 'absolute';
        a.style.left = '80%';
        a.style.top = '10%';
        a.href = 'javascript:change_to_done("' + element + '")';
        a.appendChild(list_event_done_img);

        var a2 = document.createElement('a');
        var list_event_delete_img = document.createElement('img');
        list_event_delete_img.src = 'trash.png';
        list_event_delete_img.style.width = '50px';
        list_event_delete_img.style.height = '50px';
        a2.style.width = '50px';
        a2.style.height = '50px';
        a2.style.position = 'absolute';
        a2.style.left = '90%';
        a2.style.top = '10%';
        a2.href = 'javascript:delete_event_progress("' + element + '")';
        a2.appendChild(list_event_delete_img);

        list_event_div.appendChild(a);
        list_event_div.appendChild(a2);
        document.getElementById('list_events').appendChild(list_event_div);
        list_content_top += 10;
    });

    if(lists.lists[selected_list].task.done.length > 0) {
        var done_events = document.createElement('div');
        done_events.classList.add('hidden');
        done_events.classList.add('done_events');
        done_events.style.top = list_content_top + '%';
        done_events.innerText = '------------- schon gemachte Aufgaben -------------';
        done_events.classList.remove('hidden');
        list_events.appendChild(done_events);

        lists.lists[selected_list].task.done.forEach(element => {
            list_content_top += 10;
            var list_event_div = document.createElement('div');
            list_event_div.classList.add('list_event_div');
            list_event_div.style.top = list_content_top + '%';
            list_event_div.innerText = element;

            var a2 = document.createElement('a');
            var list_event_delete_img = document.createElement('img');
            list_event_delete_img.src = 'trash.png';
            list_event_delete_img.style.width = '50px';
            list_event_delete_img.style.height = '50px';
            a2.style.width = '50px';
            a2.style.height = '50px';
            a2.style.position = 'absolute';
            a2.style.left = '90%';
            a2.style.top = '10%';
            a2.href = 'javascript:delete_event_done("' + element + '")';
            a2.appendChild(list_event_delete_img);

            list_event_div.appendChild(a2);
            document.getElementById('list_events').appendChild(list_event_div);
            list_content_top += 10;
        });
    }
}

function change_to_done(task) {
    lists.lists[selected_list].task.progress.splice(lists.lists[selected_list].task.progress.indexOf(task), 1);
    lists.lists[selected_list].task.done.push(task);
    repaint_events();
}

function change_to_progress(task) {
    lists.lists[selected_list].task.done.splice(lists.lists[selected_list].task.done.indexOf(task), 1);
    lists.lists[selected_list].task.progress.push(task);
    repaint_events();
}

function delete_event_done(task) {
    lists.lists[selected_list].task.done.splice(lists.lists[selected_list].task.done.indexOf(task), 1);
    repaint_events();
    if(lists.lists[selected_list].task.done.length == 0 && lists.lists[selected_list].task.progress.length == 0) {
        document.getElementById('no_events').classList.remove('hidden');
    }
    // MCTzOCK - Start
    __save();
    // MCTzOCK - End
}

function delete_event_progress(task) {
    lists.lists[selected_list].task.progress.splice(lists.lists[selected_list].task.progress.indexOf(task), 1);
    repaint_events();
    if(lists.lists[selected_list].task.done.length == 0 && lists.lists[selected_list].task.progress.length == 0) {
        document.getElementById('no_events').classList.remove('hidden');
    }
}

function delete_list(list) {
    if(list < selected_list) {
        selected_list = selected_list - 1;
    } else if(list == selected_list) {
        document.getElementById('no_events').classList.add('hidden');
        document.getElementById('no_list_selected').classList.remove('hidden');
        select_list(lists.lists[selected_list].name);
    }

    document.getElementById('list_content_list').removeChild(document.getElementById(lists.lists[list].name + '_content'));
    lists.lists.splice(list, 1);

    if(lists.lists.length == 0) {
        document.getElementById('no_lists').classList.remove('hidden');
    }
    // MCTzOCK - Start
    __save();
    // MCTzOCK - End
    repaint_lists();
}