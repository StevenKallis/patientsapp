import { TestBed } from '@angular/core/testing';

import { PatientService } from './patient.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Patient } from '../../shared/patient.model';
const mockPatients: Patient[] = [
  {
    id: 1,
    first_name: 'Alice',
    date_of_birth: '1990-01-01',
    medical_record_number: 'MRN001',
    last_name: '',
    height: null,
    phone: null,
    email: '',
    gender: '',
    is_active: '',
  },
  {
    id: 2,
    first_name: 'Bob',
    date_of_birth: '1985-05-05',
    medical_record_number: 'MRN002',
    last_name: '',
    height: null,
    phone: null,
    email: '',
    gender: '',
    is_active: '',
  },
];

const mockPatient: Patient = {
  id: 1,
  first_name: 'Alice',
  date_of_birth: '1990-01-01',
  medical_record_number: 'MRN001',
  last_name: '',
  height: null,
  phone: null,
  email: '',
  gender: '',
  is_active: '',
};
describe('PatientService', () => {
  let service: PatientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService],
    });

    service = TestBed.inject(PatientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch patients', () => {
    service.getPatients().subscribe((patients) => {
      expect(patients).toEqual(mockPatients);
    });

    const req = httpMock.expectOne(service.patientURL);
    expect(req.request.method).toBe('GET');
    req.flush(mockPatients);
  });

  it('should fetch patient by id', () => {
    service.getPatientById('1').subscribe((patient) => {
      expect(patient).toEqual(mockPatient);
    });

    const req = httpMock.expectOne(`${service.patientURL}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPatient);
  });
});
