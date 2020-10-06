const { socket } = require('../server')

socket.on('connection', (client) => {
    console.log('Conectado desde el back');

    client.emit('welcome', {
        user: 'Admin',
        message: 'Bienvenido a la aplicación'
    });

    client.on('disconnect', () => {
        console.log('Desconexión desde el back');
    });

    client.on('send', (data, callback) => {
        console.log(data);

        client.broadcast.emit('welcome', data)

        // if (message.user) {
        //     callback({
        //         resp: 'Mensaje recibido'
        //     });
        // } else {
        //     callback({
        //         resp: 'Error: no se recibio ningún mensaje'
        //     });
        // }

    })
});