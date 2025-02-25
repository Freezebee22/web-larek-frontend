export type Category = 
    'софт-скил' | 
    'хард-скил' |
    'кнопка' |
    'другое'|
    'дополнительное';

export interface IProduct {
    id: string;
    name: string;
    description: string;
    icon: string;
    cost: number | null;
    category: Category;
    inCart: boolean;
}

interface Card extends IProduct {
    button?: HTMLElement;
    buttonTitle?: string;
    disablePriceButton(): void;
}

interface ICatalog {
    items: IProduct[];
}

interface ICart {
    items: IProduct[];
    totalCost: number;
}

interface IOrder extends IDeliveryForm, IContactForm {
    cart: ICart;
    total: number;
}

interface IOrderResult {
    id: string;
    total: number;
}

interface IAppState {
    catalog: ICatalog;
    cart: ICart;
    delivery: IDeliveryForm | null;
    contact: IContactForm | null;
    order: IOrder | null;
    clearCart(): void; // очистка всей корзины
    clearOrder(): void; // очистка заказа
    setCatalog(items: IProduct[]): void; // установить товары в каталог
    addToCart(item: IProduct): void; // добавить в корзину товар
    removeFromCart(id: string): void; // удалить из корзины товар
    updateCart(): void; // будет оповещать всех об изменении корзины
    takeDeliveryField(field: keyof IDeliveryForm, value: string): void; // установить значение в данные доставки
    takeContactField(field: keyof IContactForm, value: string): void; // установить значение в данные контактов
    validateDelivery(): boolean; // валидация данных доставки
    validateContact(): boolean; // валидация данных контактов
}

interface IPage {
    catalog: HTMLElement[];
    counter: number;
}

interface IApi {
    getProducts(): Promise<IProduct[]>;
    getProduct(id: string): Promise<IProduct>;
    orderProducts(order: IOrder): Promise<IOrderResult>;
}

interface IDeliveryForm {
    payment: string;
    address: string;
}

interface IContactForm {
    email: string;
    phone: string;
}

// проверка валидности формы
export interface IFormState {
    valid: boolean;
    errors: string[];
}

// отображаемый контент в модальном окне
export interface IModal {
    content: HTMLElement;
}

// типы для ивентов
export type EventName = string | RegExp;
export type Subscriber = Function;
export type EmitterEvent = {
    eventName: string,
    data: unknown
};

export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

// типы для апишек
export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';