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
    category: Category;
    inCart: boolean;
}

interface ICatalog {
    items: IProduct[];
    setItems(items: IProduct[]): void;
    getProduct(id: number): IProduct | null;
}

interface ICart {
    items: IProduct[];
    totalCost: number;
}

interface IOrder {
    items: IProduct[];
    payment: string;
    address: string;
    email: string;
    phone: string;
}