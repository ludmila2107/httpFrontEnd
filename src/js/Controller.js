import State from "./State";
import Modal from "./components/Modal";
import TicketsItem from "./components/TicketsItem";

export default class Controller {
  constructor(container) {
    this.container = container;
    this.state = new State();
  }

  init = async () => {
    this.ticketsList = this.container.querySelector(".tickets-list");
    const btnAddTicket = this.container.querySelector(".btn-add-ticket");

    await this.state.getAllTickets();

    this.state.tickets.forEach((el) => this.renderTicket(el));

    //управление добавлением тикета
    btnAddTicket.addEventListener("click", (e) => {
      e.preventDefault();

      const modal = new Modal();
      const { inputShort, textareaFull, cancelBtn, okBtn, onRemoveModal } =
        modal.add();

      okBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const newTicket = await this.state.postTicket({
          name: inputShort.value,
          description: textareaFull.value,
        });
        if (newTicket) {
          this.renderTicket(newTicket);

          onRemoveModal();
        }
      });

      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        onRemoveModal();
      });
    });
  };

  renderTicket(ticket) {
    const ticketsItem = new TicketsItem(ticket);
    const {
      itemEl,
      nameEl,
      editBtn,
      deleteBtn,
      statusCbox,
      onChangeItem,
      onRemoveItem,
    } = ticketsItem.getTicketsItem();
    this.ticketsList.appendChild(itemEl);

    //управление редактированием тикета
    editBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      await this.state.getTicketById(ticket);
      const modal = new Modal(this.state.selectedTicket);
      const { inputShort, textareaFull, cancelBtn, okBtn, onRemoveModal } =
        modal.edit();

      okBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const newTicket = await this.state.putTicketById({
          id: ticket.id,
          name: inputShort.value,
          description: textareaFull.value,
        });

        if (newTicket) {
          onChangeItem(newTicket);
          onRemoveModal();
        }
      });

      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        onRemoveModal();
      });
    });

    //управление удалением тикета
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const modal = new Modal();
      const { cancelBtn, okBtn, onRemoveModal } = modal.remove();

      okBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = await this.state.deleteTicketById(ticket);
        if (id) {
          onRemoveItem();
          onRemoveModal();
        }
      });

      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        onRemoveModal();
      });
    });

    //управление чекбоксом тикета
    statusCbox.addEventListener("change", async (e) => {
      e.preventDefault();

      const newTicket = await this.state.putTicketById({
        id: ticket.id,
        status: e.target.checked,
      });
      if (newTicket) {
        onChangeItem(newTicket);
      }
    });

    //управление описанием тикета
    nameEl.addEventListener("click", async (e) => {
      e.preventDefault();

      await this.state.getTicketById(ticket);

      const descriptionEl = ticketsItem.getItemDescription(
        this.state.selectedTicket
      );
      if (itemEl.contains(descriptionEl)) {
        return descriptionEl.remove();
      }
      itemEl.appendChild(descriptionEl);
    });
  }
}
