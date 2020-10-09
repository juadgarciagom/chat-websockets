const { socket } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

let ticketControl = new TicketControl();

socket.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket();

        callback(next);
    });

    //Emitir el evento que me muestre el ultimo ticket
    client.emit('actualTicket', {
        actual: ticketControl.actualTicket(),
        last4: ticketControl.last4Tickets()
    });

    //Escuchar el evento que atiende un ticket
    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                error: true,
                message: 'El escritorio es obligatorio para la asignación del ticket'
            })
        };

        let attend = ticketControl.attendingTicket(data.desktop);

        callback(attend);

        //Transmitir los cambios en los ultimos 4
        client.broadcast.emit('last4', {
            last4: ticketControl.last4Tickets()
        });

    });

});