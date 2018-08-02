
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

console.log('init');

socket.on('connect', onConnect);

function onConnect(){
  console.log('connect ' + socket.id);
}


// To Self
document.querySelector("#toSelfButton").onclick = () => {
    const m = document.querySelector("#toSelfMessage").value;
    socket.emit('toSelf', m)
}

socket.on('toSelf.success', m => {
    blink(document.querySelector("#toSelfSignal"))
    document.querySelector("#toSelfResult").innerText = m;
})


const blink = target => {
    target.style = "background-color: lime;";
    setTimeout(()=> {
        target.style = "";
    }, 150)
}
