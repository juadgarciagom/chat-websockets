var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor!');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor!');
});

//Funcion que me escuche el ultimo ticket
socket.on('actualTicket', function(actualTicket) {
    $('#lblNuevoTicket').text(actualTicket.actual);
})

//Funcionalidades por medio de jquery
$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        $('#lblNuevoTicket').text(nextTicket);
    });
});