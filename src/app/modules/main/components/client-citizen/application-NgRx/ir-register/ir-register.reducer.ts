import {
    createFeature,
    createReducer,
    on,
    createSelector,
} from '@ngrx/store';
import {
    IrRegisterActions,
    IrRegisterTabId,
} from './ir-register.actions';

export const irRegisterFeatureKey = 'irCitizenRegister';

export interface IrRegisterTabState {
    value: Record<string, unknown>;
    valid: boolean;
}

export interface IrRegisterState {
    clientId: number | null;
    currentTabId: IrRegisterTabId;
    tabs: Record<IrRegisterTabId, IrRegisterTabState>;
    loading: boolean;
    saving: boolean;
    error: string | null;
}

function createEmptyTab(): IrRegisterTabState {
    return {
        value: {},
        valid: false,
    };
}

function createInitialTabs(): Record<IrRegisterTabId, IrRegisterTabState> {
    return {
        identity: createEmptyTab(),
        contact: createEmptyTab(),
        signature: createEmptyTab(),
        relations: createEmptyTab(),
        industry: createEmptyTab(),
        education: createEmptyTab(),
        documents: createEmptyTab(),
        extra: createEmptyTab(),
        business: createEmptyTab(),
        passport: createEmptyTab(),
        license: createEmptyTab(),
        final: createEmptyTab(),
    };
}

export const irRegisterInitialState: IrRegisterState = {
    clientId: null,
    currentTabId: 'identity',
    tabs: createInitialTabs(),
    loading: false,
    saving: false,
    error: null,
};

const irRegisterReducerInternal = createReducer(
    irRegisterInitialState,

    on(IrRegisterActions.init, (state, { clientId }): IrRegisterState => ({
        ...state,
        clientId,
        loading: false,
        error: null,
    })),

    on(IrRegisterActions.changeTab, (state, { tabId }): IrRegisterState => ({
        ...state,
        currentTabId: tabId,
    })),

    on(IrRegisterActions.setTabValue, (state, { tabId, value }): IrRegisterState => {
        const tab = state.tabs[tabId] ?? createEmptyTab();
        return {
            ...state,
            tabs: {
                ...state.tabs,
                [tabId]: {
                    ...tab,
                    value: {
                        ...tab.value,
                        ...value,
                    },
                },
            },
        };
    }),

    on(
        IrRegisterActions.setTabValidity,
        (state, { tabId, valid }): IrRegisterState => {
            const tab = state.tabs[tabId] ?? createEmptyTab();
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [tabId]: {
                        ...tab,
                        valid,
                    },
                },
            };
        }
    ),

    on(IrRegisterActions.saveRequested, (state): IrRegisterState => ({
        ...state,
        saving: true,
        error: null,
    })),

    on(IrRegisterActions.saveSucceeded, (state, { clientId }): IrRegisterState => ({
        ...state,
        clientId,
        saving: false,
        error: null,
    })),

    on(IrRegisterActions.saveFailed, (state, { error }): IrRegisterState => ({
        ...state,
        saving: false,
        error,
    })),

    on(IrRegisterActions.reset, (): IrRegisterState => irRegisterInitialState)
);

export const irRegisterFeature = createFeature({
    name: irRegisterFeatureKey,
    reducer: irRegisterReducerInternal,
    extraSelectors: ({ selectIrCitizenRegisterState }) => ({
        selectCurrentTabId: createSelector(
            selectIrCitizenRegisterState,
            (state) => state.currentTabId
        ),

        selectTabs: createSelector(
            selectIrCitizenRegisterState,
            (state) => state.tabs
        ),

        selectTabState: (tabId: IrRegisterTabId) =>
            createSelector(selectIrCitizenRegisterState, (state) => state.tabs[tabId]),

        selectTabValue: (tabId: IrRegisterTabId) =>
            createSelector(
                selectIrCitizenRegisterState,
                (state) => state.tabs[tabId]?.value ?? {}
            ),

        selectTabValid: (tabId: IrRegisterTabId) =>
            createSelector(
                selectIrCitizenRegisterState,
                (state) => state.tabs[tabId]?.valid ?? false
            ),

        selectAllTabsValid: createSelector(
            selectIrCitizenRegisterState,
            (state) =>
                Object.values(state.tabs).every((tab) => tab.valid)
        ),

        selectIsSaving: createSelector(
            selectIrCitizenRegisterState,
            (state) => state.saving
        ),

        selectError: createSelector(
            selectIrCitizenRegisterState,
            (state) => state.error
        ),
    }),
});

export const irRegisterReducer = irRegisterFeature.reducer;
