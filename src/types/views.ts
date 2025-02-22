interface ICatalogView {
    render(products: IProduct[]): void;
    onProductClick(callback: (id: number) => void): void;
}

interface ICartView {
    render(cart: ICart): void;
    onRemoveItem(callback: (id: number) => void): void;
    onCheckout(callback: () => void): void;
}

interface IProductView {
    
}