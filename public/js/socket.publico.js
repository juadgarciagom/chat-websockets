var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor desde los escritorios!');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor desde los escritorios!');
});

socket.on('actualTicket', function(data) {
    updateHtml(data.last4)

});

socket.on('last4', function(data) {
    var notification = new Audio('audio/new-ticket.mp3');
    notification.play();
    updateHtml(data.last4);

});

function updateHtml(last4) {
    for (var i = 0; i < last4.length; i++) {
        $('#lblTicket' + (i + 1)).text('Ticket: ' + last4[i].number)
        $('#lblEscritorio' + (i + 1)).text('Escritorio: ' + last4[i].desktop)

    };
};