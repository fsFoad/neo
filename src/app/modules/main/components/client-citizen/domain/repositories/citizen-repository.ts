import { Observable } from 'rxjs';
import { IdentityInfo } from '../models/identity-info.model';

export abstract class CitizenRepository {
    abstract loadMainInfo(id: string): Observable<IdentityInfo>;
    abstract saveMainInfo(id: string, data: IdentityInfo): Observable<void>;
}
