import { createFeature, createReducer } from '@ngrx/store';

// 1) نوع state
export interface ProductClientState {
    // فعلاً ساده؛ بعداً می‌تونی گسترش بدی
    loading: boolean;
}

// 2) مقدار اولیه
const initialState: ProductClientState = {
    loading: false,
};

// 3) خود feature (مهم: حتماً export داشته باشه)
export const productClientFeature = createFeature({
    name: 'productClient',
    reducer: createReducer(initialState),
});

// اگر دوست داشتی selector و reducer نام‌دار هم از این استخراج کنی:
export const {
    name: productClientFeatureKey,
    reducer: productClientReducer,
    selectProductClientState,
} = productClientFeature;
