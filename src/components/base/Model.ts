import { IProduct, Category, IEvents } from "../../types";

abstract class Model<T> {
    constructor(protected data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    };

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
