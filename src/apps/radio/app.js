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