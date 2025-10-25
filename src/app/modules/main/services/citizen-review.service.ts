import { Injectable } from '@angular/core';
import { ConnectionService } from '../../../../shared/repositories/connection.service';
import { Observable } from 'rxjs';
import {
    ChangeFlagsDto
} from '../components/client-citizen/tabs/citizen-confirmation-info/citizen-confirmation-info.component';

@Injectable({
  providedIn: 'root'
})
export class CitizenReviewService {
    constructor(private conn: ConnectionService) {}

    getChangeFlags(clientId: number): Observable<ChangeFlagsDto> {
        // اگر Mock فعاله، ConnectionService از ApiMockObjectsService برمی‌گردونه
        return this.conn.getConnection(
            `party/change-flags?clientId=${clientId}`,
            'citizenChangeFlags'   // ← اسم ماک (در مرحله 3 می‌سازیم)
        );
    }
}
