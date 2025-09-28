import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientService } from '../services/patient-service/patient.service';
import { Router } from '@angular/router';

import { Patients } from './patients.component';
import { of } from 'rxjs';
import { Patient } from '../shared/patient.model';

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
  {
    id: 3,
    first_name: 'Charlie',
    date_of_birth: '1987-02-07',
    medical_record_number: 'MRN003',
    last_name: '',
    height: null,
    phone: null,
    email: '',
    gender: '',
    is_active: '',
  },
  {
    id: 4,
    first_name: 'Steve',
    date_of_birth: '1981-10-09',
    medical_record_number: 'MRN004',
    last_name: '',
    height: null,
    phone: null,
    email: '',
    gender: '',
    is_active: '',
  },
  {
    id: 5,
    first_name: 'Sam',
    date_of_birth: '1990-05-3',
    medical_record_number: 'MRN003',
    last_name: '',
    height: null,
    phone: null,
    email: '',
    gender: '',
    is_active: '',
  },
];

describe('Patients', () => {
  let component: Patients;
  let fixture: ComponentFixture<Patients>;
  let patientService: PatientService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Patients],
      providers: [
        {
          provide: PatientService,
          useValue: jasmine.createSpyObj('PatientService', {
            getPatients: of(mockPatients),
          }),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Patients);
    component = fixture.componentInstance;
    patientService = TestBed.inject(PatientService) as jasmine.SpyObj<PatientService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load patients on init', () => {
    expect(patientService.getPatients).toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should return paged patients correctly', () => {
    component.pageIndex = 2;
    component.pageSize = 3;
    expect(component.pagedPatients.length).toBe(2);
  });
});
