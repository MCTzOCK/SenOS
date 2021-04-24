const fs = require('fs');
const path = require('path');
const { animationLevel, initAppearance } = require('../../modules/senos')

let gamesDir = fs.readdirSync(__dirname, {});

let games = [];

gamesDir.forEach(gameDir => {
    if(fs.lstatSync(path.join(__dirname, gameDir)).isDirectory()){
        games.push(gameDir);
    }
})

window.onload = function() {
    initAppearance();
    document.getElementById('cards').innerHTML = ''
    games.forEach(gameDir => {
        let config = JSON.parse(fs.readFileSync(path.join(path.join(__dirname, gameDir), 'game.json')));
        let name = config.name;
        let description = config.description;

        let card = document.createElement('div');
        let cardImg = document.createElement('img');
        let cardBody = document.createElement('div');
        let cardTitle = document.createElement('h2');
        let cardText = document.createElement('p');
        let cardButton = document.createElement('button')

        cardImg.src = path.join(path.join(__dirname, gameDir), 'banner.png');
        cardTitle.innerText = name;
        cardText.innerText = description;
        cardButton.innerText = "Spielen";
        cardButton.setAttribute('onclick', 'openGame("' + gameDir + '")')

        card.classList.add('card', 'c-grid')
        cardImg.classList.add('card-img-top')
        cardBody.classList.add('card-body')
        cardTitle.classList.add('card-title')
        cardButton.classList.add('btn', 'btn-outline-primary')

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardButton);

        card.appendChild(cardImg);
        card.appendChild(cardBody);
        document.getElementById('cards').appendChild(card);
    })
}

function openGame(gameDir){
    document.getElementById('gameAreaFrame').setAttribute('src', path.join(path.join(__dirname, gameDir), 'index.html'))
    if(animationLevel === 2){
        document.getElementById('cards').className = '';
        document.getElementById('cards').classList.add('animation', 'animation-fadeOut-bottom', 'animation-medium')
        setTimeout(() => {
            document.getElementById('cards').className = '';
            document.getElementById('cards').classList.add('d-none');
            document.getElementById('gameArea').className = '';
            document.getElementById('gameArea').classList.add('animation', 'animation-fadeIn-top', 'animation-medium')
        }, 1000)
    }else {
        document.getElementById('cards').className = '';
        document.getElementById('cards').classList.add('d-none')
        document.getElementById('gameArea').className = '';
    }
}