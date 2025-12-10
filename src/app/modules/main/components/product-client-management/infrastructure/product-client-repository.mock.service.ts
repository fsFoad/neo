
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
    ProductClientRepository,
    ProductClientPage,
} from '../domain/repositories/product-client-repository';
import { ProductClient } from '../domain/models/product-client.model';
import { ProductClientFilter } from '../domain/models/product-client-filter.model';
import { ProductClientMetadata } from '../domain/models/product-client-metadata.model';
import { ProductClientSummary } from '../domain/models/product-client-summary.model';

@Injectable()
export class ProductClientRepositoryMockService implements ProductClientRepository {
    // دیتای فرضی در حافظه
    private _data: ProductClient[] = [
        {
            id: 1,
            depositAccountGroupId: 1,
            currencyCode: 'IRR',
            productId: 101,
            productTitle: 'سپرده کوتاه مدت عادی (ماک)',
            status: 1,
            validFrom: '2025-01-01',
            validTo: null,
            settlementDetails: 'تسویه روزانه در پایان روز',
            tariffs: {
                generalTariffId: 201,
                paymentInstrumentTariffId: 301,
                lotteryTariffId: null,
                interestTariffId: 401,
                physicalSettleTariffId: 501,
                allowedUnitsTariffId: 601,
                branchTariffId: 701,
            },
        },
    ];

    private _metadata: ProductClientMetadata = {
        depositAccountGroups: [
            { label: 'گروه ۱ (ماک)', value: 1 },
            { label: 'گروه ۲ (ماک)', value: 2 },
        ],
        currencies: [
            { label: 'ریال', value: 'IRR' },
            { label: 'یورو', value: 'EUR' },
        ],
        products: [
            { label: 'سپرده کوتاه مدت عادی', value: 101 },
            { label: 'سپرده بلندمدت یک‌ساله', value: 102 },
        ],
        statuses: [
            { label: 'فعال', value: 1 },
            { label: 'غیرفعال', value: 1 },
        ],
        tariffs: {
            general: [{ label: 'نمایه عمومی ۱', value: 201 }],
            paymentInstrument: [],
            lottery: [],
            interest: [],
            physicalSettle: [],
            allowedUnits: [],
            branch: [],
        },
    };

    loadMetadata(): Observable<ProductClientMetadata> {
        // شبیه‌سازی تأخیر شبکه
        return of(this._metadata).pipe(delay(300));
    }

    search(filter: ProductClientFilter): Observable<ProductClientPage> {
        let items = [...this._data];

        if (filter.depositAccountGroupId) {
            items = items.filter(
                (x) => x.depositAccountGroupId === filter.depositAccountGroupId
            );
        }
        if (filter.currencycode) {
            items = items.filter((x) => x.currencyCode === filter.currencycode);
        }
        if (filter.productId) {
            items = items.filter((x) => x.productId === filter.productId);
        }
        if (filter.status) {
            items = items.filter((x) => x.status === filter.status);
        }

        const page = filter.page ?? 1;
        const pageSize = filter.pageSize ?? 20;
        const start = (page - 1) * pageSize;
        const paged = items.slice(start, start + pageSize);

        const summaries: ProductClientSummary[] = paged.map((x) => ({
            id: x.id!,
            productTitle: x.productTitle,
            depositAccountGroupTitle: `گروه ${x.depositAccountGroupId}`,
            currencyCode: x.currencyCode ?? '',
            status: x.status,
            validFrom: x.validFrom,
            validTo: x.validTo,
        }));

        const result: ProductClientPage = {
            items: summaries,
            page,
            pageSize,
            total: items.length,
        };

        return of(result).pipe(delay(200));
    }

    getById(id: number): Observable<ProductClient> {
        const found = this._data.find((x) => x.id === id);
        if (!found) {
            // در سناریوی واقعی بهتره خطا برگردونی؛ فعلاً همون null-like
            return of(null as any).pipe(delay(200));
        }
        return of(structuredClone(found)).pipe(delay(200));
    }

    create(payload: ProductClient): Observable<ProductClient> {
        const newId = (this._data.at(-1)?.id ?? 0) + 1;
        const item: ProductClient = { ...payload, id: newId };
        this._data.push(item);
        return of(structuredClone(item)).pipe(delay(300));
    }

    update(id: number, payload: ProductClient): Observable<ProductClient> {
        const index = this._data.findIndex((x) => x.id === id);
        if (index >= 0) {
            this._data[index] = { ...payload, id };
        }
        return of(structuredClone(this._data[index])).pipe(delay(300));
    }

    delete(id: number): Observable<void> {
        this._data = this._data.filter((x) => x.id !== id);
        return of(void 0).pipe(delay(200));
    }
}
