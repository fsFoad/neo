import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MainInfoActions } from '../state/identity-information.actions';
import { selectCitizenMainInfoState } from '../state/identity-information.selectors';
import { Observable } from 'rxjs';
import { IdentityInfo } from '../../domain/models/identity-info.model';

@Injectable({ providedIn: 'root' })
export class IdentityInformationFacade {
    private store = inject(Store);

    state$: Observable<IdentityInfo> = this.store.select(selectCitizenMainInfoState);
    patch(changes: Partial<IdentityInfo>) {
        this.store.dispatch(MainInfoActions.patch({ changes }));
    }

    reset() {
        this.store.dispatch(MainInfoActions.reset());
    }

    loadSuccess(data: IdentityInfo) {
        this.store.dispatch(MainInfoActions.loadSuccess({ data }));
    }
}
