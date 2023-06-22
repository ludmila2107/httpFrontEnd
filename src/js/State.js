/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
export default class State {
  constructor() {
    this.tickets = [];
    this.selectedTicket = {};
  }

  setTickets(tickets) {
    this.tickets = tickets;
  }

  setSelectedTicket(selectedTicket) {
    this.selectedTicket = selectedTicket;
  }

  async getTicketById({ id }) {
    try {
      const response = await fetch(
        `http://localhost:7070/tickets?method=ticketById&id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      this.setSelectedTicket(data);
    } catch {}
  }

  async getAllTickets() {
    try {
      const response = await fetch(
        "http://localhost:7070/tickets?method=allTickets",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      this.setTickets(data);
    } catch {}
  }

  async postTicket(payload) {
    try {
      const response = await fetch(
        "http://localhost:7070/tickets?method=createTicket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      return await response.json();
    } catch {}
  }

  async putTicketById({ id, ...rest }) {
    try {
      const response = await fetch(
        `http://localhost:7070/tickets?method=updateById&id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rest),
        }
      );

      return await response.json();
    } catch {}
  }

  async deleteTicketById({ id }) {
    try {
      await fetch(`http://localhost:7070/tickets?method=deleteById&id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return id;
    } catch {}
  }
}
