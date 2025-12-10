import { ProductClientStatus } from './product-client.model';

export interface ProductClientFilter {
    status: ProductClientStatus;
    depositAccountGroupId?: number | null;
    currencycode?: string | null;
    productId?: number | null;
    deposittypeid?: ProductClientStatus | null;
    page?: number;
    pageSize?: number;
}

// domain/models/product-client-summary.model.ts
export interface ProductClientSummary {
    id: number;
    productTitle: string;
    depositAccountGroupTitle: string;
    currencyCode: string;
    status: ProductClientStatus;
    validFrom: string | null;
    validTo: string | null;
}
