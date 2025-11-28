import { createSelector } from '@ngrx/store';
import { irRegisterFeature } from './ir-register.reducer';
import { IrRegisterTabId } from './ir-register.actions';

export const {
    selectIrCitizenRegisterState,
    selectCurrentTabId,
    selectTabs,
    selectAllTabsValid,
    selectIsSaving,
    selectError,
} = irRegisterFeature;

export const selectTabState = (tabId: IrRegisterTabId) =>
    irRegisterFeature.selectTabState(tabId);

export const selectTabValue = (tabId: IrRegisterTabId) =>
    irRegisterFeature.selectTabValue(tabId);

export const selectTabValid = (tabId: IrRegisterTabId) =>
    irRegisterFeature.selectTabValid(tabId);

// مثال: فقط تب‌های ضروری IR
export const selectRequiredTabsValid = createSelector(
    irRegisterFeature.selectTabs,
    (tabs) => {
        const required: IrRegisterTabId[] = ['identity', 'contact', 'signature'];
        return required.every((id) => tabs[id]?.valid);
    }
);
