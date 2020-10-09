var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor desde los escritorios!');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor desde los escritorios!');
});

//Función para recuperar el número del escritorio desde la URL
var search = new URLSearchParams(window.location.search);

if (!search.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio')
};

var desktop = search.get('escritorio');

$('h1').text(`Escritorio: ${desktop}`)

$('button').on('click', function() {
    socket.emit('attendTicket', { desktop: desktop }, function(attendTicket) {

        if (attendTicket === 'No hay mas tickets por atender') {
            $('h4').text(attendTicket);
            alert(attendTicket);

            return;
        };

        $('small').text('Ticket ' + attendTicket.number);
    });
});