interface ICatalogView {
    render(products: IProduct[]): void;
    onProductClick(callback: (id: number) => void): void;
}

interface ICartView {
    render(cart: ICart): void;
    onRemoveItem(callback: (id: number) => void): void;
    onCheckout(callback: () => void): void;
}

interface IProductModalView {
    open(product: IProduct): void;
    close(): void;
    onBuyClick(callback: () => void): void; 
}

interface IOrderView {
    renderStepOne(): void;
    renderStepTwo(): void;
    onNextStep(callback: () => void): void;
    onSubmitOrder(callback: () => void): void;
}

interface ISuccessView {
    show(): void;
    onClose(callback: () => void): void;
}

