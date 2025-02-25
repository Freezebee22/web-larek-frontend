interface IComponent {
    toggleClass(element: HTMLElement, className: string): void;
    setHidden(element: HTMLElement): void;
    setVisible(element: HTMLElement): void;
    setText(element: HTMLElement, value: unknown): void;
    setImage(element: HTMLImageElement, src: string, alt?: string): void;
}

abstract class Component<T> {
     constructor(protected container: HTMLElement) {};

    render(data: Partial<T>) {};
    //... другие общие методы для компонентов отображения (указаны в интерфейсе)
}