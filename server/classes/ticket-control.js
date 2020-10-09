const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.ultimate = 0; //Manejar el último ticket de la aplicación
        this.date = new Date().getDate(); //Controlarme la fecha del sistema
        this.tickets = [];
        this.ticketsDone = [];

        let data = require('../data/data.json');

        if (data.date === this.date) {
            this.ultimate = data.ultimate;
            this.tickets = data.tickets;
            this.ticketsDone = data.ticketsDone;

        } else {
            this.restartCount();
        }

    };

    nextTicket() {
        this.ultimate++;

        let ticket = new Ticket(this.ultimate, null);
        this.tickets.push(ticket);
        this.saveJson();
        return `El ticket actual es ${this.ultimate}`
    };

    actualTicket() {
        return `El ticket actual es ${this.ultimate}`
    };

    last4Tickets() {
        return this.ticketsDone;
    }

    attendingTicket(desktop) {
        if (this.tickets.length === 0) {
            return `No hay mas tickets por atender`
        };

        let attendingToTicket = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(attendingToTicket, desktop);

        this.ticketsDone.unshift(attendTicket);

        if (this.ticketsDone.length > 4) {
            this.ticketsDone.splice(-1, 1); //Eliminar el ultimo elemento de mi array
        }

        this.saveJson();

        return attendTicket;

    };

    restartCount() {
        this.ultimate = 0;
        this.tickets = [];
        this.ticketsDone = [];
        console.log('Sistema reiniciado!');
        this.saveJson();
    };

    saveJson() {
        let jsonData = {
            ultimate: this.ultimate,
            date: this.date,
            tickets: this.tickets,
            ticketsDone: this.ticketsDone
        }

        let jsonDataString = JSON.stringify(jsonData)

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    };


};

module.exports = {
    TicketControl
}