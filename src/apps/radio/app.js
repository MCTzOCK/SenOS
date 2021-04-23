let currentSender = '';

function start(sender){
    if(currentSender !== ''){
        stop(currentSender);
        document.getElementById(sender).load()
    }
    currentSender = sender;
    if(document.getElementById(currentSender).paused){
        document.getElementById(currentSender).play();
        document.getElementById('currentSender').innerText = "Aktueller Sender: " + currentSender;
    }else {
        stop(currentSender);
        currentSender = '';
    }
}
function stop(sender){
    document.getElementById(sender).load();
    document.getElementById(sender).pause();
    document.getElementById(sender).currentTime = 0;
    document.getElementById('currentSender').innerText = 'Aktueller Sender: Kein Sender';
}

window.onload = function(){
    let sheepyOptions = {
        open: ['FIRST_START'],
        steps: [
            {
                title: "Einleitung",
                content: "In dieser Anwenung kannst du Radio hören."
            },
            {
                title: "Radio Sender hören",
                content: "Du siehst weiter oben eine Liste von allen vorhandenen Sendern. Um nun einem Sender zu zu hören genügt es auf den Knopf 'Abspielen' zu klicken, welcher sich unter dem Namen des jeweiligen Senders befindet."
            },
            {
                title: "Radio stoppen",
                content: "Das Radio stoppen kannst du, in dem du weiter oben auf den Knopf 'Radio stoppen' klickst."
            }
        ]
    }
    sheepyInit(sheepyOptions);
}