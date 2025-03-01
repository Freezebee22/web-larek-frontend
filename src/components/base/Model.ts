import { IProduct, Category, IEvents } from "../../types";

export abstract class Model<T> {
    constructor(protected data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    };

    emitChanges(event: string, data?: object) {
        this.events.emit(event, data ?? {});
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
