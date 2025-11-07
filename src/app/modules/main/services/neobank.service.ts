import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from '../../../../shared/repositories/connection.service';
import { CitizenSearch } from '../../shared/models/citizen-search.model';
import { Retriveclientinfo } from '../components/client-citizen/infrastructure/dto/retriveclientinfo.dto';


@Injectable({
    providedIn: 'root',
})
export class NeobankService {
    constructor(
        private connectionService: ConnectionService,
    ) {
    }
    easyretrieveclientcitizen(fetchtype:number, value:number ): Observable<any> {
        return this.connectionService.getConnection('party/easyretrieveclientcitizen?' +
            (fetchtype ? 'fetchtype=' + fetchtype : '') +
            ((fetchtype && value) ? '&value=' + value : (value ? 'value=' + value : '')) +
            '', 'messagesearch')
    }
    advanceretrieveclient(itemsSearch:CitizenSearch) {
        debugger
        return this.connectionService.postConnection('party/advanceretrieveclient',itemsSearch,
            '');
    }
    createClientContactInfo(clientId: number) {
        return this.connectionService.postConnection('party/createclientcontactinfo', { clientid: clientId }
        );
    }
    fetchRetriveclientinfo(itemsSearch:Retriveclientinfo) {
        return this.connectionService.postConnection('party/retriveclientinfo', itemsSearch,''
        );
    }
}


export interface SearchApiCategory {
    title?: string,
    maincatid?: string,
}
