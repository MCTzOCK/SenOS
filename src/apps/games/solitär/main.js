var cards = {
    stack: [],
    nachziehstapel_close: [],
    nachziehstapel_open: [],
    kreuz: [],
    pik: [],
    herz: [],
    karo: [],
    row1: [],
    row2: [],
    row3: [],
    row4: [],
    row5: [],
    row6: [],
    row7: []
}

var card_height = '172.5px';
var card_width = '111px';
var start_row;

function mix(){
    cards.stack = [
        {
            color: 'kreuz',
            index: 'ass'
        },
        {
            color: 'kreuz',
            index: '2'
        },
        {
            color: 'kreuz',
            index: '3'
        },
        {
            color: 'kreuz',
            index: '4'
        },
        {
            color: 'kreuz',
            index: '5'
        },
        {
            color: 'kreuz',
            index: '6'
        },
        {
            color: 'kreuz',
            index: '7'
        },
        {
            color: 'kreuz',
            index: '8'
        },
        {
            color: 'kreuz',
            index: '9'
        },
        {
            color: 'kreuz',
            index: '10'
        },
        {
            color: 'kreuz',
            index: 'bube'
        },
        {
            color: 'kreuz',
            index: 'dame'
        },
        {
            color: 'kreuz',
            index: 'könig'
        },
        {
            color: 'pik',
            index: 'ass'
        },
        {
            color: 'pik',
            index: '2'
        },
        {
            color: 'pik',
            index: '3'
        },
        {
            color: 'pik',
            index: '4'
        },
        {
            color: 'pik',
            index: '5'
        },
        {
            color: 'pik',
            index: '6'
        },
        {
            color: 'pik',
            index: '7'
        },
        {
            color: 'pik',
            index: '8'
        },
        {
            color: 'pik',
            index: '9'
        },
        {
            color: 'pik',
            index: '10'
        },
        {
            color: 'pik',
            index: 'bube'
        },
        {
            color: 'pik',
            index: 'dame'
        },
        {
            color: 'pik',
            index: 'könig'
        },
        {
            color: 'herz',
            index: 'ass'
        },
        {
            color: 'herz',
            index: '2'
        },
        {
            color: 'herz',
            index: '3'
        },
        {
            color: 'herz',
            index: '4'
        },
        {
            color: 'herz',
            index: '5'
        },
        {
            color: 'herz',
            index: '6'
        },
        {
            color: 'herz',
            index: '7'
        },
        {
            color: 'herz',
            index: '8'
        },
        {
            color: 'herz',
            index: '9'
        },
        {
            color: 'herz',
            index: '10'
        },
        {
            color: 'herz',
            index: 'bube'
        },
        {
            color: 'herz',
            index: 'dame'
        },
        {
            color: 'herz',
            index: 'könig'
        },
        {
            color: 'karo',
            index: 'ass'
        },
        {
            color: 'karo',
            index: '2'
        },
        {
            color: 'karo',
            index: '3'
        },
        {
            color: 'karo',
            index: '4'
        },
        {
            color: 'karo',
            index: '5'
        },
        {
            color: 'karo',
            index: '6'
        },
        {
            color: 'karo',
            index: '7'
        },
        {
            color: 'karo',
            index: '8'
        },
        {
            color: 'karo',
            index: '9'
        },
        {
            color: 'karo',
            index: '10'
        },
        {
            color: 'karo',
            index: 'bube'
        },
        {
            color: 'karo',
            index: 'dame'
        },
        {
            color: 'karo',
            index: 'könig'
        }
    ]

    cards.kreuz.length = 0;
    cards.pik.length = 0;
    cards.herz.length = 0;
    cards.karo.length = 0;
    cards.row1.length = 0;
    cards.row2.length = 0;
    cards.row3.length = 0;
    cards.row4.length = 0;
    cards.row5.length = 0;
    cards.row6.length = 0;
    cards.row7.length = 0;
    cards.nachziehstapel_close.length = 0;
    cards.nachziehstapel_open.length = 0;
    assign_row(cards.row1, cards.stack, 1);
    assign_row(cards.row2, cards.stack, 2);
    assign_row(cards.row3, cards.stack, 3);
    assign_row(cards.row4, cards.stack, 4);
    assign_row(cards.row5, cards.stack, 5);
    assign_row(cards.row6, cards.stack, 6);
    assign_row(cards.row7, cards.stack, 7);
    assign_row(cards.nachziehstapel_close, cards.stack, cards.stack.length);

    repaint_field();
}

function assign_row(row, stack, number) {
    for(var i = 0; i < number; i++) {
        var card = Math.floor(Math.random() * (stack.length - 1));

        row[i] = {
            color: stack[card].color,
            index: stack[card].index,
            open: false
        };

        cards.stack.splice(card, 1);
    }

    if(row == cards.nachziehstapel_close) {
        for(var i = 0; i < number; i++) {
            row[i].open = true;
        }
    }
}

function repaint_field() {
    document.getElementById('field').innerHTML = '';
    
    repaint_nachziehstapel();

    repaint_color(cards.kreuz);
    repaint_color(cards.pik);
    repaint_color(cards.herz);
    repaint_color(cards.karo);

    repaint_row(cards.row1);
    repaint_row(cards.row2);
    repaint_row(cards.row3);
    repaint_row(cards.row4);
    repaint_row(cards.row5);
    repaint_row(cards.row6);
    repaint_row(cards.row7);
}

function repaint_color(color) {
    if(color == cards.kreuz) {
        if(document.getElementById('field').contains(document.getElementById('kreuz'))) {
            document.getElementById('field').removeChild(document.getElementById('kreuz'));
        }
    } else if(color == cards.pik) {
        if(document.getElementById('field').contains(document.getElementById('pik'))) {
            document.getElementById('field').removeChild(document.getElementById('pik'));
        }
    } else if(color == cards.herz) {
        if(document.getElementById('field').contains(document.getElementById('herz'))) {
            document.getElementById('field').removeChild(document.getElementById('herz'));
        }
    } else if(color == cards.karo) {
        if(document.getElementById('field').contains(document.getElementById('karo'))) {
            document.getElementById('field').removeChild(document.getElementById('karo'));
        }
    }

    var img = document.createElement('img');

    if(color.length == 0) {
        if(color == cards.kreuz) {
            img.src = './cards/Kreuz.png';
            img.id = 'kreuz';
            img.style.left = '50%';
            img.setAttribute('ondragover', 'allow_drop(event, cards.kreuz)');
            img.setAttribute('ondrop', 'drop(event, cards.kreuz)');
        } else if(color == cards.pik) {
            img.src = './cards/Pik.png';
            img.id = 'pik';
            img.style.left = '60%';
            img.setAttribute('ondragover', 'allow_drop(event, cards.pik)');
            img.setAttribute('ondrop', 'drop(event, cards.pik)');
        } else if(color == cards.herz) {
            img.src = './cards/Herz.png';
            img.id = 'herz';
            img.style.left = '70%';
            img.setAttribute('ondragover', 'allow_drop(event, cards.herz)');
            img.setAttribute('ondrop', 'drop(event, cards.herz)');
        } else if(color == cards.karo) {
            img.src = './cards/Karo.png';
            img.id = 'karo';
            img.style.left = '80%';
            img.setAttribute('ondragover', 'allow_drop(event, cards.karo)');
            img.setAttribute('ondrop', 'drop(event, cards.karo)');
        }
        img.style.border = '0.2vw dotted black';
        img.style.borderRadius = '3px';
    } else if(color.length > 0) {
        if(color == cards.kreuz) {
            img.src = './cards/Kreuz_' + color[color.length - 1].index + '.png';
            img.id = 'kreuz';
            img.style.left = '50%';
            img.setAttribute('ondragstart', 'drag(event, "' + color[color.length - 1].color + '", "' + color[color.length - 1].index + '", cards.kreuz)');
            img.setAttribute('ondragover', 'allow_drop(event, cards.kreuz)');
            img.setAttribute('ondrop', 'drop(event, cards.kreuz)');
        } else if(color == cards.pik) {
            img.src = './cards/Pik_' + color[color.length - 1].index + '.png';
            img.id = 'pik';
            img.style.left = '60%';
            img.setAttribute('ondragstart', 'drag(event, "' + color[color.length - 1].color + '", "' + color[color.length - 1].index + '", cards.pik)');
            img.setAttribute('ondragover', 'allow_drop(event, cards.pik)');
            img.setAttribute('ondrop', 'drop(event, cards.pik)');
        } else if(color == cards.herz) {
            img.src = './cards/Herz_' + color[color.length - 1].index + '.png';
            img.id = 'herz';
            img.style.left = '70%';
            img.setAttribute('ondragstart', 'drag(event, "' + color[color.length - 1].color + '", "' + color[color.length - 1].index + '", cards.herz)');
            img.setAttribute('ondragover', 'allow_drop(event, cards.herz)');
            img.setAttribute('ondrop', 'drop(event, cards.herz)');
        } else if(color == cards.karo) {
            img.src = './cards/Karo_' + color[color.length - 1].index + '.png';
            img.id = 'karo';
            img.style.left = '80%';
            img.setAttribute('ondragstart', 'drag(event, "' + color[color.length - 1].color + '", "' + color[color.length - 1].index + '", cards.karo)');
            img.setAttribute('ondragover', 'allow_drop(event, cards.karo)');
            img.setAttribute('ondrop', 'drop(event, cards.karo)');
        }
    }
    
    img.style.height = card_height;
    img.style.width = card_width;
    img.style.position = 'absolute';
    img.style.top = '0%';
    img.style.draggable = 'true';

    document.getElementById('field').appendChild(img);
}

function repaint_row(row) {
    if(row == cards.row1) {
        if(document.getElementById('field').contains(document.getElementById('row1'))) {
            document.getElementById('field').removeChild(document.getElementById('row1'));
        }
    } else if(row == cards.row2) {
        if(document.getElementById('field').contains(document.getElementById('row2'))) {
            document.getElementById('field').removeChild(document.getElementById('row2'));
        }
    } else if(row == cards.row3) {
        if(document.getElementById('field').contains(document.getElementById('row3'))) {
            document.getElementById('field').removeChild(document.getElementById('row3'));
        }
    } else if(row == cards.row4) {
        if(document.getElementById('field').contains(document.getElementById('row4'))) {
            document.getElementById('field').removeChild(document.getElementById('row4'));
        }
    } else if(row == cards.row5) {
        if(document.getElementById('field').contains(document.getElementById('row5'))) {
            document.getElementById('field').removeChild(document.getElementById('row5'));
        }
    } else if(row == cards.row6) {
        if(document.getElementById('field').contains(document.getElementById('row6'))) {
            document.getElementById('field').removeChild(document.getElementById('row6'));
        }
    } else if(row == cards.row7) {
        if(document.getElementById('field').contains(document.getElementById('row7'))) {
            document.getElementById('field').removeChild(document.getElementById('row7'));
        }
    }

    var top = 0;
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.width = card_width;
    div.style.height = '73%';
    div.style.top = '25%';
    div.style.border = '0.3vw solid black';

    
    if(row.length > 0) {
        if(row[row.length - 1].open == false){
            row[row.length - 1].open = true;
        }
    }

    for(var i = 0; i < row.length; i++) {
        var img = document.createElement('img');
        if(row[i].open) {
            if(row[i].color == 'kreuz') {
                img.src = './cards/Kreuz_' + row[i].index + '.png';
                img.id = 'kreuz_' + row[i].index;
            } else if(row[i].color == 'pik') {
                img.src = './cards/Pik_' + row[i].index + '.png';
                img.id = 'pik_' + row[i].index;
            } else if(row[i].color == 'herz') {
                img.src = './cards/Herz_' + row[i].index + '.png';
                img.id = 'herz_' + row[i].index;
            } else if(row[i].color == 'karo') {
                img.src = './cards/Karo_' + row[i].index + '.png';
                img.id = 'herz_' + row[i].index;
            }
        } else {
            img.src = './cards/back.png';
        }
        img.style.position = 'absolute';
        img.style.top = top + '%';
        img.style.left = '0%';
        img.style.height = card_height;
        img.style.width = card_width;
        img.style.draggable = 'true';

        if(row == cards.row1) {
            img.setAttribute('ondragstart', 'drag(event, "' + row[i].color + '", "' + row[i].index + '", cards.row1)');
        } else if(row == cards.row2) {
            img.setAttribute('ondragstart', 'drag(event, "' + row[i].color + '", "' + row[i].index + '", cards.row2)');
        } else if(row == cards.row3) {
            img.setAttribute('ondragstart', 'drag(event, "' + row[i].color + '", "' + row[i].index + '", cards.row3)');
        } else if(row == cards.row4) {
            img.setAttribute('ondragstart', 'drag(event, "' + row[i].color + '", "' + row[i].index + '", cards.row4)');
        } else if(row == cards.row5) {
            img.setAttribute('ondragstart', 'drag(event, "' + row[i].color + '", "' + row[i].index + '", cards.row5)');
        } else if(row == cards.row6) {
            img.setAttribute('ondragstart', 'drag(event, "' + row[i].color + '", "' + row[i].index + '", cards.row6)');
        } else if(row == cards.row7) {
            img.setAttribute('ondragstart', 'drag(event, "' + row[i].color + '", "' + row[i].index + '", cards.row7)');
        }

        div.appendChild(img);
        top = top + 7;
    }

    if(row == cards.row1) {
        div.id = 'row1';
        div.setAttribute('ondragover', 'allow_drop(event, cards.row1)');
        div.setAttribute('ondrop', 'drop(event, cards.row1)');
        div.style.left = '5%';
    } else if(row == cards.row2) {
        div.id = 'row2';
        div.setAttribute('ondragover', 'allow_drop(event, cards.row2)');
        div.setAttribute('ondrop', 'drop(event, cards.row2)');
        div.style.left = '18%';
    } else if(row == cards.row3) {
        div.id = 'row3';
        div.setAttribute('ondragover', 'allow_drop(event, cards.row3)');
        div.setAttribute('ondrop', 'drop(event, cards.row3)');
        div.style.left = '31%';
    } else if(row == cards.row4) {
        div.id = 'row4';
        div.setAttribute('ondragover', 'allow_drop(event, cards.row4)');
        div.setAttribute('ondrop', 'drop(event, cards.row4)');
        div.style.left = '44%';
    } else if(row == cards.row5) {
        div.id = 'row5';
        div.setAttribute('ondragover', 'allow_drop(event, cards.row5)');
        div.setAttribute('ondrop', 'drop(event, cards.row5)');
        div.style.left = '57%';
    } else if(row == cards.row6) {
        div.id = 'row6';
        div.setAttribute('ondragover', 'allow_drop(event, cards.row6)');
        div.setAttribute('ondrop', 'drop(event, cards.row6)');
        div.style.left = '70%';
    } else if(row == cards.row7) {
        div.id = 'row7';
        div.setAttribute('ondragover', 'allow_drop(event, cards.row7)');
        div.setAttribute('ondrop', 'drop(event, cards.row7)');
        div.style.left = '83%';
    }

    document.getElementById('field').appendChild(div);
}

function allow_drop(ev, end_row) {
    if(end_row == cards.kreuz && ev.dataTransfer.getData('color') == 'kreuz') {
        if(end_row.length == 0 && ev.dataTransfer.getData('index') == 'ass') {
            ev.preventDefault();
        } else if(end_row.length > 0) {
            if(end_row[end_row.length - 1].index == 'ass' && ev.dataTransfer.getData('index') == '2') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '2' && ev.dataTransfer.getData('index') == '3') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '3' && ev.dataTransfer.getData('index') == '4') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '4' && ev.dataTransfer.getData('index') == '5') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '5' && ev.dataTransfer.getData('index') == '6') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '6' && ev.dataTransfer.getData('index') == '7') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '7' && ev.dataTransfer.getData('index') == '8') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '8' && ev.dataTransfer.getData('index') == '9') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '9' && ev.dataTransfer.getData('index') == '10') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '10' && ev.dataTransfer.getData('index') == 'bube') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == 'bube' && ev.dataTransfer.getData('index') == 'dame') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == 'dame' && ev.dataTransfer.getData('index') == 'könig') {
                ev.preventDefault();
            }
        }
    } else if(end_row == cards.pik) {
        if(end_row.length == 0 && ev.dataTransfer.getData('index') == 'ass') {
            ev.preventDefault();
        } else if(end_row.length > 0) {
            if(end_row[end_row.length - 1].index == 'ass' && ev.dataTransfer.getData('index') == '2') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '2' && ev.dataTransfer.getData('index') == '3') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '3' && ev.dataTransfer.getData('index') == '4') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '4' && ev.dataTransfer.getData('index') == '5') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '5' && ev.dataTransfer.getData('index') == '6') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '6' && ev.dataTransfer.getData('index') == '7') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '7' && ev.dataTransfer.getData('index') == '8') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '8' && ev.dataTransfer.getData('index') == '9') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '9' && ev.dataTransfer.getData('index') == '10') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '10' && ev.dataTransfer.getData('index') == 'bube') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == 'bube' && ev.dataTransfer.getData('index') == 'dame') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == 'dame' && ev.dataTransfer.getData('index') == 'könig') {
                ev.preventDefault();
            }
        }
    } else if(end_row == cards.herz) {
        if(end_row.length == 0 && ev.dataTransfer.getData('index') == 'ass') {
            ev.preventDefault();
        } else if(end_row.length > 0) {
            if(end_row[end_row.length - 1].index == 'ass' && ev.dataTransfer.getData('index') == '2') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '2' && ev.dataTransfer.getData('index') == '3') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '3' && ev.dataTransfer.getData('index') == '4') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '4' && ev.dataTransfer.getData('index') == '5') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '5' && ev.dataTransfer.getData('index') == '6') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '6' && ev.dataTransfer.getData('index') == '7') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '7' && ev.dataTransfer.getData('index') == '8') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '8' && ev.dataTransfer.getData('index') == '9') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '9' && ev.dataTransfer.getData('index') == '10') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '10' && ev.dataTransfer.getData('index') == 'bube') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == 'bube' && ev.dataTransfer.getData('index') == 'dame') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == 'dame' && ev.dataTransfer.getData('index') == 'könig') {
                ev.preventDefault();
            }
        }
    } else if(end_row == cards.karo) {
        if(end_row.length == 0 && ev.dataTransfer.getData('index') == 'ass') {
            ev.preventDefault();
        } else if(end_row.length > 0) {
            if(end_row[end_row.length - 1].index == 'ass' && ev.dataTransfer.getData('index') == '2') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '2' && ev.dataTransfer.getData('index') == '3') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '3' && ev.dataTransfer.getData('index') == '4') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '4' && ev.dataTransfer.getData('index') == '5') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '5' && ev.dataTransfer.getData('index') == '6') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '6' && ev.dataTransfer.getData('index') == '7') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '7' && ev.dataTransfer.getData('index') == '8') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '8' && ev.dataTransfer.getData('index') == '9') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '9' && ev.dataTransfer.getData('index') == '10') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == '10' && ev.dataTransfer.getData('index') == 'bube') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == 'bube' && ev.dataTransfer.getData('index') == 'dame') {
                ev.preventDefault();
            } else if(end_row[end_row.length - 1].index == 'dame' && ev.dataTransfer.getData('index') == 'könig') {
                ev.preventDefault();
            }
        }
    } else if(end_row == cards.row1 || end_row == cards.row2 || end_row == cards.row3 || end_row == cards.row4 || end_row == cards.row5 || end_row == cards.row6 || end_row == cards.row7) {
        if(end_row.length == 0) {
            if(ev.dataTransfer.getData('index') == 'könig') {
                ev.preventDefault();
            }
        } else if(end_row.length > 0) {
            if(((ev.dataTransfer.getData('color') == 'kreuz' || ev.dataTransfer.getData('color') == 'pik') && (end_row[end_row.length - 1].color == 'herz' || end_row[end_row.length - 1].color == 'karo')) || ((ev.dataTransfer.getData('color') == 'herz' || ev.dataTransfer.getData('color') == 'karo') && (end_row[end_row.length - 1].color == 'kreuz' || end_row[end_row.length - 1].color == 'pik'))) {
                if(end_row[end_row.length - 1].index == 'könig' && ev.dataTransfer.getData('index') == 'dame') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == 'dame' && ev.dataTransfer.getData('index') == 'bube') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == 'bube' && ev.dataTransfer.getData('index') == '10') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == '10' && ev.dataTransfer.getData('index') == '9') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == '9' && ev.dataTransfer.getData('index') == '8') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == '8' && ev.dataTransfer.getData('index') == '7') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == '7' && ev.dataTransfer.getData('index') == '6') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == '6' && ev.dataTransfer.getData('index') == '5') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == '5' && ev.dataTransfer.getData('index') == '4') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == '4' && ev.dataTransfer.getData('index') == '3') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == '3' && ev.dataTransfer.getData('index') == '2') {
                    ev.preventDefault();
                } else if(end_row[end_row.length - 1].index == '2' && ev.dataTransfer.getData('index') == 'ass') {
                    ev.preventDefault();
                }
            }
        }
    }
}

function drag(ev, color, index, row) {
    ev.dataTransfer.setData('color', color);
    ev.dataTransfer.setData('index', index);
    start_row = row;
}
  
function drop(ev, end_row) {
    ev.preventDefault();
    var color = ev.dataTransfer.getData('color');
    var index = ev.dataTransfer.getData('index');

    if(start_row != cards.nachziehstapel_open && start_row != cards.kreuz && start_row != cards.pik && start_row != cards.herz && start_row != cards.karo && end_row != cards.kreuz && end_row != cards.pik && end_row != cards.herz && end_row != cards.karo) {
        start_row.forEach(element => {
            if(element.color == color && element.index == index) {
                var main_i = (start_row.length - start_row.indexOf(element));
                for(var i = main_i; i > 0; i--) {
                    end_row.push(start_row[start_row.length - i]);
                }
                for(var i = main_i; i > 0; i--) {
                    start_row.splice((start_row.length - i), 1);
                }
                if(end_row != start_row) {
                    repaint_row(end_row);
                }
                repaint_row(start_row);
            }
        });
    } else if(start_row == cards.nachziehstapel_open) {
        end_row.push(start_row[start_row.length - 1]);
        start_row.splice((start_row.length - 1), 1);

        if(end_row != start_row) {
            if(end_row == cards.kreuz || end_row == cards.pik || end_row == cards.herz || end_row == cards.karo) {
                repaint_color(end_row);
            } else {
                repaint_row(end_row);
            }
        }
        repaint_nachziehstapel();
    } else {
        end_row.push(start_row[start_row.length - 1]);
        start_row.splice((start_row.length - 1), 1);

        if(end_row == cards.kreuz || end_row == cards.pik || end_row == cards.herz || end_row == cards.karo) {
            repaint_color(end_row);
        } else {
            repaint_row(end_row);
        }

        if(start_row == cards.kreuz || start_row == cards.pik || start_row == cards.herz || start_row == cards.karo) {
            repaint_color(start_row);
        } else {
            repaint_row(start_row);
        }
    }
    
    if(cards.row1.length == '0' && cards.row2.length == '0' && cards.row3.length == '0' && cards.row4.length == '0' && cards.row5.length == '0' && cards.row6.length == '0' && cards.row7.length == '0' && cards.nachziehstapel_close.length == '0' && cards.nachziehstapel_open.length == '0') {
        end_game();
    }
}

function nachziehstapel_click() {
    if(cards.nachziehstapel_close.length > 0) {
        cards.nachziehstapel_open.push(cards.nachziehstapel_close[cards.nachziehstapel_close.length - 1]);
        cards.nachziehstapel_close.splice((cards.nachziehstapel_close.length - 1), 1);
    } else if(cards.nachziehstapel_close.length == 0) {
        for(var i = 0; i < cards.nachziehstapel_open.length; i++) {
            cards.nachziehstapel_close[i] = cards.nachziehstapel_open[i];
        }
        cards.nachziehstapel_open.length = 0;
    }

    repaint_nachziehstapel();
}

function repaint_nachziehstapel() {
    if(document.getElementById('field').contains(document.getElementById('nachziehstapel_close'))) {
        document.getElementById('field').removeChild(document.getElementById('nachziehstapel_close'));
    }
    
    if(document.getElementById('field').contains(document.getElementById('nachziehstapel_open'))) {
        document.getElementById('field').removeChild(document.getElementById('nachziehstapel_open'));
    }

    var nachziehstapel_close = document.createElement('img');
    nachziehstapel_close.id = 'nachziehstapel_close';
    nachziehstapel_close.style.height = card_height;
    nachziehstapel_close.style.width = card_width;
    nachziehstapel_close.style.position = 'absolute';
    nachziehstapel_close.style.left = '0%';
    nachziehstapel_close.style.top = '0%';
    nachziehstapel_close.setAttribute('onclick', 'nachziehstapel_click()');
    
    if(cards.nachziehstapel_close.length > 0) {
        nachziehstapel_close.src = './cards/back.png';
    } else {
        nachziehstapel_close.src = './cards/nachziehstapel.png';
        nachziehstapel_close.style.border = '0.2vw dotted black';
        nachziehstapel_close.style.borderRadius = '3px';
    }

    if(cards.nachziehstapel_open.length > 0) {
        var nachziehstapel_open = document.createElement('img');
        nachziehstapel_open.id = 'nachziehstapel_open';
        
        if(cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].color == 'kreuz') {
            nachziehstapel_open.src = './cards/Kreuz_' + cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].index + '.png';
        } else if(cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].color == 'pik') {
            nachziehstapel_open.src = './cards/Pik_' + cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].index + '.png';
        } else if(cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].color == 'herz') {
            nachziehstapel_open.src = './cards/Herz_' + cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].index + '.png';
        } else if(cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].color == 'karo') {
            nachziehstapel_open.src = './cards/Karo_' + cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].index + '.png';
        }

        nachziehstapel_open.setAttribute('ondragstart', 'drag(event, "' + cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].color + '", "' + cards.nachziehstapel_open[cards.nachziehstapel_open.length - 1].index + '", cards.nachziehstapel_open)');

        nachziehstapel_open.style.height = card_height;
        nachziehstapel_open.style.width = card_width;
        nachziehstapel_open.style.position = 'absolute';
        nachziehstapel_open.style.left = '10%';
        nachziehstapel_open.style.top = '0%';

        document.getElementById('field').appendChild(nachziehstapel_open);
    }

    document.getElementById('field').appendChild(nachziehstapel_close);
}

function end_game() {
    document.getElementById('field').innerHTML = '';
    document.getElementById('start_screen').style.visibility = 'visible';
    document.getElementById('start_screen').style.display = 'block';
}

function start_game() {
    document.getElementById('start_screen').style.visibility = 'hidden';
    document.getElementById('start_screen').style.display = 'none';
    mix();
}