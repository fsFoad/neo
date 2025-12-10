import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductClientRepository } from '../domain/repositories/product-client-repository';


@Injectable()
export class ProductClientEffects {
    private actions$ = inject(Actions);
    private repo = inject(ProductClientRepository);

    loadMetadata$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductClientActions.loadMetadata),
            mergeMap(() =>
                this.repo.loadMetadata().pipe(
                    map((metadata) =>
                        ProductClientActions.loadMetadataSucceeded({ metadata })
                    ),
                    catchError((err) =>
                        of(
                            ProductClientActions.loadMetadataFailed({
                                error: err.message ?? 'خطا',
                            })
                        )
                    )
                )
            )
        )
    );
}
