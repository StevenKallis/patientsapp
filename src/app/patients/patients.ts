import { Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ng-Zorro modules
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PatientService } from '../services/patient-service/patient-service';
import { Patient } from '../shared/patient';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-patients',
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzCardModule,
    NzPaginationModule,
  ],
  templateUrl: './patients.html',
  styleUrl: './patients.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Patients implements OnInit {
  private readonly patientService = inject(PatientService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  patients: Patient[] = [];

  nameFilter = '';
  dobFilter = '';
  mrnFilter = '';
  pageIndex = 1;
  pageSize = 3;
  isLoading = true;

  ngOnInit() {
    this.patientService
      .getPatients()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Patient[]) => {
        this.patients = data;
        this.isLoading = false;
      });
  }
  get filteredPatients(): Patient[] {
    return this.patients.filter(
      (patient) =>
        patient.first_name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
        patient.date_of_birth.toLowerCase().includes(this.dobFilter.toLowerCase()) &&
        patient.medical_record_number.toLowerCase().includes(this.mrnFilter.toLowerCase())
    );
  }

  get pagedPatients(): Patient[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filteredPatients.slice(start, start + this.pageSize);
  }

  onPageChange(index: number): void {
    this.pageIndex = index;
  }

  onPatientClick(patient: Patient): void {
    this.router.navigate(['/patients', patient.id]);
  }
}
