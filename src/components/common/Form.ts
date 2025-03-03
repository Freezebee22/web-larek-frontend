import { IFormState, IEvents } from "../../types";
import { Component } from "../base/Component";

class Form<T> extends Component<IFormState> {
    submit: HTMLButtonElement;
    errors: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);
    }
}