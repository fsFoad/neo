import { CitizenClientTypeModel } from '../../domain/models/citizen-client-type.model';

export type FrRegisterTabId =
    | 'identity'
    | 'contact'
    | 'passport'
    | 'residency'
    | 'financial'
    | 'docs'
    | 'extra'
    | 'final';  // هرچی برای FR لازم داری

export interface TabFormState<TValue = any> {
    id: FrRegisterTabId;
    value: TValue | null;
    valid: boolean;
    dirty: boolean;
}

export interface FrRegisterState {
    clientType: CitizenClientTypeModel.FR; // همیشه FR
    currentTabId: FrRegisterTabId;
    tabs: Record<FrRegisterTabId, TabFormState>;
    loading: boolean;
    saving: boolean;
    error: string | null;
}
