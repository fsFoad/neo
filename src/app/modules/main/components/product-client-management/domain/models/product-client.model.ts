export type ProductClientStatus = 0 | 1;

export interface ProductClientTariffs {
    generalTariffId: number | null;
    paymentInstrumentTariffId: number | null;
    lotteryTariffId: number | null;
    interestTariffId: number | null;
    physicalSettleTariffId: number | null;
    allowedUnitsTariffId: number | null;
    branchTariffId: number | null;
}

export interface ProductClient {
    id: number | null;

    depositAccountGroupId: number | null; // گروه حساب سپرده
    currencyCode: string | null; // IRR/USD/...
    productId: number | null;
    productTitle: string;

    status: ProductClientStatus;

    validFrom: string | null; // ISO date (مثلاً 2025-01-01)
    validTo: string | null;

    settlementDetails: string;

    tariffs: ProductClientTariffs;
}

export const PRODUCT_CLIENT_INITIAL: ProductClient = {
    id: null,
    depositAccountGroupId: null,
    currencyCode: null,
    productId: null,
    productTitle: '',
    status: 1,
    validFrom: null,
    validTo: null,
    settlementDetails: '',
    tariffs: {
        generalTariffId: null,
        paymentInstrumentTariffId: null,
        lotteryTariffId: null,
        interestTariffId: null,
        physicalSettleTariffId: null,
        allowedUnitsTariffId: null,
        branchTariffId: null,
    },
};
