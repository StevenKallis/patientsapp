import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, PatientNote } from '../../shared/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  http = inject(HttpClient);
  patientURL = 'http://localhost:3000/rows';
  notesURL = 'http://localhost:3001/rows';

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientURL);
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.patientURL}/${id}`);
  }

  getNotesByPatientId(patientId: string): Observable<PatientNote[]> {
    return this.http.get<PatientNote[]>(`${this.notesURL}?patient_id=${patientId}`);
  }
}
