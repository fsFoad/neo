import {
    createFeature,
    createReducer,
    on,
    createSelector,
} from '@ngrx/store';
import {
    FrRegisterActions,
    FrRegisterTabId,
} from './fr-register.actions';

export const frRegisterFeatureKey = 'frCitizenRegister';

/**
 * ساختار state هر تب:
 * یک value (که خودت شکلش رو تعیین می‌کنی) + وضعیت اعتبار
 */
export interface FrRegisterTabState {
    value: Record<string, unknown>;
    valid: boolean;
}

/**
 * State کلی ثبت‌نام FR
 */
export interface FrRegisterState {
    clientId: number | null;

    // تب فعلی
    currentTabId: FrRegisterTabId;

    // دیتا و اعتبار هر تب
    tabs: Record<FrRegisterTabId, FrRegisterTabState>;

    // وضعیت ذخیره / لود
    loading: boolean;
    saving: boolean;
    error: string | null;
}

// کمک برای ساخت state خالی تب
function createEmptyTab(): FrRegisterTabState {
    return {
        value: {},
        valid: false,
    };
}

// کمک برای ساخت دیکشنری اولیه تب‌ها
function createInitialTabs(): Record<FrRegisterTabId, FrRegisterTabState> {
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

export const frRegisterInitialState: FrRegisterState = {
    clientId: null,
    currentTabId: 'identity',
    tabs: createInitialTabs(),
    loading: false,
    saving: false,
    error: null,
};

const frRegisterReducerInternal = createReducer(
    frRegisterInitialState,

    // Init
    on(FrRegisterActions.init, (state, { clientId }): FrRegisterState => ({
        ...state,
        clientId,
        loading: false,
        error: null,
    })),

    // تغییر تب
    on(FrRegisterActions.changeTab, (state, { tabId }): FrRegisterState => ({
        ...state,
        currentTabId: tabId,
    })),

    // مقدار تب
    on(FrRegisterActions.setTabValue, (state, { tabId, value }): FrRegisterState => {
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

    // اعتبار تب
    on(
        FrRegisterActions.setTabValidity,
        (state, { tabId, valid }): FrRegisterState => {
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

    // ذخیره
    on(FrRegisterActions.saveRequested, (state): FrRegisterState => ({
        ...state,
        saving: true,
        error: null,
    })),

    on(FrRegisterActions.saveSucceeded, (state, { clientId }): FrRegisterState => ({
        ...state,
        clientId,
        saving: false,
        error: null,
    })),

    on(FrRegisterActions.saveFailed, (state, { error }): FrRegisterState => ({
        ...state,
        saving: false,
        error,
    })),

    // Reset
    on(FrRegisterActions.reset, (): FrRegisterState => frRegisterInitialState)
);

// createFeature + extraSelectors برای NgRx 16+
export const frRegisterFeature = createFeature({
    name: frRegisterFeatureKey,
    reducer: frRegisterReducerInternal,
    extraSelectors: ({ selectFrCitizenRegisterState }) => ({
        selectCurrentTabId: createSelector(
            selectFrCitizenRegisterState,
            (state) => state.currentTabId
        ),

        selectTabs: createSelector(
            selectFrCitizenRegisterState,
            (state) => state.tabs
        ),

        selectTabState: (tabId: FrRegisterTabId) =>
            createSelector(selectFrCitizenRegisterState, (state) => state.tabs[tabId]),

        selectTabValue: (tabId: FrRegisterTabId) =>
            createSelector(
                selectFrCitizenRegisterState,
                (state) => state.tabs[tabId]?.value ?? {}
            ),

        selectTabValid: (tabId: FrRegisterTabId) =>
            createSelector(
                selectFrCitizenRegisterState,
                (state) => state.tabs[tabId]?.valid ?? false
            ),

        selectAllTabsValid: createSelector(
            selectFrCitizenRegisterState,
            (state) =>
                Object.values(state.tabs).every((tab) => tab.valid)
        ),

        selectIsSaving: createSelector(
            selectFrCitizenRegisterState,
            (state) => state.saving
        ),

        selectError: createSelector(
            selectFrCitizenRegisterState,
            (state) => state.error
        ),
    }),
});

// خود reducer تابع exportی
export const frRegisterReducer = frRegisterFeature.reducer;
