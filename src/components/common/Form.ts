import { IFormState, IEvents } from "../../types";

class Form<T> extends Component<IFormState> {
    submit: HTMLButtonElement;
    errors: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);
    }
}