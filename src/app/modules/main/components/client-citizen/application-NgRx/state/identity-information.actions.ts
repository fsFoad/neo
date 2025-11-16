import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IdentityInfo } from '../../domain/models/identity-info.model';

export const MainInfoActions = createActionGroup({
    source: 'Citizen/MainInfo',
    events: {
        'Patch': props<{ changes: Partial<IdentityInfo> }>(),
        'Reset': emptyProps(),

        'Load Requested': props<{ id: string }>(),
        'Load Success':   props<{ data: IdentityInfo }>(),
        'Load Failure':   props<{ error: any }>(),

        'Save Requested': props<{ id: string; data: IdentityInfo }>(),
        'Save Success':   emptyProps(),
        'Save Failure':   props<{ error: any }>(),
    },
});
