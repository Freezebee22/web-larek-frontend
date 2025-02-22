interface ICatalogModel {
    getProducts(): Promise<IProduct[]>;
    getProductById(id: string): Promise<IProduct | null>;
}

interface ICartModel {
    getCartItems(): IProduct[];
    addToCart(product: IProduct): void;
    removeFromCart(id: string): void;
    clearCart(): void;
    getTotalCost(): number;
}

interface IOrderModel {
    validateOrder(order: IOrder): boolean;
    submitOrder(order: IOrder): Promise<boolean>;
}