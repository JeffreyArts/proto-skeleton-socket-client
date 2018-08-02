
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', onConnect);

socket.on('room.joined', m => {
    socket.emit('room.getUserlist')
});
socket.on('room.left', m => {
    socket.emit('room.getUserlist')
})

socket.on('room.getUserlist.success', m => {
    document.querySelector("#roomUsers").innerText = m.length;
})

function onConnect(){
    joinRoom(document.querySelector("#roomList").value);
}

const joinRoom = v => {
    socket.emit("room.join", v);
    socket.emit('room.getUserlist')
    document.querySelector("#toEveryoneInRoomResult").innerText = "";
    document.querySelector("#toOthersInRoomResult").innerText = "";

}


const blink = target => {
    target.style = "background-color: chartreuse;";
    setTimeout(()=> {
        target.style = "";
    }, 150)
}


// Set name
document.querySelector("#setNameButton").onclick = () => {
    const m = document.querySelector("#setNameMessage").value;
    blink(document.querySelector("#setNameSignalOut"))
    socket.emit('user.update', {name: m})
}

socket.on('user.update.success', m => {
    blink(document.querySelector("#setNameSignalIn"))
    document.querySelector("#setNameResult").innerText = m;
})

// To Self
document.querySelector("#toSelfButton").onclick = () => {
    const m = document.querySelector("#toSelfMessage").value;
    blink(document.querySelector("#toSelfSignalOut"))
    socket.emit('toSelf', m)
}

socket.on('toSelf.success', m => {
    blink(document.querySelector("#toSelfSignalIn"))
    document.querySelector("#toSelfResult").innerText = m;
})






// To Everyone
document.querySelector("#toEveryoneButton").onclick = () => {
    const m = document.querySelector("#toEveryoneMessage").value;
    blink(document.querySelector("#toEveryoneSignalOut"))
    socket.emit('toEveryone', m)
}

socket.on('toEveryone.success', m => {
    blink(document.querySelector("#toEveryoneSignalIn"))
    document.querySelector("#toEveryoneResult").innerText = m;
})




// To Everyone !! IN ROOM !!
document.querySelector("#toEveryoneInRoomButton").onclick = () => {
    const m = document.querySelector("#toEveryoneInRoomMessage").value;
    blink(document.querySelector("#toEveryoneInRoomSignalOut"))
    socket.emit('toEveryoneInRoom', m)
}

socket.on('toEveryoneInRoom.success', m => {
    blink(document.querySelector("#toEveryoneInRoomSignalIn"))
    document.querySelector("#toEveryoneInRoomResult").innerText = m;
})








// To Others
document.querySelector("#toOthersButton").onclick = () => {
    const m = document.querySelector("#toOthersMessage").value;
    blink(document.querySelector("#toOthersSignalOut"))
    socket.emit('toOthers', m)
}

socket.on('toOthers.success', m => {
    blink(document.querySelector("#toOthersSignalIn"))
    document.querySelector("#toOthersResult").innerText = m;
})




// To Others !! IN ROOM !!
document.querySelector("#toOthersInRoomButton").onclick = () => {
    const m = document.querySelector("#toOthersInRoomMessage").value;
    blink(document.querySelector("#toOthersInRoomSignalOut"))
    socket.emit('toOthersInRoom', m)
}

socket.on('toOthersInRoom.success', m => {
    blink(document.querySelector("#toOthersInRoomSignalIn"))
    document.querySelector("#toOthersInRoomResult").innerText = m;
})





// Get userlist
document.querySelector("#getUserlistButton").onclick = () => {
    // const m = document.querySelector("#getUserlistMessage").value;
    blink(document.querySelector("#getUserlistSignalOut"))
    socket.emit('getUserlist')
}

socket.on('getUserlist.success', m => {
    blink(document.querySelector("#getUserlistSignalIn"))
    document.querySelector("#getUserlistResult").innerText = JSON.stringify(m);
})





// Get Current room
document.querySelector("#getCurrentRoomButton").onclick = () => {
    blink(document.querySelector("#getCurrentRoomSignalOut"))
    socket.emit('room.current')
}

socket.on('room.current.success', m => {
    blink(document.querySelector("#getCurrentRoomSignalIn"))
    document.querySelector("#getCurrentRoomResult").innerText = JSON.stringify(m);
})



// Change room
document.querySelector("#roomList").onchange = () => {
    joinRoom(document.querySelector("#roomList").value);
}
