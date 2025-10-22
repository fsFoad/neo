import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from '../../../../shared/repositories/connection.service';
import { CitizenSearch } from '../../shared/models/citizen-search.model';


@Injectable({
    providedIn: 'root',
})
export class NeobankService {
    constructor(
        private connectionService: ConnectionService,
    ) {
    }

}


export interface SearchApiCategory {
    title?: string,
    maincatid?: string,
}
