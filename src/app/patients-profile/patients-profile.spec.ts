import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PatientService } from '../services/patient-service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsProfile } from './patients-profile.component';
import { Patient, PatientNote } from '../shared/patient.model';
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons';

import { of } from 'rxjs';
import { importProvidersFrom } from '@angular/core';
import { provideNzIcons } from 'ng-zorro-antd/icon';

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
export const mockNotes: PatientNote[] = [
  {} as PatientNote,
  {} as PatientNote,
  {} as PatientNote,
  {} as PatientNote,
  {} as PatientNote,
];
describe('PatientsProfile', () => {
  let component: PatientsProfile;
  let fixture: ComponentFixture<PatientsProfile>;
  let patientService: PatientService;
  let router: Router;

  beforeEach(async () => {
    const patientServiceSpy = jasmine.createSpyObj('PatientService', [
      'getPatientById',
      'getNotesByPatientId',
    ]);
    patientServiceSpy.getPatientById.and.returnValue(of(mockPatient));
    patientServiceSpy.getNotesByPatientId.and.returnValue(of(mockNotes));

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PatientsProfile],
      providers: [
        provideNzIcons([ArrowLeftOutline]),
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id', '1']]) } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsProfile);
    component = fixture.componentInstance;
    patientService = TestBed.inject(PatientService) as jasmine.SpyObj<PatientService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load patient profile and notes on init', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    expect(patientService.getPatientById).toHaveBeenCalledWith('1');
    expect(patientService.getNotesByPatientId).toHaveBeenCalledWith('1');
    expect(component.patientProfile).toEqual(mockPatient);
    expect(component.patientNotes.length).toBe(5);
    expect(component.displayedNotes.length).toBe(5);
    expect(component.isLoading).toBe(false);
  }));

  it('should show more notes when showMore is called', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    expect(component.displayedNotes.length).toBe(5);

    component.showMore();
    fixture.detectChanges();

    expect(component.displayedNotes.length).toBe(5);
    expect(component.hasMore()).toBe(false);
  }));

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/patients']);
  });
});
