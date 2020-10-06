let socket = io();

//On = Escuchar
socket.on('connect', function() {
    console.log('conectado al server');
});

socket.on('welcome', function(message) {
    console.log(message);
});

socket.on('disconnect', function() {
    console.log('Desconectado del server');
});

//Emit = Emitir o enviar (Se recomienda enviar siempre un objeto)
socket.emit('send', {
    user: 'Juan',
    message: 'Hola'
}, function(resp) {
    console.log('Verificación: ', resp);
});