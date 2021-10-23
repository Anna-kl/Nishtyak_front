import {Product} from './Product';

export interface ProductWithCount extends Product{
    count: number;
}
