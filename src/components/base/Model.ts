import { IProduct, Category, IEvents } from "../../types";

abstract class Model<T> {
    constructor(data: Partial<T>, events: IEvents) {};

    emitChanges(event: string) {
        //сообщение об изменении модели
    };
}

export class Product extends Model<IProduct> {
    id: string;
    name: string;
    description: string;
    icon: string;
    cost: number | null;
    category: Category;
    inCart: boolean;
}
