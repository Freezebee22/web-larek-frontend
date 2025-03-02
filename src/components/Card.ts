import { IActions, ICard } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class Card extends Component<ICard> {
    _name: HTMLElement;
    _cost: HTMLElement;
    _description?: HTMLElement;
    _icon?: HTMLElement;
    _category?: HTMLElement;
    _button?: HTMLButtonElement;
    _index?: HTMLElement;
    _buttonTitle: string;

    constructor(container: HTMLElement, actions?: IActions) {
        super(container);
    
        this._name = ensureElement<HTMLElement>('.card__title', container);
        this._cost = ensureElement<HTMLElement>('.card__price', container);
        this._icon = container.querySelector('.card__image');
        this._button = container.querySelector('.card__button');
        this._description = container.querySelector('.card__text');
        this._category = container.querySelector('.card__category');
        this._index = container.querySelector('.basket__item-index');

        if (actions?.action) {
            if (this._button) {
                this._button.addEventListener('click', actions.action);
            } else {
                container.addEventListener('click', actions.action);
            }
        }
    }

    disablePriceButton() {
        if (this._button) {
            this._button.disabled = true;
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set name(value: string) {
        this.setText(this._name, value);
    }

    get name(): string {
        return this._name.textContent || '';
    }

    set cost(value: number | null) {
        this.setText(this._cost, value ? `${value} синапсов` : 'Бесценно');
        if (!value)
            this.disablePriceButton();
    }

    get cost(): number {
        return Number(this._cost.textContent || '');
    }
}