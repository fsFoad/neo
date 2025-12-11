// application-NgRx/product-client.actions.ts

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductClientFilter } from '../domain/models/product-client-filter.model';
import { ProductClientMetadata } from '../domain/models/product-client-metadata.model';
import { ProductClient } from '../domain/models/product-client.model';
import { ProductClientPage } from '../domain/repositories/product-client-repository';

// تمام اکشن‌های مربوط به product-client-management
export const ProductClientActions = createActionGroup({
    source: 'ProductClient',
    events: {
        // وقتی صفحه باز می‌شود
        'Init Page': emptyProps(),

        // --- متادیتا برای dropdown ها ---
        'Load Metadata': emptyProps(),
        'Load Metadata Succeeded': props<{ metadata: ProductClientMetadata }>(),
        'Load Metadata Failed': props<{ error: string }>(),

        // --- لیست (جدول پایین صفحه) ---
        Search: props<{ filter: ProductClientFilter }>(),
        'Search Succeeded': props<{ page: ProductClientPage }>(),
        'Search Failed': props<{ error: string }>(),

        // --- لود یک رکورد برای ویرایش ---
        'Edit Item': props<{ id: number }>(),
        'Load Item Succeeded': props<{ item: ProductClient }>(),
        'Load Item Failed': props<{ error: string }>(),

        // --- ذخیره (ایجاد یا ویرایش) ---
        'Save Item': props<{ item: ProductClient }>(),
        'Save Item Succeeded': props<{ item: ProductClient }>(),
        'Save Item Failed': props<{ error: string }>(),

        // --- حذف ---
        'Delete Item': props<{ id: number }>(),
        'Delete Item Succeeded': props<{ id: number }>(),
        'Delete Item Failed': props<{ error: string }>(),
    },
});
