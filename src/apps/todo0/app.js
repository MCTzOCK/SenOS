var lists_top = 2.5;
var lists = {};
var boolean = false;
var selected_list = "";
var list_content_top = 5;

function open_add_list_popup() {
    if (document.getElementById('popup_name_list').classList.contains('hidden')) {
        document.getElementById('popup_name_list').classList.remove('hidden');
    } else {
        document.getElementById('popup_name_list').classList.add('hidden');
    }
}

function cancel_add_list() {
    document.getElementById('popup_name_list').classList.add('hidden');
    document.getElementById('popup_name_list_input').value = '';
}

function cancel_add_event() {
    document.getElementById('popup_add_event').classList.add('hidden');
    document.getElementById('popup_add_event_input').value = '';
}

function add_list() {
    Object.keys(lists).forEach(function(entry){
        if(document.getElementById('popup_name_list_input').value == entry) {
            boolean = true;
        }
    });
    if(!boolean) {
        lists[document.getElementById('popup_name_list_input').value] = {
            task:{
                done:[],
                progress:[]
            }
        }

        repaint_lists();

        var list_content_title = document.createElement('p');
        list_content_title.innerText = document.getElementById('popup_name_list_input').value;
        list_content_title.classList.add('list_content_title');

        var list_content_add_event_btn = document.createElement('button');
        list_content_add_event_btn.innerText = 'Aufgabe hinzufügen';
        list_content_add_event_btn.classList.add('list_content_add_event_btn');
        list_content_add_event_btn.setAttribute('onclick', 'show_add_event_popup()');
        list_content_add_event_btn.style.cursor = 'pointer';
        
        var list_content = document.createElement('div');
        list_content.id = document.getElementById('popup_name_list_input').value + '_content';
        list_content.classList.add('list_content');
        list_content.classList.add('hidden');

        list_content.appendChild(list_content_title);
        list_content.appendChild(list_content_add_event_btn);
        document.getElementById('list_content_list').appendChild(list_content);

        select_list(document.getElementById('popup_name_list_input').value);
        document.getElementById('no_lists').classList.add('hidden');
        document.getElementById('already_existing').classList.add('hidden');
        document.getElementById('popup_name_list').classList.add('hidden');
        document.getElementById('popup_name_list_input').value = '';
    } else {
        document.getElementById('already_existing').classList.remove('hidden');
    }
    boolean = false;
}

function repaint_lists() {
    lists_top = 2.5;
    document.getElementById('list_content').innerHTML = '';

    Object.keys(lists).forEach(function(entry){
        lists_top += 7.5;
        var list = document.createElement('button');
        list.style.top = lists_top + '%';
        list.innerText = entry;
        list.id = entry;
        list.classList.add('lists_list');
        list.setAttribute('onclick', 'select_list("' + entry + '")');
        list.style.cursor = 'pointer';
        
        // var a = document.createElement('a');
        // var img = document.createElement('img');
        // img.src = 'trash.png';
        // img.style.width = '50px';
        // img.style.height = '50px';
        // a.style.width = '50px';
        // a.style.height = '50px';
        // a.style.position = 'absolute';
        // a.style.left = '85%';
        // a.style.top = '10%';
        // a.href = 'javascript:delete_list("' + entry + '")';
        // a.appendChild(img);

        // list.appendChild(a);
        document.getElementById('list_content').appendChild(list);
    });
}

function select_list(list) {
    document.getElementById('no_list_selected').classList.add('hidden');
    Object.keys(lists).forEach(function(entry){
        if(list == entry) {
            document.getElementById(entry).style.backgroundColor = 'rgb(180, 180, 180)';
            document.getElementById(entry + '_content').classList.remove('hidden');
        } else {
            document.getElementById(entry).style.backgroundColor = 'lightgrey';
            document.getElementById(entry + '_content').classList.add('hidden');
        }
    });
    selected_list = list;
    if(lists[selected_list].task.progress.length == 0 && lists[selected_list].task.done.length == 0) {
        document.getElementById('no_events').classList.remove('hidden');
    }

    document.getElementById('popup_add_event').classList.add('hidden');
    document.getElementById('popup_name_list').classList.add('hidden');
}

function show_add_event_popup() {
    document.getElementById('popup_add_event_input').value = '';
    document.getElementById('popup_add_event').classList.remove('hidden');
}

function add_event() {
    lists[selected_list]['task']['progress'].push(document.getElementById('popup_add_event_input').value);

    repaint_events();

    document.getElementById('popup_add_event').classList.add('hidden');
    if(lists[selected_list]['task']['progress'].length > 0 || lists[selected_list]['task']['done'].length > 0) {
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

    list_content_top = 2.5;
    Object.keys(lists[selected_list].task.progress).forEach(function(entry){
        list_content_top += 10;
        var list_event_div = document.createElement('div');
        list_event_div.classList.add('list_event_div');
        list_event_div.style.top = list_content_top + '%';
        list_event_div.innerText = lists[selected_list].task.progress[entry];
        
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
        a.href = 'javascript:change_to_done("' + lists[selected_list].task.progress[entry] + '")';
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
        a2.href = 'javascript:delete_event_progress("' + lists[selected_list].task.progress[entry] + '")';
        a2.appendChild(list_event_delete_img);
        
        list_event_div.appendChild(a);
        list_event_div.appendChild(a2);
        document.getElementById('list_events').appendChild(list_event_div);
    });

    if(lists[selected_list].task.done.length > 0) {
        list_content_top += 10;
        var done_events = document.createElement('div');
        done_events.classList.add('hidden');
        done_events.classList.add('done_events');
        done_events.style.top = list_content_top + '%';
        done_events.innerText = '------------- schon gemachte Aufgaben -------------';
        done_events.classList.remove('hidden');
        list_events.appendChild(done_events);

        Object.keys(lists[selected_list].task.done).forEach(function(entry){
            list_content_top += 10;
            var list_event_div = document.createElement('div');
            list_event_div.classList.add('list_event_div');
            list_event_div.style.top = list_content_top + '%';
            list_event_div.innerText = lists[selected_list].task.done[entry];
        
            var a = document.createElement('a');
            var list_event_done_img = document.createElement('img');
            list_event_done_img.src = 'img.png';
            list_event_done_img.style.width = '50px';
            list_event_done_img.style.height = '50px';
            a.style.width = '50px';
            a.style.height = '50px';
            a.style.position = 'absolute';
            a.style.left = '80%';
            a.style.top = '10%';
            a.href = 'javascript:change_to_progress("' + lists[selected_list].task.done[entry] + '")';
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
            a2.href = 'javascript:delete_event_done("' + lists[selected_list].task.done[entry] + '")';
            a2.appendChild(list_event_delete_img);

            list_event_div.appendChild(a);
            list_event_div.appendChild(a2);
            document.getElementById('list_events').appendChild(list_event_div);
        });
    }
}

function change_to_done(task) {
    lists[selected_list].task.progress.splice(lists[selected_list].task.progress.indexOf(task), 1);
    lists[selected_list].task.done.push(task);
    repaint_events();
}

function change_to_progress(task) {
    lists[selected_list].task.done.splice(lists[selected_list].task.done.indexOf(task), 1);
    lists[selected_list].task.progress.push(task);
    repaint_events();
}

function delete_event_done(task) {
    lists[selected_list].task.done.splice(lists[selected_list].task.done.indexOf(task), 1);
    repaint_events();
    if(lists[selected_list].task.done.length == 0 && lists[selected_list].task.progress.length == 0) {
        document.getElementById('no_events').classList.remove('hidden');
    }
}

function delete_event_progress(task) {
    lists[selected_list].task.progress.splice(lists[selected_list].task.progress.indexOf(task), 1);
    repaint_events();
    if(lists[selected_list].task.done.length == 0 && lists[selected_list].task.progress.length == 0) {
        document.getElementById('no_events').classList.remove('hidden');
    }
}