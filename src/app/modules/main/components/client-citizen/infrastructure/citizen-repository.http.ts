// src/app/features/citizen/infrastructure/citizen-repository.http.ts
import { inject, Injectable } from '@angular/core';
import { CitizenRepository } from '../domain/repositories/citizen-repository';
import { IdentityInfo, IDENTITY_INFO_INITIAL } from '../domain/models/identity-info.model';
import { Observable, of, delay } from 'rxjs';
// اگر پروژه‌ات قدیمی‌تره و با این ایمپورتِ delay خطا می‌گیری:
// import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CitizenRepositoryHttp implements CitizenRepository {
    // private http = inject(HttpClient); // وقتی API واقعی داری، فعال کن

    loadMainInfo(id: string): Observable<IdentityInfo> {
        // TODO: http.get/POST واقعی
        // برای تست: مقدار کامل و معتبر برگردون
        return of({
            ...IDENTITY_INFO_INITIAL,
            clientId: Number(id) || 0, // اگر id همون clientId نیست، تغییر بده
        }).pipe(delay(300));
    }

    saveMainInfo(id: string, data: IdentityInfo): Observable<void> {
        // TODO: http.post/put واقعی
        // فعلاً استاب
        return of(void 0).pipe(delay(300));
    }
}
