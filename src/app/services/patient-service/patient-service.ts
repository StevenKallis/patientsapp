import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../shared/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  http = inject(HttpClient);
  URL = 'http://localhost:3000/rows';

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.URL);
  }
}
