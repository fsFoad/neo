
import { ProductClientStatus } from './product-client.model';

export interface ProductClientSummary {
    id: number;

    // عنوان محصول برای نمایش در جدول
    productTitle: string;

    // نام گروه حساب سپرده (متن نمایشی، نه id)
    depositAccountGroupTitle: string;

    // کد ارز (IRR, USD, EUR, ...)
    currencyCode: string;

    // وضعیت فعال/غیرفعال
    status: ProductClientStatus;

    // بازهٔ اعتبار
    validFrom: string | null;   // تاریخ شروع به صورت ISO (مثلاً '2025-01-01')
    validTo: string | null;     // تاریخ پایان
}
