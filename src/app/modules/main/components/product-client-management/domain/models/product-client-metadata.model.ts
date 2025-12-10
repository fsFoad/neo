import { ProductClientStatus } from './product-client.model';

// یک type ساده برای همهٔ dropdown optionها
export interface Option<T = any> {
    label: string;
    value: T;
}

// اگر برای هر نوع تعرفه dropdown جدا داری:
export interface ProductClientTariffOptions {
    general: Option<number>[]; // نمایه عمومی
    paymentInstrument: Option<number>[]; // نمایه ابزار پرداخت
    lottery: Option<number>[]; // نمایه قرعه‌کشی
    interest: Option<number>[]; // نمایه سود
    physicalSettle: Option<number>[]; // نمایه تسویه فیزیکی
    allowedUnits: Option<number>[]; // نمایه واحدهای مجاز
    branch: Option<number>[]; // نمایه شعبه
}

// متادیتای صفحه product-client-management
export interface ProductClientMetadata {
    depositAccountGroups: Option<number>[]; // dropdown گروه حساب سپرده
    currencies: Option<string>[]; // dropdown ارز
    products: Option<number>[]; // dropdown محصول
    statuses: Option<ProductClientStatus>[]; // dropdown وضعیت (ACTIVE/INACTIVE)
    tariffs: ProductClientTariffOptions; // dropdownهای مربوط به تعرفه‌ها
}
