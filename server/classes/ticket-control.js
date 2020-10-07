const fs = require('fs');

class Ticket {
    constructor(number, escritorio) {
        this.number = number;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimate = 0; //Manejar el último ticket de la aplicación
        this.date = new Date().getDate(); //Controlarme la fecha del sistema
        this.tickets = [];

        let data = require('../data/data.json');

        if (data.date === this.date) {
            this.ultimate = data.ultimate;
            this.tickets = data.tickets;

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

    restartCount() {
        this.ultimate = 0;
        this.tickets = [];
        console.log('Sistema reiniciado!');
        this.saveJson();
    };

    saveJson() {
        let jsonData = {
            ultimate: this.ultimate,
            date: this.date,
            tickets: this.tickets
        }

        let jsonDataString = JSON.stringify(jsonData)

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    };


};

module.exports = {
    TicketControl
}