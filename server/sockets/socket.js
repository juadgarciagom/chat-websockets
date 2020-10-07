const { socket } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

let ticketControl = new TicketControl();

socket.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket();
        console.log(next);
        callback(next);
    });

    //Emitir el evento que me muestre el ultimo ticket
    client.emit('actualTicket', {
        actual: ticketControl.actualTicket()
    });

});