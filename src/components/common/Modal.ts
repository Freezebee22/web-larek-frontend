import { IModal, IEvents } from "../../types";

class Modal extends Component<IModal> {
    closeButton: HTMLButtonElement;
    content: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
    }
    open() {}
    close() {}
}