import { Observable } from 'rxjs';
import {
    ProductClientFilter,
    ProductClientSummary,
} from '../models/product-client-filter.model';
import { ProductClient } from '../models/product-client.model';

export interface ProductClientPage {
    items: ProductClientSummary[];
    page: number;
    pageSize: number;
    total: number;
}


export abstract class ProductClientRepository {
    abstract loadMetadata(): Observable<any>;

    abstract search(filter: ProductClientFilter): Observable<ProductClientPage>;

    abstract getById(id: number): Observable<ProductClient>;

    abstract create(payload: ProductClient): Observable<ProductClient>;

    abstract update(id: number, payload: ProductClient): Observable<ProductClient>;

    abstract delete(id: number): Observable<void>;
}
