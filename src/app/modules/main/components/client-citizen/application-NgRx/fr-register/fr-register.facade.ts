import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    FrRegisterActions,
    FrRegisterTabId,
} from './fr-register.actions';
import * as FrRegisterSelectors from '../fr-register/fr-register.selectors';

@Injectable({
    providedIn: 'root',
})
export class FrRegisterFacade {
    private readonly store = inject(Store);

    // --------------- Selectors as Observables -----------------

    currentTabId$ = this.store.select(
        FrRegisterSelectors.selectCurrentTabId
    );

    allTabsValid$ = this.store.select(
        FrRegisterSelectors.selectAllTabsValid
    );

    saving$ = this.store.select(FrRegisterSelectors.selectIsSaving);

    error$ = this.store.select(FrRegisterSelectors.selectError);

    tabs$ = this.store.select(FrRegisterSelectors.selectTabs);

    tabState$(tabId: FrRegisterTabId) {
        return this.store.select(FrRegisterSelectors.selectTabState(tabId));
    }

    tabValue$(tabId: FrRegisterTabId) {
        return this.store.select(FrRegisterSelectors.selectTabValue(tabId));
    }

    tabValid$(tabId: FrRegisterTabId) {
        return this.store.select(FrRegisterSelectors.selectTabValid(tabId));
    }

    // --------------- Commands (Dispatchers) -----------------

    init(clientId: number | null) {
        this.store.dispatch(FrRegisterActions.init({ clientId }));
    }

    goToTab(tabId: FrRegisterTabId) {
        this.store.dispatch(FrRegisterActions.changeTab({ tabId }));
    }

    patchTabValue(tabId: FrRegisterTabId, value: Record<string, unknown>) {
        this.store.dispatch(
            FrRegisterActions.setTabValue({ tabId, value })
        );
    }





    saveSucceeded(clientId: number) {
        this.store.dispatch(FrRegisterActions.saveSucceeded({ clientId }));
    }

    saveFailed(error: string) {
        this.store.dispatch(FrRegisterActions.saveFailed({ error }));
    }






    // --------- اکشن‌ها / متدهای public ---------


    // ⬅️ این همونی‌ه که ارورش رو داشتی
    changeTab(tabId: FrRegisterTabId) {
        this.store.dispatch(FrRegisterActions.changeTab({ tabId }));
    }

    setTabValue(tabId: FrRegisterTabId, value: Record<string, unknown>) {
        this.store.dispatch(FrRegisterActions.setTabValue({ tabId, value }));
    }

    setTabValidity(tabId: FrRegisterTabId, valid: boolean) {
        this.store.dispatch(FrRegisterActions.setTabValidity({ tabId, valid }));
    }

    requestSave() {
        this.store.dispatch(FrRegisterActions.saveRequested());
    }

    reset() {
        this.store.dispatch(FrRegisterActions.reset());
    }
}
