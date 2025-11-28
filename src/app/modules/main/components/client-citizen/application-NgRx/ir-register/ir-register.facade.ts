import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    IrRegisterActions,
    IrRegisterTabId,
} from './ir-register.actions';
import * as IrRegisterSelectors from '../ir-register/ir-register.selectors';

@Injectable({
    providedIn: 'root',
})
export class IrRegisterFacade {
    private readonly store = inject(Store);

    // ---------------- Observables ----------------

    currentTabId$ = this.store.select(
        IrRegisterSelectors.selectCurrentTabId
    );

    allTabsValid$ = this.store.select(
        IrRegisterSelectors.selectAllTabsValid
    );

    saving$ = this.store.select(IrRegisterSelectors.selectIsSaving);

    error$ = this.store.select(IrRegisterSelectors.selectError);

    tabs$ = this.store.select(IrRegisterSelectors.selectTabs);

    tabState$(tabId: IrRegisterTabId) {
        return this.store.select(IrRegisterSelectors.selectTabState(tabId));
    }

    tabValue$(tabId: IrRegisterTabId) {
        return this.store.select(IrRegisterSelectors.selectTabValue(tabId));
    }

    tabValid$(tabId: IrRegisterTabId) {
        return this.store.select(IrRegisterSelectors.selectTabValid(tabId));
    }

    // ---------------- Commands ----------------

    init(clientId: number | null) {
        this.store.dispatch(IrRegisterActions.init({ clientId }));
    }

    goToTab(tabId: IrRegisterTabId) {
        this.store.dispatch(IrRegisterActions.changeTab({ tabId }));
    }

    patchTabValue(tabId: IrRegisterTabId, value: Record<string, unknown>) {
        this.store.dispatch(
            IrRegisterActions.setTabValue({ tabId, value })
        );
    }

    setTabValidity(tabId: IrRegisterTabId, valid: boolean) {
        this.store.dispatch(
            IrRegisterActions.setTabValidity({ tabId, valid })
        );
    }

    requestSave() {
        this.store.dispatch(IrRegisterActions.saveRequested());
    }

    saveSucceeded(clientId: number) {
        this.store.dispatch(IrRegisterActions.saveSucceeded({ clientId }));
    }

    saveFailed(error: string) {
        this.store.dispatch(IrRegisterActions.saveFailed({ error }));
    }

    reset() {
        this.store.dispatch(IrRegisterActions.reset());
    }
}
