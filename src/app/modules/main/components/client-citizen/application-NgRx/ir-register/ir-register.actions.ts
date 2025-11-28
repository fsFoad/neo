import { createAction, props } from '@ngrx/store';

export type IrRegisterTabId =
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
 * اگر تب‌های IR فرق کرد، فقط همین union را آپدیت کن.
 */

export namespace IrRegisterActions {
    // Init
    export const init = createAction(
        '[IR Register] Init',
        props<{ clientId: number | null }>()
    );

    // تغییر تب
    export const changeTab = createAction(
        '[IR Register] Change Tab',
        props<{ tabId: IrRegisterTabId }>()
    );

    // مقدار تب
    export const setTabValue = createAction(
        '[IR Register] Set Tab Value',
        props<{ tabId: IrRegisterTabId; value: Record<string, unknown> }>()
    );

    // اعتبار تب
    export const setTabValidity = createAction(
        '[IR Register] Set Tab Validity',
        props<{ tabId: IrRegisterTabId; valid: boolean }>()
    );

    // ذخیره
    export const saveRequested = createAction(
        '[IR Register] Save Requested'
    );

    export const saveSucceeded = createAction(
        '[IR Register] Save Succeeded',
        props<{ clientId: number }>()
    );

    export const saveFailed = createAction(
        '[IR Register] Save Failed',
        props<{ error: string }>()
    );

    // Reset
    export const reset = createAction('[IR Register] Reset');
}
