import { createSelector } from '@ngrx/store';
import { frRegisterFeature } from './fr-register.reducer';
import { FrRegisterTabId } from './fr-register.actions';

// destructuring از feature
export const {
    selectFrCitizenRegisterState,
    selectCurrentTabId,
    selectTabs,
    selectIsSaving,
    selectError,
    selectAllTabsValid,
} = frRegisterFeature;

// Selectorهای داینامیک برای تب‌ها
export const selectTabState = (tabId: FrRegisterTabId) =>
    frRegisterFeature.selectTabState(tabId);

export const selectTabValue = (tabId: FrRegisterTabId) =>
    frRegisterFeature.selectTabValue(tabId);

export const selectTabValid = (tabId: FrRegisterTabId) =>
    frRegisterFeature.selectTabValid(tabId);

// مثال یک selector ترکیبی، مثلاً ببین فقط تب‌های الزامی valid هستن یا نه
export const selectRequiredTabsValid = createSelector(
    frRegisterFeature.selectTabs,
    (tabs) => {
        const required: FrRegisterTabId[] = ['identity', 'contact', 'signature'];
        return required.every((id) => tabs[id]?.valid);
    }
);
