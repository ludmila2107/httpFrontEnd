import moment from "moment";
import { createElementFromHTML } from "../utils";

export default class TicketsItem {
  constructor(ticket) {
    this.ticket = ticket;
  }

  getTicketsItem() {
    this.itemEl = createElementFromHTML(`<li class="tickets-list__item">
      <input class="tickets-list__item-status" type="checkbox">
      <span class="tickets-list__item-name">${this.ticket.name}</span>
      <span class="tickets-list__item-created">${moment(
        this.ticket.created
      ).format("DD.MM.YY HH:mm")}</span>
      <button class="tickets-list__item-edit-btn">&#9998</button>
      <button class="tickets-list__item-delete-btn">X</button>    
    </li>`);

    const nameEl = this.itemEl.querySelector(".tickets-list__item-name");
    const editBtn = this.itemEl.querySelector(".tickets-list__item-edit-btn");
    const deleteBtn = this.itemEl.querySelector(
      ".tickets-list__item-delete-btn"
    );
    const statusCbox = this.itemEl.querySelector(".tickets-list__item-status");
    statusCbox.checked = this.ticket.status;

    const onChangeItem = (ticket) => {
      this.ticket = ticket;
      nameEl.innerHTML = this.ticket.name;
      statusCbox.checked = this.ticket.status;
    };

    const onRemoveItem = () => {
      this.itemEl.remove();
    };

    return {
      itemEl: this.itemEl,
      nameEl,
      editBtn,
      deleteBtn,
      statusCbox,
      onChangeItem,
      onRemoveItem,
    };
  }

  getItemDescription(ticket) {
    const descriptionEl = this.itemEl.querySelector(
      ".tickets-list__item-description"
    );
    if (descriptionEl) {
      return descriptionEl;
    }

    return createElementFromHTML(
      `<p class="tickets-list__item-description">${ticket.description}</p>`
    );
  }
}
