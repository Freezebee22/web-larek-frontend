import { IProduct, Category } from "../../types";

abstract class Model<T> {

}

class Product extends Model<IProduct> {
    id: string;
    name: string;
    description: string;
    icon: string;
    cost: number | null;
    category: Category;
    inCart: boolean;
}
