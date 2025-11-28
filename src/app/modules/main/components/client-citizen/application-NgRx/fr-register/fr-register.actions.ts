import { createAction, props } from '@ngrx/store';

export type FrRegisterTabId =
    | 'identity'
    | 'contact'
    | 'signature'
    | 'relations'
    | 'industry'
    | 'education'
    | 'documents'
    | 'extra'
    | 'business'
    | 'passport'
    | 'license'
    | 'final';

/**
 * اگر در FR تب‌ها متفاوت شد، فقط این union را آپدیت کن.
 */

export namespace FrRegisterActions {
    // شروع / مقداردهی
    export const init = createAction(
        '[FR Register] Init',
        props<{ clientId: number | null }>()
    );

    // وقتی کاربر از یک تب به تب دیگر می‌رود
    export const changeTab = createAction(
        '[FR Register] Change Tab',
        props<{ tabId: FrRegisterTabId }>()
    );

    // مقدار فرم یک تب عوض می‌شود (patch value)
    export const setTabValue = createAction(
        '[FR Register] Set Tab Value',
        props<{ tabId: FrRegisterTabId; value: Record<string, unknown> }>()
    );

    // وضعیت اعتبار یک تب (valid / invalid)
    export const setTabValidity = createAction(
        '[FR Register] Set Tab Validity',
        props<{ tabId: FrRegisterTabId; valid: boolean }>()
    );

    // شروع ذخیره کل فرم
    export const saveRequested = createAction(
        '[FR Register] Save Requested'
    );

    export const saveSucceeded = createAction(
        '[FR Register] Save Succeeded',
        props<{ clientId: number }>()
    );

    export const saveFailed = createAction(
        '[FR Register] Save Failed',
        props<{ error: string }>()
    );

    // ریست کامل فرم
    export const reset = createAction('[FR Register] Reset');
}
