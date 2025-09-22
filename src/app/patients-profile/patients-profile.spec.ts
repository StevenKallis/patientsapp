import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsProfile } from './patients-profile';

describe('PatientsProfile', () => {
  let component: PatientsProfile;
  let fixture: ComponentFixture<PatientsProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
