
import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { ProductClient } from '../domain/models/product-client.model';
import { ProductClientFilter } from '../domain/models/product-client-filter.model';
import { ProductClientRepository } from '../domain/repositories/product-client-repository';

export const ProductActions = createActionGroup({
    source: 'Product',
    events: {
        // وقتی صفحه باز میشه (اگه خواستی ازش استفاده کنی)
        'Init Page': emptyProps(),

        // --- لیست (جدول محصولات) ---
        Search: props<{ filter: ProductClientFilter }>(),
        'Search Succeeded': props<{ page: ProductClientRepository }>(),
        'Search Failed': props<{ error: string }>(),

        // --- لود یک محصول برای ویرایش ---
        'Edit Item': props<{ id: number }>(), // فقط می‌گه کدوم id رو لود کن
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
