type Category = 
    'софт-скил' | 
    'хард-скил' |
    'кнопка' |
    'другое'|
    'дополнительное';

interface IProduct {
    id: number;
    name: string;
    description: string;
    icon: string;
    cost: number | null;
    category: string;
    selected: boolean;
}

/*interface ICatalog {
    items: IProduct[];
    setItems(items: IProduct[]): void;
    getProduct(id: number): IProduct;
}*/

interface ICart {
    items: IProduct[];
    total: number;
}

interface IOrder {
    //items: IProduct[];
    //total: number;
    //или
    cart: ICart;
    payment: string;
    address: string;
    email: string;
    phone: string;
}