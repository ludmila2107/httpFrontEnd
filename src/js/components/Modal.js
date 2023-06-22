import { createElementFromHTML } from "../utils";

export default class Modal {
  constructor(ticket) {
    this.ticket = ticket;
  }

  add() {
    const modalEl = createElementFromHTML(
      `<form class="modal">
        <p class="modal__title">Добавить тикет</p>
        <label class="modal__label" for="short-description">Краткое описание</label>
        <input class="modal__input_short" type="text" id="short-description">
        <label class="modal__label" for="full-description">Подробное описание</label>
        <textarea class="modal__textarea_full" type="text" id="full-description"></textarea>
        <div class="wrap-btns">
          <button class="modal__cancel-btn">Отмена</button>
          <button class="modal__ok-btn">Ok</button>
        </div>
      </form>`
    );

    document.body.append(modalEl);

    const inputShort = modalEl.querySelector(".modal__input_short");
    const textareaFull = modalEl.querySelector(".modal__textarea_full");
    const cancelBtn = modalEl.querySelector(".modal__cancel-btn");
    const okBtn = modalEl.querySelector(".modal__ok-btn");

    const onRemoveModal = () => {
      modalEl.remove();
    };

    return { inputShort, textareaFull, cancelBtn, okBtn, onRemoveModal };
  }

  edit() {
    const modalEl = createElementFromHTML(
      `<form class="modal">
        <p class="modal__title">Изменить тикет</p>
        <label class="modal__label" for="short-description">Краткое описание</label>
        <input class="modal__input_short" type="text" id="short-description" value="${this.ticket.name}">
        <label class="modal__label" for="full-description">Подробное описание</label>
        <textarea class="modal__textarea_full" type="text" id="full-description">${this.ticket.description}</textarea>
        <div class="wrap-btns">
          <button class="modal__cancel-btn">Отмена</button>
          <button class="modal__ok-btn">Ok</button>
        </div>
      </form>`
    );

    document.body.append(modalEl);

    const inputShort = modalEl.querySelector(".modal__input_short");
    const textareaFull = modalEl.querySelector(".modal__textarea_full");
    const cancelBtn = modalEl.querySelector(".modal__cancel-btn");
    const okBtn = modalEl.querySelector(".modal__ok-btn");

    const onRemoveModal = () => {
      modalEl.remove();
    };

    return { inputShort, textareaFull, cancelBtn, okBtn, onRemoveModal };
  }

  remove() {
    const modalEl = createElementFromHTML(
      `<form class="modal">
        <p class="modal__title">Удалить тикет</p>
        <p class="modal__text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
        <div class="wrap-btns">
          <button class="modal__cancel-btn">Отмена</button>
          <button class="modal__ok-btn">Ok</button>
        </div>
      </form>`
    );

    document.body.append(modalEl);

    const cancelBtn = modalEl.querySelector(".modal__cancel-btn");
    const okBtn = modalEl.querySelector(".modal__ok-btn");

    const onRemoveModal = () => {
      modalEl.remove();
    };

    return { cancelBtn, okBtn, onRemoveModal };
  }
}
