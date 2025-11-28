import { CitizenClientTypeModel } from '../../domain/models/citizen-client-type.model';

export type IrRegisterTabId =
    | 'identity'
    | 'contact'
    | 'signature'
    | 'relations'
    | 'industry'
    | 'edu'
    | 'docs'
    | 'extra'
    | 'business'
    | 'passport'
    | 'license'
    | 'final';

export interface TabFormState<TValue = any> {
    id: IrRegisterTabId;
    value: TValue | null;
    valid: boolean;
    dirty: boolean;
}

export interface IrRegisterState {
    clientType: CitizenClientTypeModel.IR; // همیشه IR
    currentTabId: IrRegisterTabId;
    tabs: Record<IrRegisterTabId, TabFormState>;
    loading: boolean;
    saving: boolean;
    error: string | null;
}
