function openFile(path0){
    console.log(path0)
    document.getElementById('bg').src = path0
}

function switchBack(){
    window.parent.openApp('explorer.new')
}